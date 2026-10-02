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
 * Проходит ли `player` сквозь `target`. ReSemiclip пропускает двух игроков
 * друг сквозь друга, только когда правило разрешает это в обе стороны.
 */
export type SemiclipRule = (player: Player, target: Player) => boolean;
/**
 * Кто сквозь кого проходит, заданное правилом над двумя игроками, — `semiclip`,
 * которым плагины пользуются без импорта:
 *
 * ```ts
 * semiclip.rule = (player, target) => player.isAlive && target.isAlive && player.team == target.team;
 * ```
 */
export declare class Semiclip {
    /**
     * Проходит ли `player` сквозь `target`. Присваивание забирает правила у
     * ReSemiclip и рассчитывает каждую пару; `null` возвращает их. Пары
     * рассчитываются заново, когда игрок заходит или уходит, появляется, умирает
     * или меняет команду и когда меняется поле, которое плагины добавили в `Player`.
     *
     * Pawn: `resemiclip_take_control`, `resemiclip_set_user_mask`
     */
    get rule(): SemiclipRule | null;
    set rule(rule: SemiclipRule | null);
    /**
     * Рассчитывает пары заново — пары `player` или всех — после того, как
     * изменилось то, что читает правило и чего модуль не слышит: режим раунда,
     * собственная запись плагина.
     */
    update(player?: Player): void;
    /**
     * Игроки, сквозь которых проходит `player`: те, для кого он не твёрдый.
     *
     * Pawn: `resemiclip_get_user_mask`
     */
    passesThrough(player: Player): Player[];
}
/** Кто сквозь кого проходит: правило, повторный расчёт пар и то, что сейчас у ReSemiclip. */
export declare const semiclip: Semiclip;
