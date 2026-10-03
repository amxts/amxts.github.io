/** The plugins folder - what `~/` means - and where the generated files live. */
export declare const PLUGINS_ROOT: string;
/** A hookchain as the fake fires it: which arguments are floats or text, and what it answers. */
export interface HookShape {
    /** reapi's short name: "take_damage". */
    kind: string;
    /** Zero-based arguments the event reads as floats. */
    floats: Set<number>;
    /** Zero-based arguments the event reads as text. */
    texts: Set<number>;
    /** The ATYPE_* the chain answers with, or -1 for a chain that answers nothing. */
    answer: number;
}
export interface Tables {
    /** Every `export const X: i32 = N` in as/constants.ts. */
    constants: Map<string, number>;
    /** The dispatcher's native ids (`NATIVE_x`) to names. */
    dispatched: Map<number, string>;
    /** A hookchain's number (hookIdOf) to its short name. */
    hookNames: Map<number, string>;
    /** A hookchain by its short name, or by its event name ("takeDamage"). */
    hooks: Map<string, HookShape>;
    /** Entvars and members read as floats, by constant value. */
    floatFields: Set<number>;
    /** Entvars and members that hold three floats. */
    vectorFields: Set<number>;
    /** Members read with an element index: m_rgpPlayerItems. */
    arrayFields: Set<number>;
}
export declare function tables(): Tables;
/** A constant's value by name, or an error naming it. */
export declare function constant(name: string): number;
