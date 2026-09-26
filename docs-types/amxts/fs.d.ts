/// <reference path="../as-types.d.ts" />
import "./promise";
/**
 * Reads a whole file as text; null when it cannot be opened.
 *
 * ```ts
 * const text = fs.readFileSync("addons/amxmodx/configs/myplugin.ini");
 * if (text == null) return;
 * ```
 *
 * The path is relative to the game folder (cstrike/), as for any AMX Mod X
 * plugin. The file is UTF-8; it is read whole, whatever its size.
 *
 * Pawn: `fopen`, `fread_blocks`
 */
export declare function readFileSync(path: string): string | null;
/**
 * Writes text to a file, replacing what was there; false when it cannot be
 * opened (a folder that does not exist, for one).
 *
 * ```ts
 * fs.writeFileSync("addons/amxmodx/data/last-map.txt", server.map);
 * ```
 *
 * Pawn: `fopen`, `fputs`
 */
export declare function writeFileSync(path: string, data: string): boolean;
/**
 * Adds text to the end of a file, making it if there is none; false when it cannot be opened.
 *
 * Pawn: `fopen(path, "a")`, `fputs`
 */
export declare function appendFileSync(path: string, data: string): boolean;
/**
 * `true` when the file or folder exists.
 *
 * Pawn: `file_exists`, `dir_exists`
 */
export declare function existsSync(path: string): boolean;
/**
 * Lists the names in a folder, without `.` and `..`; null when there is no
 * such folder.
 *
 * ```ts
 * const maps = fs.readdirSync("maps");
 * ```
 *
 * Pawn: `open_dir`, `next_file`
 */
export declare function readdirSync(path: string): string[] | null;
/** The options of mkdirSync: `{ recursive: true }` makes the missing folders above too. */
export declare class MakeDirectoryOptions {
    /** `true` to make every missing folder on the way too; `false` by default. */
    recursive: boolean;
}
/**
 * Makes a folder; false when it cannot be made, or - without `recursive` -
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
/** mkdirSync as a promise, rejected when the folder cannot be made. */
export declare function mkdir(path: string, options?: MakeDirectoryOptions): Promise<void>;
/**
 * readFileSync as a promise: it rejects with an `ENOENT` error when the file
 * cannot be opened, like Node's `fs.promises.readFile`.
 *
 * ```ts
 * const text = await fs.readFile("addons/amxmodx/configs/myplugin.ini");
 * ```
 */
export declare function readFile(path: string): Promise<string>;
/** writeFileSync as a promise, rejected when the file cannot be opened. */
export declare function writeFile(path: string, data: string): Promise<void>;
/** appendFileSync as a promise, rejected when the file cannot be opened. */
export declare function appendFile(path: string, data: string): Promise<void>;
/** existsSync as a promise. */
export declare function exists(path: string): Promise<boolean>;
/** readdirSync as a promise, rejected when there is no such folder. */
export declare function readdir(path: string): Promise<string[]>;
