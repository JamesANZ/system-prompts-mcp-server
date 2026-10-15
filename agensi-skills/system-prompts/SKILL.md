---
name: system-prompts
description: Lists prompt files in the connected system-prompt library and suggests one for a service or task. Use when the user asks which system prompt to start from, or wants a prompt suggestion for a coding, documentation, or chat assistant. Do not paste the library into the conversation unless they ask for one suggestion.
---

# Prompt library lookup

The system-prompt MCP server must already be connected. If `list_prompts` is missing, stop and give the user the install block in README.md. Do not invent prompt text.

## Workflow

1. Call `list_prompts` to see what is installed. Filter with `service`, `flavor` (`summary`, `system`, or `tools`), or `provider` when the user named one. Keep `limit` at 25 unless they ask for more.
2. Call `get_prompt_suggestion` when they want one recommendation for an LLM or a task. Return that recommendation and the alternatives the tool listed.
3. Read [references/tools.md](references/tools.md) for the arguments. There are no other tools in this skill.

## Output

- The service, flavor, and provider filter you used
- The suggested file name and why the tool ranked it, using the tool's own summary
- The tool that produced it

## Boundaries

Suggest from the tool results. Do not claim a vendor published the text, and do not copy the whole library into the answer. One suggestion is enough unless they ask for the list.
