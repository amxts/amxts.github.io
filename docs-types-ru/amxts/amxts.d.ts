/// <reference path="../as-types.d.ts" />
// The globals a module file and amxts.config.ts use without an import:
// defineModule and defineConfig; and the types of a field's change the
// editor reads off Player, which the compiler has from the build.
//
// Only the editor reads this file. The build reads a module's definition from
// its source and evaluates amxts.config.ts with a defineConfig of its own
// (scripts/project.ts); asc never compiles either call.
import type { CommandOptions, ModuleOptions, Player, PlayerChangeEvent } from "./facade";

declare global {
	/** Имя модуля и ключ его настроек. */
	interface AmxtsModuleMeta {
		/** Имя пакета без scope, например `"menu-core"` для `@amxts/menu-core`. */
		name: string;
		/** Ключ настроек модуля в `amxts.config.ts`, например `"menus"`. */
		configKey?: string;
	}

	/** API модуля, каким плагины пользуются без импорта: пространство имён и его имя (`as`) или один из его экспортов под своим именем (`name`). */
	interface AmxtsModuleImport {
		/** Собственный пакет модуля, например `"@amxts/menu-core"`. */
		from: string;
		/** Имя, под которым его используют плагины, например `"menus"`: `menus.create(...)`. */
		as?: string;
		/** Один экспорт, которым плагины пользуются под его собственным именем, например `"semiclip"`: `semiclip.rule = ...`. */
		name?: string;
	}

	/** Описание модуля для `defineModule`: meta, модули, от которых он зависит, настройки, что он даёт плагинам, и setup. */
	interface AmxtsModule<T> {
		/** Имя модуля и его `configKey`. */
		meta: AmxtsModuleMeta;
		/** Пакеты модулей, от которых зависит этот, например `"@amxts/config-core"`. Они подключаются вместе с ним — в `amxts.config.ts` достаточно указать этот — и загружаются раньше. */
		requires?: string[];
		/** Настройки модуля по умолчанию: значения, если `amxts.config.ts` их не задаёт. */
		defaults?: T;
		/**
		 * API модуля, каким плагины пользуются без импорта, например `[{ from: "@amxts/menu-core", as: "menus" }]`:
		 * плагин пишет `menus.create(...)`, а сборка добавляет импорт только в
		 * этот плагин. `{ from, name }` вместо этого даёт один экспорт под его
		 * именем — объект, свойство которого плагин присваивает, как `semiclip.rule = ...`.
		 */
		imports?: AmxtsModuleImport[];
		/**
		 * Выполняется один раз, в плагине модуля, когда сервер его загружает.
		 * Получает `defaults`, поверх которых наложено то, что `amxts.config.ts`
		 * задаёт под `configKey`.
		 */
		setup?: (options: T) => void;
	}

	/** Автоимпорты проекта: `imports` в `amxts.config.ts`. */
	interface AmxtsImports {
		/** `false`: плагины импортируют всё сами. По умолчанию `true`. */
		autoImport?: boolean;
	}

	/** Настройки проекта, которые экспортирует `amxts.config.ts`: модули проекта и их настройки. */
	interface AmxtsConfig extends ModuleOptions {
		/** Пакеты модулей проекта по имени, например `"@amxts/menu-core"`. Сборка загружает каждый после тех, от которых он зависит. */
		modules?: string[];
		/** Папка с плагинами проекта; по умолчанию `"plugins"`. */
		pluginsDir?: string;
		/** Папка, куда сборка пишет файлы `.aot` и `plugins.ini`; по умолчанию `"dist"`. */
		outDir?: string;
		/**
		 * Для какого сервера проект, одно из `"rehlds"` (ReHLDS, ReGameDLL и ReAPI)
		 * или `"hlds"` (обычный HLDS); по умолчанию `"rehlds"`. Без сервера (`AMXTS_SERVER`)
		 * команда `amxts` скачивает include такого сервера в `.amxts/include`; с
		 * сервером сборка берёт его собственные.
		 */
		target?: "rehlds" | "hlds";
		/**
		 * Автоимпорты: сборка добавляет импорты того, что плагин использует без
		 * импорта, - API ядра и того, что дают модули. `{ autoImport: false }`
		 * выключает их; плагины импортируют всё сами.
		 */
		imports?: AmxtsImports;
		/**
		 * Модули, чьи нативы вызывают Pawn-плагины, по имени пакета, например
		 * `"@amxts/menu-core"`. Модуль, которым не пользуется ни один плагин
		 * проекта, в сборку не попадает; перечисленный здесь собирается всё равно.
		 */
		pawn?: string[];
	}

	/**
	 * Описывает модуль в его файле модуля:
	 *
	 * ```ts
	 * export default defineModule<MenuCoreOptions>({
	 *   meta: { name: "menu-core", configKey: "menus" },
	 *   requires: ["@amxts/config-core"],
	 *   defaults: { file: "menu" },
	 *   imports: [{ from: "@amxts/menu-core", as: "menus" }],
	 *   setup(options) { ... },
	 * });
	 * ```
	 */
	function defineModule<T = Record<string, never>>(definition: AmxtsModule<T>): AmxtsModule<T>;

	/**
	 * Описывает настройки проекта в `amxts.config.ts`:
	 *
	 * ```ts
	 * export default defineConfig({
	 *   modules: ["@amxts/config-core", "@amxts/menu-core"],
	 *   menus: { file: "myserver/menu" },
	 * });
	 * ```
	 */
	function defineConfig(config: AmxtsConfig): AmxtsConfig;
}

