/// <reference path="../as-types.d.ts" />
declare function __co_host_entered(): i32;
declare function __co_host_spawn(fn: i32, args: usize, cells: i32, id: i32, buffer: usize): i32;
declare function __co_host_suspend(drop: i32): void;
declare function __co_host_wake(): void;
declare function __co_host_id(): i32;
declare function __co_host_task(secondsBits: i32, fn: i32, id: i32, repeat: i32): i32;
declare function __co_host_stop_task(id: i32): i32;
declare function __co_host_on(event: string, fn: i32, shape: i32): void;
declare const __CO_FINISHED: i32;
declare const __CO_PARKED: i32;
declare const __CO_TRAPPED: i32;
declare const __CO_DROPPED: i32;
/**
 * Bytes Asyncify may use to keep one parked coroutine: the locals of the
 * async function and of __await. A deep async function needs a few hundred;
 * running out is reported by the host rather than trapping silently.
 */
declare const __CO_BUFFER: i32;
/** A microtask: a reaction to a settled promise, or a coroutine to resume. */
declare class __Job {
    /** The coroutine to resume, when this is one; the host resumes it. */
    coroutine: i32;
    /** Which wait of that coroutine this resumes - a stale one is skipped. */
    wait: i32;
    run(): void;
}
declare const __jobs: (__Job | null)[];
declare let __jobHead: i32;
declare let __woken: boolean;
declare const __unhandled: PromiseBase[];
declare function __co_queue(job: __Job): void;
/** Tells the host there is work for when the plugin's stack is empty. */
declare function __co_wake_up(): void;
declare const __PENDING: i32;
declare const __FULFILLED: i32;
declare const __REJECTED: i32;
/**
 * What every Promise<T> is underneath, whatever T: its state, and its value
 * as raw storage - a reference, or the bits of a number - so the host and
 * the compiler can settle one without knowing T.
 */
declare class PromiseBase {
    /** @hidden */ __state: i32;
    /** @hidden settled with a value, not with nothing - an async listener's answer. */
    __hasValue: bool;
    /** @hidden */ __ref: Object | null;
    /** @hidden */ __bits: u64;
    /** @hidden */ __reason: Error | null;
    /** @hidden something reacts to a rejection: then, catch, await. */
    __handled: bool;
    /** @hidden */ __reactions: __Job[] | null;
    /** @hidden */
    __fulfillRaw(ref: Object | null, bits: u64, hasValue: bool): void;
    /** @hidden settled with nothing: `return;`, resolve(). */
    __fulfillVoid(): void;
    /** @hidden */
    __reject(reason: Error): void;
    /** @hidden the same state as `other`, which has settled. */
    __settleLike(other: PromiseBase): void;
    /** @hidden runs `job` once this settles - now, as a microtask, if it has. */
    __react(job: __Job): void;
    private __flush;
}
/**
 * What an editor's `await` looks for - anything with a `then`. Only the
 * editor reads it (TypeScript asks for the global); the compiler awaits a
 * Promise and nothing else.
 */
