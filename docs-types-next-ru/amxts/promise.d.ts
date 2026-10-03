/// <reference path="../as-types.d.ts" />
/** A microtask: a reaction to a settled promise, or a coroutine to resume. */
declare class __Job {
    /** The coroutine to resume, when this is one; the host resumes it. */
    coroutine: i32;
    /** Which wait of that coroutine this resumes - a stale one is skipped. */
    wait: i32;
    run(): void;
}
/** Общая основа любого Promise, каким бы ни был тип значения; плагин пользуется Promise<T>. */
export declare class PromiseBase {
    /** @hidden */ __state: i32;
    /** @hidden settled with a value, not with nothing - an async listener's answer. */
    __hasValue: bool;
    /** @hidden */ __ref: Object | null;
    /** @hidden */ __bits: u64;
    /** @hidden */ __reason: Error | null;
    /** @hidden something reacts to a rejection: then, catch, await. */
    __handled: bool;
    /** @hidden */ __reactions: __Job[] | null;
    /** @hidden Settles with a reference - like the promise it is given, as in JavaScript, when it is one. */
    __resolveRef(ref: Object | null): void;
    /** @hidden */
    __fulfillRaw(ref: Object | null, bits: u64, hasValue: bool): void;
    /** @hidden settled with nothing: `return;`, resolve(). */
    __fulfillVoid(): void;
    /** @hidden */
    __reject(reason: Error): void;
    /** @hidden the same state as `other`, which has settled. */
    __settleLike(other: PromiseBase): void;
    /** @hidden whether its value is stored as a float's bits. */
    __isFloat(): bool;
    /** @hidden runs `job` once this settles - now, as a microtask, if it has. */
    __react(job: __Job): void;
    private __flush;
}
/** Всё, у чего есть `then`: тип, который `await` принимает в редакторе. В плагине `await` ждёт Promise. */
export interface PromiseLike<T> {
    /** Вызывает `onFulfilled` со значением, когда оно появится. */
    then(onFulfilled: (value: T) => void): void;
}
/** Значение, которого ещё нет: результат запроса, таймера, async-функции. */
export declare class Promise<T> extends PromiseBase {
    /**
     * Wraps a callback API: `executor` runs at once and is handed the two
     * functions that settle this promise, which the callbacks it sets up may
     * call later.
     *
     * ```ts
     * const later = new Promise<string>((resolve) => {
     *   setTimeout(() => resolve("done"), 1000);
     * });
     * ```
     */
    constructor(executor: (resolve: (value?: T) => void, reject: (reason: Error) => void) => void);
    /**
     * Вызывает `onFulfilled` со значением, когда оно появится; возвращённый
     * промис завершается тем, что вернёт `onFulfilled`. Отклонение переходит
     * в него как есть — или в `onRejected`, если он передан.
     */
    then<U = void>(onFulfilled: (value: T) => U, onRejected?: ((reason: Error) => U) | null): Promise<U>;
    /**
     * Вызывает `onRejected` с причиной, если промис отклонён. То, что он
     * вернёт, становится значением взамен — `readFile(path).catch(() => "")`, —
     * или ничего, если он только пишет в лог.
     */
    catch<R = void>(onRejected: (reason: Error) => R): Promise<T>;
    /** Вызывает `onFinally`, когда промис завершится, как бы ни завершился, и передаёт результат дальше. */
    finally(onFinally: () => void): Promise<T>;
    /** Промис, уже выполненный со значением `value`. */
    static resolve<T>(value: T): Promise<T>;
    /** Промис, уже отклонённый с причиной `reason`. */
    static reject<T = void>(reason: Error): Promise<T>;
    /** @hidden */
    __isFloat(): bool;
    /** @hidden the value, once fulfilled. */
    __value(): T;
    /** @hidden */
    __resolveWith(value: T): void;
}
/** @hidden a pending Promise<T>, made without an executor. */
export declare function __co_promise<T>(): Promise<T>;
/** @hidden fulfils `promise` from outside: what fetch and sleep settle with. */
export declare function __co_resolve<T>(promise: Promise<T>, value: T): void;
/** @hidden */
export declare function __co_reject(promise: PromiseBase, reason: Error): void;
/** Итог промиса — то, что Promise.allSettled даёт для каждого. */
export declare class PromiseSettledResult<T> {
    /** Итог промиса, либо `"fulfilled"`, либо `"rejected"`. */
    status: "fulfilled" | "rejected";
    /** Значение промиса, если он выполнен. */
    value: T;
    /** Причина отказа, если промис отклонён. */
    reason: Error;
    /** @hidden made by allSettled, field by field: the constructor never runs. */
    constructor(
    /** The promise's outcome, either `"fulfilled"` or `"rejected"`. */
    status: "fulfilled" | "rejected", 
    /** The promise's value, when fulfilled. */
    value: T, 
    /** The rejection's reason, when rejected. */
    reason: Error);
}
/** Ошибка, с которой отклоняется Promise.any, когда отклонены все промисы; их причины лежат в `errors`. */
export declare class AggregateError extends Error {
    /** Причины отказа каждого промиса, в том порядке, в каком промисы переданы. */
    errors: Error[];
    constructor(
    /** The reason each promise was rejected, in the order the promises were given. */
    errors: Error[], message?: string);
}
/**
 * @hidden A function object like `fn`, with `env` in its `_env`; the
 * collector follows `_env`. The function reads it back from __env.
 */
