import fetch from "node-fetch";
import { loadConfig } from "../storage/config.js";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "openrouter/auto";
const TIMEOUT_MS = 30000;
const MAX_RETRIES = 2;

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
        "Content-Type": "application/json",
        "HTTP-Referer": "https://github.com/asyncAdarsh17/ForgeAI",
        "X-Title": "Forge AI"
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
- Always answer directly.
- NEVER ask the user for more code or clarification.
- If code is incomplete, still explain using the visible logic.
- Assume the snippet represents the important part of the system.

For explanations:
1. Explain what the code does
2. Explain the key logic
3. Mention important algorithms or patterns
4. Mention real-world use cases

Be concise and structured.
Avoid unnecessary conversation.
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

  const content = data?.choices?.[0]?.message?.content;

  if (!content || content.trim().length === 0) {
    throw new Error("EMPTY_RESPONSE");
  }

  return content.trim();
}

export async function askAI(prompt) {

  const { apiKey } = loadConfig();

  if (!apiKey) {
    throw new Error("OpenRouter API key not configured.");
  }

  let lastError;

  for (let i = 0; i <= MAX_RETRIES; i++) {

    try {

      const result = await callModel(prompt, apiKey);

      return result;

    } catch (err) {

      lastError = err;

      if (err.message === "EMPTY_RESPONSE") {
        continue;
      }

      if (i === MAX_RETRIES) break;

    }

  }

  console.log("\n⚠️ AI provider returned an empty response.");
  console.log("Try again or use a smaller input.\n");

  throw lastError;
}