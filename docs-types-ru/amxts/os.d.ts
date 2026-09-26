/// <reference path="../as-types.d.ts" />
/** Что отвечает platform() — те же имена, что в Node. */
export type Platform = "win32" | "linux";
/** "win32" или "linux". */
export declare function platform(): Platform;
/** Конец строки в этой системе: "\r\n" на Windows, "\n" на Linux. */
export declare const EOL: string;
