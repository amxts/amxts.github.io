import type { ServerOptions } from './server';
import { FakeServer } from './server';
export interface SetupOptions extends ServerOptions {
    /**
     * The project: the folder with its amxts.config.ts, whose modules and
     * plugins are loaded. The folder the tests run from when left out. It
     * stays the project for the rest of the run: `server.load("@you/greeter")`
     * afterwards finds the module there.
     */
    rootDir?: string;
    /**
     * Which of the project's plugins load, by file name - `["welcome.ts"]`,
     * `["welcome"]` - in this order; all of them when left out, none for `[]`.
     */
    plugins?: string[];
    /** Starts the map - plugin_init, then plugin_cfg - once everything is loaded. True when left out. */
    start?: boolean;
}
/**
 * A new fake server with the project on it: its modules in load order, each
 * with its test kit, then its plugins, then the map started.
 */
export declare function setup(options?: SetupOptions): Promise<FakeServer>;
