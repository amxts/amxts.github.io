/// <reference path="../as-types.d.ts" />
// The globals a module file and amxts.config.ts use without an import, as
// nuxt.config.ts uses defineNuxtConfig: defineModule and defineConfig.
//
// Only the editor reads this file. The build reads a module's definition from
// its source and evaluates amxts.config.ts with a defineConfig of its own
// (scripts/project.ts); asc never compiles either call.
import type { ModuleOptions } from "./facade";

declare global {
	/** Имя модуля и ключ его настроек. */
	interface AmxtsModuleMeta {
		/** Имя пакета без scope, например "menu-core" для @amxts/menu-core. */
		name: string;
		/** Ключ настроек модуля в amxts.config.ts, например "menus". */
		configKey?: string;
	}

	/** Описание модуля для `defineModule`: meta, модули, от которых он зависит, настройки и setup. */
	interface AmxtsModule<T> {
		/** Имя модуля и его configKey. */
		meta: AmxtsModuleMeta;
		/** Пакеты модулей, от которых зависит этот, например "@amxts/config-core". Они тоже должны быть в amxts.config.ts и загружаются раньше. */
		requires?: string[];
		/** Настройки модуля по умолчанию: значения, если amxts.config.ts их не задаёт. */
		defaults?: T;
		/**
		 * Выполняется один раз, в плагине модуля, когда сервер его загружает.
		 * Получает defaults, поверх которых наложено то, что amxts.config.ts
		 * задаёт под configKey.
		 */
		setup?: (options: T) => void;
	}

	/** Настройки проекта, которые экспортирует amxts.config.ts: модули проекта и их настройки. */
	interface AmxtsConfig extends ModuleOptions {
		/** Пакеты модулей проекта по имени, например "@amxts/menu-core". Сборка загружает каждый после тех, от которых он зависит. */
		modules?: string[];
		/** Папка с плагинами проекта; по умолчанию "plugins". */
		pluginsDir?: string;
		/** Папка, куда сборка пишет файлы .aot и plugins.ini; по умолчанию "dist". */
		outDir?: string;
	}

	/**
	 * Описывает модуль в его файле модуля:
	 *
	 * ```ts
	 * export default defineModule<MenuCoreOptions>({
	 *   meta: { name: "menu-core", configKey: "menus" },
	 *   requires: ["@amxts/config-core"],
	 *   defaults: { file: "menu" },
	 *   setup(options) { ... },
	 * });
	 * ```
	 */
	function defineModule<T = Record<string, never>>(definition: AmxtsModule<T>): AmxtsModule<T>;

	/**
	 * Описывает настройки проекта в amxts.config.ts:
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

export {};
