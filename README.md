# 📝 System Prompts MCP Server

> **Access system prompts from AI tools in your workflow.** Browse and fetch prompts from Devin, Cursor, Claude, GPT, and more. Model-aware suggestions help you find the perfect prompt for your LLM.

An [MCP (Model Context Protocol)](https://modelcontextprotocol.io) server that exposes a collection of system prompts, summaries, and tool definitions from popular AI tools as MCP tools for AI coding environments like Cursor and Claude Desktop.

## Why Use System Prompts MCP?

- 🔍 **Automatic Discovery** – Every prompt in `prompts/` is automatically exposed as an MCP tool
- 🎯 **Model-Aware Suggestions** – Get prompt recommendations based on your LLM (Claude, GPT, Gemini, etc.)
- 📚 **Comprehensive Collection** – Access prompts from Devin, Cursor, Claude, GPT, and more
- 🚀 **Easy Setup** – One-click install in Cursor or simple manual setup
- 🔧 **Extensible** – Add your own prompts and they're automatically available

## Quick Start

Ready to explore system prompts? Install in seconds:

**Install in Cursor (Recommended):**

[🔗 Install in Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=system-prompts-mcp&config=eyJzeXN0ZW0tcHJvbXB0cy1tY3AiOnsiY29tbWFuZCI6Im5weCIsImFyZ3MiOlsiLXkiLCJzeXN0ZW0tcHJvbXB0cy1tY3Atc2VydmVyIl19fQ==)

**Or install manually:**

```bash
npm install -g system-prompts-mcp-server
# Or from source:
git clone https://github.com/JamesANZ/system-prompts-and-models-of-ai-tools.git
cd system-prompts-and-models-of-ai-tools && npm install && npm run build
```

## Features

### Core Tools
- **`list_prompts`** – Browse available prompts with filters (service, flavor, provider)
- **`get_prompt_suggestion`** – Get ranked prompt suggestions for your LLM and keywords
- **`<service>-<variant>-<flavor>`** – Direct access to any prompt (e.g., `cursor-agent-system`, `devin-summary`)

### Automatic Discovery
- Scans `prompts/` directory for `.txt`, `.md`, `.yaml`, `.yml`, `.json` files
- Each file becomes a dedicated MCP tool
- Infers metadata (service, variant, LLM family, persona hints)

### Persona Activation
- Each tool call includes a reminder for the model to embody the loaded prompt
- Helps models behave like the original service (Devin, Cursor, etc.)

## Installation

### Cursor (One-Click)

Click the install link above or use:

```
cursor://anysphere.cursor-deeplink/mcp/install?name=system-prompts-mcp&config=eyJzeXN0ZW0tcHJvbXB0cy1tY3AiOnsiY29tbWFuZCI6Im5weCIsImFyZ3MiOlsiLXkiLCJzeXN0ZW0tcHJvbXB0cy1tY3Atc2VydmVyIl19fQ==
```

### Manual Installation

**Requirements:** Node.js 18+ and npm

```bash
# Clone and build
git clone https://github.com/JamesANZ/system-prompts-and-models-of-ai-tools.git
cd system-prompts-and-models-of-ai-tools
npm install
npm run build

# Run server
npm start
```

### Claude Desktop

Add to `claude_desktop_config.json`:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "system-prompts-mcp": {
      "command": "node",
      "args": ["/absolute/path/to/system-prompts-and-models-of-ai-tools/dist/index.js"],
      "env": {
        "PROMPT_LIBRARY_ROOT": "/absolute/path/to/system-prompts-and-models-of-ai-tools/prompts"
      }
    }
  }
}
```

Restart Claude Desktop after configuration.

## Usage Examples

### List Available Prompts
Browse prompts with optional filters:

```json
{
  "tool": "list_prompts",
  "arguments": {
    "service": "cursor",
    "flavor": "system",
    "limit": 10
  }
}
```

### Get Prompt Suggestions
Find the best prompt for your LLM and use case:

```json
{
  "tool": "get_prompt_suggestion",
  "arguments": {
    "userLlm": "claude-3.5-sonnet",
    "keywords": ["code", "pair programming"]
  }
}
```

### Access a Specific Prompt
Call a prompt directly by its tool name:

```json
{
  "tool": "cursor-agent-system",
  "arguments": {}
}
```

Get structured metadata only:

```json
{
  "tool": "cursor-agent-system",
  "arguments": {
    "format": "json"
  }
}
```

## Adding Your Own Prompts

Add prompts by placing files in the `prompts/` directory:

**Supported formats:** `.txt`, `.md`, `.yaml`, `.yml`, `.json`

**Directory structure:**
```
prompts/My Service/
  ├── System Prompt.txt     → Tool: "my-service-system-prompt-system"
  └── tools.json            → Tool: "my-service-tools-tools"
```

- Directory names become the service name
- File names create tool variants
- Files are automatically classified as system prompts, tools, or summaries

After adding prompts, restart the MCP server. Use `list_prompts` to find your custom prompts.

**Custom directory:** Set `PROMPT_LIBRARY_ROOT` environment variable to use a different location.

## Use Cases

- **AI Tool Developers** – Reference and adapt prompts from successful AI tools
- **Researchers** – Study how different tools structure their system prompts
- **Developers** – Find the perfect prompt for your LLM and use case
- **Prompt Engineers** – Compare and learn from proven prompt patterns

## Technical Details

**Built with:** Node.js, TypeScript, MCP SDK  
**Dependencies:** `@modelcontextprotocol/sdk`, `zod`  
**Platforms:** macOS, Windows, Linux

**Environment Variables:**
- `PROMPT_LIBRARY_ROOT` (optional): Override prompt root directory (defaults to `prompts/`)

**Project Structure:**
- `src/` – TypeScript MCP server implementation
- `dist/` – Compiled JavaScript
- `prompts/` – Prompt library and original documentation

## Contributing

⭐ **If this project helps you, please star it on GitHub!** ⭐

Contributions welcome! Feel free to adapt the discovery logic, add tests, or extend metadata inference for new prompt formats.

## License

See the original repository for license information.

## Support

If you find this project useful, consider supporting it:

**⚡ Lightning Network**
```
lnbc1pjhhsqepp5mjgwnvg0z53shm22hfe9us289lnaqkwv8rn2s0rtekg5vvj56xnqdqqcqzzsxqyz5vqsp5gu6vh9hyp94c7t3tkpqrp2r059t4vrw7ps78a4n0a2u52678c7yq9qyyssq7zcferywka50wcy75skjfrdrk930cuyx24rg55cwfuzxs49rc9c53mpz6zug5y2544pt8y9jflnq0ltlha26ed846jh0y7n4gm8jd3qqaautqa
```

**₿ Bitcoin**: [bc1ptzvr93pn959xq4et6sqzpfnkk2args22ewv5u2th4ps7hshfaqrshe0xtp](https://mempool.space/address/bc1ptzvr93pn959xq4et6sqzpfnkk2args22ewv5u2th4ps7hshfaqrshe0xtp)

**Ξ Ethereum/EVM**: [0x42ea529282DDE0AA87B42d9E83316eb23FE62c3f](https://etherscan.io/address/0x42ea529282DDE0AA87B42d9E83316eb23FE62c3f)
