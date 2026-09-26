/// <reference path="../as-types.d.ts" />
/** Имя операционной системы, как его даёт platform(), — те же имена, что в Node: одно из "win32", "linux". */
export type Platform = "win32" | "linux";
/** Возвращает операционную систему сервера, либо "win32", либо "linux". */
export declare function platform(): Platform;
/** Конец строки в этой системе, одно из: "\r\n" на Windows, "\n" на Linux. */
export declare const EOL: string;
