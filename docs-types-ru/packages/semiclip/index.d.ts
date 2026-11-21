/**
 * Semiclip for amxts plugins: who walks through whom, as a rule over two
 * players. The core keeps the pairs (the kit's `walksThrough`); this module asks
 * the rule and sets them, again whenever what the rule reads may have changed.
 * How to use it: README.md.
 */
import { Player } from "@amxts/core";
/** Настройки проекта, `semiclip: { ... }` в `amxts.config.ts`. */
export interface SemiclipOptions {
    /** Пролетает ли граната сквозь игроков, сквозь которых проходит бросивший её. */
    grenades: boolean;
    /** Стоит ли игрок, целиком оказавшийся над тем, сквозь кого проходит, у него на голове, а не проваливается. */
    standOnHead: boolean;
    /** Ближе этого расстояния, в юнитах, партнёр полупрозрачен; `0` — выключено. */
    fadeDistance: number;
    /** Насколько партнёр непрозрачен на `hideDistance`, от `0` до `1`: к `fadeDistance` он становится целым. */
    opacity: number;
    /** Ближе этого расстояния, в юнитах, партнёр исчезает, не рисуется и не служит целью прицела; `0` — выключено. */
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
     * хотя бы одна сторона. Пока плагин его не задал, друг сквозь друга проходят
     * союзники. Присваивание рассчитывает каждую пару; `null` снова делает всех
     * твёрдыми, а правило остановленного плагина снова сменяется союзниками. Пары рассчитываются заново, когда игрок заходит,
     * появляется, умирает или меняет команду и когда меняется поле, которое плагины
     * добавили в `Player`.
     */
    get rule(): SemiclipRule | null;
    set rule(rule: SemiclipRule | null);
    /**
     * Стоит ли игрок, целиком оказавшийся над тем, сквозь кого проходит, у него
     * на голове, а не проваливается; `standOnHead` проекта, пока плагин его не
     * задал. Заданное плагином действует, пока он работает: когда он
     * останавливается, возвращается настройка проекта.
     *
     * ```ts
     * semiclip.standOnHead = false; // пока работает этот плагин, буста с головы партнёра нет
     * ```
     */
    get standOnHead(): boolean;
    set standOnHead(on: boolean);
    /**
     * Рассчитывает пары заново — пары `player` или всех — после того, как
     * изменилось то, что читает правило и чего модуль не слышит: режим раунда,
     * собственная запись плагина.
     */
    update(player?: Player): void;
}
/** Кто сквозь кого проходит: правило и повторный расчёт пар. */
export declare const semiclip: Semiclip;
