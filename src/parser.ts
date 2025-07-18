export interface FieldMap {
  [key: string]: string;
}

export interface Model {
  name: string;
  fields: FieldMap;
}

export interface Route {
  path: string;
  methods: string[];
}

export interface LLMParsedOutput {
  models: Model[];
  routes: Route[];
}

function normalizeType(type: string): string {
  const t = type.toLowerCase();
  if (["integer", "int", "float", "double", "number"].includes(t)) return "number";
  if (["uuid", "date", "datetime"].includes(t)) return "string";
  if (["boolean", "bool"].includes(t)) return "boolean";
  return "string"; // fallback
}

export function parseLLMResponse(raw: string): LLMParsedOutput {
  try {
    const jsonStart = raw.indexOf("{");
    const jsonEnd = raw.lastIndexOf("}") + 1;
    const cleaned = raw.slice(jsonStart, jsonEnd);
    const parsedRaw = JSON.parse(cleaned);

    // ✅ Route parsing (OpenAPI-style)
    const routeMap: { [key: string]: Set<string> } = {};

    parsedRaw.routes.forEach((r: any) => {
      const path = r.path || r.route;
      const method = (r.method || "GET").toUpperCase();

      if (!routeMap[path]) routeMap[path] = new Set();
      routeMap[path].add(method);
    });

    const routes: Route[] = Object.entries(routeMap).map(([path, methods]) => ({
      path,
      methods: [...methods],
    }));

    // ✅ Model parsing (object instead of array)
    const models: Model[] = Object.entries(parsedRaw.models).map(([modelName, modelDef]: [string, any]) => {
      const properties = modelDef.properties || {};
      const fields: FieldMap = Object.fromEntries(
        Object.entries(properties).map(([name, prop]: [string, any]) => [name, normalizeType(prop.type)])
      );
      return {
        name: modelName,
        fields,
      };
    });

    return { models, routes };
  } catch (err) {
    console.error("Failed to parse LLM response:", err);
    console.log("Raw Output:\n", raw);
    throw err;
  }
}
