import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { createClassificationPrompt } from "../../../utils/prompts";

function parseClassificationResult(text) {
  const classification = text.trim().toUpperCase();
  return {
    isSalesEmail: classification === "SALES",
    isFollowUpEmail: classification === "FOLLOW_UP",
    classification,
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const classificationPrompt = createClassificationPrompt(prompt);

  try {
    const result = await generateText({
      model: google("models/gemini-2.5-flash"),
      prompt: classificationPrompt,
    });

    const { isSalesEmail, isFollowUpEmail, classification } =
      parseClassificationResult(result.text);

    res.status(200).json({
      isSalesEmail,
      isFollowUpEmail,
      classification,
      prompt,
    });
  } catch (error) {
    console.error("AI classification error:", error);
    res.status(500).json({ error: "Failed to classify email prompt" });
  }
}
