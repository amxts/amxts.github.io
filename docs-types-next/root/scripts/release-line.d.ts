/** A tag's release line, and whether the tag is a patch of it: v0.2.0 is 0.2.x, v0.2.1 a patch of it. */
export declare function lineOf(tag: string): {
    branch: string;
    patch: boolean;
} | null;
/** Cuts or brings up the line of `tag`, in `repo`; what it did, in words. */
export declare function releaseLine(tag: string, repo: string, dryRun?: boolean): string;
