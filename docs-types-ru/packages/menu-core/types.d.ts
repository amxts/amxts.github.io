/**
 * The types of Menu Core's API: options, rows and the callbacks plugins
 * register.
 */
import { Player } from "@amxts/core";
/** Вид меню, одно из "items" (список пунктов) или "list" (строка на игрока или на строку источника). */
export type MenuKind = "items" | "list";
/** Строка меню-списка, как её отдаёт источник, — из `listRow()` или `textRow()`. */
export interface ListRow {
    /** Вид строки, одно из "item" (строка для выбора) или "text" (строка текста, не выбор). */
    kind: "item" | "text";
    /** Цель строки, которую получает действие: например, номер игрока, сущность или индекс самого источника. */
    target: number;
    /** Текст строки, который подставляется вместо %name% в шаблон строки меню. */
    text: string;
    /** Собственные имена действий строки, вместо действий шаблона; "" — действия шаблона. */
    action: string;
    /** Имена ограничений через пробел: строка погашена, пока не пройдено каждое. */
    restriction: string;
    /** Текст рядом со строкой, пока она погашена; "" — сообщение самого ограничения. */
    restrictionMessage: string;
}
/**
 * Настройки меню, сделанного через `create()`. Любое поле можно не задавать:
 *
 *     menus.create("SHOP", { title: "Shop", time: 30, activeWhen: player => player.isAlive });
 */
export interface MenuOptions {
    /** Заголовок меню: ключ словаря или сам текст; если не задан — имя меню. */
    title?: string;
    /** Секунды отсчёта при открытии меню, например 10; если не задано — без отсчёта. */
    time?: number;
    /** Скрытие кнопки "Назад": true убирает её. */
    hideBack?: boolean;
    /** Скрытие кнопки "Выход": true убирает её. */
    hideExit?: boolean;
    /** Блокировка меню: пока true, пункты нельзя выбрать и другое меню не заменяет это. */
    locked?: boolean;
    /** Проверка, при которой меню открывается: пока она отвечает игроку «нет», меню ему не открывается. */
    activeWhen?: (player: Player) => boolean;
}
/**
 * Настройки показа меню. Любое поле можно не задавать:
 *
 *     shop.show(player, { time: 10 });
 */
export interface MenuShowOptions {
    /** Секунды отсчёта; если не заданы, идущий отсчёт продолжается или начинается собственный отсчёт меню. */
    time?: number;
    /** Игрок, о котором меню, — его номер: %target% и цель, которую получает действие; если не задан — 0. */
    target?: number;
    /** Новый путь назад: true забывает меню, из которых открыто это. */
    resetHistory?: boolean;
    /** Открытие поверх меню, которое держится, — с отсчётом или заблокированного: true открывает всё равно. */
    force?: boolean;
    /** Пропуск меню на пути назад: true его не запоминает. */
    skipHistory?: boolean;
}
/**
 * Настройки пункта, кроме текста. Любое поле можно не задавать:
 *
 *     shop.addItem("Heal", {
 *         visible: player => player.health < 100,
 *         onSelect: (player) => { player.health = 100; },
 *     });
 */
export interface MenuItemOptions {
    /** Функция, которая выполняется при выборе пункта: игрок, который выбрал, и цель — строки в меню-списке, иначе меню. */
    onSelect?: (player: Player, target: number) => void;
    /** Проверка, при которой пункт показан: пока она отвечает «нет», пункта нет и слот он не занимает. */
    visible?: (player: Player, target: number) => boolean;
    /** Проверка, при которой пункт можно выбрать: пока она отвечает «нет», пункт погашен. */
    enabled?: (player: Player, target: number) => boolean;
    /** Текст рядом с пунктом, пока `enabled` его гасит, например "(full)". */
    message?: string;
    /** Текст после имени пункта, с плейсхолдерами, например "%hp%". */
    placeholder?: string;
    /** Имена условий из `addCondition()`, без которых пункт погашен; "!NAME" — наоборот; несколько через пробел должны выполняться все. */
    condition?: string;
    /** Имена действий из `addAction()`, которые выполняются при выборе пункта, или встроенное: "SHOW_<MENU>", "CLOSE_MENU". */
    action?: string;
    /** Имена ограничений из `addRestriction()`, "ADMIN" или "FLAG_<буквы>": пункт погашен, пока не пройдено каждое. */
    restriction?: string;
    /** Текст рядом с пунктом, пока его гасит ограничение, — одно сообщение на все или своё для каждого, как в "NAME:сообщение|NAME2:сообщение". */
    restrictionMessage?: string;
    /** Место пункта среди пунктов, от 0; если не задано — в конце. */
    at?: number;
    /** Пустые строки перед пунктом. */
    spaceBefore?: number;
    /** Пустые строки после пункта. */
    spaceAfter?: number;
}
/** Проверка условия, как её регистрирует `addCondition()`. В меню-списке `player` — игрок строки, `viewer` — тот, кто смотрит. */
export type ConditionTest = (player: Player, viewer: Player, name: string) => boolean;
/** Действие, как его регистрирует `addAction()`: `target` — цель строки в меню-списке, иначе меню. */
export type ActionHandler = (player: Player, target: number, name: string) => void;
/** Значение плейсхолдера: текст, которым заменяется %name%. */
export type PlaceholderValue = (player: Player, target: number, name: string) => string;
/** Проверка ограничения, как её регистрирует `addRestriction()`; `name` — токен целиком, вместе с "NAME:param". */
export type RestrictionTest = (player: Player, name: string, target: number) => boolean;
/** Проверка действия пункта, как её регистрирует `addActionCheck()`: false гасит пункт. */
export type ActionTest = (player: Player, menu: string, action: string) => boolean;
/** Фильтр над условием, которое зарегистрировал кто-то другой: получает его значение и возвращает то, что будет использовано. */
export type ConditionFilter = (player: Player, viewer: Player, name: string, value: boolean) => boolean;
/** Проверка строки меню-списка, как её принимает `addFilter()`: `player` — игрок строки, `viewer` — тот, кто смотрит. */
export type RowTest = (player: Player, viewer: Player) => boolean;
/** Источник списка: строки меню-списка для игрока, который смотрит; null — вместо них список игроков. */
export type ListSource = (viewer: Player, menu: string) => ListRow[] | null;
/** Тип события меню, одно из "open" и "close" — когда это происходит, или "show" — до открытия меню, чтобы его остановить. */
export type MenuEventType = "open" | "close" | "show";
/** Настройки Menu Core: `menus` в amxts.config.ts. */
export interface MenuCoreOptions {
    /** Файл меню от configs/ без ".ini": например, "menu" — configs/menu.ini, "myserver/menu" — configs/myserver/menu.ini. */
    file: string;
    /** Файл, который читается вместо `file`, если в том нет меню, например "menu" — configs/menu.ini; "" — никакой. */
    fallback: string;
}
declare module "@amxts/core" {
    interface ModuleOptions {
        menus?: Partial<MenuCoreOptions>;
    }
}
