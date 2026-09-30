import type { ParsedInclude } from '../types';
/**
 * Evaluates a Pawn constant expression, or gives up.
 *
 * Only integer arithmetic a macro expansion leaves behind — `(1024 * 1)`,
 * `1<<3`, `BIT(2)|BIT(3)`. Division is deliberately excluded: Pawn's `/` on
 * cells is not JavaScript's, and a wrong number here is worse than none.
 * Anything with an unresolved identifier in it returns undefined, which stops
 * the enum's auto-increment rather than letting it invent a value.
 */
export declare function evalInt(expr: string): number | undefined;
export interface Macro {
    params: string[];
    body: string;
}
export declare class IncludeParser {
    private lines;
    private currentLine;
    private macros;
    constructor(content: string, macros?: Map<string, Macro>);
    /**
     * Function-like defines: `#define BIT(%0) (1<<(%0))`.
     * The table is shared across includes because BEGIN_FUNC_REGION is declared
     * in reapi.inc but used in reapi_gamedll_const.inc.
     */
    static collectMacrosFrom(content: string, into: Map<string, Macro>): Map<string, Macro>;
    /** Expands macro calls; nested calls resolve on a later round. */
    private expand;
    /** Reads a balanced `(a, b)` starting at `open`, splitting on top-level commas. */
    private readArgs;
    parse(): ParsedInclude;
    private extractDocs;
    private parseNative;
    private parseForward;
    private parseParameters;
    private splitParameters;
    private parseParameter;
    private parseDefine;
    private parseEnum;
    private parseEnumMember;
}
