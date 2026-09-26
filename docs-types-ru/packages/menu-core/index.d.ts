/**
 * Menu Core — an opinionated way to create menus: from an ini file or in code,
 * with conditions, placeholders and lists. How to use it: README.md.
 */
import { Player } from "@amxts/core";
import { ActionHandler, ActionTest, ConditionFilter, ConditionTest, ListRow, ListSource, MenuCoreOptions, MenuEventType, MenuItemOptions, MenuKind, MenuOptions, MenuShowOptions, PlaceholderValue, RestrictionTest, RowTest } from "./types";
export * from "./types";
declare const _default: AmxtsModule<MenuCoreOptions>;
export default _default;
/**
 * Меню: прочитанное из menu.ini или сделанное через `create()`. Поля — то,
 * что задаёт menu.ini; методы наполняют меню, открывают его и ведут отсчёт.
 *
 *     const shop = menus.create("SHOP", { title: "Shop" });
 *     shop.addItem("Heal", { onSelect: heal });
 *     shop.show(player);
 */
export declare class Menu {
    /** Имя меню — его секция в menu.ini, например "MAIN_MENU". */
    readonly name: string;
    /** Заголовок меню: ключ словаря или сам текст. */
    title: string;
    /** Вид меню, одно из "items" (список пунктов) или "list" (строка на игрока или на строку источника). Имя на LIST_ даёт список. */
    readonly kind: MenuKind;
    /** Скрытие кнопки "Назад": true убирает её. */
    hideBack: boolean;
    /** Скрытие кнопки "Выход": true убирает её. */
    hideExit: boolean;
    /** Блокировка меню: пока true, пункты нельзя выбрать и другое меню не заменяет это. */
    locked: boolean;
    /** Один отсчёт на всех, кто смотрит меню (true), а не у каждого игрока свой. */
    sharedTimer: boolean;
    /** Секунды отсчёта при открытии меню, например 10; 0 — без отсчёта. */
    time: number;
    /** Имена действий, которые выполняются, когда отсчёт кончился, например "CLOSE_MENU"; "" закрывает меню. */
    onTimeout: string;
    /** Имена условий, при которых меню открывается, через пробел, например "IS_ALIVE !IS_SPECTATOR"; "" — всегда. */
    activeOn: string;
    /** Секунды, оставшиеся на общем отсчёте; 0, пока отсчёт не идёт. */
    countdown: number;
    constructor(
    /** The menu's name - its section in menu.ini, e.g. "MAIN_MENU". */
    name: string, 
    /** The menu's title: a lang key or the text itself. */
    title: string);
    /**
     * Добавляет пункт. "A|B" в тексте, условии или действии — варианты:
     * показывается первый, чьё условие выполнено. False, если текст не даёт ни одного.
     */
    addItem(text: string, options?: MenuItemOptions): boolean;
    /** Добавляет пункт, который на каждой странице занимает один слот: `slot` — его клавиша, от 1 до 7. */
    addFixedItem(slot: number, text: string, options?: MenuItemOptions): boolean;
    /** Удаляет все пункты меню, включая фиксированные. */
    clearItems(): void;
    /** Фильтр меню-списка: строки, на которые `test` отвечает «нет», пропускаются, а если не осталось ни одной, игрок получает `message`. */
    addFilter(test: RowTest, message?: string): void;
    /** Плейсхолдер этого меню: текст, которым заменяется %name%, раньше зарегистрированных через `addPlaceholder()`. */
    addPlaceholder(name: string, value: PlaceholderValue): void;
    /** Источник строк этого меню-списка вместо игроков. */
    setListSource(rows: ListSource): void;
    /** Вызывает `listener` на события этого меню типа `type` — одно из "open", "close" или "show" (до открытия). */
    addEventListener(type: MenuEventType, listener: MenuListener): void;
    /**
     * Показывает меню игроку; false, если оно не открылось — его отменил
     * обработчик "show", оно не активно или меню игрока не уступает место.
     */
    show(player: Player, options?: MenuShowOptions): boolean;
    /** Перерисовывает меню у всех, кто его смотрит; число игроков, у которых оно перерисовано. */
    refresh(): number;
    /** Закрывает меню у всех, кто его смотрит. */
    close(): void;
    /**
     * Задаёт общий отсчёт: запускает его, если он не идёт, или меняет
     * оставшиеся секунды — 0 останавливает его на месте. False, если менять нечего.
     */
    setTimer(seconds: number): boolean;
    /** Останавливает общий отсчёт и закрывает меню у всех, кто его смотрит. False, если отсчёт не шёл. */
    cancelTimer(): boolean;
}
/** Событие меню: игрок `player`, меню `menu` и на "close" — вышло ли время (`timeout`). */
export declare class MenuEvent {
    /** Игрок, чьё это меню. */
    player: Player;
    /** Меню, о котором событие. */
    menu: Menu;
    /** На "close": true, если меню закрылось, потому что вышло время. */
    timeout: boolean;
    /** Отметка `preventDefault()`: true, если его вызвали. */
    defaultPrevented: boolean;
    constructor(
    /** The player whose menu it is. */
    player: Player, 
    /** The menu the event is about. */
    menu: Menu, 
    /** On "close": true when the menu closed because its time ran out. */
    timeout: boolean);
    /** На "show": не даёт меню открыться. */
    preventDefault(): void;
}
/** Обработчик событий меню, как его вызывает `addEventListener()`. */
export type MenuListener = (event: MenuEvent) => void;
/**
 * Задаёт файл, из которого читаются меню: путь от configs/ без ".ini"; читается,
 * когда меню понадобится впервые. Если в `file` нет секций, читается `fallback`.
 */
