/**
 * What an argument is read as: a number, a boolean, text; `texts` every text
 * from the argument on (the words a game text puts in); `player` a player's
 * number, `0` none (`Player | null`); `weapon` a weapon's id as WeaponKind
 * names it; `team` a TeamName number and `teamName` a team written as text,
 * both a Team; `vector` three coordinates from the argument on; `color`
 * `size` bytes from it, red, green, blue (and alpha); `fixed` a number of
 * `scale` parts to one (a time in 1/4096 s); `bit` whether `mask`'s bit is
 * set; `fadeDirection` ScreenFade's FFADE_OUT bit as FadeDirection;
 * `hideHud`, `damage`, `scoreStatus` a mask as an array of HideHud, Damage,
 * ScoreStatus names; `statusIcon` StatusIcon's state (0 hide, 1 show,
 * 2 flash); `destination` TextMsg's (1 notify, 2 console, 3 chat, 4 center);
 * `vguiMenu` a VGUIMenu number as VguiMenu names it.
 */
export type MessageFieldKind = 'number' | 'boolean' | 'string' | 'texts' | 'player' | 'weapon' | 'team' | 'teamName' | 'vector' | 'color' | 'fixed' | 'bit' | 'fadeDirection' | 'hideHud' | 'damage' | 'scoreStatus' | 'statusIcon' | 'destination' | 'vguiMenu';
export interface MessageField {
    name: string;
    /** The argument's number, 1 for the first. */
    arg: number;
    kind: MessageFieldKind;
    /** `fixed`: the parts that make one. `bit`: the bit. `color`: the bytes. */
    of?: number;
}
/** The messages whose layout is known, each argument a field. */
export declare const MESSAGE_FIELDS: Record<string, MessageField[]>;
/** Every message Counter-Strike 1.6 registers, by the name get_user_msgid takes. */
export declare const CLIENT_MESSAGES: string[];
/**
 * Every message's name in the player's words, by the game's: lowerCamelCase,
 * without the protocol's `Msg`, an abbreviation spelled out (`CurWeapon` is
 * `currentWeapon`, `SetFOV` `fov`) and an opaque name given its meaning
 * (`SayText` is `chat`, `Battery` `armor`, `ShowMenu` `menu`). Messages that
 * are one thing to an author share a name (`BarTime`, `BarTime2`).
 */
export declare const MESSAGE_NAMES: Record<string, string>;
/** The names server.addMessageListener takes, each with the game's messages it hears, in the game's order. */
export declare const MESSAGE_GROUPS: Map<string, string[]>;
