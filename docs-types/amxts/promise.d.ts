/// <reference path="../as-types.d.ts" />
/** A microtask: a reaction to a settled promise, or a coroutine to resume. */
declare class __Job {
    /** The coroutine to resume, when this is one; the host resumes it. */
    coroutine: i32;
    /** Which wait of that coroutine this resumes - a stale one is skipped. */
    wait: i32;
    run(): void;
}
/** The base of every Promise, whatever its value's type; a plugin uses Promise<T>. */
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
/** Anything with a `then`: the type `await` takes in the editor. In a plugin, `await` a Promise. */
export interface PromiseLike<T> {
    /** Calls `onFulfilled` with the value once there is one. */
    then(onFulfilled: (value: T) => void): void;
}
/** A value that is not there yet: the result of a request, a timer, an async function. */
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
     * Calls `onFulfilled` with the value once there is one; the promise it
     * returns settles with what that returns. A rejection passes through to
     * it untouched, or to `onRejected` when there is one.
     */
    then<U = void>(onFulfilled: (value: T) => U, onRejected?: ((reason: Error) => U) | null): Promise<U>;
    /**
     * Calls `onRejected` with the reason if this is rejected. What it returns
     * is the value instead: `readFile(path).catch(() => "")` - or nothing, when
     * it only logs.
     */
    catch<R = void>(onRejected: (reason: Error) => R): Promise<T>;
    /** Calls `onFinally` once this settles, either way, and passes the outcome on. */
    finally(onFinally: () => void): Promise<T>;
    /** A promise already fulfilled with `value`. */
    static resolve<T>(value: T): Promise<T>;
    /** A promise already rejected with `reason`. */
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
/** A promise's outcome, as Promise.allSettled gives it for each. */
export declare class PromiseSettledResult<T> {
    /** The promise's outcome, either `"fulfilled"` or `"rejected"`. */
    status: "fulfilled" | "rejected";
    /** The promise's value, when fulfilled. */
    value: T;
    /** The rejection's reason, when rejected. */
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
/** The error Promise.any rejects with when every promise is rejected; their reasons are in `errors`. */
export declare class AggregateError extends Error {
    /** The reason each promise was rejected, in the order the promises were given. */
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
/** The event an abort listener gets. */
export declare class Event {
    /** The event's type; the only one here is `"abort"`. */
    type: string;
    constructor(
    /** The event's type; the only one here is `"abort"`. */
    type: string);
}
/** @hidden something the hood does when a signal aborts. */
export declare class __AbortWatch {
    run(reason: Error): void;
}
/** A signal to give something up: a request, a timer, everything a player started. */
export declare class AbortSignal {
    private __aborted;
    private __reason;
    private __listeners;
    private __watches;
    /** `true` once the signal has aborted. */
    get aborted(): bool;
    /** The abort's reason: an Error named `"AbortError"` unless `abort()` was given one. */
    get reason(): Error | null;
    /** Calls `listener` when the signal aborts. */
    addEventListener(type: "abort", listener: (event: Event) => void): void;
    /** Takes back a `listener` given to `addEventListener`: it is not called any more. */
    removeEventListener(type: "abort", listener: (event: Event) => void): void;
    /** A signal that aborts by itself after `ms`, with an Error named `"TimeoutError"`. */
    static timeout(ms: number): AbortSignal;
    /** A signal that has aborted already. */
    static abort(reason?: Error | null): AbortSignal;
    /** A signal that aborts when any of `signals` does. */
    static any(signals: AbortSignal[]): AbortSignal;
    /** @hidden */
    __abort(reason: Error): void;
    /** @hidden */
    __watch(watch: __AbortWatch): void;
    /** @hidden */
    __unwatch(watch: __AbortWatch): void;
}
/** A controller that aborts its `signal` on demand: `controller.abort()`. */
export declare class AbortController {
    /** The controller's signal: hand it to fetch, sleep or anything else that takes one. */
    readonly signal: AbortSignal;
    /** Aborts the signal, with `reason` or an Error named `"AbortError"`. */
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
