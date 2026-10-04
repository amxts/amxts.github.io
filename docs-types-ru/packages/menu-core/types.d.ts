/**
 * The types of Menu Core's API: options, rows and the callbacks plugins
 * register.
 */
import { Player } from "@amxts/core";
import { Menu } from "./menus";
/** Вид меню, одно из `"items"` (список пунктов) или `"list"` (строка на игрока или на строку источника). */
export type MenuKind = "items" | "list";
/**
 * Контекст меню, который получают его функции: игрок, который смотрит, о ком
 * или о чём меню и само меню.
 *
 *     shop.addItem({ title: ({ player }) => `Heal (${player.health} HP)`, onSelect: ({ player }) => heal(player) });
 */
export interface MenuContext {
    /** Игрок, которому показано меню: тот, кто его смотрит и выбирает. */
    player: Player;
    /** Игрок, о котором меню: игрок строки в меню-списке, тот, кого передали `show()` в `target`, в меню пунктов; сам `player`, если такого нет. */
    target: Player;
    /** Номер строки в меню-списке, как его дал `listRow()`, — например, сущность или индекс самого источника; в списке игроков — `id` игрока. В меню пунктов — `id` цели меню, `0`, если её нет. */
    row: number;
    /** Меню, для которого вызвана функция. */
    menu: Menu;
}
/** Контекст функции, зарегистрированной по имени, — действия, плейсхолдера, ограничения, проверки действия: контекст меню и имя, по которому её спросили. */
export interface NamedContext extends MenuContext {
    /** Имя, по которому её спросили: имя действия или плейсхолдера, токен ограничения целиком — вместе с `"NAME:param"`; для проверки действия — действие пункта. */
    name: string;
}
/**
 * Текст меню — заголовок, пункт, сообщение: сам текст или функция, которая
 * даёт его по контексту меню. Ключ словаря переводится в обоих случаях.
 * Цветовые метки — буквы чата: `!y` жёлтый, `!r` красный, `!d`
 * серый, `!w` белый, `!R` — к правому краю; метки только для чата `!g`, `!b` и `!t`
 * убираются.
 *
 *     menus.create("SHOP", { title: ({ player }) => `Shop for ${player.name}` });
 */
export type MenuText = string | ((context: MenuContext) => string);
/** Строка меню-списка, как её отдаёт источник, — из `listRow()` или `textRow()`. */
export interface ListRow {
    /** Вид строки, одно из `"item"` (строка для выбора) или `"text"` (строка текста, не выбор). */
    kind: "item" | "text";
    /** Номер строки, `row` в контексте, который получают функции её пункта: например, `id` игрока, сущность или индекс самого источника; `0` у строки текста. */
    target: number;
    /** Текст строки, который подставляется вместо `%name%` в шаблон строки меню. */
    text: string;
    /** Собственные имена действий строки, вместо действий шаблона; `""` — действия шаблона. */
    action: string;
    /** Имена ограничений через пробел: строка погашена, пока не пройдено каждое. */
    restriction: string;
    /** Текст рядом со строкой, пока она погашена; `""` — сообщение самого ограничения. */
    restrictionMessage: string;
}
/**
 * Настройки меню, сделанного через `create()`. Любое поле можно не задавать:
 *
 *     menus.create("SHOP", { title: "Shop", time: 30, activeWhen: ({ player }) => player.isAlive });
 */
export interface MenuOptions {
    /** Заголовок меню: сам текст — или ключ словаря — либо функция, которая даёт его по контексту меню; если не задан — имя меню. */
    title?: MenuText;
    /** Секунды отсчёта при открытии меню, например `10`; если не задано — без отсчёта. */
    time?: number;
    /** Скрытие кнопки `"Назад"`: `true` убирает её. */
    hideBack?: boolean;
    /** Скрытие кнопки `"Выход"`: `true` убирает её. */
    hideExit?: boolean;
    /** Блокировка меню: пока `true`, пункты нельзя выбрать и другое меню не заменяет это. */
    locked?: boolean;
    /** Проверка, при которой меню открывается: пока она отвечает «нет», меню игроку не открывается. */
    activeWhen?: (context: MenuContext) => boolean;
}
/**
 * Настройки показа меню. Любое поле можно не задавать:
 *
 *     shop.show(player, { time: 10 });
 */
export interface MenuShowOptions {
    /** Секунды отсчёта; если не заданы, идущий отсчёт продолжается или начинается собственный отсчёт меню. */
    time?: number;
    /** Игрок, о котором меню: `target` в контексте, который получают его функции, и `%target%`. */
    target?: Player;
    /** Новый путь назад: `true` забывает меню, из которых открыто это. */
    resetHistory?: boolean;
    /** Открытие поверх меню, которое держится, — с отсчётом или заблокированного: `true` открывает всё равно. */
    force?: boolean;
    /** Пропуск меню на пути назад: `true` его не запоминает. */
    skipHistory?: boolean;
}
/**
 * Пункт: его заголовок, когда он показан и когда его можно выбрать и что
 * делает выбор. Любое поле, кроме `title`, можно не задавать:
 *
 *     shop.addItem({
 *         title: ({ player }) => `Heal (${player.health} HP)`,
 *         visible: ({ player }) => player.health < 100,
 *         onSelect: ({ player }) => {
 *             player.health = 100;
 *         },
 *     });
 */
