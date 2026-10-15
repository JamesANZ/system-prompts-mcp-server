# System prompts

Lists files in the local prompt library and suggests one for a task. The skill zip does not contain the prompt files.

Review this listing before uploading it. `LICENSE.md` in this repository is the GPL, while `package.json` says ISC. The prompt files are other vendors' text. Agensi asks for work you have the right to sell. This skill only tells an agent how to call `list_prompts` and `get_prompt_suggestion`.

## Connect

```json
{
  "mcpServers": {
    "system-prompts-mcp": {
      "command": "npx",
      "args": ["-y", "system-prompts-mcp-server"]
    }
  }
}
```

## Package this listing

```bash
cd agensi-skills
zip -r system-prompts.zip system-prompts -x "*.DS_Store"
```

Upload `system-prompts.zip` only after the license review above. This repository does not submit the listing.
