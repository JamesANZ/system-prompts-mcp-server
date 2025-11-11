/**
 * @title Slugify
 * @notice Normalises a string into a lowercase, hyphen-separated slug.
 */
export declare function slugify(input: string): string;
/**
 * @title Slugify With Limit
 * @notice Ensures slug values stay below a strict length while remaining unique via a hash suffix.
 * @param input Human-readable text to convert.
 * @param uniqueKey Stable key (e.g., file path) used when hashing long slugs.
 * @param maxLength Maximum allowed length for the slug (defaults to 60).
 */
export declare function slugifyWithLimit(input: string, uniqueKey: string, maxLength?: number): string;
/**
 * @title Title Case Conversion
 * @notice Converts slug/identifier text into human-friendly title case.
 */
export declare function toTitleCase(input: string): string;
//# sourceMappingURL=slug.d.ts.map