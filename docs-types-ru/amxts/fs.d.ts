/// <reference path="../as-types.d.ts" />
import "./promise";
/**
 * Читает весь файл как текст; `null`, если его не удалось открыть.
 *
 * ```ts
 * const text = fs.readFileSync("addons/amxmodx/configs/myplugin.ini");
 * if (text == null) return;
 * ```
 *
 * Путь считается от папки игры (`cstrike/`), как у любого плагина AMX Mod X.
 * Файл в UTF-8; он читается целиком, какого бы размера ни был.
 *
 * Pawn: `fopen`, `fread_blocks`
 */
export declare function readFileSync(path: string): string | null;
/**
 * Записывает текст или байты — `Uint8Array` или `ArrayBuffer` — в файл
 * вместо того, что там было; `false`, если файл не удалось открыть (например,
 * такой папки нет). Байты не пишутся за пределы папки игры.
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
 * Дописывает текст или байты в конец файла, создавая его, если файла нет; `false`, если его не удалось открыть.
 *
 * Pawn: `fopen(path, "a")`, `fputs`
 */
export declare function appendFileSync<T extends string | Uint8Array | ArrayBuffer = string>(path: string, data: T): boolean;
/**
 * Читает весь файл как байты; `null`, если его не удалось открыть или путь
 * ведёт за пределы папки игры.
 */
export declare function readBytesSync(path: string): Uint8Array | null;
/** `readBytesSync` в виде промиса; отклоняется, если файл не удалось открыть. */
export declare function readBytes(path: string): Promise<Uint8Array>;
/**
 * `true`, если такой файл или папка есть.
 *
 * Pawn: `file_exists`, `dir_exists`
 */
export declare function existsSync(path: string): boolean;
/**
 * Возвращает имена в папке, без `.` и `..`; `null`, если такой папки нет.
 *
 * ```ts
 * const maps = fs.readdirSync("maps");
 * ```
 *
 * Pawn: `open_dir`, `next_file`
 */
export declare function readdirSync(path: string): string[] | null;
/** Настройки `mkdirSync`: `{ recursive: true }` создаёт и недостающие папки выше. */
export declare class MakeDirectoryOptions {
    /** `true` — создать и все недостающие папки по пути; по умолчанию `false`. */
    recursive: boolean;
}
/**
 * Создаёт папку; `false`, если создать не удалось, или — без `recursive` —
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
/** `mkdirSync` в виде промиса; отклоняется, если папку не удалось создать. */
export declare function mkdir(path: string, options?: MakeDirectoryOptions): Promise<void>;
/**
 * `readFileSync` в виде промиса: если файл не удалось открыть, отклоняется с
 * ошибкой `ENOENT`, как `fs.promises.readFile` в Node.
 *
 * ```ts
 * const text = await fs.readFile("addons/amxmodx/configs/myplugin.ini");
 * ```
 */
export declare function readFile(path: string): Promise<string>;
/** `writeFileSync` в виде промиса; отклоняется, если файл не удалось открыть. */
export declare function writeFile<T extends string | Uint8Array | ArrayBuffer = string>(path: string, data: T): Promise<void>;
/** `appendFileSync` в виде промиса; отклоняется, если файл не удалось открыть. */
export declare function appendFile<T extends string | Uint8Array | ArrayBuffer = string>(path: string, data: T): Promise<void>;
/** `existsSync` в виде промиса. */
export declare function exists(path: string): Promise<boolean>;
/** `readdirSync` в виде промиса; отклоняется, если такой папки нет. */
export declare function readdir(path: string): Promise<string[]>;
/**
 * Удаляет файл; `false`, если его нет или его не удалось удалить.
 *
 * Pawn: `delete_file`, `unlink`
 */
export declare function unlinkSync(path: string): boolean;
/**
 * Перемещает или переименовывает файл: `fs.renameSync("addons/amxmodx/data/top.txt",
 * "addons/amxmodx/data/top.old")`; `false`, если не удалось.
 *
 * Pawn: `rename_file`
 */
export declare function renameSync(from: string, to: string): boolean;
/**
 * Удаляет пустую папку; `false`, если её нет, в ней что-то есть или её не
 * удалось удалить.
 *
 * Pawn: `rmdir`
 */
export declare function rmdirSync(path: string): boolean;
/** Сведения о файле или папке из `statSync`, как `fs.Stats` в Node. */
export declare class Stats {
    /** Размер в байтах; `0` для папки. */
    readonly size: number;
    /** Момент его последнего изменения. */
    readonly mtime: Date;
    private readonly folder;
    constructor(
    /** The size in bytes; `0` for a folder. */
    size: number, 
    /** The moment it last changed. */
    mtime: Date, folder: bool);
    /** Файл ли это. */
    isFile(): boolean;
    /** Папка ли это. */
    isDirectory(): boolean;
}
/**
 * Размер файла или папки и момент последнего изменения; `null`, если их нет:
 * `fs.statSync("addons/amxmodx/logs/error.log")?.size`.
 *
 * Pawn: `file_size`, `GetFileTime`
 */
export declare function statSync(path: string): Stats | null;
/** `unlinkSync` в виде промиса; отклоняется, если файл не удалось удалить. */
export declare function unlink(path: string): Promise<void>;
/** `renameSync` в виде промиса; отклоняется, если файл не удалось переместить. */
export declare function rename(from: string, to: string): Promise<void>;
/** `rmdirSync` в виде промиса; отклоняется, если папку не удалось удалить. */
export declare function rmdir(path: string): Promise<void>;
/** `statSync` в виде промиса; отклоняется, если такого файла или папки нет. */
export declare function stat(path: string): Promise<Stats>;
/** Файл архива из `extract`: его путь внутри архива и его байты. */
export declare class ArchiveEntry {
    /** Путь внутри архива, `/` между папками: `"maps/de_dust2.bsp"`. */
    readonly path: string;
    /** Байты файла. */
    readonly data: Uint8Array;
    constructor(
    /** The path inside the archive, `/` between folders: `"maps/de_dust2.bsp"`. */
    path: string, 
    /** The file's bytes. */
    data: Uint8Array);
}
/**
 * Файлы архива с их путями внутри него; папки не перечисляются. Вид архива
 * читается по его первым байтам: zip-архив, сохранённый как есть или сжатый
 * deflate. Бросает `Error` для вида, который не читает, — называя те, что
 * читает, — для файла, чьи байты не сходятся, и для пути, который ведёт за
 * пределы папки, куда архив распаковывается.
 *
 * ```ts
 * for (const entry of fs.extract(await response.arrayBuffer())) {
 * 	fs.writeFileSync(entry.path, entry.data);
 * }
 * ```
 */
export declare function extract<T extends Uint8Array | ArrayBuffer>(archive: T): ArchiveEntry[];
