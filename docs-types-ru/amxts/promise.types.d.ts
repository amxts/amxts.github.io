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

/** Статические методы, которые принимают список промисов: all, allSettled, race и any. */
declare namespace Promise {
	/**
	 * Ждёт все промисы и отдаёт их значения по порядку; отклоняется с первой
	 * же ошибкой. Промисы разных типов дают кортеж:
	 *
	 * ```ts
	 * const [response, count] = await Promise.all([fetch(url), countAsync()]);
	 * ```
	 */
	function all<T extends readonly unknown[] | []>(values: T): Promise<{ -readonly [P in keyof T]: __PromiseValue<T[P]> }>;

	/**
	 * Ждёт, пока завершатся все промисы, как бы ни завершились, и сообщает,
	 * как завершился каждый: `status` — "fulfilled" с `value` или
	 * "rejected" с `reason`.
	 */
	function allSettled<T extends readonly unknown[] | []>(values: T): Promise<{ -readonly [P in keyof T]: PromiseSettledResult<__PromiseValue<T[P]>> }>;

	/**
	 * Завершается так же, как первый завершившийся промис. Промисам разных
	 * типов нужен общий базовый класс; с Promise<void> среди них значение
	 * может быть null.
	 */
	function race<T extends readonly unknown[] | []>(values: T): Promise<__PromiseValue<T[number]>>;

	/**
	 * Отдаёт первое полученное значение; если отклонены все промисы —
	 * отклоняется с AggregateError, в `errors` которого все причины.
	 */
	function any<T extends readonly unknown[] | []>(values: T): Promise<__PromiseValue<T[number]>>;
}
