import { promises as fs } from "fs";
import path from "path";
import { LLMParsedOutput } from "../parser";
import { generateModel } from "./models";

// helper: extract resource name from path
function getRouteFileKey(routePath: string): string {
  const segments = routePath.split("/").filter(Boolean);
  // try to find first meaningful segment
  return segments[segments.findIndex(seg => !seg.startsWith(":"))] || "root";
}

export async function generateFiles(parsed: LLMParsedOutput) {
  await Promise.all(parsed.models.map(generateModel));

  const routeGroups: { [resource: string]: { path: string, method: string }[] } = {};

  for (const route of parsed.routes) {
    for (const method of route.methods) {
      const resource = getRouteFileKey(route.path);
      if (!routeGroups[resource]) routeGroups[resource] = [];
      routeGroups[resource].push({ path: route.path, method });
    }
  }

  for (const [resource, routeDefs] of Object.entries(routeGroups)) {
    const routeLines = routeDefs.map(({ path, method }) => {
      return `router.${method.toLowerCase()}("${path}", (req, res) => {
  res.send("${method} ${path}");
});`;
    });

    const routeCode = `import express from "express";
const router = express.Router();

${routeLines.join("\n\n")}

export default router;
`;

    const filePath = path.join("output", "routes", `${resource}.ts`);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, routeCode, "utf-8");
  }
}
