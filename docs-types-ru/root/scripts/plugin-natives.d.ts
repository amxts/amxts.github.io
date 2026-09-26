import type { NativeFunction } from '../src/types';
/**
 * How one argument crosses from Pawn. `tag` is a cell under one of the
 * plugin's own exported enums - `section: ConfigSection` is
 * `ConfigSection:section` in the include. `player` is a player id read as a
 * Player: a cell that is not a player slot (1 to maxPlayers) never reaches
 * the function - the native answers its result's default (0, false, "")
 * instead. `player?` is `Player | null`, where 0 - the server, everyone -
 * is null.
 */
export type ParamKind = 'string' | 'int' | 'float' | 'bool' | 'ints' | 'floats' | 'vector' | 'tag' | 'player' | 'player?' | 'team';
/**
 * How the result goes back. `string?` is `string | null`: a bool, and the
 * text in `out[]`. `tag` is a cell under an exported enum; `array` is a
 * facade CellArray - an AMX Mod X `Array:` handle the caller destroys, or
 * Invalid_Array for null.
 */
export type ResultKind = 'void' | 'int' | 'float' | 'bool' | 'string' | 'string?' | 'ints' | 'floats' | 'tag' | 'array';
export interface NativeParam {
    name: string;
    kind: ParamKind;
    /** The Pawn default, when the TypeScript one is a literal Pawn can write. */
    pawnDefault: string | null;
    /** The enum a `tag` parameter is typed with. */
    tag?: string;
}
export interface PluginNative {
    name: string;
    params: NativeParam[];
    result: ResultKind;
    /** The enum a `tag` result is typed with. */
    resultTag?: string;
    /** The function's own `/** ... *\/` comment, for the include. */
    doc: string;
    /**
     * For a native the plugin's include declares: the Pawn arguments in order,
     * as that declaration lays them out (see contractPlan).
     */
    layout?: PawnSlot[];
    /** Its declaration's return tag: `Float`, `bool`, another tag or `any`. */
    pawnResult?: string;
    /** The declaration itself, for the include the build writes. */
    declaration?: NativeFunction;
}
/**
 * What a native writes back through an argument: text into `x[], len`, cells
 * into `x[], size`, one cell through `&x` (`Float:&x` - a float).
 */
export type OutputKind = 'string' | 'ints' | 'floats' | 'ref' | 'float-ref';
/** An `export enum` of the entry file: a Pawn enum in the include, and a tag. */
export interface PluginEnum {
    name: string;
    members: {
        name: string;
        value: number;
    }[];
    doc: string;
}
/** The `export enum`s that came with these natives. */
export declare function nativeEnums(natives: PluginNative[]): PluginEnum[];
/** The Pawn include a plugin implements: its text, and its natives by name. */
export interface Contract {
    /** The name the plugin gave: "nhnse_core.inc". */
    file: string;
    text: string;
    natives: Map<string, NativeFunction>;
}
/** The include these natives implement, when the plugin named one. */
export declare function nativeContract(natives: PluginNative[]): Contract | undefined;
/** What a compile keeps beside its natives, as data: for a cache to store with them. */
export interface NativesBeside {
    enums: PluginEnum[];
    contract: {
        file: string;
        text: string;
    } | null;
}
export declare function nativesBeside(natives: PluginNative[]): NativesBeside;
/** Natives read back from a cache get their enums and contract beside them again. */
export declare function setNativesBeside(natives: PluginNative[], beside: NativesBeside): void;
/**
 * A Pawn call's arguments in order: each parameter, and the result's buffer.
 * A contract native also has `output`s - the arguments it writes through, in
 * order - and parameters that come from the `any:...` tail (`byRef`: Pawn
 * passes the tail by address), or a `format` tail the string before it is
 * formatted with.
 */
export type PawnSlot = {
    param: NativeParam;
    index: number;
    byRef?: boolean;
} | {
    out: true;
} | {
    output: OutputKind;
} | {
    format: true;
};
/** The order a Pawn plugin passes a native's arguments in - see indexes(). */
export declare function pawnLayout(native: PluginNative): PawnSlot[];
/**
 * The transform for one compile. `found` is filled with the plugin's natives
 * once the compile is over; an unsupported signature stops the compile with
 * a message naming the function and the parameter.
 */
export declare function nativesTransform(entry: string, found: PluginNative[], root?: string): any;
/** A plugin's name as a Pawn identifier: `api-natives` is `api_natives`. */
export declare function includeName(plugin: string): string;
/** The `native` line of one of them, with its comment. */
export declare function pawnNative(native: PluginNative): string;
/** An `export enum` as Pawn writes it, with its comment. */
export declare function pawnEnum(declared: PluginEnum): string;
/** The include a Pawn plugin writes `#include <name>` for. */
export declare function pawnInclude(plugin: string, natives: PluginNative[]): string;
