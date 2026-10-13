/// <reference path="../as-types.d.ts" />
import "./promise";
/**
 * Сжимает в формат gzip — формат файла `.gz`.
 *
 * ```ts
 * fs.writeFileSync("addons/amxmodx/data/run.rec.gz", zlib.gzipSync(recording));
 * ```
 */
export declare function gzipSync<T extends string | Uint8Array | ArrayBuffer>(data: T): Uint8Array;
/** Распаковывает данные gzip; бросает `Error`, если это не целые данные gzip или они дают больше 64 МБ. */
export declare function gunzipSync<T extends Uint8Array | ArrayBuffer>(data: T): Uint8Array;
/** Сжимает в формат zlib: данные deflate с заголовком и контрольной суммой zlib. */
export declare function deflateSync<T extends string | Uint8Array | ArrayBuffer>(data: T): Uint8Array;
/** Распаковывает данные zlib; бросает `Error`, если это не целые данные zlib или они дают больше 64 МБ. */
export declare function inflateSync<T extends Uint8Array | ArrayBuffer>(data: T): Uint8Array;
/** Сжимает в голые данные deflate, без заголовка, — так файл лежит в zip-архиве. */
export declare function deflateRawSync<T extends string | Uint8Array | ArrayBuffer>(data: T): Uint8Array;
/** Распаковывает голые данные deflate; бросает `Error`, если это не целые данные deflate или они дают больше 64 МБ. */
export declare function inflateRawSync<T extends Uint8Array | ArrayBuffer>(data: T): Uint8Array;
/**
 * `gzipSync` без задержки сервера: работа идёт в рабочем потоке модуля, а
 * промис выполняется на одном из следующих кадров.
 *
 * ```ts
 * await fs.writeFile("addons/amxmodx/data/run.rec.gz", await zlib.gzip(recording));
 * ```
 */
export declare function gzip<T extends string | Uint8Array | ArrayBuffer>(data: T): Promise<Uint8Array>;
/** `gunzipSync` в рабочем потоке модуля; отклоняется с `Error`, если это не целые данные gzip. */
export declare function gunzip<T extends Uint8Array | ArrayBuffer>(data: T): Promise<Uint8Array>;
/** `deflateSync` в рабочем потоке модуля. */
export declare function deflate<T extends string | Uint8Array | ArrayBuffer>(data: T): Promise<Uint8Array>;
/** `inflateSync` в рабочем потоке модуля; отклоняется с `Error`, если это не целые данные zlib. */
export declare function inflate<T extends Uint8Array | ArrayBuffer>(data: T): Promise<Uint8Array>;
/** `deflateRawSync` в рабочем потоке модуля. */
export declare function deflateRaw<T extends string | Uint8Array | ArrayBuffer>(data: T): Promise<Uint8Array>;
/** `inflateRawSync` в рабочем потоке модуля; отклоняется с `Error`, если это не целые данные deflate. */
export declare function inflateRaw<T extends Uint8Array | ArrayBuffer>(data: T): Promise<Uint8Array>;
