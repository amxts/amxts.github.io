/// <reference path="../as-types.d.ts" />
/** What platform() answers, as Node's names are. */
export type Platform = "win32" | "linux";
/** "win32" or "linux". */
export declare function platform(): Platform;
/** The end of a line on this system: "\r\n" on Windows, "\n" on Linux. */
export declare const EOL: string;
