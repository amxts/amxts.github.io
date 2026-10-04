/**
 * Menu Core's menus: the Menu object, the functions of the module, and how a
 * menu is drawn and chosen from.
 */
import { Player } from "@amxts/core";
import { ActionHandler, ActionTest, ConditionFilter, ConditionTest, ListRow, ListSource, MenuContext, MenuEventType, MenuItemOptions, MenuKind, MenuOptions, MenuShowOptions, PlaceholderValue, RestrictionTest, RowTest } from "./types";
/**
 * A menu: read from a menu file, or made with `create()`. The fields are what
 * the file sets; the methods fill the menu, open it and count it down.
 *
 *     const shop = menus.create("SHOP", { title: "Shop" });
 *     shop.addItem({ title: "Heal", onSelect: ({ player }) => heal(player) });
 *     shop.show(player);
 */
export declare class Menu {
    /** The menu's name - its name in the menu file, e.g. `"MAIN_MENU"`. */
    readonly name: string;
    /** The menu's title: the text - a lang key too - or a function that gives it for the menu's context. */
    title: string | ((context: MenuContext) => string);
    /** The menu's kind, one of `"items"` (a list of items) or `"list"` (a row per player, or per row of a list source). A name starting with `LIST_` makes a list. */
    readonly kind: MenuKind;
    /** Hiding of the `"Back"` button: `true` leaves it out. */
    hideBack: boolean;
    /** Hiding of the `"Exit"` button: `true` leaves it out. */
    hideExit: boolean;
    /** A lock on the menu: while `true`, items cannot be chosen and no other menu replaces this one. */
    locked: boolean;
    /** One countdown for everyone looking at the menu (`true`), rather than one per player. */
    sharedTimer: boolean;
    /** Seconds on the countdown when the menu opens, e.g. `10`; `0` for none. */
    time: number;
    /** Action names run when the countdown ends, e.g. `"CLOSE_MENU"`; `""` closes the menu. */
    onTimeout: string;
    /** Condition names the menu opens only under, space-separated, e.g. `"IS_ALIVE !IS_SPECTATOR"`; `""` for always. */
    activeOn: string;
    /** Seconds left on the shared countdown; `0` while none runs. */
    countdown: number;
    constructor(
    /** The menu's name - its name in the menu file, e.g. `"MAIN_MENU"`. */
    name: string, 
    /** The menu's title: the text - a lang key too - or a function that gives it for the menu's context. */
    title: string | ((context: MenuContext) => string));
    /**
     * Adds an item: its title, when it is shown and can be chosen, and what
     * choosing it does - each a function of the menu's context where it
     * depends on who looks.
     *
     *     shop.addItem({
     *         title: ({ player }) => `Heal (${player.health} HP)`,
     *         visible: ({ player }) => player.isAlive,
     *         onSelect: ({ player }) => {
     *             player.health = 100;
     *         },
     *     });
     */
    addItem(item: MenuItemOptions): void;
    /** Adds an item that takes the same slot on every page: `slot` is its key, `1` to `7`; the item as `addItem()` takes it. */
    addFixedItem(slot: number, item: MenuItemOptions): void;
    /** Removes every item of the menu, fixed ones too. */
    clearItems(): void;
    /** A filter of a list menu: rows `test` says no to are left out - `target` is the row's player - and `message` is said when none is left. */
    addFilter(test: RowTest, message?: string): void;
    /** A placeholder of this menu, for menu files and Pawn plugins: the text `%name%` stands for, before the ones registered with `addPlaceholder()`. In code the text is a function instead. */
    addPlaceholder(name: string, value: PlaceholderValue): void;
    /** The source of this list menu's rows, instead of the players. */
    setListSource(rows: ListSource): void;
    /** Calls `listener` on this menu's events of `type`, one of `"open"`, `"close"` or `"show"` (before it opens). */
    addEventListener(type: MenuEventType, listener: MenuListener): void;
    /**
     * Shows the menu to the player; `false` when it does not open - a `"show"`
     * listener stopped it, it is not active, or the player's menu holds on.
     */
    show(player: Player, options?: MenuShowOptions): boolean;
    /** Runs an action line as a choice in this menu does: space-separated action names, `CLOSE_MENU` and `SHOW_<MENU>` among them; `target` is the player it is about. */
    runActions(player: Player, line: string, target?: Player): void;
    /** Draws the menu again for whoever looks at it; the number of players it was drawn for. */
    refresh(): number;
    /** Closes the menu for whoever looks at it. */
    close(): void;
    /**
     * Sets the shared countdown: starts it when none runs, or changes the
     * seconds left - `0` stops it where it is. `false` when there is nothing to change.
     */
    setTimer(seconds: number): boolean;
    /** Stops the shared countdown and closes the menu for everyone looking at it. `false` when none ran. */
    cancelTimer(): boolean;
}
/** A menu event: the `player`, the `menu`, and on `"close"` whether its `timeout` ran out. */
export declare class MenuEvent {
    /** The player whose menu it is. */
    player: Player;
    /** The menu the event is about. */
    menu: Menu;
    /** On `"close"`: `true` when the menu closed because its time ran out. */
    timeout: boolean;
    /** A mark of `preventDefault()`: `true` once it was called. */
    defaultPrevented: boolean;
    constructor(
    /** The player whose menu it is. */
    player: Player, 
    /** The menu the event is about. */
    menu: Menu, 
    /** On `"close"`: `true` when the menu closed because its time ran out. */
    timeout: boolean);
    /** On `"show"`: keeps the menu from opening. */
    preventDefault(): void;
}
/** A listener of menu events, as `addEventListener()` calls it. */
export type MenuListener = (event: MenuEvent) => void;
/**
 * Sets the file menus are read from, under `configs/`: without an extension,
 * the first of `.ini`, `.yaml`, `.yml`, `.json` and `.jsonc` that is there. Read when
 * a menu is first asked for; `fallback` is read instead when `file` is empty.
 */
