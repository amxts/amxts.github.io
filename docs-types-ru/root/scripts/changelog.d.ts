/**
 * The section of a CHANGELOG.md for `version` - from its `## v<version>`
 * heading to the next `## ` - without the heading; null when it has none.
 */
export declare function changelogSection(changelog: string, version: string): string | null;
/** A repository's notes for `version`, from its CHANGELOG.md; null when it has none. */
export declare function releaseNotes(dir: string, version: string): string | null;
/** `## v<version>`, before the first section of a changelog - or the changelog it starts. */
export declare function prependSection(changelog: string | null, section: string): string;
