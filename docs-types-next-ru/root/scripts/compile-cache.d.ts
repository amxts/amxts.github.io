/**
 * The compiler: the patched AssemblyScript (with its standard library inside
 * asc.js), its Binaryen, and every script of the hood a compile runs through -
 * `entries`, this file and what they import, read off their import lines.
 */
export declare function codeIdentity(entries: string[]): string;
/** The files codeIdentity hashes, sorted. */
export declare function codeFiles(entries: string[]): string[];
export interface DiskCache {
    /** Whether results are kept on disk: not without a folder. */
    on: boolean;
    /** How often this process took a result from the disk, and made one. */
    counts: {
        hits: number;
        misses: number;
    };
    /** What an earlier run made for `parts`, while every file it read is the same; else null. */
    find: <T>(parts: unknown[]) => T | null;
    /** `run`'s value, made now and kept for `parts` - unless `keep` says it is not worth keeping. */
    make: <T>(parts: unknown[], run: () => Promise<T>, keep?: (value: T) => boolean) => Promise<T>;
    /** find(), else make(). */
    cached: <T>(parts: unknown[], run: () => Promise<T>, keep?: (value: T) => boolean) => Promise<T>;
}
/**
 * A cache in `dir` (none when it is null: every compile is made). `parts` is
 * what a value depends on besides the files it reads: the entry, the flags. A
 * value is JSON, with Uint8Arrays in it. `ownIncludes` are includes the
 * compiles themselves put where includes are found - a deploy copies its
 * plugins' includes to the server - which no compile depends on.
 */
export declare function diskCache(dir: string | null, code: () => string, ownIncludes?: string[]): DiskCache;
