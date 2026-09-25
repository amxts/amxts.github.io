import type { Memory } from './memory';
import type { ArgValue, FakePlayer, FakeServer, NativeResult } from './server';
/** The host plugin's id: what caller() is for a TypeScript plugin calling a native. */
export declare const HOST_PLUGIN = 0;
/** What a player's screen shows. */
export interface MenuScreen {
    text: string;
    /** Keys that answer: 1-9 and 0. */
    keys: number[];
    /** The title show_menu was given - the menu's name. */
    title: string;
}
/** An array a Pawn public was handed: its cells, and as text. */
export declare class PawnArray {
    cells: number[];
    constructor(cells: number[]);
    get text(): string;
    /** Fills it as formatex(value, charsmax(value), ...) would. */
    set(text: string): void;
}
type PawnPublic = (...args: any[]) => number | boolean | void;
/** A Pawn plugin in a test: its publics, and natives called on its behalf. */
export declare class FakePawnPlugin {
    readonly kit: MenuKit;
    readonly id: number;
    readonly file: string;
    readonly publics: Record<string, PawnPublic>;
    constructor(kit: MenuKit, id: number, file: string, publics: Record<string, PawnPublic>);
    /** An exported native, called as this plugin: caller() is its id. */
    native(name: string, ...args: ArgValue[]): NativeResult;
}
interface IntParam {
    kind: 'int';
    value: number;
}
interface CellsParam {
    kind: 'string' | 'array';
    cells: number[];
    from: number;
    copyback: boolean;
    at: number;
    into?: {
        memory: Memory;
        pointer: number;
    };
}
type Param = IntParam | CellsParam;
interface Pending {
    plugin: number;
    func: number;
    params: Param[];
}
export declare class MenuKit {
    readonly server: FakeServer;
    /** The dictionary GetLangTransKey and LookupLangKey answer from: key -> text. */
    readonly dictionary: Map<string, string>;
    readonly plugins: FakePawnPlugin[];
    /** Who is calling a native right now; the host unless a FakePawnPlugin is. */
    caller: number;
    readonly heap: Map<number, number>;
    hea: number;
    pending: Pending | null;
    readonly menuIds: Map<string, number>;
    readonly menuCommands: Map<number, string[]>;
    readonly screens: Map<number, MenuScreen>;
    /** ShowMenu messages marked "more", waiting for the rest. */
    readonly chunks: Map<number, string>;
    constructor(server: FakeServer);
    /** A Pawn plugin whose publics menu_core may call. */
    pawnPlugin(file: string, publics: Record<string, PawnPublic>): FakePawnPlugin;
    /** Translations, as a dictionary file registers them. */
    translate(entries: Record<string, string>): void;
    /** What the player sees; null when no menu is up. */
    screen(player: FakePlayer): MenuScreen | null;
    /** Presses a key, 1-9 or 0. False when the menu does not take it - it is not on the screen. */
    press(player: FakePlayer, key: number): boolean;
    /** `body` with caller() answering `id`. */
    as<T>(id: number, body: () => T): T;
    /** An item for a list data source's Array:, as a Pawn plugin fills one: 289 cells. */
    pushRow(handle: number, row: {
        target: number;
        action?: string;
        text: string;
        restriction?: string;
        message?: string;
    }): void;
    heapCells(at: number, count: number): number[];
    writeHeap(at: number, cells: number[]): void;
}
/**
 * Menus and callfunc on this server: menu natives, fake Pawn plugins, a
 * dictionary. Call it before the plugins load - the bridge is read then.
 */
export declare function installMenus(server: FakeServer): MenuKit;
export {};
