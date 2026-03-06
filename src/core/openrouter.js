import fetch from "node-fetch";
import { loadConfig } from "../storage/config.js";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "openrouter/free";
const TIMEOUT_MS = 30000; // 30s hard stop

function fetchWithTimeout(url, options, timeout) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(id));
}

async function callModel(prompt, apiKey) {
  const response = await fetchWithTimeout(
    OPENROUTER_URL,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content: `
You are Forge AI, a senior software engineer and mentor.

Rules:
- Be concise and structured.
- For debugging:
  1. Identify the issue
  2. Explain why it happens
  3. Show the fix
  4. Provide corrected code
- For explanations:
  - Break concepts clearly
  - Use simple technical language
- Never add unnecessary fluff.
`
          },
          { role: "user", content: prompt }
        ]
      })
    },
    TIMEOUT_MS
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.error?.message || `HTTP ${response.status}`);
  }

  if (!data.choices?.[0]?.message?.content) {
    throw new Error("Invalid AI response.");
  }

  return data.choices[0].message.content.trim();
}

export async function askAI(prompt) {
  const { apiKey } = loadConfig();

  if (!apiKey) {
    throw new Error("OpenRouter API key not configured.");
  }

  try {
    return await callModel(prompt, apiKey);
  } catch (err) {
    return `
⚠️ Forge AI (Free Mode)

The free AI provider is temporarily unavailable.

👉 Try again in a few minutes
👉 Retry the command
👉 Use a smaller input if possible

This is a free infrastructure limitation.
`;
  }
}