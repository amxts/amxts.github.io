/// <reference path="../../as-types.d.ts" />
import { Player } from "~/facade";
export declare class Checks {
    tag: string;
    player?: Player | undefined;
    passed: number;
    failed: number;
    constructor(tag: string, player?: Player | undefined);
    /** What came back, and what it is, for the log. */
    expect<T>(got: T, what?: string): Expectation<T>;
    /** The total, in the log and to the player. */
    done(): void;
    /** @hidden */
    record(what: string, ok: boolean, got: string, expected: string): void;
}
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
