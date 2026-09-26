/// <reference path="../as-types.d.ts" />
/** The operating system's name as platform() gives it, with Node's names: one of "win32", "linux". */
export type Platform = "win32" | "linux";
/** Returns the operating system the server runs on, either "win32" or "linux". */
export declare function platform(): Platform;
/** The line ending on this system, one of "\r\n" on Windows, "\n" on Linux. */
export declare const EOL: string;