export declare function __co_bindEnv(fn: usize, env: Object): usize;
/** Событие, которое получает обработчик отмены. */
export declare class Event {
    /** Тип события; здесь он всегда `"abort"`. */
    type: string;
    constructor(
    /** The event's type; the only one here is `"abort"`. */
    type: string);
}
/** @hidden something the hood does when a signal aborts. */
export declare class __AbortWatch {
    run(reason: Error): void;
}
/** Сигнал бросить начатое: запрос, таймер, всё, что начал игрок. */
export declare class AbortSignal {
    private __aborted;
    private __reason;
    private __listeners;
    private __watches;
    /** `true`, если сигнал уже сработал. */
    get aborted(): bool;
    /** Причина отмены: Error с именем `"AbortError"`, если в `abort()` не передали свою. */
    get reason(): Error | null;
    /** Вызывает `listener`, когда сигнал срабатывает. */
    addEventListener(type: "abort", listener: (event: Event) => void): void;
    /** Убирает `listener`, переданный в `addEventListener`: он больше не вызывается. */
    removeEventListener(type: "abort", listener: (event: Event) => void): void;
    /** Сигнал, который сам срабатывает через `ms` с Error с именем `"TimeoutError"`. */
    static timeout(ms: number): AbortSignal;
    /** Сигнал, который уже сработал. */
    static abort(reason?: Error | null): AbortSignal;
    /** Сигнал, который срабатывает, как только сработает любой из `signals`. */
    static any(signals: AbortSignal[]): AbortSignal;
    /** @hidden */
    __abort(reason: Error): void;
    /** @hidden */
    __watch(watch: __AbortWatch): void;
    /** @hidden */
    __unwatch(watch: __AbortWatch): void;
}
/** Контроллер, который отменяет свой `signal` по команде: `controller.abort()`. */
export declare class AbortController {
    /** Сигнал контроллера: передайте его в fetch, sleep или куда угодно ещё, где принимают сигнал. */
    readonly signal: AbortSignal;
    /** Отменяет сигнал с причиной `reason` или с Error с именем `"AbortError"`. */
    abort(reason?: Error | null): void;
}
/**
 * @hidden watches up to two signals for an operation - the one it was given
 * and the one its coroutine runs under - and lets go of both when it ends.
 */
export declare class __AbortGuard {
    watch: __AbortWatch;
    private signals;
    constructor(watch: __AbortWatch, given: AbortSignal | null);
    private add;
    /** The reason if a signal has aborted already. */
    get aborted(): Error | null;
    release(): void;
}
/** @hidden the facade's sleep(): fulfilled after `ms`, rejected if a signal aborts first. */
export declare function __co_sleep(ms: f64, signal: AbortSignal | null): Promise<void>;
/** @hidden player.signal. */
export declare function __co_player_signal(id: i32): AbortSignal;
export {};
