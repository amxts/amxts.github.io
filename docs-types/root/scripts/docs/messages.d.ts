import type { EventDoc, Text } from './events';
export declare const MESSAGES: Record<string, EventDoc>;
/** The line every message's words end with: the game's name of it. */
export declare function gameName(name: string): Text;
/** The words of a message without fields, and of the receiver every message has. */
export declare const ANY_MESSAGE: {
    args: Text;
    player: Text;
};
