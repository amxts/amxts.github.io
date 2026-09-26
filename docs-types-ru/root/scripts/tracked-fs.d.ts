import type { PathLike, Stats } from 'node:fs';
/** What a compile read: `<op>\0<absolute path>` -> what it saw. */
export type Reads = Record<string, string>;
export declare function hashOf(data: string | Uint8Array): string;
export declare function readFileSync(path: PathLike, encoding: BufferEncoding): string;
export declare function readFileSync(path: PathLike): Buffer;
export declare function existsSync(path: PathLike): boolean;
export declare function statSync(path: PathLike): Stats;
export declare function readdirSync(path: PathLike): string[];
/** `run`, with every file read it makes - and anything else read meanwhile - noted. */
export declare function recordReads<T>(run: () => Promise<T>): Promise<{
    reads: Reads;
    result: PromiseSettledResult<T>;
}>;
/** Whether every read noted in `reads` would see today what it saw then. */
export declare function unchanged(reads: Reads): boolean;
