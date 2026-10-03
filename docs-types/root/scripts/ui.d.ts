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
/**
 * An error, printed as the user should see it: its first line, then the rest
 * of it - or its `hint`, what to do about it; the stack only with --debug.
 */
export declare function report(error: unknown): void;
