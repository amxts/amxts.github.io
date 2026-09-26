/// <reference path="../../as-types.d.ts" />
import { Player } from "~/facade";
/**
 * Проверки одной части API на живом сервере. Каждая пишется в консоль
 * сервера с тегом — `[tag] ok ...` или `[tag] FAIL ...`; игрок, который
 * их запустил, получает итог в чат.
 *
 * ```ts
 * const check = new Checks("api-async", player);
 * check.expect(player.gravity, "gravity").toBeCloseTo(0.5);
 * check.done();
 * ```
 */
export declare class Checks {
    /** О чём эти проверки: с него начинается каждая строка лога, `[cvar]`. */
    tag: string;
    /** Кто запустил проверки, если это игрок: итог выводится и ему. */
    player?: Player | undefined;
    /** Сколько проверок уже прошло. */
    passed: number;
    /** Сколько проверок уже провалилось. */
    failed: number;
    constructor(
    /** What the checks are about: every log line starts with it, `[cvar]`. */
    tag: string, 
    /** Who ran the checks, when a player did: the total is printed to him too. */
    player?: Player | undefined);
    /** То, что вернулось, и что это такое — для лога. */
    expect<T>(got: T, what?: string): Expectation<T>;
    /** Итог — в лог и игроку. */
    done(): void;
    /** @hidden Записывает одну проверку в лог и в итог. */
    record(what: string, ok: boolean, got: string, expected: string): void;
}
/** Одно проверяемое значение из `check.expect(...)`: `toBe` или `toBeCloseTo` пишут результат в лог. */
export declare class Expectation<T> {
    private checks;
    private got;
    private what;
    constructor(checks: Checks, got: T, what: string);
    /** Равно: то же число, текст или boolean. */
    toBe(expected: T): void;
    /** Достаточно близкое число: float передаётся как 32 бита и возвращается округлённым. */
    toBeCloseTo(expected: number): void;
}
