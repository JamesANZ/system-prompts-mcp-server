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

### Installing in Cursor

You can install this MCP server directly in Cursor using the one-click install link:

**🔗 [Install in Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=system-prompts-mcp&config=eyJzeXN0ZW0tcHJvbXB0cy1tY3AiOnsiY29tbWFuZCI6Im5weCIsImFyZ3MiOlsiLXkiLCJzeXN0ZW0tcHJvbXB0cy1tY3Atc2VydmVyIl19fQ==)**

```
cursor://anysphere.cursor-deeplink/mcp/install?name=system-prompts-mcp&config=eyJzeXN0ZW0tcHJvbXB0cy1tY3AiOnsiY29tbWFuZCI6Im5weCIsImFyZ3MiOlsiLXkiLCJzeXN0ZW0tcHJvbXB0cy1tY3Atc2VydmVyIl19fQ==
```

This will automatically configure the MCP server using `npx`. No API keys are required.

### Install from Source

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

## Adding Your Own System Prompts

You can add your own prompts by placing files in the `prompts/` directory. The server automatically discovers and exposes them as MCP tools.

**Supported formats:** `.txt`, `.md`, `.yaml`, `.yml`, `.json`

**Directory structure:**
- Directory names become the service name
- File names create tool variants
- Files are automatically classified as system prompts, tools, or summaries

**Example:**
```
prompts/My Service/
  ├── System Prompt.txt     → Tool: "my-service-system-prompt-system"
  └── tools.json            → Tool: "my-service-tools-tools"
```

After adding prompts, restart the MCP server. Use `list_prompts` to find your custom prompts or call them directly by their tool name.

To use a different directory, set the `PROMPT_LIBRARY_ROOT` environment variable.

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

Contributions welcome—feel free to adapt the discovery logic, add tests, or extend metadata inference for new prompt formats.

## Donate

If you find this project useful, consider supporting it with Bitcoin:

**⚡ Lightning Network**

<img src="https://raw.githubusercontent.com/bitcoinwarrior1/CitySats/main/public/lightning.jpeg" alt="Lightning QR Code" width="120" />

<code>lnbc1pjhhsqepp5mjgwnvg0z53shm22hfe9us289lnaqkwv8rn2s0rtekg5vvj56xnqdqqcqzzsxqyz5vqsp5gu6vh9hyp94c7t3tkpqrp2r059t4vrw7ps78a4n0a2u52678c7yq9qyyssq7zcferywka50wcy75skjfrdrk930cuyx24rg55cwfuzxs49rc9c53mpz6zug5y2544pt8y9jflnq0ltlha26ed846jh0y7n4gm8jd3qqaautqa</code>

**₿ On-Chain**

<img src="https://raw.githubusercontent.com/bitcoinwarrior1/CitySats/main/public/onchain.jpg" alt="Bitcoin Address QR Code" width="120" />

<code>[bc1ptzvr93pn959xq4et6sqzpfnkk2args22ewv5u2th4ps7hshfaqrshe0xtp](https://mempool.space/address/bc1ptzvr93pn959xq4et6sqzpfnkk2args22ewv5u2th4ps7hshfaqrshe0xtp)</code>

**Ξ Ethereum / EVM Networks**

<img src="https://raw.githubusercontent.com/bitcoinwarrior1/CitySats/main/public/ethereum.jpg" alt="Ethereum Address QR Code" width="120" />

<code>[0x42ea529282DDE0AA87B42d9E83316eb23FE62c3f](https://etherscan.io/address/0x42ea529282DDE0AA87B42d9E83316eb23FE62c3f)</code>

*Donations from any EVM-compatible network (Ethereum, Polygon, Arbitrum, Optimism, BSC, Avalanche, etc.) will work perfectly! You can also send tokens like USDT, USDC, DAI, and other ERC-20 tokens to this address.*
