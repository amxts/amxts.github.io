/**
 * Menu Core — an opinionated way to create menus: from an ini file or in code,
 * with conditions, placeholders and lists. How to use it: README.md.
 */
import { MenuItemOptions, MenuShowOptions, Player } from "~/facade";
import { ActionHandler, ActionTest, ConditionFilter, ConditionTest, ListRow, ListSource, Menu, MenuCoreOptions, MenuEventType, MenuListener, PlaceholderValue, RestrictionTest } from "./types";
export * from "./types";
declare const _default: AmxtsModule<MenuCoreOptions>;
export default _default;
/**
 * The file menus are read from, under configs/ and without ".ini"; read when a
 * menu is first asked for. `fallback` is read instead when `file` has no sections.
 */
export declare function setConfigFile(file: string, fallback?: string): void;
/** A menu by its name; null when there is none - see register() for one in the file. */
export declare function find(name: string): Menu | null;
/** A menu's place among all of them - what mc_get_active_menu gives Pawn; -1 for none. */
export declare function indexOf(menu: Menu | null): number;
export declare function menuAt(index: number): Menu | null;
/** The menu of the file's [name] section, read now if it is not yet; null when it has none or no items. */
export declare function register(name: string): Menu | null;
/** A menu made in code - or the one of that name already there. A name starting with LIST_ makes a list menu. */
export declare function create(name: string, title: string): Menu;
/**
 * An item. "A|B" in the name, the condition or the action are variants: the
 * first whose condition holds is shown. False when the name gives none.
 */
export declare function addItem(menu: Menu, name: string, options?: MenuItemOptions): boolean;
/** An item that always takes slot 1-7 of every page. */
export declare function addFixedItem(menu: Menu, slot: number, name: string, options?: MenuItemOptions): boolean;
export declare function clearItems(menu: Menu): void;
/** A list menu leaves out rows that fail `condition`; `message` is said when none is left. */
export declare function addFilter(menu: Menu, condition: string, message?: string): void;
/** The menu opens only while `condition` holds. */
export declare function setActiveOn(menu: Menu, condition: string): void;
/** A condition the file names; the first one registered under a name is the one asked. */
export declare function addCondition(name: string, test: ConditionTest): number;
/** An action the file names; SHOW_<MENU> and CLOSE_MENU are built in. */
export declare function addAction(name: string, run: ActionHandler): number;
/** What %name% stands for in titles and items. A name registered twice keeps the first. */
export declare function addPlaceholder(name: string, value: PlaceholderValue): number;
/** A restriction items name; "*" answers for every name nothing else does. */
export declare function addRestriction(name: string, test: RestrictionTest, message?: string): number;
/** Greys out items with `action` in `menu` while `test` says no; "" for either means every one. */
export declare function addActionCheck(menu: string, action: string, test: ActionTest): number;
/** Another say on the condition `name`, whoever registered it. */
export declare function addConditionFilter(name: string, filter: ConditionFilter): number;
/** The rows of the list menu `menu`, instead of the players; a second source replaces the first. */
export declare function setListSource(menu: string, rows: ListSource): number;
export declare function addEventListener(type: MenuEventType, listener: MenuListener): number;
/** A row for a list source. */
export declare function listRow(target: number, text: string, action?: string, restriction?: string, restrictionMessage?: string): ListRow;
/** A line of text among a list source's rows; `centered` pads it to the middle of the menu. */
export declare function textRow(text: string, centered?: boolean): ListRow;
/**
 * Shows a menu; false when it does not open - no such menu, a "show"
 * listener stopped it, ACTIVE_ON does not hold, or the player's menu holds on.
 */
export declare function show(player: Player, name: string, options?: MenuShowOptions): boolean;
/** Closes the player's menu; `timeout` tells the "close" listeners it ran out. */
export declare function close(player: Player, timeout?: boolean): void;
/** Draws the menus again for whoever looks at them; `names` are space-separated. How many were drawn. */
export declare function refresh(names: string): number;
/** A condition's value changed: the menus drawn with it are drawn again. */
export declare function conditionChanged(name: string): void;
/** The menu the player looks at, or null. */
export declare function activeMenu(player: Player): Menu | null;
/** What the player's menu shows, as it was last drawn; "" when none is open. */
export declare function shownText(player: Player): string;
/** Stops the player choosing items - and other menus replacing this one - until unlocked or closed. */
export declare function lock(player: Player, locked?: boolean): void;
export declare function isLocked(player: Player): boolean;
/** The page the player's menu is drawn at next. */
export declare function setPage(player: Player, page: number): void;
/**
 * Sets the shared countdown of a menu: starts it when none runs, or changes
 * the seconds left - 0 stops it where it is. False when there is nothing to change.
 */
export declare function setTimer(menu: Menu, seconds: number): boolean;
/** Stops the shared countdown and closes the menu for everyone looking at it. False when none ran. */
export declare function cancelTimer(menu: Menu): boolean;
/** Whether an action of that name is registered. */
export declare function hasAction(name: string): boolean;
/** Runs an action line: space-separated actions, CLOSE_MENU and SHOW_<MENU> among them. */
export declare function runActions(player: Player, line: string, target?: number): void;
