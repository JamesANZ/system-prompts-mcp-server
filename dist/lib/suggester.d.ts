import type { PromptDescriptor, PromptSelectionCriteria } from "../types.js";
/**
 * @title Rank Prompts
 * @notice Produces a sorted list of prompts scored against the caller's criteria.
 * @param descriptors Available prompt descriptors.
 * @param criteria Filters describing the desired persona.
 */
export declare function rankPrompts(descriptors: PromptDescriptor[], criteria: PromptSelectionCriteria): Array<{
    descriptor: PromptDescriptor;
    score: number;
}>;
/**
 * @title Find Best Prompt
 * @notice Returns the highest-scoring prompt, if any exceeds a minimum score.
 */
export declare function findBestPrompt(descriptors: PromptDescriptor[], criteria: PromptSelectionCriteria): {
    descriptor: PromptDescriptor;
    score: number;
} | undefined;
//# sourceMappingURL=suggester.d.ts.map