interface PromiseLike<T> {
    then(onFulfilled: (value: T) => void): void;
}
/** A value that is not there yet: the result of a request, a timer, an async function. */
declare class Promise<T> extends PromiseBase {
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
     * is the value instead - `readFile(path).catch(() => "")` - or nothing, when
     * it only logs.
     */
    catch<R = void>(onRejected: (reason: Error) => R): Promise<T>;
    /** Calls `onFinally` once this settles, either way, and passes the outcome on. */
    finally(onFinally: () => void): Promise<T>;
    /** A promise already fulfilled with `value`. */
    static resolve<T>(value: T): Promise<T>;
    /** A promise already rejected with `reason`. */
    static reject<T = void>(reason: Error): Promise<T>;
    /** @hidden the value, once fulfilled. */
    __value(): T;
    /** @hidden */
    __resolveWith(value: T): void;
}
/** @hidden a pending Promise<T>, made without an executor. */
declare function __co_promise<T>(): Promise<T>;
/** @hidden fulfils `promise` from outside: what fetch and sleep settle with. */
declare function __co_resolve<T>(promise: Promise<T>, value: T): void;
/** @hidden */
declare function __co_reject(promise: PromiseBase, reason: Error): void;
declare class __ThenJob<T, U> extends __Job {
    source: Promise<T>;
    target: Promise<U>;
    onFulfilled: (value: T) => U;
    onRejected: ((reason: Error) => U) | null;
    constructor(source: Promise<T>, target: Promise<U>, onFulfilled: (value: T) => U, onRejected: ((reason: Error) => U) | null);
    run(): void;
}
declare class __CatchJob<T, R> extends __Job {
    source: Promise<T>;
    target: Promise<T>;
    onRejected: (reason: Error) => R;
    constructor(source: Promise<T>, target: Promise<T>, onRejected: (reason: Error) => R);
    run(): void;
}
declare class __FinallyJob<T> extends __Job {
    source: Promise<T>;
    target: Promise<T>;
    onFinally: () => void;
    constructor(source: Promise<T>, target: Promise<T>, onFinally: () => void);
    run(): void;
}
declare class __AdoptJob extends __Job {
    source: PromiseBase;
    target: PromiseBase;
    constructor(source: PromiseBase, target: PromiseBase);
    run(): void;
}
declare class __AllState<T> {
    target: Promise<T[]>;
    results: T[];
    remaining: i32;
    constructor(target: Promise<T[]>, count: i32);
}
declare class __AllJob<T> extends __Job {
    state: __AllState<T>;
    source: Promise<T>;
    index: i32;
    constructor(state: __AllState<T>, source: Promise<T>, index: i32);
    run(): void;
}
/** @hidden Promise.all: every value, in order, once all are; rejected with the first rejection. */
declare function __co_all<T>(values: Promise<T>[]): Promise<T[]>;
/** How a promise settled: what Promise.allSettled gives for each. */
declare class PromiseSettledResult<T> {
    /** "fulfilled" or "rejected". */
    status: "fulfilled" | "rejected";
    /** The value, when fulfilled. */
    value: T;
    /** Why, when rejected. */
    reason: Error;
    /** @hidden made by allSettled, field by field: the constructor never runs. */
    constructor(
    /** "fulfilled" or "rejected". */
    status: "fulfilled" | "rejected", 
    /** The value, when fulfilled. */
    value: T, 
    /** Why, when rejected. */
    reason: Error);
}
/**
 * @hidden an object of class T with every field zero, its constructor not
 * run: a result or a tuple whose fields are filled in one by one.
 */
declare function __co_blank<T>(): T;
declare class __SettleJob<T> extends __Job {
    source: Promise<T>;
    target: Promise<PromiseSettledResult<T>>;
    constructor(source: Promise<T>, target: Promise<PromiseSettledResult<T>>);
    run(): void;
}
/** @hidden a promise always fulfilled, with how `promise` settled. */
declare function __co_settle<T>(promise: Promise<T>): Promise<PromiseSettledResult<T>>;
/** @hidden Promise.allSettled: how each settled, in order, once all have. */
declare function __co_allSettled<T>(values: Promise<T>[]): Promise<PromiseSettledResult<T>[]>;
declare class __RaceJob extends __Job {
    source: PromiseBase;
    target: PromiseBase;
    constructor(source: PromiseBase, target: PromiseBase);
    run(): void;
}
/**
 * @hidden Promise.race: settles like the first of `values` to settle. The
 * value is copied as it is stored, so T may be a base class of theirs, or
 * nullable where one of them is a Promise<void>.
 */
