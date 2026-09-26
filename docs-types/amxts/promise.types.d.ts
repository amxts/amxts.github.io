/// <reference path="../as-types.d.ts" />
// What the editor knows of Promise.all, allSettled, race and any: the
// signatures of TypeScript's own lib, which types a list written in place as
// a tuple - `Promise.all([fetch(url), sleep(1000)])` is a
// `Promise<[Response, void]>`.
//
// Only the editor reads this file. AssemblyScript has no tuple types and no
// mapped types to declare these with, so as/promise.ts leaves the four out of
// its Promise class and the compiler lowers each call to a hidden function
// there (Resolver.lowerPromiseCall in the compiler patch). A namespace of the
// same name merges these into that class, as statics.

/** The value a promise gives, or the value itself. */
type __PromiseValue<T> = T extends Promise<infer U> ? U : T;

/** The statics that take a list of promises: all, allSettled, race and any. */
declare namespace Promise {
	/**
	 * Waits for every promise and gives their values in order; rejects with the
	 * first rejection. Promises of different types give a tuple:
	 *
	 * ```ts
	 * const [response, count] = await Promise.all([fetch(url), countAsync()]);
	 * ```
	 */
	function all<T extends readonly unknown[] | []>(values: T): Promise<{ -readonly [P in keyof T]: __PromiseValue<T[P]> }>;

	/**
	 * Waits for every promise to settle, either way, and tells how each did:
	 * `status` is "fulfilled" with `value`, or "rejected" with `reason`.
	 */
	function allSettled<T extends readonly unknown[] | []>(values: T): Promise<{ -readonly [P in keyof T]: PromiseSettledResult<__PromiseValue<T[P]>> }>;

	/**
	 * Settles like the first promise to settle. Promises of different types
	 * need a common base class; a Promise<void> among them makes the value
	 * nullable.
	 */
	function race<T extends readonly unknown[] | []>(values: T): Promise<__PromiseValue<T[number]>>;

	/**
	 * Gives the first value to arrive; once all promises are rejected, rejects
	 * with an AggregateError whose `errors` hold every reason.
	 */
	function any<T extends readonly unknown[] | []>(values: T): Promise<__PromiseValue<T[number]>>;
}
