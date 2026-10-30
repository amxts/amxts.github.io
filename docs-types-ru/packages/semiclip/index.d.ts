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
 * Проходит ли `player` сквозь `target`. Два игрока проходят друг сквозь
 * друга, когда правило разрешает это хотя бы в одну сторону:
 * `rule(a, b) || rule(b, a)`.
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
     * Проходит ли `player` сквозь `target`; пара проходит, когда это разрешает
     * хотя бы одна сторона. Присваивание рассчитывает каждую пару; `null` снова
     * делает всех твёрдыми. Пары рассчитываются заново, когда игрок заходит,
     * появляется, умирает или меняет команду и когда меняется поле, которое плагины
     * добавили в `Player`.
     */
    get rule(): SemiclipRule | null;
    set rule(rule: SemiclipRule | null);
    /**
     * Рассчитывает пары заново — пары `player` или всех — после того, как
     * изменилось то, что читает правило и чего модуль не слышит: режим раунда,
     * собственная запись плагина.
     */
    update(player?: Player): void;
}
/** Кто сквозь кого проходит: правило и повторный расчёт пар. */
export declare const semiclip: Semiclip;