declare function __co_race<T>(values: PromiseBase[]): Promise<T>;
/** @hidden Promise.race of a list. */
declare function __co_raceList<T>(values: Promise<T>[]): Promise<T>;
/** What Promise.any is rejected with when every promise is: their reasons are in `errors`. */
declare class AggregateError extends Error {
    errors: Error[];
    constructor(errors: Error[], message?: string);
}
declare class __AnyState {
    target: PromiseBase;
    remaining: i32;
    errors: Error[];
    constructor(target: PromiseBase, count: i32);
}
declare class __AnyJob extends __Job {
    state: __AnyState;
    source: PromiseBase;
    index: i32;
    constructor(state: __AnyState, source: PromiseBase, index: i32);
    run(): void;
}
/** @hidden Promise.any: the first value; an AggregateError once every promise is rejected. */
declare function __co_any<T>(values: PromiseBase[]): Promise<T>;
/** @hidden Promise.any of a list. */
declare function __co_anyList<T>(values: Promise<T>[]): Promise<T>;
/** @hidden a tuple Promise.all fills in, one settled promise at a time. */
declare class __Tuple {
    __set(index: i32, source: PromiseBase): void;
}
declare class __TupleState {
    target: PromiseBase;
    tuple: __Tuple;
    remaining: i32;
    constructor(target: PromiseBase, tuple: __Tuple, remaining: i32);
}
declare class __TupleJob extends __Job {
    state: __TupleState;
    source: PromiseBase;
    index: i32;
    constructor(state: __TupleState, source: PromiseBase, index: i32);
    run(): void;
}
declare function __co_allOf(target: PromiseBase, tuple: __Tuple, sources: PromiseBase[]): void;
/** @hidden what Promise.all of 2 promises of different types gives. */
declare class __Tuple2<A, B> extends __Tuple {
    _0: A;
    _1: B;
    /** @hidden filled in by __set: the constructor never runs. */
    constructor(_0: A, _1: B);
    get length(): i32;
    __set(index: i32, source: PromiseBase): void;
}
/** @hidden what Promise.all of 3 promises of different types gives. */
declare class __Tuple3<A, B, C> extends __Tuple {
    _0: A;
    _1: B;
    _2: C;
    /** @hidden filled in by __set: the constructor never runs. */
    constructor(_0: A, _1: B, _2: C);
    get length(): i32;
    __set(index: i32, source: PromiseBase): void;
}
/** @hidden what Promise.all of 4 promises of different types gives. */
declare class __Tuple4<A, B, C, D> extends __Tuple {
    _0: A;
    _1: B;
    _2: C;
    _3: D;
    /** @hidden filled in by __set: the constructor never runs. */
    constructor(_0: A, _1: B, _2: C, _3: D);
    get length(): i32;
    __set(index: i32, source: PromiseBase): void;
}
/** @hidden what Promise.all of 5 promises of different types gives. */
declare class __Tuple5<A, B, C, D, E> extends __Tuple {
    _0: A;
    _1: B;
    _2: C;
    _3: D;
    _4: E;
    /** @hidden filled in by __set: the constructor never runs. */
    constructor(_0: A, _1: B, _2: C, _3: D, _4: E);
    get length(): i32;
    __set(index: i32, source: PromiseBase): void;
}
/** @hidden what Promise.all of 6 promises of different types gives. */
declare class __Tuple6<A, B, C, D, E, F> extends __Tuple {
    _0: A;
    _1: B;
    _2: C;
    _3: D;
    _4: E;
    _5: F;
    /** @hidden filled in by __set: the constructor never runs. */
    constructor(_0: A, _1: B, _2: C, _3: D, _4: E, _5: F);
    get length(): i32;
    __set(index: i32, source: PromiseBase): void;
}
/** @hidden what Promise.all of 7 promises of different types gives. */
declare class __Tuple7<A, B, C, D, E, F, G> extends __Tuple {
    _0: A;
    _1: B;
    _2: C;
    _3: D;
    _4: E;
    _5: F;
    _6: G;
    /** @hidden filled in by __set: the constructor never runs. */
    constructor(_0: A, _1: B, _2: C, _3: D, _4: E, _5: F, _6: G);
    get length(): i32;
    __set(index: i32, source: PromiseBase): void;
}
/** @hidden what Promise.all of 8 promises of different types gives. */
declare class __Tuple8<A, B, C, D, E, F, G, H> extends __Tuple {
    _0: A;
    _1: B;
    _2: C;
    _3: D;
    _4: E;
    _5: F;
    _6: G;
    _7: H;
    /** @hidden filled in by __set: the constructor never runs. */
    constructor(_0: A, _1: B, _2: C, _3: D, _4: E, _5: F, _6: G, _7: H);
    get length(): i32;
    __set(index: i32, source: PromiseBase): void;
}
/** @hidden Promise.all of 2 promises of different types. */
declare function __co_all2<A, B>(a: Promise<A>, b: Promise<B>): Promise<__Tuple2<A, B>>;
/** @hidden Promise.allSettled of 2 promises of different types. */
declare function __co_allSettled2<A, B>(a: Promise<A>, b: Promise<B>): Promise<__Tuple2<PromiseSettledResult<A>, PromiseSettledResult<B>>>;
/** @hidden Promise.all of 3 promises of different types. */
declare function __co_all3<A, B, C>(a: Promise<A>, b: Promise<B>, c: Promise<C>): Promise<__Tuple3<A, B, C>>;
/** @hidden Promise.allSettled of 3 promises of different types. */
declare function __co_allSettled3<A, B, C>(a: Promise<A>, b: Promise<B>, c: Promise<C>): Promise<__Tuple3<PromiseSettledResult<A>, PromiseSettledResult<B>, PromiseSettledResult<C>>>;
/** @hidden Promise.all of 4 promises of different types. */
declare function __co_all4<A, B, C, D>(a: Promise<A>, b: Promise<B>, c: Promise<C>, d: Promise<D>): Promise<__Tuple4<A, B, C, D>>;
/** @hidden Promise.allSettled of 4 promises of different types. */
declare function __co_allSettled4<A, B, C, D>(a: Promise<A>, b: Promise<B>, c: Promise<C>, d: Promise<D>): Promise<__Tuple4<PromiseSettledResult<A>, PromiseSettledResult<B>, PromiseSettledResult<C>, PromiseSettledResult<D>>>;
/** @hidden Promise.all of 5 promises of different types. */
declare function __co_all5<A, B, C, D, E>(a: Promise<A>, b: Promise<B>, c: Promise<C>, d: Promise<D>, e: Promise<E>): Promise<__Tuple5<A, B, C, D, E>>;
/** @hidden Promise.allSettled of 5 promises of different types. */
declare function __co_allSettled5<A, B, C, D, E>(a: Promise<A>, b: Promise<B>, c: Promise<C>, d: Promise<D>, e: Promise<E>): Promise<__Tuple5<PromiseSettledResult<A>, PromiseSettledResult<B>, PromiseSettledResult<C>, PromiseSettledResult<D>, PromiseSettledResult<E>>>;
/** @hidden Promise.all of 6 promises of different types. */
declare function __co_all6<A, B, C, D, E, F>(a: Promise<A>, b: Promise<B>, c: Promise<C>, d: Promise<D>, e: Promise<E>, f: Promise<F>): Promise<__Tuple6<A, B, C, D, E, F>>;
/** @hidden Promise.allSettled of 6 promises of different types. */
declare function __co_allSettled6<A, B, C, D, E, F>(a: Promise<A>, b: Promise<B>, c: Promise<C>, d: Promise<D>, e: Promise<E>, f: Promise<F>): Promise<__Tuple6<PromiseSettledResult<A>, PromiseSettledResult<B>, PromiseSettledResult<C>, PromiseSettledResult<D>, PromiseSettledResult<E>, PromiseSettledResult<F>>>;
/** @hidden Promise.all of 7 promises of different types. */
declare function __co_all7<A, B, C, D, E, F, G>(a: Promise<A>, b: Promise<B>, c: Promise<C>, d: Promise<D>, e: Promise<E>, f: Promise<F>, g: Promise<G>): Promise<__Tuple7<A, B, C, D, E, F, G>>;
/** @hidden Promise.allSettled of 7 promises of different types. */
declare function __co_allSettled7<A, B, C, D, E, F, G>(a: Promise<A>, b: Promise<B>, c: Promise<C>, d: Promise<D>, e: Promise<E>, f: Promise<F>, g: Promise<G>): Promise<__Tuple7<PromiseSettledResult<A>, PromiseSettledResult<B>, PromiseSettledResult<C>, PromiseSettledResult<D>, PromiseSettledResult<E>, PromiseSettledResult<F>, PromiseSettledResult<G>>>;
/** @hidden Promise.all of 8 promises of different types. */
declare function __co_all8<A, B, C, D, E, F, G, H>(a: Promise<A>, b: Promise<B>, c: Promise<C>, d: Promise<D>, e: Promise<E>, f: Promise<F>, g: Promise<G>, h: Promise<H>): Promise<__Tuple8<A, B, C, D, E, F, G, H>>;
/** @hidden Promise.allSettled of 8 promises of different types. */
declare function __co_allSettled8<A, B, C, D, E, F, G, H>(a: Promise<A>, b: Promise<B>, c: Promise<C>, d: Promise<D>, e: Promise<E>, f: Promise<F>, g: Promise<G>, h: Promise<H>): Promise<__Tuple8<PromiseSettledResult<A>, PromiseSettledResult<B>, PromiseSettledResult<C>, PromiseSettledResult<D>, PromiseSettledResult<E>, PromiseSettledResult<F>, PromiseSettledResult<G>, PromiseSettledResult<H>>>;
declare function __co_envPromise(): PromiseBase;
declare function __co_resolveI32(value?: i32): void;
declare function __co_resolveRef(value?: usize): void;
declare function __co_resolveI64(value?: i64): void;
declare function __co_resolveF32(value?: f32): void;
declare function __co_resolveF64(value?: f64): void;
declare function __co_rejectBound(reason: Error): void;
/**
 * @hidden A function object like `fn`, with `env` in its `_env`; the
 * collector follows `_env`. The function reads it back from __env.
 */
