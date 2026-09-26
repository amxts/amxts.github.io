/**
 * Menu Core — an opinionated way to create menus: from an ini file or in code,
 * with conditions, placeholders and lists. How to use it: README.md.
 */
import { Player } from "~/facade";
import { ActionHandler, ActionTest, ConditionFilter, ConditionTest, ListRow, ListSource, Menu, MenuCoreOptions, MenuEventType, MenuItemOptions, MenuListener, MenuShowOptions, PlaceholderValue, RestrictionTest } from "./types";
export * from "./types";
declare const _default: AmxtsModule<MenuCoreOptions>;
export default _default;
/**
 * Файл, из которого читаются меню: путь от configs/ без ".ini"; читается, когда
 * меню понадобится впервые. Если в `file` нет секций, читается `fallback`.
 */
export declare function setConfigFile(file: string, fallback?: string): void;
/** Меню по имени; null, если такого нет — меню из файла даёт register(). */
export declare function find(name: string): Menu | null;
/** Номер меню среди всех — то, что mc_get_active_menu отдаёт Pawn; -1, если меню нет. */
export declare function indexOf(menu: Menu | null): number;
/** Меню с этим номером среди всех — обратное к indexOf(); null, если такого нет. */
export declare function menuAt(index: number): Menu | null;
/** Меню из секции [name] файла, прочитанное сейчас, если ещё не прочитано; null, если секции нет или в ней нет пунктов. */
export declare function register(name: string): Menu | null;
/** Меню из кода — или уже существующее с этим именем. Имя на LIST_ даёт меню-список. */
export declare function create(name: string, title: string): Menu;
/**
 * Пункт. "A|B" в имени, условии или действии — варианты: показывается первый,
 * чьё условие выполнено. False, если имя не даёт ни одного варианта.
 */
export declare function addItem(menu: Menu, name: string, options?: MenuItemOptions): boolean;
/** Пункт, который на каждой странице занимает один и тот же слот: `slot` — его клавиша, от 1 до 7. */
export declare function addFixedItem(menu: Menu, slot: number, name: string, options?: MenuItemOptions): boolean;
/** Удаляет все пункты меню, включая фиксированные. */
export declare function clearItems(menu: Menu): void;
/** Меню-список пропускает строки, не прошедшие `condition`; если не осталось ни одной, игрок получает `message`. */
export declare function addFilter(menu: Menu, condition: string, message?: string): void;
/** Меню открывается, только пока выполнено `condition`. */
export declare function setActiveOn(menu: Menu, condition: string): void;
/** Условие, которое файл называет по имени; спрашивается то, что зарегистрировано под этим именем первым. */
export declare function addCondition(name: string, test: ConditionTest): number;
/** Действие, которое файл называет по имени; SHOW_<MENU> и CLOSE_MENU встроены. */
export declare function addAction(name: string, run: ActionHandler): number;
/** Чем заменяется %name% в заголовках и пунктах. Если имя зарегистрировано дважды, остаётся первое. */
export declare function addPlaceholder(name: string, value: PlaceholderValue): number;
/** Ограничение, которое пункты называют по имени; "*" отвечает за все имена, за которые не отвечает никто другой. */
export declare function addRestriction(name: string, test: RestrictionTest, message?: string): number;
/** Гасит пункты с `action` в `menu`, пока `test` отвечает "нет"; "" в любом из них означает "все". */
export declare function addActionCheck(menu: string, action: string, test: ActionTest): number;
/** Своё слово в условии `name`, кто бы его ни зарегистрировал. */
export declare function addConditionFilter(name: string, filter: ConditionFilter): number;
/** Строки меню-списка `menu` вместо игроков; второй источник заменяет первый. */
export declare function setListSource(menu: string, rows: ListSource): number;
/** Вызывает `listener` на каждое событие меню типа `type`: "open", "close" или "show" до открытия меню. */
export declare function addEventListener(type: MenuEventType, listener: MenuListener): number;
/** Строка для источника списка. */
export declare function listRow(target: number, text: string, action?: string, restriction?: string, restrictionMessage?: string): ListRow;
/** Строка текста среди строк источника списка; `centered` выравнивает её по середине меню. */
export declare function textRow(text: string, centered?: boolean): ListRow;
/**
 * Показывает меню; false, если оно не открылось — такого меню нет, его отменил
 * обработчик "show", ACTIVE_ON не выполнено или меню игрока не уступает место.
 */
export declare function show(player: Player, name: string, options?: MenuShowOptions): boolean;
/** Закрывает меню игрока; `timeout` сообщает обработчикам "close", что вышло время. */
export declare function close(player: Player, timeout?: boolean): void;
/** Перерисовывает меню у всех, кто их смотрит; `names` — через пробел. Возвращает, сколько перерисовано. */
export declare function refresh(names: string): number;
/** Значение условия изменилось: меню, нарисованные с ним, перерисовываются. */
export declare function conditionChanged(name: string): void;
/** Меню, которое смотрит игрок, или null. */
export declare function activeMenu(player: Player): Menu | null;
/**
 * Что показывает меню игрока, как оно было нарисовано в последний раз;
 * "", если меню не открыто.
 */
export declare function shownText(player: Player): string;
/** Не даёт игроку выбирать пункты — а другим меню заменять это — пока меню не разблокируют или не закроют. */
export declare function lock(player: Player, locked?: boolean): void;
/** Заблокировано ли меню игрока — см. lock(). */
export declare function isLocked(player: Player): boolean;
/** Страница, на которой меню игрока нарисуется в следующий раз. */
export declare function setPage(player: Player, page: number): void;
/**
 * Задаёт общий таймер меню: запускает его, если он не идёт, или меняет
 * оставшиеся секунды — 0 останавливает его на месте. False, если менять нечего.
 */
export declare function setTimer(menu: Menu, seconds: number): boolean;
/** Останавливает общий таймер и закрывает меню у всех, кто его смотрит. False, если таймер не шёл. */
export declare function cancelTimer(menu: Menu): boolean;
/** Зарегистрировано ли действие с этим именем. */
export declare function hasAction(name: string): boolean;
/** Выполняет строку действий: действия через пробел, в том числе CLOSE_MENU и SHOW_<MENU>. */
export declare function runActions(player: Player, line: string, target?: number): void;