export declare function setConfigFile(file: string, fallback?: string): void;
/** A menu by its name; `null` when there is none - `register()` reads one from the file. */
export declare function find(name: string): Menu | null;
/** A menu's number among all of them - the one Pawn plugins know it by; `-1` for none. */
export declare function indexOf(menu: Menu | null): number;
/** The menu with that number among all of them - the reverse of `indexOf()`; `null` when there is none. */
export declare function menuAt(index: number): Menu | null;
/** The menu of that name in the menu file, read now if it is not yet; `null` when the file has no such menu, or no items in it. */
export declare function register(name: string): Menu | null;
/**
 * A menu made in code - or the one of that name already there, as it is. A
 * name starting with `LIST_` makes a list menu.
 */
export declare function create(name: string, options?: MenuOptions): Menu;
/** Registers a condition by name, for menu files and Pawn plugins; the first one registered under a name is the one asked - a built-in one (`IS_ALIVE`, `TEAM_CT`, ...) too. */
export declare function addCondition(name: string, test: ConditionTest): number;
/** Registers an action by name, for menu files and Pawn plugins; `SHOW_<MENU>` and `CLOSE_MENU` are built in. */
export declare function addAction(name: string, run: ActionHandler): number;
/** Registers a placeholder for menu files and Pawn plugins: the text `%name%` stands for in titles and items. A name registered twice keeps the first. In code the text is a function instead. */
export declare function addPlaceholder(name: string, value: PlaceholderValue): number;
/** Registers a restriction by name, for menu files to name in `enabled` and `when`: `message` is said beside an item it greys out, unless the item or the requirement has its own; `"*"` answers for every name nothing else does. */
export declare function addRestriction(name: string, test: RestrictionTest, message?: string): number;
/** Greys out items with `action` in `menu` while `test` says no; `""` for either means every one. */
export declare function addActionCheck(menu: string, action: string, test: ActionTest): number;
/** Registers a filter over the condition `name`, whoever registered it: it gets the condition's value and returns the one to use. */
export declare function addConditionFilter(name: string, filter: ConditionFilter): number;
/** Sets the source of the rows of the list menu of that name, instead of the players; a second source replaces the first. */
export declare function setListSource(menu: string, rows: ListSource): number;
/** Calls `listener` on every menu event of `type`, one of `"open"`, `"close"` or `"show"` (before a menu opens). */
export declare function addEventListener(type: MenuEventType, listener: MenuListener): number;
/** A row for a list source: its number - `row` of the context its item's functions get - its text, and optionally an action, a restriction and its message. */
export declare function listRow(target: number, text: string, action?: string, restriction?: string, restrictionMessage?: string): ListRow;
/** A line of text among a list source's rows; `centered` pads it to the middle of the menu. */
export declare function textRow(text: string, centered?: boolean): ListRow;
/**
 * Shows the menu of that name - one made in code, or one of the file;
 * `false` when it does not open: no such menu, a `"show"` listener stopped it,
 * it is not active, or the player's menu holds on.
 */
export declare function show(player: Player, name: string, options?: MenuShowOptions): boolean;
/** Closes the player's menu; `timeout` tells the `"close"` listeners the time ran out. */
export declare function close(player: Player, timeout?: boolean): void;
/** Draws the menus again for whoever looks at them; `names` are space-separated. The number of players they were drawn for. */
export declare function refresh(names: string): number;
/** Tells the menus a condition's value changed: the menus drawn with it are drawn again. */
export declare function conditionChanged(name: string): void;
/** The menu the player looks at, or `null`. */
export declare function activeMenu(player: Player): Menu | null;
/** The text of the player's menu, as it was last drawn; `""` when none is open. */
export declare function shownText(player: Player): string;
/** Locks the player's menu: no item can be chosen and no other menu replaces it until it is unlocked or closed. */
export declare function lock(player: Player, locked?: boolean): void;
/** Whether the player's menu is locked - see `lock()`. */
export declare function isLocked(player: Player): boolean;
/** Sets the page the player's menu is drawn at next, from `0`. */
export declare function setPage(player: Player, page: number): void;
/** Whether an action of that name is registered. */
export declare function hasAction(name: string): boolean;
/** Whether an item name of a menu file gives an item - e.g. `"A|B"` gives two variants; `""` and `"|"` give none. */
export declare function hasText(name: string): boolean;
