/**
 * A Pawn value as a number, or null when it is not one.
 *
 * Every name that resolved earlier is substituted for its value first, so
 * `MAX_REGION_RANGE * ht_player` becomes `1024 * 3`. Tag casts (`any:x`,
 * `hooks_tables_e:ht_player`) are noise here and go. What is refused is
 * anything still carrying a name: emitting it would produce a file that does
 * not compile, and guessing would be worse.
 */
export declare function evaluate(raw: string, known: Map<string, number>): number | null;
