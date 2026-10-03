import type { EventDoc, Text } from './events';
export declare const MESSAGES: Record<string, EventDoc>;
/** The line every message's words end with: the game's names of the messages it hears. */
export declare function gameName(names: string[]): Text;
/** The words of a field only some of a name's messages carry: what it reads as on the others. */
export declare function missingField(names: string[], value: string): Text;
/** The words of a message without fields, and of the receiver every message has. */
export declare const ANY_MESSAGE: {
    args: Text;
    player: Text;
};
