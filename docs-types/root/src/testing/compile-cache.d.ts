/** Whether results are kept on disk: not with AMXTS_TEST_CACHE=0. */
export declare const cacheOn: boolean;
/** How often this process took a result from the disk, and made one. */
export declare const cacheCounts: {
    hits: number;
    misses: number;
};
/**
 * `run`'s value, from the disk when an earlier run made it from the same
 * sources, or made now and kept. `parts` is what it depends on besides the
 * files it reads: the entry, the flags. A value is JSON, with Uint8Arrays in
 * it; `keep` says whether a failure is worth keeping - a compile error is, a
 * file that could not be opened is not.
 */
export declare function cached<T>(parts: unknown[], run: () => Promise<T>, keep?: (value: T) => boolean): Promise<T>;