export interface MenuItemOptions {
    /** Текст пункта — или ключ словаря — либо функция, которая даёт его по контексту меню. */
    title: MenuText;
    /** Функция, которая выполняется при выборе пункта; после неё меню перерисовывается, если осталось открытым. */
    onSelect?: (context: MenuContext) => void;
    /** Проверка, при которой пункт показан: пока она отвечает «нет», пункта нет и слот он не занимает. */
    visible?: (context: MenuContext) => boolean;
    /**
     * Проверка, при которой пункт можно выбрать, — пока она отвечает «нет»,
     * пункт погашен, а рядом `message`; или список требований, у каждого своё
     * сообщение, — первое невыполненное даёт своё.
     *
     *     enabled: [
     *         { when: ({ player }) => player.frags >= 5, message: "5 frags needed" },
     *         { when: ({ player }) => player.armor < 100, message: ({ player }) => `(${player.armor} already)` },
     *     ],
     */
    enabled?: ((context: MenuContext) => boolean) | Requirement[];
    /** Текст рядом с пунктом, пока его гасит `enabled`, — для требования без своего сообщения: сам текст, например `"(full)"`, или функция, которая даёт его по контексту меню. */
    message?: MenuText;
    /** Текст после заголовка пункта — для пунктов файлов меню и Pawn-плагинов, с плейсхолдерами, например `"%hp%"`; в коде заголовок — функция. */
    placeholder?: string;
    /** Имена действий из `addAction()`, которые выполняются при выборе пункта, или встроенное: `"SHOW_<MENU>"`, `"CLOSE_MENU"`. */
    action?: string;
    /** Место пункта среди пунктов, от `0`; если не задано — в конце. */
    at?: number;
    /** Пустые строки перед пунктом. */
    spaceBefore?: number;
    /** Пустые строки после пункта. */
    spaceAfter?: number;
}
/**
 * Требование пункта в списке, который принимает `enabled`: пока `when`
 * отвечает «нет», пункт погашен, а рядом `message`.
 *
 *     { when: ({ player }) => player.frags >= 5, message: "5 frags needed" }
 */
export interface Requirement {
    /** Проверка, при которой требование выполнено, по контексту меню. */
    when: (context: MenuContext) => boolean;
    /** Текст рядом с пунктом, пока `when` отвечает «нет»: сам текст, ключ словаря или функция, которая даёт его по контексту меню; если не задан — `message` пункта. */
    message?: MenuText;
}
/** Проверка условия, как её регистрирует `addCondition()`. В меню-списке `player` — игрок строки, `viewer` — тот, кто смотрит. */
export type ConditionTest = (player: Player, viewer: Player, name: string) => boolean;
/** Действие, как его регистрирует `addAction()`: выполняется с контекстом выбранного пункта и именем действия. */
export type ActionHandler = (context: NamedContext) => void;
/** Значение плейсхолдера: текст, которым заменяется `%name%`, по контексту текста, в котором он стоит. */
export type PlaceholderValue = (context: NamedContext) => string;
/** Проверка ограничения, как её регистрирует `addRestriction()`; `name` — токен целиком, вместе с `"NAME:param"`. */
export type RestrictionTest = (context: NamedContext) => boolean;
/** Проверка действия пункта, как её регистрирует `addActionCheck()`: `name` — действие, а `false` гасит пункт. */
export type ActionTest = (context: NamedContext) => boolean;
/** Фильтр над условием, которое зарегистрировал кто-то другой: получает его значение и возвращает то, что будет использовано. */
export type ConditionFilter = (player: Player, viewer: Player, name: string, value: boolean) => boolean;
/** Проверка строки меню-списка, как её принимает `addFilter()`: `target` — игрок строки, `player` — тот, кто смотрит. */
export type RowTest = (context: MenuContext) => boolean;
/** Источник списка: строки меню-списка для игрока, который смотрит; `null` — вместо них список игроков. */
export type ListSource = (context: MenuContext) => ListRow[] | null;
/** Тип события меню, одно из `"open"` и `"close"` — когда это происходит, или `"show"` — до открытия меню, чтобы его остановить. */
export type MenuEventType = "open" | "close" | "show";
/** Настройки Menu Core: `menus` в `amxts.config.ts`. */
export interface MenuCoreOptions {
    /** Файл меню от `configs/`: например, `"menu"` — `configs/menu.ini`, `menu.yaml`, `menu.yml`, `menu.json` или `menu.jsonc` — первый, который есть; `"myserver/menu.yaml"` — этот файл. */
    file: string;
    /** Файл, который читается вместо `file`, если тот пуст или его нет, например `"menu"` — `configs/menu.ini` или `menu.yaml`; `""` — никакой. */
    fallback: string;
}
declare module "@amxts/core" {
    interface ModuleOptions {
        menus?: Partial<MenuCoreOptions>;
    }
}
