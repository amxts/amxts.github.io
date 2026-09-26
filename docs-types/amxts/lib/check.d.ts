/// <reference path="../../as-types.d.ts" />
import { Player } from "~/facade";
/**
 * Checks of one piece of the API on a live server. Each goes to the server
 * console with the tag, as `[tag] ok ...` or `[tag] FAIL ...`; the player
 * who ran them gets the total in chat.
 *
 * ```ts
 * const check = new Checks("api-async", player);
 * check.expect(player.gravity, "gravity").toBeCloseTo(0.5);
 * check.done();
 * ```
 */
export declare class Checks {
    /** The checks' tag: every log line starts with it, `[cvar]`. */
    tag: string;
    /** The player who ran the checks, if any: the total is printed to him too. */
    player?: Player | undefined;
    /** The number of checks passed so far. */
    passed: number;
    /** The number of checks failed so far. */
    failed: number;
    constructor(
    /** The checks' tag: every log line starts with it, `[cvar]`. */
    tag: string, 
    /** The player who ran the checks, if any: the total is printed to him too. */
    player?: Player | undefined);
    /** Starts a check of a value; `what` names it in the log: `check.expect(player.gravity, "gravity")`. */
    expect<T>(got: T, what?: string): Expectation<T>;
    /** Prints the total, to the log and to the player. */
    done(): void;
    /** @hidden */
    record(what: string, ok: boolean, got: string, expected: string): void;
}
/** One value under check, from `check.expect(...)`: `toBe` or `toBeCloseTo` logs the result. */
export declare class Expectation<T> {
    private checks;
    private got;
    private what;
    constructor(checks: Checks, got: T, what: string);
    /** Checks the value equals `expected`: the same number, text or boolean. */
    toBe(expected: T): void;
    /** Checks the number is within 0.001 of `expected`: a value the game stores comes back rounded (0.5 as 0.49999). */
    toBeCloseTo(expected: number): void;
}
