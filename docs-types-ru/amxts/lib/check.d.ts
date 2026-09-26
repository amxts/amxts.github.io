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
    /** Тег проверок: с него начинается каждая строка лога, `[cvar]`. */
    tag: string;
    /** Игрок, запустивший проверки, если их запустил игрок: итог выводится и ему. */
    player?: Player | undefined;
    /** Число пройденных проверок. */
    passed: number;
    /** Число проваленных проверок. */
    failed: number;
    constructor(
    /** The checks' tag: every log line starts with it, `[cvar]`. */
    tag: string, 
    /** The player who ran the checks, if any: the total is printed to him too. */
    player?: Player | undefined);
    /** Начинает проверку значения; `what` — его имя в логе: `check.expect(player.gravity, "gravity")`. */
    expect<T>(got: T, what?: string): Expectation<T>;
    /** Выводит итог — в лог и игроку. */
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
    /** Проверяет, что значение равно `expected`: то же число, текст или boolean. */
    toBe(expected: T): void;
    /** Проверяет, что число отличается от `expected` меньше чем на 0.001: значение, которое хранит игра, возвращается округлённым (0.5 как 0.49999). */
    toBeCloseTo(expected: number): void;
}