export declare function setConfigFile(file: string, fallback?: string): void;
/** Меню по имени; null, если такого нет — меню из файла читает `register()`. */
export declare function find(name: string): Menu | null;
/** Номер меню среди всех — тот, под которым его знают Pawn-плагины; -1, если меню нет. */
export declare function indexOf(menu: Menu | null): number;
/** Меню с этим номером среди всех — обратное к `indexOf()`; null, если такого нет. */
export declare function menuAt(index: number): Menu | null;
/** Меню из секции [name] файла, прочитанное сейчас, если ещё не прочитано; null, если секции нет или в ней нет пунктов. */
export declare function register(name: string): Menu | null;
/**
 * Меню из кода — или уже существующее с этим именем, как есть. Имя на LIST_
 * даёт меню-список.
 */
export declare function create(name: string, options?: MenuOptions): Menu;
/** Регистрирует условие по имени — для menu.ini и Pawn-плагинов; спрашивается то, что зарегистрировано под именем первым. */
export declare function addCondition(name: string, test: ConditionTest): number;
/** Регистрирует действие по имени — для menu.ini и Pawn-плагинов; SHOW_<MENU> и CLOSE_MENU встроены. */
export declare function addAction(name: string, run: ActionHandler): number;
/** Регистрирует плейсхолдер: текст, которым заменяется %name% в заголовках и пунктах. Если имя зарегистрировано дважды, остаётся первое. */
export declare function addPlaceholder(name: string, value: PlaceholderValue): number;
/** Регистрирует ограничение по имени, которое называют пункты; "*" отвечает за все имена, за которые не отвечает никто другой. */
export declare function addRestriction(name: string, test: RestrictionTest, message?: string): number;
/** Гасит пункты с `action` в `menu`, пока `test` отвечает «нет»; "" в любом из них означает «все». */
export declare function addActionCheck(menu: string, action: string, test: ActionTest): number;
/** Регистрирует фильтр над условием `name`, кто бы его ни зарегистрировал: получает значение условия и возвращает то, что будет использовано. */
export declare function addConditionFilter(name: string, filter: ConditionFilter): number;
/** Задаёт источник строк меню-списка с этим именем вместо игроков; второй источник заменяет первый. */
export declare function setListSource(menu: string, rows: ListSource): number;
/** Вызывает `listener` на каждое событие меню типа `type` — одно из "open", "close" или "show" (до открытия меню). */
export declare function addEventListener(type: MenuEventType, listener: MenuListener): number;
/** Строка для источника списка: цель, текст и, если нужно, действие, ограничение и его сообщение. */
export declare function listRow(target: number, text: string, action?: string, restriction?: string, restrictionMessage?: string): ListRow;
/** Строка текста среди строк источника списка; `centered` выравнивает её по середине меню. */
export declare function textRow(text: string, centered?: boolean): ListRow;
/**
 * Показывает меню с этим именем — из кода или из файла; false, если оно
 * не открылось: такого меню нет, его отменил обработчик "show", оно не
 * активно или меню игрока не уступает место.
 */
export declare function show(player: Player, name: string, options?: MenuShowOptions): boolean;
/** Закрывает меню игрока; `timeout` сообщает обработчикам "close", что вышло время. */
export declare function close(player: Player, timeout?: boolean): void;
/** Перерисовывает меню у всех, кто их смотрит; `names` — через пробел. Число игроков, у которых меню перерисованы. */
export declare function refresh(names: string): number;
/** Сообщает меню, что значение условия изменилось: меню, нарисованные с ним, перерисовываются. */
export declare function conditionChanged(name: string): void;
/** Меню, которое смотрит игрок, или null. */
export declare function activeMenu(player: Player): Menu | null;
/** Текст меню игрока, как оно было нарисовано в последний раз; "", если меню не открыто. */
export declare function shownText(player: Player): string;
/** Блокирует меню игрока: пункты нельзя выбрать и другое меню его не заменяет, пока его не разблокируют или не закроют. */
export declare function lock(player: Player, locked?: boolean): void;
/** Заблокировано ли меню игрока — см. `lock()`. */
export declare function isLocked(player: Player): boolean;
/** Задаёт страницу, на которой меню игрока нарисуется в следующий раз, от 0. */
export declare function setPage(player: Player, page: number): void;
/** Зарегистрировано ли действие с этим именем. */
export declare function hasAction(name: string): boolean;
/** Выполняет строку действий: имена действий через пробел, в том числе CLOSE_MENU и SHOW_<MENU>. */
export declare function runActions(player: Player, line: string, target?: number): void;
