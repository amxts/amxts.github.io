/** Moments and durations as files, commands and the editor write them. */
/** Seconds in `30d`, `12h`, `90m`, `45s`, `2w`; -1 for anything else. */
export declare function durationSeconds(text: string): number;
/** `2026-12-01`, `2026-12-01T00:00`, `2026-12-01T00:00:00Z` (UTC) as ms since 1970; 0 for empty or unreadable text. */
export declare function momentOf(text: string): number;
/** A moment as the file and the editor write it, `2026-12-01T00:00:00Z`; "" for 0. */
export declare function textOf(moment: number): string;
/** What is left of a moment, for the console: `29d 4h`, `3h 10m`, `5m`; "" for 0. */
export declare function leftOf(moment: number, now: number): string;
