import type { ModulePackage } from '../../scripts/project';
import type { FakeServer } from './server';
/** What a module's test kit does to a new fake server - before any plugin loads. */
export interface TestKit<T = unknown> {
    /**
     * Adds what the module needs on the fake server - `server.defineNative`,
     * `server.messageListeners` - and gives back what its tests use.
     */
    install: (server: FakeServer) => T;
}
/**
 * A module's test kit, as the default export of the file its package.json
 * names in `"amxts": { "testing": ... }`.
 */
export declare function defineTestKit<T>(kit: TestKit<T>): TestKit<T>;
/** Installs a module package's test kit on the server, once; nothing for a package without one. */
export declare function installKit(server: FakeServer, pkg: ModulePackage): Promise<void>;
/** The kit of the module package `source` names, when it is one: `server.load("@amxts/menu-core")`. */
export declare function installKitFor(server: FakeServer, source: string): Promise<void>;
