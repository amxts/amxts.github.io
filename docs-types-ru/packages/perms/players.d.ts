/**
 * The players on the server: who each one is in the permissions, what he
 * may do, and AMX Mod X's flags written from his `amxx.*` nodes, so Pawn
 * plugins' `access` and `cmd_access` keep working.
 */
import { Player } from "@amxts/core";
import type { User } from "./model";
/** AMX Mod X's admin flags: the `amxx.<name>` node and its letter in `users.ini`. */
export interface AdminFlag {
    name: string;
    letter: string;
}
export declare const FLAGS: AdminFlag[];
export declare function onChange(listener: (player: Player) => void): void;
/** Whether the module writes the players' flags; not while admin.amxx does. */
export declare function setWritesFlags(on: boolean): void;
export declare function sha256(text: string): string;
/** Works out a player's permissions again, writes his flags, and tells the listeners when anything changed. */
export declare function refresh(player: Player): void;
export declare function refreshAll(): void;
export declare function forget(id: number): void;
export declare function has(player: Player, node: string): boolean;
export declare function userOf(player: Player): User | null;
/** The player's entry id, or the id his entry would get: his SteamID, or his IP when he has none. */
export declare function idOf(player: Player): string;
