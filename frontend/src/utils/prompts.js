export function createClassificationPrompt(prompt) {
  return `Analyze the following email prompt and determine if it's a sales email or a follow-up email. 

Prompt: "${prompt}"

Respond with only "SALES" if it's a sales email, or "FOLLOW_UP" if it's a follow-up email.

A sales email typically includes:
- Promoting a product or service
- Asking for a purchase or meeting
- Cold outreach to potential customers
- Marketing content
- Lead generation
- Initial contact with prospects
- Product demonstrations
- Pricing discussions

A follow-up email typically includes:
- Following up on previous conversations
- Checking in after meetings or calls
- Reminding about proposals or quotes
- Following up on unanswered emails
- Scheduling follow-up meetings
- Providing additional information requested
- Thank you messages after interactions
- Status updates on ongoing discussions`;
}

export function createSalesEmailPrompt(aiPrompt) {
  return `Based on this prompt: "${aiPrompt}", generate a sales email.

Requirements:
- Subject line: Maximum 8 words, compelling and action-oriented
- Body: Maximum 32 words total, in sentences of maximum 10 words each
- Tone: Professional, persuasive, but not pushy
- Include a clear call-to-action
- Focus on value proposition and benefits

Format your response exactly like this:
SUBJECT: [subject line]
BODY: [email body]`;
}

export function createFollowUpEmailPrompt(aiPrompt) {
  return `Based on this prompt: "${aiPrompt}", generate a follow-up email.

Requirements:
- Subject line: Maximum 6 words, friendly and specific
- Body: Maximum 25 words total, in sentences of maximum 8 words each
- Tone: Warm, professional, helpful
- Be concise and to the point
- Show genuine interest in continuing the conversation

Format your response exactly like this:
SUBJECT: [subject line]
BODY: [email body]`;
}
