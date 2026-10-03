import type { EventDoc, Text } from './events';
export declare const MESSAGES: Record<string, EventDoc>;
/** The words of a message that has no entry, and of the receiver every message has. */
export declare const ANY_MESSAGE: {
    summary: Text;
    player: Text;
};
