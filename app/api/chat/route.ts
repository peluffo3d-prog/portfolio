import { streamText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { SYSTEM_PROMPT } from "@/lib/data";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const result = streamText({
    model: anthropic("claude-sonnet-4-6"),
    system: SYSTEM_PROMPT,
    messages,
    maxOutputTokens: 300,
  });

  return result.toTextStreamResponse();
}
