/** The modules, each with the includes that declare its natives. */
export declare const MODULES: Record<string, string[]>;
/** Text in both languages; code is the same in both and is a plain string. */
type Words = string | {
    en: string;
    ru: string;
};
/**
 * Natives the API covers without a tooltip naming them: one native that is
 * many fields or events, and the ones an element covers beside the native its
 * tooltip names.
 */
export declare const API: Record<string, Words>;
/** Natives plain TypeScript or a library covers, one by one. */
export declare const PLAIN: Record<string, Words>;
export interface Native {
    name: string;
    module: string;
    include: string;
}
/** Every native of the modules, once, by the first include that declares it. */
export declare function natives(): Native[];
/** One native's way in amxts. */
export interface Way {
    kind: 'api' | 'plain' | 'none';
    /** What to write; for a native covered for one use, that use's element. */
    what?: Words;
    /** The use an element covers, as the tooltip names it: `get_user_info(id, "lang")`. */
    partly?: string;
}
/**
 * What each tooltip of the hand-written API names on its `Pawn:` line: a
 * native's name, or one use of it (`get_user_info(id, "lang")`) - each to the
 * element. A member's tooltip wins over its class's.
 */
export declare function tooltips(names: Set<string>): Promise<{
    whole: Map<string, Words>;
    partly: Map<string, {
        use: string;
        what: Words;
    }>;
}>;
/**
 * The way of every native. The hand tables come first: PLAIN where the
 * language is the answer, API where one native is many elements; then the
 * tooltips; then an include the language covers whole.
 */
export declare function coverage(): Promise<Map<Native, Way>>;
/** How many distinct plugins under the folders call each native, and how many plugins there are. */
export declare function usage(dirs: string[], names: Set<string>): {
    counts: Map<string, number>;
    plugins: number;
};
type Lang = 'en' | 'ru';
/** The "From Pawn" page in one language. */
export declare function page(ways: Map<Native, Way>, lang: Lang): string;
/** The internal table in one language. */
export declare function table(ways: Map<Native, Way>, counts: Map<string, number>, plugins: number, lang: Lang): string;
/** The pages as they should be, beside where they are. */
export declare function pages(): Promise<{
    path: string;
    text: string;
}[]>;
export {};
