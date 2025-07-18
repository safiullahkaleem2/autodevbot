import { promises as fs } from "fs";
import path from "path";
import { Model } from "../parser";

export async function generateModel(model: Model) {
  const fields = Object.entries(model.fields)
    .map(([key, type]) => `  ${key}: ${type};`)
    .join("\n");

  const content = `export interface ${model.name} {\n${fields}\n}`;
  const filePath = path.join("output", "models", `${model.name.toLowerCase()}.ts`);

  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, "utf-8");
}
