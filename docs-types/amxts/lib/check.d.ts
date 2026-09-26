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
    /** What the checks are about: every log line starts with it, `[cvar]`. */
    tag: string;
    /** Who ran the checks, when a player did: the total is printed to him too. */
    player?: Player | undefined;
    /** How many checks have passed so far. */
    passed: number;
    /** How many checks have failed so far. */
    failed: number;
    constructor(
    /** What the checks are about: every log line starts with it, `[cvar]`. */
    tag: string, 
    /** Who ran the checks, when a player did: the total is printed to him too. */
    player?: Player | undefined);
    /** What came back, and what it is, for the log. */
    expect<T>(got: T, what?: string): Expectation<T>;
    /** The total, in the log and to the player. */
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
    /** Equal: the same number, text or boolean. */
    toBe(expected: T): void;
    /** A number close enough - a float crosses as 32 bits and comes back rounded. */
    toBeCloseTo(expected: number): void;
}
