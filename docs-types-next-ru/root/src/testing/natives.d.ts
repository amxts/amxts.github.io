import type { Memory } from './memory';
import type { FakePlayer, FakeServer, PluginInstance } from './server';
import { FakeEntity } from './server';
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
/**
 * A field's cell as the module reads it in memory (runtime/src/fields.h): a
 * whole number, a float's bits, an entity's index; `element` is a vector's
 * component or an array member's element.
 */
export declare function fieldCell(target: FakeEntity | undefined, field: number, element?: number): number;
/** Writes a field's cell as the module does: a float's bits, one component of a vector, one element of an array. */
export declare function setFieldCell(target: FakeEntity | undefined, field: number, cell: number, element?: number): void;
export declare function giveWeapon(target: FakePlayer | undefined, name: string): number;
/** A command run as the player's, as the game takes it: a weapon chosen, a side picked in the team menu. */
export declare function clientCommand(target: FakePlayer | undefined, line: string): void;
export declare function switchTo(target: FakePlayer | undefined, name: string): number;
export declare const AUTH_TYPES: string[];
export declare const NATIVES: Record<string, Native>;
