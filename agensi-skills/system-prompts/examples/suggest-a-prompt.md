# One suggestion

User: Which prompt should I start from for a coding assistant?

1. `get_prompt_suggestion` for a coding assistant.
2. If the tool needs a narrower filter, call `list_prompts` with `flavor` `system` and a small `limit`.
3. Return the recommended file name and the tool's summary. Do not dump the library.
