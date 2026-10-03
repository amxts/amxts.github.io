/** The branch of a tag's release line, when the tag starts one: v0.2.0 is 0.2.x. */
export declare function newLine(tag: string): string | null;
/** Cuts the line `tag` starts, at the tag's commit in `repo`; what it did, in words. */
export declare function cutLine(tag: string, repo: string, dryRun?: boolean): string;
