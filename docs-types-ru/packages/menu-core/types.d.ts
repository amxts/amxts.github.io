/**
 * The types of Menu Core's API: menus, items, rows and the callbacks plugins
 * register.
 */
import { Player } from "~/facade";
/** "items": список пунктов. "list": строка на каждого игрока или на каждую строку источника списка. */
export type MenuKind = "items" | "list";
/** Один из вариантов пункта: показывается первый, чьё условие выполнено. */
export interface Variant {
    /** Показываемый текст: ключ перевода или сам текст. */
    name: string;
    /** Условие, при котором он показывается; "" — всегда. */
    condition: string;
    /** Что делает его выбор: зарегистрированное или встроенное действие. */
    action: string;
}
/** Пункт меню. */
export interface MenuItem {
    /** Варианты пункта — "A|B" в menu.ini; показывается первый, чьё условие выполнено. */
    variants: Variant[];
    /** Текст после имени, вместе с плейсхолдерами: "%hp%". */
    placeholder: string;
    /** Имена ограничений через пробел: пункт погашен, если не пройдено хотя бы одно. */
    restriction: string;
    /** Почему пункт погашен: "NAME:message|NAME2:message" или одно сообщение. */
    restrictionMessage: string;
    /** Пустые строки перед пунктом. */
    spaceBefore: number;
    /** Пустые строки после пункта. */
    spaceAfter: number;
    /** Слот, который всегда занимает фиксированный пункт, считая с 0: клавиша 1 — это 0, клавиша 7 — 6. -1 у пункта в общем потоке. */
    slot: number;
}
/** Строки меню-списка, не прошедшие условие, пропускаются; если не осталось ни одной, об этом говорит `message`. */
export interface ListFilter {
    /** Условие, которое строка должна пройти. */
    condition: string;
    /** Что сказать игроку, если не прошла ни одна строка. */
    message: string;
}
/** Меню из menu.ini или из кода. */
export interface Menu {
    /** Имя его секции: "MAIN_MENU". */
    name: string;
    /** Заголовок: ключ перевода или сам текст. */
    title: string;
    /** "items" или "list" — строка на каждого игрока или на каждую строку источника списка. */
    kind: MenuKind;
    /** Меню открывается, только пока выполнено это условие. */
    activeOn: string;
    /** Фильтры меню-списка: строки, не прошедшие хотя бы один, пропускаются. */
    filters: ListFilter[];
    /** Пункты в общем потоке; у меню-списка первый из них — шаблон строки (VIEW). */
    items: MenuItem[];
    /** Пункты, которые держат свой слот на каждой странице (FIXED_ITEMS). */
    fixed: MenuItem[];
    /** Без кнопки "Назад". */
    hideBack: boolean;
    /** Без кнопки "Выход". */
    hideExit: boolean;
    /** Пункты нельзя выбрать, и другое меню его не заменит. */
    locked: boolean;
    /** Один таймер на всех, кто его смотрит, а не у каждого свой. */
    sharedTimer: boolean;
    /** Секунды на таймере при открытии; 0 — без таймера. */
    time: number;
    /** Действие, которое выполняется, когда таймер кончился; без него меню закрывается. */
    onTimeout: string;
    /** Сколько секунд осталось на общем таймере; 0, пока он не идёт. */
    countdown: number;
}
/** Строка меню-списка, как её отдаёт источник списка. */
export interface ListRow {
    /** "text": строка текста, которую нельзя выбрать. */
    kind: "item" | "text";
    /** Что действие получит как цель: id игрока, сущность, индекс. */
    target: number;
    /** Текст строки, он же %name% в шаблоне VIEW. */
    text: string;
    /** Своё действие вместо действия шаблона. */
    action: string;
    /** Имена ограничений через пробел: строка погашена, если не пройдено хотя бы одно. */
    restriction: string;
    /** Почему строка погашена; "" — собственное сообщение ограничения. */
    restrictionMessage: string;
}
/** Как `menus.show` открывает меню: `menus.show(player, "SHOP", { time: 10 })`. Любое поле можно не указывать. */
export interface MenuShowOptions {
    /** Секунды обратного отсчёта; без него идёт текущий отсчёт или начинается TIME меню. */
    time?: number;
    /** О ком меню: %target% и цель, которую получает действие; без него — 0. */
    target?: number;
    /** Начинает историю возврата заново. */
    resetHistory?: boolean;
    /** Открывает поверх меню, которое держится: с обратным отсчётом или заблокированного. */
    force?: boolean;
    /** Не добавляет меню в историю возврата. */
    skipHistory?: boolean;
}
/** Что `menus.addItem` принимает помимо имени. Любое поле можно не указывать. */
export interface MenuItemOptions {
    /** Текст после имени, вместе с плейсхолдерами: "%hp%". */
    placeholder?: string;
    /** Условие, при котором пункт виден: имя из addCondition, "!NAME" — обратное; несколько через пробел должны выполняться все. */
    condition?: string;
    /** Что делает выбор пункта: имя из addAction или встроенное действие — "SHOW_<MENU>", "CLOSE_MENU". */
    action?: string;
    /** Что делает выбор пункта — вместо имени действия. */
    onSelect?: (player: Player, target: number, name: string) => void;
    /** Делает пункт серым, пока выполняется: имя из addRestriction, "ADMIN" или "FLAG_<letters>". */
    restriction?: string;
    /** Показывается рядом, пока пункт серый; без него — собственное сообщение ограничения. */
    restrictionMessage?: string;
    /** Позиция среди пунктов; без неё — в конец. */
    at?: number;
    /** Пустые строки перед пунктом. */
    spaceBefore?: number;
    /** Пустые строки после пункта. */
    spaceAfter?: number;
}
/** Выполнено ли условие. В меню-списке `player` — игрок строки, а `viewer` — тот, кто смотрит меню. */
export type ConditionTest = (player: Player, viewer: Player, name: string) => boolean;
/** Что делает выбор пункта. `target` — цель строки в меню-списке, иначе цель меню. */
export type ActionHandler = (player: Player, target: number, name: string) => void;
/** Текст, которым заменяется %name%. */
export type PlaceholderValue = (player: Player, target: number, name: string) => string;
/** Проходит ли игрок ограничение; `name` — токен целиком, вместе с "NAME:param". */
export type RestrictionTest = (player: Player, name: string, target: number) => boolean;
/** Можно ли сейчас выбрать пункт с этим действием; false гасит его. */
export type ActionTest = (player: Player, menu: string, action: string) => boolean;
/** Своё слово в условии, которое зарегистрировал кто-то другой: получает его значение и возвращает то, которое использовать. */
export type ConditionFilter = (player: Player, viewer: Player, name: string, value: boolean) => boolean;
/** Строки меню-списка; null — вместо них список игроков. */
export type ListSource = (viewer: Player, menu: string) => ListRow[] | null;
/** Что addEventListener() вызывает на событие меню. */
export type MenuListener = (event: MenuEvent) => void;
/** "open" и "close" — когда это происходит; "show" — до открытия меню, чтобы его отменить. */
export type MenuEventType = "open" | "close" | "show";
/** Событие меню: игрок `player`, имя меню `menu` и, на "close", вышло ли время — `timeout`. */
export declare class MenuEvent {
    /** Чьё это меню. */
    player: Player;
    /** Имя меню. */
    menu: string;
    /** При "close": меню закрылось, потому что вышло его время. */
    timeout: boolean;
    /** Был ли вызван preventDefault(). */
    defaultPrevented: boolean;
    constructor(
    /** Whose menu it is. */
    player: Player, 
    /** The menu's name. */
    menu: string, 
    /** On "close": the menu closed because its time ran out. */
    timeout: boolean);
    /** На "show": меню не открывается. */
    preventDefault(): void;
}
/** Настройки Menu Core: `menus` в amxts.config.ts. */
export interface MenuCoreOptions {
    /** Файл меню от configs/: "menu" — это configs/menu.ini, "myserver/menu" — configs/myserver/menu.ini. */
    file: string;
    /** Читается вместо `file`, если в нём нет меню: "menu" — это configs/menu.ini. "" — без запасного файла. */
    fallback: string;
}
declare module "@amxts/core" {
    interface ModuleOptions {
        menus?: Partial<MenuCoreOptions>;
    }
}