// A field's change, typed by the field. The compiler gives a listener with
// `{ field: "spawnProtected" }` the field's own event class (scripts/player-fields.ts);
// the editor reads the same types off the fields plugins declare on Player.

/** A field plugins added to `Player` - `"spawnProtected"` - or a member of an object field, `"glow.enabled"`. */
type PlayerFieldName = {
	[K in keyof Player & string]: Player[K] extends (...args: never[]) => unknown ? never
		: Player[K] extends readonly unknown[] ? K
			: Player[K] extends object ? K | `${K}.${keyof Player[K] & string}`
				: K
}[keyof Player & string];

/** The type of the field `F` names; `never` when it names none. */
type PlayerFieldValue<F extends string> = F extends `${infer O}.${infer M}`
	? O extends keyof Player ? (M extends keyof Player[O] ? Player[O][M] : never) : never
	: F extends keyof Player ? Player[F] : never;

// A command's arguments, typed. The build reads the type argument and the
// usage the same way (scripts/typed-commands.ts); the editor reads them here.

/** The names a usage requires: `<target>` in `"/kick <target> [reason]"`. */
type RequiredNames<U extends string> = U extends `${string}<${infer N}>${infer R}` ? N | RequiredNames<R> : never;

/** The names a usage may leave out: `[reason]`. */
type OptionalNames<U extends string> = U extends `${string}[${infer N}]${infer R}` ? N | OptionalNames<R> : never;

/** A usage's arguments, each text; any name for a usage made at run time, which the build reads. */
type UsageArgs<U extends string> = string extends U ? Record<string, string | undefined> : { [K in RequiredNames<U>]: string } & { [K in OptionalNames<U>]?: string };

/** A command's arguments: the type argument's, or else the usage's, as text. */
type CommandArgsOf<T, U extends string> = [T] extends [never] ? UsageArgs<U> : T;

declare module "./facade" {
	interface PlayerChangeEvent<F extends string = string> {
		/** Значение поля после изменения; с `{ field }` — типа этого поля. */
		readonly value: PlayerFieldValue<F>;
		/** Значение поля до изменения. */
		readonly previous: PlayerFieldValue<F>;
	}

	interface Server {
		/**
		 * Вызывает `listener` каждый раз, когда у игрока меняется поле `field`,
		 * которое плагины добавили в `Player`, например
		 * `{ field: "spawnProtected" }`: у `event.value` и `event.previous` тип
		 * этого поля.
		 */
		// oxlint-disable-next-line typescript/method-signature-style -- an overload, merged into the class's method
		addEventListener<F extends PlayerFieldName>(type: "playerChange", listener: (event: PlayerChangeEvent<F>) => void, options: { field: F }): void;
		/** Перестаёт вызывать обработчик, добавленный через `addEventListener`, — ту же функцию с тем же полем. */
		// oxlint-disable-next-line typescript/method-signature-style -- an overload, merged into the class's method
		removeEventListener<F extends PlayerFieldName>(type: "playerChange", listener: (event: PlayerChangeEvent<F>) => void, options: { field: F }): void;
		/**
		 * Добавляет команду, которую набирают игроки, по её использованию: имя,
		 * затем аргументы, `<name>` — обязательный, `[name]` — необязательный.
		 * Их типы — интерфейс, аргумент типа; без него каждый — текст.
		 *
		 * ```ts
		 * interface KickArgs {
		 *   target: Player;
		 *   reason?: string;
		 * }
		 *
		 * server.addCommand<KickArgs>("/kick <target> [reason]", ({ player, target, reason }) => {
		 *   target.kick(reason ?? `Kicked by ${player.name}`);
		 * }, { access: "kick" });
		 * server.addCommand("/hp", ({ player }) => print(player, `${player.health} HP`));
		 * ```
		 *
		 * Имя со `/` — команда чата, без него — команда консоли, а
		 * `"say <фраза>"` — фраза, написанная в чат. Аргумент `number`
		 * разбирается как число, `Player` находится по `#userid`, имени целиком
		 * или его части, `string` берётся как есть — последний забирает остаток
		 * строки. На слово, которое команда не принимает, игрок получает её
		 * использование, и обработчик не запускается.
		 *
		 * Pawn: `register_clcmd`
		 */
		// oxlint-disable-next-line typescript/method-signature-style -- the editor's signature of the class's method, which the build writes per call
		addCommand<T extends object = never, const U extends string = string>(usage: U, handler: (args: CommandArgsOf<T, U> & { player: Player }) => void, options?: CommandOptions): void;
		/**
		 * Добавляет команду консоли сервера — её набирают там, присылают по rcon
		 * или запускает другой плагин — по её использованию; аргументы читаются
		 * так же, как у команды игрока. Игрок её не набирает.
		 *
		 * ```ts
		 * interface ResetArgs {
		 *   what?: "scores" | "all";
		 * }
		 *
		 * server.addServerCommand<ResetArgs>("myplugin_reset [what]", ({ what }) => reset(what ?? "all"));
		 * ```
		 *
		 * Pawn: `register_srvcmd`
		 */
		// oxlint-disable-next-line typescript/method-signature-style -- the editor's signature of the class's method, which the build writes per call
		addServerCommand<T extends object = never, const U extends string = string>(usage: U, handler: (args: CommandArgsOf<T, U>) => void): void;
	}
}

export {};
