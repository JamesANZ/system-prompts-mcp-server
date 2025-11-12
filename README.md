# System Prompts MCP Server

Expose the prompt collection in this repository as a Model Context Protocol (MCP) server. Each prompt, summary, or tool definition maps to a dedicated MCP tool so your client can fetch the exact configuration it needs (e.g. Devin system prompt, Cursor summary) on demand.

The original prompt archive README now lives under `prompts/README.md`.

---

## Features
- **Automatic discovery** – every text/yaml/json prompt in `prompts/` (or any directory you point to) is scanned and exposed as an MCP tool.
- **Model-aware suggestions** – `get_prompt_suggestion` ranks prompts against the LLM you’re using (Claude, GPT, Gemini, etc.) and the keywords you provide.
- **Quick browsing** – `list_prompts` filters by service, flavor (`summary`, `system`, `tools`), or provider hints.
- **Persona activation** – each tool call includes a reminder for the model to embody the loaded prompt so it behaves like the original service.
- **Structured responses** – tool calls return both raw file contents and metadata (service, variant, path, inferred LLM family, persona hint).

---

## Project Layout

- `src/` – TypeScript MCP server implementation
  - `index.ts` registers tools (`list_prompts`, `get_prompt_suggestion`, plus one tool per prompt file)
  - `config/prompts.ts` discovers prompt files and infers metadata
  - `lib/` helpers for slugging, LLM detection, and ranking
- `dist/` – compiled JavaScript (created by the build step)
- `prompts/` – full prompt library and original documentation
---

## Getting Started

```bash
npm install
npm run build
```

> `npm install` automatically registers this server with Claude Desktop (if present) by updating `~/Library/Application Support/Claude/claude_desktop_config.json`. You can opt out by removing the `postinstall` script from `package.json`.

Start the server on stdio (suitable for Claude Desktop, Cursor MCP, etc.):

```bash
npm run start
```

Run in watch/dev mode:

```bash
npm run dev
```

**Environment variables**

- `PROMPT_LIBRARY_ROOT` (optional) – override the prompt root. If unset, the server automatically prefers `prompts/` (when available) and falls back to the repository root.

---

## MCP Tools

| Tool                           | Description                                                                                                                             |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `list_prompts`                 | Lists available prompts with optional filters (`service`, `flavor`, `provider`, `limit`).                                               |
| `get_prompt_suggestion`        | Suggests the best prompt for a given LLM/service/keywords, returning ranked alternatives.                                               |
| `<service>-<variant>-<flavor>` | One tool per prompt resource (e.g. `cursor-agent-system` or `devin-summary`). Returns the file contents plus a persona activation hint. |

**Example:**

```jsonc
// Call list_prompts with filters
{
  "name": "list_prompts",
  "arguments": { "service": "cursor", "flavor": "system" },
}
```

```jsonc
// Ask for a suggestion tailored to Claude
{
  "name": "get_prompt_suggestion",
  "arguments": {
    "userLlm": "claude-3.5-sonnet",
    "keywords": ["code", "pair programming"],
  },
}
```

Once you have a tool name (e.g. `cursor-agent-system`), call it with optional `format: "json"` to receive structured metadata only.

---

## Claude Desktop Integration

Add the server to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```jsonc
"system-prompts-mcp": {
  "command": "/Users/<you>/.nvm/versions/node/v22.17.0/bin/node",
  "args": [
    "/Users/<you>/Documents/projects/system-prompts-and-models-of-ai-tools/dist/index.js"
  ],
  "env": {
    "PROMPT_LIBRARY_ROOT": "/Users/<you>/Documents/projects/system-prompts-and-models-of-ai-tools/prompts"
  }
}
```

Restart Claude Desktop to load the new MCP server, then ask for prompts by name or use the suggestion tool.

---

## Development

- `npm run dev` – run with `ts-node` for quick iteration
- `npm run lint` – type-check without emitting files

---

## 🛠 Roadmap & Feedback

> Open an issue.

> **Latest Update:** 02/12/2025

---

## 🔗 Connect With Me

- **X:** [NotLucknite](https://x.com/NotLucknite)
- **Discord**: `x1xhlol`
- **Email**: `lucknitelol@pm.me`

---

## 🛡️ Security Notice for AI Startups

> ⚠️ **Warning:** If you're an AI startup, make sure your data is secure. Exposed prompts or AI models can easily become a target for hackers.

> 🔐 **Important:** Interested in securing your AI systems?  
> Check out **[ZeroLeaks](https://zeroleaks.io/)**, a service designed to help startups **identify and secure** leaks in system instructions, internal tools, and model configurations. **Get a free AI security audit** to ensure your AI is protected from vulnerabilities.


## 📊 Star History

<a href="https://www.star-history.com/#x1xhlol/system-prompts-and-models-of-ai-tools&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=x1xhlol/system-prompts-and-models-of-ai-tools&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=x1xhlol/system-prompts-and-models-of-ai-tools&type=Date" />
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=x1xhlol/system-prompts-and-models-of-ai-tools&type=Date" />
  </picture>
</a>

⭐ **Drop a star if you find this useful!**
