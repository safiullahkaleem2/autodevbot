// src/llm.ts
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function callLLM(userPrompt: string): Promise<string> {
  const basePrompt = `
You are an API generation assistant.
Given an app description, respond ONLY with a JSON definition of the routes and models.
Model fields must be valid TypeScript types: "string", "number", "boolean", "Date", etc.
Use this JSON format:

{
  "routes": [...],
  "models": {
    "ModelName": {
      "type": "object",
      "properties": {
        "fieldName": { "type": "string" }
      }
    }
  }
}

Only return raw JSON. No markdown, no explanation.
`.trim();

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-4", // or "gpt-3.5-turbo"
    messages: [
      { role: "system", content: basePrompt },
      { role: "user", content: userPrompt },
    ],
  });

  return chatCompletion.choices[0].message.content || "";
}
