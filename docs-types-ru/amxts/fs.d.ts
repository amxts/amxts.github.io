/// <reference path="../as-types.d.ts" />
import "./promise";
/**
 * Читает весь файл как текст; null, если его не удалось открыть.
 *
 * ```ts
 * const text = fs.readFileSync("addons/amxmodx/configs/myplugin.ini");
 * if (text == null) return;
 * ```
 *
 * Путь считается от папки игры (cstrike/), как у любого плагина AMX Mod X.
 * Файл в UTF-8; он читается целиком, какого бы размера ни был.
 *
 * Pawn: `fopen`, `fread_blocks`
 */
export declare function readFileSync(path: string): string | null;
/**
 * Записывает текст в файл вместо того, что там было; false, если файл не
 * удалось открыть (например, такой папки нет).
 *
 * ```ts
 * fs.writeFileSync("addons/amxmodx/data/last-map.txt", server.map);
 * ```
 *
 * Pawn: `fopen`, `fputs`
 */
export declare function writeFileSync(path: string, data: string): boolean;
/**
 * Дописывает текст в конец файла, создавая его, если файла нет; false, если его не удалось открыть.
 *
 * Pawn: `fopen(path, "a")`, `fputs`
 */
export declare function appendFileSync(path: string, data: string): boolean;
/**
 * `true`, если такой файл или папка есть.
 *
 * Pawn: `file_exists`, `dir_exists`
 */
export declare function existsSync(path: string): boolean;
/**
 * Возвращает имена в папке, без `.` и `..`; null, если такой папки нет.
 *
 * ```ts
 * const maps = fs.readdirSync("maps");
 * ```
 *
 * Pawn: `open_dir`, `next_file`
 */
export declare function readdirSync(path: string): string[] | null;
/** Настройки mkdirSync: `{ recursive: true }` создаёт и недостающие папки выше. */
export declare class MakeDirectoryOptions {
    /** `true` — создать и все недостающие папки по пути; по умолчанию `false`. */
    recursive: boolean;
}
/**
 * Создаёт папку; false, если создать не удалось, или — без `recursive` —
 * если она уже есть или нет родительской.
 *
 * ```ts
 * fs.mkdirSync("addons/amxmodx/data/stats", { recursive: true });
 * ```
 *
 * С `{ recursive: true }` создаются все недостающие папки по пути, а уже
 * существующая папка — не ошибка, как в Node.
 *
 * Pawn: `mkdir`
 */
export declare function mkdirSync(path: string, options?: MakeDirectoryOptions): boolean;
/** mkdirSync в виде промиса; отклоняется, если папку не удалось создать. */
export declare function mkdir(path: string, options?: MakeDirectoryOptions): Promise<void>;
/**
 * readFileSync в виде промиса: если файл не удалось открыть, отклоняется с
 * ошибкой `ENOENT`, как `fs.promises.readFile` в Node.
 *
 * ```ts
 * const text = await fs.readFile("addons/amxmodx/configs/myplugin.ini");
 * ```
 */
export declare function readFile(path: string): Promise<string>;
/** writeFileSync в виде промиса; отклоняется, если файл не удалось открыть. */
export declare function writeFile(path: string, data: string): Promise<void>;
/** appendFileSync в виде промиса; отклоняется, если файл не удалось открыть. */
export declare function appendFile(path: string, data: string): Promise<void>;
/** existsSync в виде промиса. */
export declare function exists(path: string): Promise<boolean>;
/** readdirSync в виде промиса; отклоняется, если такой папки нет. */
export declare function readdir(path: string): Promise<string[]>;
