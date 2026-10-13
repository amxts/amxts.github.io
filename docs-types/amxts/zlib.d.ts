/// <reference path="../as-types.d.ts" />
import "./promise";
/**
 * Compresses into the gzip format, a `.gz` file's.
 *
 * ```ts
 * fs.writeFileSync("addons/amxmodx/data/run.rec.gz", zlib.gzipSync(recording));
 * ```
 */
export declare function gzipSync<T extends string | Uint8Array | ArrayBuffer>(data: T): Uint8Array;
/** Inflates gzip data; throws an `Error` when it is not whole gzip data, or comes to more than 64 MB. */
export declare function gunzipSync<T extends Uint8Array | ArrayBuffer>(data: T): Uint8Array;
/** Compresses into the zlib format: deflate data with zlib's header and checksum. */
export declare function deflateSync<T extends string | Uint8Array | ArrayBuffer>(data: T): Uint8Array;
/** Inflates zlib data; throws an `Error` when it is not whole zlib data, or comes to more than 64 MB. */
export declare function inflateSync<T extends Uint8Array | ArrayBuffer>(data: T): Uint8Array;
/** Compresses into raw deflate data, with no header around it, as a zip archive holds a file. */
export declare function deflateRawSync<T extends string | Uint8Array | ArrayBuffer>(data: T): Uint8Array;
/** Inflates raw deflate data; throws an `Error` when it is not whole deflate data, or comes to more than 64 MB. */
export declare function inflateRawSync<T extends Uint8Array | ArrayBuffer>(data: T): Uint8Array;
/**
 * `gzipSync` without holding the server: the work is done on the module's
 * worker thread, and the promise settles on a later frame.
 *
 * ```ts
 * await fs.writeFile("addons/amxmodx/data/run.rec.gz", await zlib.gzip(recording));
 * ```
 */
export declare function gzip<T extends string | Uint8Array | ArrayBuffer>(data: T): Promise<Uint8Array>;
/** `gunzipSync` on the module's worker thread; rejects with an `Error` when the data is not whole gzip data. */
export declare function gunzip<T extends Uint8Array | ArrayBuffer>(data: T): Promise<Uint8Array>;
/** `deflateSync` on the module's worker thread. */
export declare function deflate<T extends string | Uint8Array | ArrayBuffer>(data: T): Promise<Uint8Array>;
/** `inflateSync` on the module's worker thread; rejects with an `Error` when the data is not whole zlib data. */
export declare function inflate<T extends Uint8Array | ArrayBuffer>(data: T): Promise<Uint8Array>;
/** `deflateRawSync` on the module's worker thread. */
export declare function deflateRaw<T extends string | Uint8Array | ArrayBuffer>(data: T): Promise<Uint8Array>;
/** `inflateRawSync` on the module's worker thread; rejects with an `Error` when the data is not whole deflate data. */
export declare function inflateRaw<T extends Uint8Array | ArrayBuffer>(data: T): Promise<Uint8Array>;
