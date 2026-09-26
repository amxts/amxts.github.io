/// <reference path="../as-types.d.ts" />
// The globals a module file and amxts.config.ts use without an import, as
// nuxt.config.ts uses defineNuxtConfig: defineModule and defineConfig.
//
// Only the editor reads this file. The build reads a module's definition from
// its source and evaluates amxts.config.ts with a defineConfig of its own
// (scripts/project.ts); asc never compiles either call.
import type { ModuleOptions } from "./facade";

declare global {
	/** Кто такой модуль. */
	interface AmxtsModuleMeta {
		/** Имя пакета без scope: "menu-core" для @amxts/menu-core. */
		name: string;
		/** Ключ, под которым лежат его настройки в amxts.config.ts: "menus". */
		configKey?: string;
	}

	/** Что принимает `defineModule`: meta модуля, от чего он зависит, его настройки и setup. */
	interface AmxtsModule<T> {
		/** Кто такой модуль: его name и configKey. */
		meta: AmxtsModuleMeta;
		/** Пакеты модулей, которые тоже должны быть указаны в amxts.config.ts, — они загружаются раньше этого. */
		requires?: string[];
		/** Значение каждой настройки, если amxts.config.ts её не задаёт. */
		defaults?: T;
		/**
		 * Выполняется один раз, в плагине модуля, когда сервер его загружает, — с
		 * defaults, поверх которых наложено то, что amxts.config.ts задаёт под
		 * configKey.
		 */
		setup?: (options: T) => void;
	}

	/** Что экспортирует amxts.config.ts: модули, которые использует проект, и их настройки. */
	interface AmxtsConfig extends ModuleOptions {
		/** Пакеты модулей по имени: "@amxts/menu-core". Сборка загружает каждый после тех, от которых он зависит. */
		modules?: string[];
		/** Где лежат плагины проекта: "plugins". */
		pluginsDir?: string;
		/** Куда сборка пишет файлы .aot и plugins.ini: "dist". */
		outDir?: string;
	}

	/**
	 * Модуль, в его файле модуля:
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
	 * amxts.config.ts проекта:
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
