import type { ServerOptions } from './server';
import { FakeServer } from './server';
export { defineTestKit } from './kits';
export type { TestKit } from './kits';
export { bitsFloat, floatBits, Memory } from './memory';
export type { Native, NativeCall } from './natives';
export { FakeEntity, FakePlayer, FakeServer, FakeWeapon, PluginInstance } from './server';
export type { ArgValue, HookResult, JoinOptions, Message, NativeResult, SentForward, ServerOptions, TeamName, UserMessage, Value } from './server';
export { setup } from './setup';
export type { SetupOptions } from './setup';
export { constant } from './tables';
/**
 * Compiles a plugin (once per test run), loads it into a new fake server and
 * starts the map: its top level runs, then plugin_init and plugin_cfg.
 *
 * Several plugins go into one server as an array - they hear each other's
 * forwards and natives, as on a real one.
 */
export declare function loadPlugin(source: string | string[], options?: ServerOptions): Promise<FakeServer>;
