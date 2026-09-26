/// <reference path="../as-types.d.ts" />
// The globals a module file and amxts.config.ts use without an import, as
// nuxt.config.ts uses defineNuxtConfig: defineModule and defineConfig.
//
// Only the editor reads this file. The build reads a module's definition from
// its source and evaluates amxts.config.ts with a defineConfig of its own
// (scripts/project.ts); asc never compiles either call.
import type { ModuleOptions } from "./facade";

declare global {
	/** A module's name and config key. */
	interface AmxtsModuleMeta {
		/** The package's name without its scope, e.g. "menu-core" for @amxts/menu-core. */
		name: string;
		/** The key the module's options go under in amxts.config.ts, e.g. "menus". */
		configKey?: string;
	}

	/** A module's definition for `defineModule`: its meta, the modules it requires, its options and its setup. */
	interface AmxtsModule<T> {
		/** The module's name and configKey. */
		meta: AmxtsModuleMeta;
		/** The module packages this one needs, e.g. "@amxts/config-core". They must be in amxts.config.ts too, and load first. */
		requires?: string[];
		/** The module's default options: the values used when amxts.config.ts does not set them. */
		defaults?: T;
		/**
		 * Runs once, in the module's plugin, when the server loads it. Gets the
		 * defaults with what amxts.config.ts sets under configKey on top.
		 */
		setup?: (options: T) => void;
	}

	/** The project's settings, exported by amxts.config.ts: the modules it uses and their options. */
	interface AmxtsConfig extends ModuleOptions {
		/** The project's module packages, by name, e.g. "@amxts/menu-core". The build loads each after the ones it requires. */
		modules?: string[];
		/** The folder with the project's plugins; "plugins" by default. */
		pluginsDir?: string;
		/** The folder the build writes the .aot files and plugins.ini to; "dist" by default. */
		outDir?: string;
	}

	/**
	 * Defines a module, in its module file:
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
	 * Defines the project's settings, in amxts.config.ts:
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
