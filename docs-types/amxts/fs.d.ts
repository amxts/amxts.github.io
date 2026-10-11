/// <reference path="../as-types.d.ts" />
import "./promise";
/**
 * Reads a whole file as text; `null` when it cannot be opened.
 *
 * ```ts
 * const text = fs.readFileSync("addons/amxmodx/configs/myplugin.ini");
 * if (text == null) return;
 * ```
 *
 * The path is relative to the game folder (`cstrike/`), as for any AMX Mod X
 * plugin. The file is UTF-8; it is read whole, whatever its size.
 *
 * Pawn: `fopen`, `fread_blocks`
 */
export declare function readFileSync(path: string): string | null;
/**
 * Writes text, or bytes - a `Uint8Array` or an `ArrayBuffer` - to a file,
 * replacing what was there; `false` when it cannot be opened (a folder that
 * does not exist, for one). Bytes are not written past the game folder.
 *
 * ```ts
 * fs.writeFileSync("addons/amxmodx/data/last-map.txt", server.map);
 * fs.writeFileSync("maps/kz_map.bsp", await response.arrayBuffer());
 * ```
 *
 * Pawn: `fopen`, `fputs`
 */
export declare function writeFileSync<T extends string | Uint8Array | ArrayBuffer = string>(path: string, data: T): boolean;
/**
 * Adds text or bytes to the end of a file, making it if there is none; `false` when it cannot be opened.
 *
 * Pawn: `fopen(path, "a")`, `fputs`
 */
export declare function appendFileSync<T extends string | Uint8Array | ArrayBuffer = string>(path: string, data: T): boolean;
/**
 * Reads a whole file as bytes; `null` when it cannot be opened or the path
 * leaves the game folder.
 */
export declare function readBytesSync(path: string): Uint8Array | null;
/** `readBytesSync` as a promise, rejected when the file cannot be opened. */
export declare function readBytes(path: string): Promise<Uint8Array>;
/**
 * `true` when the file or folder exists.
 *
 * Pawn: `file_exists`, `dir_exists`
 */
export declare function existsSync(path: string): boolean;
/**
 * Lists the names in a folder, without `.` and `..`; `null` when there is no
 * such folder.
 *
 * ```ts
 * const maps = fs.readdirSync("maps");
 * ```
 *
 * Pawn: `open_dir`, `next_file`
 */
export declare function readdirSync(path: string): string[] | null;
/** The options of `mkdirSync`: `{ recursive: true }` makes the missing folders above too. */
export declare class MakeDirectoryOptions {
    /** `true` to make every missing folder on the way too; `false` by default. */
    recursive: boolean;
}
/**
 * Makes a folder; `false` when it cannot be made, or - without `recursive` -
 * when it is there already or its parent is not.
 *
 * ```ts
 * fs.mkdirSync("addons/amxmodx/data/stats", { recursive: true });
 * ```
 *
 * With `{ recursive: true }` every missing folder on the way is made, and a
 * folder that is already there is fine, as in Node.
 *
 * Pawn: `mkdir`
 */
export declare function mkdirSync(path: string, options?: MakeDirectoryOptions): boolean;
/** `mkdirSync` as a promise, rejected when the folder cannot be made. */
export declare function mkdir(path: string, options?: MakeDirectoryOptions): Promise<void>;
/**
 * `readFileSync` as a promise: it rejects with an `ENOENT` error when the file
 * cannot be opened, like Node's `fs.promises.readFile`.
 *
 * ```ts
 * const text = await fs.readFile("addons/amxmodx/configs/myplugin.ini");
 * ```
 */
export declare function readFile(path: string): Promise<string>;
/** `writeFileSync` as a promise, rejected when the file cannot be opened. */
export declare function writeFile<T extends string | Uint8Array | ArrayBuffer = string>(path: string, data: T): Promise<void>;
/** `appendFileSync` as a promise, rejected when the file cannot be opened. */
export declare function appendFile<T extends string | Uint8Array | ArrayBuffer = string>(path: string, data: T): Promise<void>;
/** `existsSync` as a promise. */
export declare function exists(path: string): Promise<boolean>;
/** `readdirSync` as a promise, rejected when there is no such folder. */
export declare function readdir(path: string): Promise<string[]>;
/**
 * Deletes a file; `false` when there is none or it cannot be deleted.
 *
 * Pawn: `delete_file`, `unlink`
 */
export declare function unlinkSync(path: string): boolean;
/**
 * Moves or renames a file: `fs.renameSync("addons/amxmodx/data/top.txt",
 * "addons/amxmodx/data/top.old")`; `false` when it cannot.
 *
 * Pawn: `rename_file`
 */
export declare function renameSync(from: string, to: string): boolean;
/**
 * Deletes an empty folder; `false` when there is none, it holds something or
 * it cannot be deleted.
 *
 * Pawn: `rmdir`
 */
export declare function rmdirSync(path: string): boolean;
/** A file's or a folder's facts from `statSync`, as Node's `fs.Stats`. */
export declare class Stats {
    /** The size in bytes; `0` for a folder. */
    readonly size: number;
    /** The moment it last changed. */
    readonly mtime: Date;
    private readonly folder;
    constructor(
    /** The size in bytes; `0` for a folder. */
    size: number, 
    /** The moment it last changed. */
    mtime: Date, folder: bool);
    /** Whether it is a file. */
    isFile(): boolean;
    /** Whether it is a folder. */
    isDirectory(): boolean;
}
/**
 * A file's or a folder's size and the moment it last changed; `null` when
 * there is none: `fs.statSync("addons/amxmodx/logs/error.log")?.size`.
 *
 * Pawn: `file_size`, `GetFileTime`
 */
export declare function statSync(path: string): Stats | null;
/** `unlinkSync` as a promise, rejected when the file cannot be deleted. */
export declare function unlink(path: string): Promise<void>;
/** `renameSync` as a promise, rejected when the file cannot be moved. */
export declare function rename(from: string, to: string): Promise<void>;
/** `rmdirSync` as a promise, rejected when the folder cannot be deleted. */
export declare function rmdir(path: string): Promise<void>;
/** `statSync` as a promise, rejected when there is no such file or folder. */
export declare function stat(path: string): Promise<Stats>;
/** A file of an archive, from `extract`: its path inside the archive and its bytes. */
export declare class ArchiveEntry {
    /** The path inside the archive, `/` between folders: `"maps/de_dust2.bsp"`. */
    readonly path: string;
    /** The file's bytes. */
    readonly data: Uint8Array;
    constructor(
    /** The path inside the archive, `/` between folders: `"maps/de_dust2.bsp"`. */
    path: string, 
    /** The file's bytes. */
    data: Uint8Array);
}
/**
 * The files of an archive, with their paths inside it; folders are not
 * listed. The archive's kind is read off its first bytes: a zip archive,
 * stored or deflated. Throws an `Error` for a kind it does not read - naming
 * the ones it does - an entry whose bytes do not check out, and a path that
 * would leave the folder it is unpacked into.
 *
 * ```ts
 * for (const entry of fs.extract(await response.arrayBuffer())) {
 * 	fs.writeFileSync(entry.path, entry.data);
 * }
 * ```
 */
export declare function extract<T extends Uint8Array | ArrayBuffer>(archive: T): ArchiveEntry[];
