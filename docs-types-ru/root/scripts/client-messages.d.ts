/**
 * What an argument is read as: a number, a boolean, text; `player` a player's
 * number, `0` none (`Player | null`); `weapon` a weapon's id as WeaponKind
 * names it; `hideHud` HideWeapon's flags as HideHud names them; `damage`
 * Damage's bits; `team` a TeamName number; `statusIcon` StatusIcon's state
 * (0 hide, 1 show, 2 flash); `destination` TextMsg's (1 notify, 2 console,
 * 3 chat, 4 center).
 */
export type MessageFieldKind = 'number' | 'boolean' | 'string' | 'player' | 'weapon' | 'hideHud' | 'damage' | 'team' | 'statusIcon' | 'destination';
export interface MessageField {
    name: string;
    /** The argument's number, 1 for the first. */
    arg: number;
    kind: MessageFieldKind;
}
/** The messages with typed fields. */
export declare const MESSAGE_FIELDS: Record<string, MessageField[]>;
/** Every message Counter-Strike 1.6 registers, by the name get_user_msgid takes. */
export declare const CLIENT_MESSAGES: string[];
