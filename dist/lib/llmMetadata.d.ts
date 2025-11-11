import type { LlmMetadata, PromptFlavor } from "../types.js";
/**
 * @title Infer Variant From Filename
 * @notice Coerces a prompt filename into a variant label, avoiding empty strings.
 * @param filename Target filename.
 * @param flavor Prompt flavor (summary/system/tools).
 */
export declare function inferVariantFromFilename(filename: string, flavor: PromptFlavor): string;
/**
 * @title Infer LLM Metadata
 * @notice Uses heuristics to guess the best-fitting LLM provider and model for a prompt.
 * @param service Service name derived from directory structure.
 * @param filename Prompt filename.
 * @param flavor Prompt flavor (summary/system/tools).
 */
export declare function inferLlmMetadata(service: string, filename: string, flavor: PromptFlavor): LlmMetadata | undefined;
/**
 * @title Normalize User LLM Name
 * @notice Cleans user-provided model identifiers prior to matching.
 * @param raw User supplied LLM label.
 */
export declare function normalizeUserLlmName(raw?: string): string | undefined;
/**
 * @title LLM Match Score
 * @notice Produces a fuzzy score describing how well metadata aligns with the user's model.
 * @param userLlm Normalised user model text.
 * @param metadata Metadata inferred for a prompt.
 */
export declare function llmMatchScore(userLlm: string | undefined, metadata?: LlmMetadata): number;
//# sourceMappingURL=llmMetadata.d.ts.map