declare function __co_bindEnv(fn: usize, env: Object): usize;
declare function __co_resolver<T>(promise: Promise<T>): (value?: T) => void;
declare function __co_rejecter(promise: PromiseBase): (reason: Error) => void;
declare class __Coroutine {
    id: i32;
    promise: PromiseBase;
    /** Managed arguments of the call, which only its locals hold otherwise. */
    roots: Object[];
    /** Its shadow stack while parked, where the collector sees it. */
    stack: StaticArray<Object | null> | null;
    /** Asyncify's buffer: where the host unwinds its locals to. */
    buffer: usize;
    /** The player whose handler started it: its awaits end when they leave. */
    player: i32;
    /** The abort signal it runs under, once asked for. */
    signal: AbortSignal | null;
    /** Parked, waiting for a job to resume it. */
    parked: bool;
    /** Counts its waits, so a resume meant for an earlier one is dropped. */
    wait: i32;
    /** Why it is to give up at the next resume: its signal aborted. */
    abortReason: Error | null;
    watch: __CoroutineAbort | null;
    watched: AbortSignal | null;
    constructor(id: i32, promise: PromiseBase);
}
declare const __coroutines: Map<number, __Coroutine>;
declare const __running: __Coroutine[];
declare let __nextCoroutine: i32;
declare const __spawnArgs: StaticArray<number>;
declare const __keep: Object[];
/**
 * @hidden The player whose command or event is being handled, set by the
 * facade around the handler: a coroutine started there runs under that
 * player's signal.
 */
