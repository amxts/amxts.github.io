import { Player } from "~/facade";
/**
 * Menu properties: mc_set_menu_property takes MP_LOCKED .. MP_HIDE_EXIT,
 * mc_set_menu_property_string MP_ON_TIMEOUT .. MP_FILTER, and
 * mc_get_menu_property_string MP_SECTION.
 */
export declare enum MenuProperty {
    MP_LOCKED = 0,
    MP_GLOBAL_TIMER = 1,
    MP_TIMER_DURATION = 2,
    MP_HIDE_BACK = 3,
    MP_HIDE_EXIT = 4,
    MP_SECTION = 5,
    MP_ON_TIMEOUT = 5,
    MP_ACTIVE_ON = 6,
    MP_FILTER = 7
}
/**
 * Registers a condition menus refer to - an item's condition, ACTIVE_ON, a
 * FILTER. The first plugin to register a name answers for it (case-insensitive).
 * Callback: public callback(id, viewerId, const name[]) - true when it holds.
 * Returns the condition's id.
 */
export declare function mc_register_condition(name: string, callback: string): number;
/**
 * Registers an action run when an item is chosen. Built in, not registered:
 * SHOW_<SECTION> opens that menu, CLOSE_MENU closes it; an action line may
 * list several, space-separated. Names are case-sensitive; the first wins.
 * Callback: public callback(id, const action[]) in an items menu,
 * public callback(id, targetId) in a LIST_ menu. isCritical is accepted and
 * does nothing, as in the original. Returns the action's id.
 */
export declare function mc_register_action(name: string, callback: string, _isCritical?: boolean): number;
/**
 * Registers a placeholder, %name% in titles and items, without the %.
 * Callback: public callback(id, targetId, value[], len) - fills value[].
 * A name registered again keeps the first. Returns the placeholder's id.
 */
export declare function mc_register_placeholder(name: string, callback: string): number;
/**
 * Registers the config file's [section] as a menu. Returns the menu's id, or
 * -1 when the section is missing, has no TITLE or no items, or is MAIN.
 */
export declare function mc_register_menu(section: string): number;
/**
 * Shows a menu. time: countdown seconds, -1 for the menu's TIME (or the
 * countdown running). targetId: who a LIST_ menu is about. resetHistory
 * starts the way back anew; forceOpen opens over a menu that holds on (a
 * countdown, a lock); ignoreHistory leaves this menu out of the way back.
 * Returns 1 when it opened; 0 when the player is not in the game, there is no
 * such menu, a show filter or ACTIVE_ON stopped it.
 */
export declare function mc_show_menu(player: Player, section: string, time?: number, targetId?: number, resetHistory?: boolean, forceOpen?: boolean, ignoreHistory?: boolean): 1 | 0;
/**
 * Sets the menu's shared countdown: starts one of `time` seconds when none
 * runs, or changes the seconds left (0 stops it). Returns 1, or 0 when there
 * is no such menu or nothing to change.
 */
export declare function mc_set_menu_timer(section: string, time: number): 1 | 0;
/** Draws again every menu that uses the condition, for whoever looks at it. */
export declare function mc_notify_condition_changed(condition: string): void;
/** Draws the menus again (space-separated names) for whoever looks at them. Returns how many were drawn. */
export declare function mc_refresh_menu(sections: string): number;
/**
 * Registers a restriction items name in their restriction column; "*"
 * answers for every name no other restriction does. Callback:
 * public callback(id, const restrictName[], targetId) - true when the player
 * passes. message is said beside an item it greys out, when the item has no
 * message of its own. Returns the restriction's id.
 */
export declare function mc_register_restriction(name: string, callback: string, message?: string): number;
/**
 * Greys out items whose action is actionName in menuSection while the
 * callback says no; "" for either matches all. Callback:
 * public callback(id, const menuSection[], const actionName[]). Returns 1.
 */
export declare function mc_register_action_condition(menuSection: string, actionName: string, callback: string): number;
/**
 * Registers a filter over a condition someone else registered: it gets the
 * condition's value and returns the one to use. Callback:
 * public bool:callback(id, viewerId, const condition[], bool:currentVal).
 * Returns the filter's id.
 */
export declare function mc_register_condition_filter(condition: string, callback: string): number;
/**
 * The rows of a LIST_ menu, instead of the players. Callback:
 * public callback(id, Array:items) - pushes 289-cell items and returns 1:
 * [0] the target the action gets (-2: a line of text), [1..64] an action of
 * its own, [65..128] the text (%name%), [129..160] a restriction,
 * [161..288] the message when it greys the row out. A second source for the
 * menu replaces the first. Returns the source's id.
 */
