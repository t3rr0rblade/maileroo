import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import {
  createSalesEmailPrompt,
  createFollowUpEmailPrompt,
} from "../../../utils/prompts";

export const runtime = "edge";

function generatePrompt(aiPrompt, emailType) {
  const prompts = {
    SALES: createSalesEmailPrompt(aiPrompt),
    FOLLOW_UP: createFollowUpEmailPrompt(aiPrompt),
  };

  return prompts[emailType] || null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = await req.json();
  const { aiPrompt, emailType } = prompt;

  if (!aiPrompt || !emailType) {
    return res.status(400).json({ error: "Prompt and emailType are required" });
  }

  const generationPrompt = generatePrompt(aiPrompt, emailType);

  if (!generationPrompt) {
    return res.status(400).json({ error: "Invalid email type" });
  }

  try {
    const result = streamText({
      model: google("models/gemini-2.5-flash"),
      prompt: generationPrompt,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("AI generation error:", error);
    res.status(500).json({ error: "Failed to generate email content" });
  }
}
