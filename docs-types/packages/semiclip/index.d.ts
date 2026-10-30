/**
 * Semiclip for amxts plugins: who walks through whom, as a rule over two
 * players. The core keeps the pairs (`player.walksThrough`); this module asks
 * the rule and sets them, again whenever what the rule reads may have changed.
 * How to use it: README.md.
 */
import { Player } from "@amxts/core";
declare const _default: AmxtsModule<{
    [key: string]: undefined;
}>;
export default _default;
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
     * way says so. Setting it works every pair out; `null` makes everyone solid
     * again. The pairs are worked out again when a player comes, spawns, dies or
     * changes sides, and when a field plugins added to `Player` changes.
     */
    get rule(): SemiclipRule | null;
    set rule(rule: SemiclipRule | null);
    /**
     * Works the pairs out again - `player`'s, or everyone's - after something
     * the rule reads changed that the module does not hear: a round's mode, a
     * plugin's own record.
     */
    update(player?: Player): void;
}
/** Who walks through whom: the rule, and the pairs worked out again. */
export declare const semiclip: Semiclip;
