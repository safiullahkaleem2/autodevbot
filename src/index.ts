// src/index.ts
import { config } from "dotenv";
config();
import { callLLM } from "./llm";
import { generateFiles } from "./generator/routes"; // for now, just routes
import { parseLLMResponse } from "./parser";
// ...

const main = async () => {
  const userPrompt = process.argv.slice(2).join(" ");
  if (!userPrompt) {
    console.error("Usage: npx ts-node src/index.ts \"Build a blog API...\"");
    return;
  }

  const llmOutput = await callLLM(userPrompt);
  console.log(" Raw LLM output:\n", llmOutput);

  const parsed = parseLLMResponse(llmOutput);
    await generateFiles(parsed);

};

main();
