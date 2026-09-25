/// <reference path="../as-types.d.ts" />
// The globals a module file and amxts.config.ts use without an import, as
// nuxt.config.ts uses defineNuxtConfig: defineModule and defineConfig.
//
// Only the editor reads this file. The build reads a module's definition from
// its source and evaluates amxts.config.ts with a defineConfig of its own
// (scripts/project.ts); asc never compiles either call.
import type { ModuleOptions } from "./facade";

declare global {
	/** Who a module is. */
	interface AmxtsModuleMeta {
		/** The package's name without its scope: "menu-core" for @amxts/menu-core. */
		name: string;
		/** The key its options go under in amxts.config.ts: "menus". */
		configKey?: string;
	}

	/** What `defineModule` takes: the module's meta, what it requires, its options and its setup. */
	interface AmxtsModule<T> {
		meta: AmxtsModuleMeta;
		/** Module packages that must be listed in amxts.config.ts too - loaded before this one. */
		requires?: string[];
		/** Every option's value when amxts.config.ts does not set it. */
		defaults?: T;
		/**
		 * Runs once, in the module's plugin, when the server loads it - with the
		 * defaults and, over them, what amxts.config.ts sets under configKey.
		 */
		setup?: (options: T) => void;
	}

	/** What amxts.config.ts exports: the modules the project uses, and their options. */
	interface AmxtsConfig extends ModuleOptions {
		/** Module packages, by name: "@amxts/menu-core". The build loads each after what it requires. */
		modules?: string[];
		/** Where the project's plugins are: "plugins". */
		pluginsDir?: string;
		/** Where the build writes the .aot files and plugins.ini: "dist". */
		outDir?: string;
	}

	/**
	 * A module, in its module file:
	 *
	 * ```ts
	 * export default defineModule<MenuCoreOptions>({
	 *   meta: { name: "menu-core", configKey: "menus" },
	 *   requires: ["@amxts/universal-config"],
	 *   defaults: { file: "menu" },
	 *   setup(options) { ... },
	 * });
	 * ```
	 */
	function defineModule<T = Record<string, never>>(definition: AmxtsModule<T>): AmxtsModule<T>;

	/**
	 * A project's amxts.config.ts:
	 *
	 * ```ts
	 * export default defineConfig({
	 *   modules: ["@amxts/universal-config", "@amxts/menu-core"],
	 *   menus: { file: "myserver/menu" },
	 * });
	 * ```
	 */
	function defineConfig(config: AmxtsConfig): AmxtsConfig;
}

export {};
