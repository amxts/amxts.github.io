/**
 * What one value is: a primitive, `Player[]` ('players'), or a union of
 * string literals - with true and false among them when `boolean` is set.
 * Until written, a union reads its first literal.
 */
export type ValueType = 'boolean' | 'number' | 'string' | 'players' | {
    literals: string[];
    boolean: boolean;
};
export interface ObjectMember {
    name: string;
    type: ValueType;
}
/** An object field: its members, and the interface it was declared as, if any. */
export interface ObjectType {
    members: ObjectMember[];
    interface: string | null;
}
export type FieldType = ValueType | ObjectType;
export interface PlayerField {
    name: string;
    type: FieldType;
    /** Where it was declared: `file:line`. */
    where: string;
}
/** Where the generated accessors are parsed: a library file, so the hood's rules apply to them. */
export declare const PLAYER_FIELDS_FILE = "~lib/amxts/player-fields.ts";
/**
 * One compile's fields. `read` goes into the compile's readFile, `transform`
 * into its transforms; a new one for every compile.
 */
export declare function playerFieldsBuild(): {
    read: (path: string, text: string) => string;
    transform: any;
    fields: Map<string, PlayerField>;
};
/** A type as it is written, to compare two declarations and to name one. */
export declare function describe(type: FieldType): string;
/** The hidden file: the helpers the accessors call, the holder of the accessors, and the classes they read as. */
export declare function playerFieldsSource(fields: PlayerField[]): string;
