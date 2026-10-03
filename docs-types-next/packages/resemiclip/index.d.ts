/**
 * ReSemiclip for amxts plugins: who walks through whom, as a rule over two
 * players. The ReSemiclip module keeps, for each player, the players he is not
 * solid to; this module asks the rule and tells it, again whenever what the
 * rule reads may have changed. How to use it: README.md.
 */
import { Player } from "@amxts/core";
declare const _default: AmxtsModule<{
    [key: string]: undefined;
}>;
export default _default;
/**
 * Whether `player` walks through `target`. ReSemiclip lets two players
 * through each other only when the rule says so both ways.
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
     * Whether `player` walks through `target`. Setting it takes the rules over
     * from ReSemiclip and works every pair out; `null` gives them back. The
     * pairs are worked out again when a player comes or leaves, spawns, dies or
     * changes sides, and when a field plugins added to `Player` changes.
     *
     * Pawn: `resemiclip_take_control`, `resemiclip_set_user_mask`
     */
    get rule(): SemiclipRule | null;
    set rule(rule: SemiclipRule | null);
    /**
     * Works the pairs out again - `player`'s, or everyone's - after something
     * the rule reads changed that the module does not hear: a round's mode, a
     * plugin's own record.
     */
    update(player?: Player): void;
    /**
     * The players `player` walks through: those he is not solid to.
     *
     * Pawn: `resemiclip_get_user_mask`
     */
    passesThrough(player: Player): Player[];
}
/** Who walks through whom: the rule, the pairs worked out again, and what ReSemiclip has. */
export declare const semiclip: Semiclip;