export declare function mc_register_list_data_source(menuName: string, callback: string): number;
/** Called when a menu opens. Callback: public callback(id, const section[]). Returns its id. */
export declare function mc_register_menu_open_callback(callback: string): number;
/**
 * Called when a menu closes - by a key, a timeout, another menu opening over
 * it, the player leaving. Callback: public callback(id, const section[], bool:isTimeout).
 * Returns its id.
 */
export declare function mc_register_menu_close_callback(callback: string): number;
/**
 * Asked before any menu opens; returning false stops it (mc_show_menu returns
 * 0) - the place to tell the player why. Callback:
 * public bool:callback(id, const section[]). Returns its id.
 */
export declare function mc_register_show_filter(callback: string): number;
/** Stops the menu's shared countdown and closes it for everyone. Returns 1, or 0 when none ran. */
export declare function mc_cancel_menu_timer(section: string): 1 | 0;
/** Locks (or unlocks) the player's menu: nothing can be chosen, and no other menu replaces it. */
export declare function mc_lock_menu(player: Player, lock?: boolean): void;
/** Closes the player's menu. */
export declare function mc_hide_menu(player: Player): void;
/** Whether the player's menu is locked. */
export declare function mc_is_menu_locked(player: Player): boolean;
/** The id of the menu the player looks at, or -1. */
export declare function mc_get_active_menu(id: number): number;
/**
 * A string property of a menu by its id (mc_get_active_menu): MP_SECTION, the
 * section name, into out[]. Returns its length; 0 when the id or the property
 * is not one.
 */
export declare function mc_get_menu_property_string(menuIdx: number, property: MenuProperty): string;
/**
 * Sets MP_LOCKED, MP_GLOBAL_TIMER, MP_TIMER_DURATION, MP_HIDE_BACK or
 * MP_HIDE_EXIT. Returns 1, or 0 when there is no such menu or property.
 */
export declare function mc_set_menu_property(section: string, property: MenuProperty, value: number): 1 | 0;
/**
 * Sets MP_ON_TIMEOUT (the action when the countdown ends), MP_ACTIVE_ON (the
 * condition the menu opens under) or MP_FILTER ("CONDITION|MESSAGE", added to
 * a LIST_ menu's filters). Returns 1, or 0 when there is no such menu or
 * property.
 */
export declare function mc_set_menu_property_string(section: string, property: MenuProperty, value: string): 1 | 0;
/**
 * Adds an item to a menu. name, condition and action take "A|B" variants: the
 * first whose condition holds is shown. iPosition: its place among the items,
 * -1 the end; emptyBefore/emptyAfter: blank lines around it. Returns 1, or 0
 * when there is no such menu or the name gives no item.
 */
export declare function mc_add_menu_item(section: string, name: string, placeholder?: string, condition?: string, action?: string, restriction?: string, restrictMsg?: string, iPosition?: number, emptyBefore?: number, emptyAfter?: number): 1 | 0;
/**
 * Adds an item that always takes slot 1-7 of every page. Returns 1, or 0 when
 * there is no such menu or the name gives no item.
 */
export declare function mc_add_fixed_menu_item(section: string, slot: number, name: string, placeholder?: string, action?: string, condition?: string, restriction?: string, emptyBefore?: number, emptyAfter?: number): 1 | 0;
/**
 * Adds a line of text - a header, a separator - to the items a data source
 * fills; call it from the data source callback. Returns 1.
 */
export declare function mc_add_list_text(aItems: number, text: string, centered?: boolean): number;
/** Removes every item of a menu, fixed ones too. Returns 1, or 0 when there is no such menu. */
export declare function mc_clear_menu_items(section: string): 1 | 0;
/**
 * Makes a menu in code, without a config section; a name starting with LIST_
 * makes a list menu. Returns 1, or 0 when a menu of that name is there.
 */
export declare function mc_create_menu(section: string, title: string): 1 | 0;
/** The page, from 0, the player's menu is drawn at next. */
export declare function mc_set_menu_page(player: Player, page: number): void;
/**
 * Not in the original menu_core: the text the player's menu shows now, colour
 * codes and all ("" when none is open) - for a test or a log to see what the
 * player sees.
 */
export declare function mc_get_menu_text(player: Player): string;
