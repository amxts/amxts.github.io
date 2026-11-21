/**
 * Semiclip for amxts plugins: who walks through whom, as a rule over two
 * players. The core keeps the pairs (the kit's `walksThrough`); this module asks
 * the rule and sets them, again whenever what the rule reads may have changed.
 * How to use it: README.md.
 */
import { Player } from "@amxts/core";
/** The project's options, `semiclip: { ... }` in `amxts.config.ts`. */
export interface SemiclipOptions {
    /** Whether a grenade passes the players its thrower walks through. */
    grenades: boolean;
    /** Whether a player wholly above one he walks through stands on him, instead of falling through. */
    standOnHead: boolean;
    /** Closer than this, in units, a partner is see-through; `0` is off. */
    fadeDistance: number;
    /** How opaque a partner is at `hideDistance`, `0` to `1`: he grows to whole at `fadeDistance`. */
    opacity: number;
    /** Closer than this, in units, a partner fades out, is not drawn, and is no target of one's aim; `0` is off. */
    hideDistance: number;
}
declare const _default: AmxtsModule<SemiclipOptions>;
export default _default;
declare module "@amxts/core" {
    interface ModuleOptions {
        semiclip?: Partial<SemiclipOptions>;
    }
}
/**
 * Whether `player` walks through `target`. Two players walk through each
 * other when the rule lets either one: `rule(a, b) || rule(b, a)`.
 */
export type SemiclipRule = (player: Player, target: Player) => boolean;
/**
 * Who walks through whom, set as a rule over two players - `semiclip`, which
 * plugins use without an import:
 *
 * ```ts
 * semiclip.rule = (player, target) => player.isAlive && target.isAlive && player.team == target.team;
 * ```
 */
export declare class Semiclip {
    /**
     * Whether `player` walks through `target`; a pair walks through when either
     * way says so. Until a plugin sets it, teammates walk through each other.
     * Setting it works every pair out; `null` makes everyone solid again, and the
     * rule of a plugin that stops goes back to teammates. The pairs are worked out again when a player comes, spawns, dies or
     * changes sides, and when a field plugins added to `Player` changes.
     */
    get rule(): SemiclipRule | null;
    set rule(rule: SemiclipRule | null);
    /**
     * Whether a player wholly above one he walks through stands on him, instead
     * of falling through; the project's `standOnHead` until a plugin sets it.
     * A plugin's setting holds while it runs: when it stops, the project's comes back.
     *
     * ```ts
     * semiclip.standOnHead = false; // no boosts on a partner's head while this plugin runs
     * ```
     */
    get standOnHead(): boolean;
    set standOnHead(on: boolean);
    /**
     * Works the pairs out again - `player`'s, or everyone's - after something
     * the rule reads changed that the module does not hear: a round's mode, a
     * plugin's own record.
     */
    update(player?: Player): void;
}
/** Who walks through whom: the rule, and the pairs worked out again. */
export declare const semiclip: Semiclip;
