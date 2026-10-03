import type { Memory } from './memory';
import type { FakeServer, PluginInstance } from './server';
export interface NativeCall {
    server: FakeServer;
    plugin: PluginInstance;
    memory: Memory;
}
export type Native = (call: NativeCall, args: number[]) => number | void;
/** Every weapon by its WeaponIdType - the facade's WEAPON_IDS. */
export declare const WEAPON_NAMES: string[];
/**
 * Pawn's format: the conversions AMX Mod X plugins use, each reading its
 * argument through the address the tail holds.
 */
export declare function formatPawn(call: NativeCall, format: string, tail: number[]): string;
export declare const NATIVES: Record<string, Native>;
