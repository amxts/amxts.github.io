export interface EnumMember {
    name: string;
    value: number;
}
/** Every named enum in these includes, with its members' values. */
export declare function enumsIn(files: string[]): Map<string, EnumMember[]>;
/** The enums of the includes that carry the game's types: cssdk_const and reapi's. */
export declare const GAME_ENUMS: Map<string, EnumMember[]>;
/** ROUND_CTS_WIN -> ctsWin; Class_CT -> classCT; a flag's KILLER_BLIND -> KillerBlind. */
export declare function memberName(suffix: string, flags: boolean): string;
