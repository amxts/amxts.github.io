export declare const c: {
    bold: (text: unknown) => string;
    dim: (text: unknown) => string;
    red: (text: unknown) => string;
    green: (text: unknown) => string;
    yellow: (text: unknown) => string;
    blue: (text: unknown) => string;
    magenta: (text: unknown) => string;
    cyan: (text: unknown) => string;
    gray: (text: unknown) => string;
};
export declare const debug: () => boolean;
export declare const log: {
    info: (text: string) => void;
    success: (text: string) => void;
    warn: (text: string) => void;
    step: (text: string) => void;
    error: (text: string) => boolean;
    hint: (text: string) => boolean;
};
/** Seconds since `started` (a `performance.now()`), as a report shows them: `3.1s`. */
export declare function since(started: number): string;
/** Whether a line is rewritten in place: a terminal, not CI's log. */
export declare const live: boolean;
/**
 * A step that takes a while, said as it starts - `◇ compiling hello` - and
 * ended with the line that says it is done, or with none when an error says
 * it instead. In a terminal the step's line is rewritten by its end; in a log
 * (CI, a pipe) the start is a line of its own.
 */
export declare function progress(text: string): {
    end(done?: string): void;
};
/**
 * An error, printed as the user should see it: its first line, then the rest
 * of it - or its `hint`, what to do about it; the stack only with --debug.
 */
export declare function report(error: unknown): void;
