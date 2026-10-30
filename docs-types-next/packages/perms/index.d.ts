/**
 * Perms - permissions and groups for the server, in place of AMX Mod X's
 * admin.amxx: permission nodes with wildcards and negation, groups with
 * inheritance and weights, temporary grants, a file or MySQL, AMX Mod X's
 * flags for Pawn plugins, and a web editor. How to use it: README.md.
 */
import { Player } from "@amxts/core";
import type { GrantOptions, PermissionInfo, PermsChangeEvent, PermsOptions } from "./types";
export * from "./types";
declare const _default: AmxtsModule<PermsOptions>;
export default _default;
/**
 * Declares the plugin's permissions, so the web editor lists them with their
 * descriptions and `perms nodes` prints them:
 *
 *     perms.declare({
 *         "myplugin.kick": { description: "Kick players" },
 *         "myplugin.help": { description: "Use /help", everyone: true },
 *     });
 */
export declare function declare(permissions: Record<string, PermissionInfo>): void;
/** Whether the player has a permission: `perms.has(player, "myplugin.kick")`. */
export declare function has(player: Player, node: string): boolean;
/** The player's primary group: his group of the highest weight, `"default"` when he has none. */
export declare function groupOf(player: Player): string;
/** The player's groups, highest weight first, `"default"` last. */
export declare function groupsOf(player: Player): string[];
/** Puts the player into a group: `perms.addGroup(player, "vip", { for: 30 * 86400 })`; permanent without `for`. */
export declare function addGroup(player: Player, group: string, options?: GrantOptions): void;
/** Takes the player out of a group. */
export declare function removeGroup(player: Player, group: string, options?: GrantOptions): void;
/** Gives the player a permission of his own, or takes it away with `false`: `perms.set(player, "myplugin.trail", true, { for: 3600 })`. */
export declare function set(player: Player, node: string, value: boolean, options?: GrantOptions): void;
/** Removes a permission of the player's own, so his groups decide again. */
export declare function unset(player: Player, node: string, options?: GrantOptions): void;
/**
 * Hears a player's permissions change - he joined, a command or the editor
 * changed them, or one ran out:
 *
 *     perms.addEventListener("change", ({ player }) => {
 *         if (perms.has(player, "myplugin.trail")) startTrail(player);
 *     });
 */
export declare function addEventListener(_type: "change", listener: (event: PermsChangeEvent) => void): void;