declare let __co_ambient_player: i32;
declare function __co_current(): __Coroutine;
/** @hidden whether the host is calling an async function as its coroutine right now. */
declare function __co_entered(): bool;
/** @hidden where an async function writes its arguments for the host. */
declare function __co_args(): usize;
/** @hidden a managed argument, held while the call lasts. */
declare function __co_keep(value: usize): void;
/** @hidden runs an async function's body as a coroutine - see the top of this file. */
declare function __co_spawn(fn: i32, cells: i32, promise: PromiseBase): void;
/** What a call into a coroutine came back with. */
declare function __co_after(co: __Coroutine, outcome: i32): void;
declare function __co_finish(co: __Coroutine): void;
declare function __co_settled(co: __Coroutine): usize;
/** @hidden `return;` in an async function. */
declare function __co_return_void(): usize;
/** @hidden `return value` in an async function, by how the value is carried. */
declare function __co_return_i32(value: i32): usize;
declare function __co_return_i64(value: i64): usize;
declare function __co_return_f64(value: f64): usize;
declare function __co_return_ref(value: usize): usize;
declare class __ResumeJob extends __Job {
    constructor(id: i32, wait: i32);
}
/** @hidden `await promise`: parks the coroutine until it settles, then gives back its value. */
declare function __await<T>(promise: Promise<T>): T;
declare function __co_wait(promise: PromiseBase): void;
/** The awaited promise was rejected, or the signal aborted: the coroutine rejects with it and ends here. */
declare function __co_giveUp(co: __Coroutine, reason: Error): void;
declare function __co_unwatch(co: __Coroutine): void;
/** The signal a coroutine runs under: its player's, while that player is on the server. */
declare function __co_signal(co: __Coroutine): AbortSignal | null;
/** @hidden the signal the running coroutine is under, for fetch and sleep. */
declare function __co_context(): AbortSignal | null;
/** @hidden the next job to run, run here, or the coroutine the host is to resume; 0 when none are left. */
declare function __co_next_job(): i32;
/** @hidden a resume has come back from the host. */
declare function __co_resumed(outcome: i32): void;
declare function __co_reportUnhandled(): void;
/** @hidden */
declare function __co_sp(): usize;
/** @hidden */
declare function __co_set_sp(sp: usize): void;
/** @hidden */
declare function __co_park(id: i32, lo: usize, hi: usize): void;
/** @hidden bytes of shadow stack a parked coroutine holds. */
declare function __co_parked(id: i32): usize;
/** @hidden */
declare function __co_unpark(id: i32, lo: usize): void;
/** What an abort listener is handed. */
declare class Event {
    type: string;
    constructor(type: string);
}
/** @hidden something the hood does when a signal aborts. */
declare class __AbortWatch {
    run(reason: Error): void;
}
/** Says when to give something up: a request, a timer, everything a player started. */
declare class AbortSignal {
    private __aborted;
    private __reason;
    private __listeners;
    private __watches;
    /** Whether it has aborted. */
    get aborted(): bool;
    /** Why: an Error named "AbortError" unless abort() was given one. */
    get reason(): Error | null;
    /** Calls `listener` when it aborts. */
    addEventListener(type: "abort", listener: (event: Event) => void): void;
    removeEventListener(type: "abort", listener: (event: Event) => void): void;
    /** A signal that aborts by itself after `ms`, with an Error named "TimeoutError". */
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
/** Aborts its `signal` on demand: `controller.abort()`. */
declare class AbortController {
    readonly signal: AbortSignal;
    /** Aborts the signal, with `reason` or an Error named "AbortError". */
    abort(reason?: Error | null): void;
}
/** @hidden an Error named as an abort: expected, never reported as unhandled. */
declare function __co_abortError(message: string): Error;
declare class __AnyAbort extends __AbortWatch {
    signal: AbortSignal;
    constructor(signal: AbortSignal);
    run(reason: Error): void;
}
declare class __CoroutineAbort extends __AbortWatch {
    id: i32;
    constructor(id: i32);
    run(reason: Error): void;
}
declare const __timeouts: Map<number, AbortSignal>;
declare function __co_timeoutFired(id: i32): void;
/**
 * @hidden watches up to two signals for an operation - the one it was given
 * and the one its coroutine runs under - and lets go of both when it ends.
 */
declare class __AbortGuard {
    watch: __AbortWatch;
    private signals;
    constructor(watch: __AbortWatch, given: AbortSignal | null);
    private add;
    /** The reason if a signal has aborted already. */
    get aborted(): Error | null;
    release(): void;
}
declare class __Sleep extends __AbortWatch {
    promise: Promise<void>;
    id: i32;
    guard: __AbortGuard | null;
    constructor(promise: Promise<void>, id: i32);
    run(reason: Error): void;
}
declare const __sleeps: Map<number, __Sleep>;
/** @hidden the facade's sleep(): fulfilled after `ms`, rejected if a signal aborts first. */
declare function __co_sleep(ms: f64, signal: AbortSignal | null): Promise<void>;
declare function __co_sleepFired(id: i32): void;
declare const __playerControllers: (AbortController | null)[];
declare let __playersWatched: boolean;
/** @hidden player.signal. */
declare function __co_player_signal(id: i32): AbortSignal;
declare function __co_playerLeft(id: i32, drop: i32, message: i32, unused: i32): void;
