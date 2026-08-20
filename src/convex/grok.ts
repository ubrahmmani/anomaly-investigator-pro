"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";

/**
 * Grok API integration via a Convex "use node" action.
 *
 * Environment variable (set in Freebuff Keys/API keys tab):
 *   GROK_API_KEY — your xAI / Grok API key
 *
 * The Grok API is OpenAI-compatible:
 * https://docs.x.ai/docs/overview
 */

const GROK_BASE_URL = "https://api.x.ai/v1";

export const chat = action({
  args: {
    prompt: v.string(),
    systemPrompt: v.optional(v.string()),
  },
  handler: async (_ctx, args) => {
    const apiKey = process.env.GROK_API_KEY;
    if (!apiKey) {
      throw new Error(
        "Missing GROK_API_KEY. Add it in the Freebuff Keys/API keys tab.",
      );
    }

    const messages: Array<{ role: string; content: string }> = [];

    if (args.systemPrompt) {
      messages.push({ role: "system", content: args.systemPrompt });
    }
    messages.push({ role: "user", content: args.prompt });

    const response = await fetch(`${GROK_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-3-latest",
        messages,
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Grok API error ${response.status}: ${body}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content ?? "";
  },
});
