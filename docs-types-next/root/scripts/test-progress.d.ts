export declare const clock: (ms: number) => string;
export interface Progress {
    /** The items, longest first by the last run: an order to run them in when any will do. */
    longestFirst: () => string[];
    /** What the run does now, before or between the items: building, starting the server. */
    phase: (text: string) => void;
    start: (item: string) => void;
    /** A failure, printed now. */
    fail: (line: string) => void;
    /** The item's line; `ok` false prints FAIL. */
    end: (item: string, ok: boolean, summary: string) => void;
    /** The slowest items, and their times kept for the next run. */
    finish: () => void;
    failures: string[];
}
/** The progress of a run of `items`, `jobs` at once. */
export declare function testProgress(name: string, items: string[], jobs?: number): Progress;
