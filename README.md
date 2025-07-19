# 🛠️ AutoDevBot

AutoDevBot is an AI-powered CLI tool that generates backend scaffolding (routes and models) files in TypeScript from natural language prompts using LLMs like OpenAI, Claude, or Mistral. It's built to accelerate early-stage backend development by turning plain English ideas into TypeScript/Express code — instantly.

---

## Features

- **Prompt-based API generation** — Describe your backend in natural language, and AutoDevBot handles the rest.
- **Express + TypeScript routes** — RESTful route files grouped by path and method.
- **Type-safe model generation** — Converts LLM output into clean TypeScript interfaces.
- **Modular file generation** — Organized output for easy extension and integration.
- **LLM abstraction layer** — Supports multiple LLMs via a single interface (OpenAI, Claude, Mistral).

---

##  Example Usage

```bash
npx ts-node src/index.ts "Build an API for a bookstore with books (title, authorId, year) and authors (name, bio)"
```
This will generate:

- **Express routes** like `GET /books`, `POST /authors`, etc.
- **Model interfaces** for `Book` and `Author`
- **Output files** organized in:
  - `output/routes/`
  - `output/models/`

## Configuration

Create a `.env` file:

```env
OPENAI_API_KEY=your-api-key
LLM_PROVIDER=openai  # or claude | mistral
```