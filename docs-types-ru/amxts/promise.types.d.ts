/// <reference path="../as-types.d.ts" />
// The Promise globals as the editor reads them, and what it knows of
// Promise.all, allSettled, race and any.
//
// as/promise.ts is where the classes are; the compiler makes them global
// through `@global`. The editor treats every file with an import or an export
// as a module - a project's plugin without an import line too - so here they
// are made global for it: `Promise`, `AbortController`, `AbortSignal`,
// `Event`, and what the hood's other files call.
//
// The four statics are TypeScript's own lib signatures, which type a list
// written in place as a tuple - `Promise.all([fetch(url), sleep(1000)])` is a
// `Promise<[Response, void]>`. AssemblyScript has no tuple types and no
// mapped types to declare these with, so as/promise.ts leaves the four out of
// its Promise class and the compiler lowers each call to a hidden function
// there (Resolver.lowerPromiseCall in the compiler patch). A namespace of the
// same name merges them into the class, as statics.
//
// Only the editor reads this file.
import * as impl from "./promise";

declare global {
	/** The value a promise gives, or the value itself. */
	type __PromiseValue<T> = T extends impl.Promise<infer U> ? U : T;

	/** Значение, которое `await` даёт от промиса или обычного значения, — собственное имя TypeScript, которое ищут `await 5` и `for await`. */
	type Awaited<T> = __PromiseValue<T>;

	/** Статические методы, которые принимают список промисов: `all`, `allSettled`, `race` и `any`. */
	// oxlint-disable-next-line no-redeclare -- merged into the class below, as statics
	namespace Promise {
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
		 * как завершился каждый: `status` — `"fulfilled"` с `value` или
		 * `"rejected"` с `reason`.
		 */
		function allSettled<T extends readonly unknown[] | []>(values: T): Promise<{ -readonly [P in keyof T]: PromiseSettledResult<__PromiseValue<T[P]>> }>;

		/**
		 * Завершается так же, как первый завершившийся промис. Промисам разных
		 * типов нужен общий базовый класс; с Promise<void> среди них значение
		 * может быть `null`.
		 */
		function race<T extends readonly unknown[] | []>(values: T): Promise<__PromiseValue<T[number]>>;

		/**
		 * Отдаёт первое полученное значение; если отклонены все промисы —
		 * отклоняется с AggregateError, в `errors` которого все причины.
		 */
		function any<T extends readonly unknown[] | []>(values: T): Promise<__PromiseValue<T[number]>>;
	}

	// The class the namespace above merges its statics into.
	class Promise<T> extends impl.Promise<T> {}
	export import PromiseLike = impl.PromiseLike;
	export import PromiseBase = impl.PromiseBase;
	export import PromiseSettledResult = impl.PromiseSettledResult;
	export import AggregateError = impl.AggregateError;
	export import Event = impl.Event;
	export import AbortSignal = impl.AbortSignal;
	export import AbortController = impl.AbortController;

	// The hood's: what the facade and the libraries beside it call.
	export import __AbortWatch = impl.__AbortWatch;
	export import __AbortGuard = impl.__AbortGuard;
	export import __co_promise = impl.__co_promise;
	export import __co_resolve = impl.__co_resolve;
	export import __co_reject = impl.__co_reject;
	export import __co_bindEnv = impl.__co_bindEnv;
	export import __co_sleep = impl.__co_sleep;
	export import __co_player_signal = impl.__co_player_signal;
	/** @hidden The player whose command or event is being handled. */
	let __co_ambient_player: i32;
}
