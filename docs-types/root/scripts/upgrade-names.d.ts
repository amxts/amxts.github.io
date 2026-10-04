/** Game events by their old name; each event's class follows its name. */
export declare const EVENTS: Record<string, string>;
/** Game events out of the API, by the native that hooks them. */
export declare const HIDDEN_EVENTS: Record<string, string>;
/** What a value is, as far as the code says: the class whose names apply to it. */
export type Kind = 'Player' | 'Weapon' | 'Entity' | 'Game';
/** Fields and methods by their old name, for each kind of value. */
export declare const RENAMED: Record<Kind, Record<string, string>>;
/** Fields out of the API, by the member a native reads them with, for each kind of value. */
export declare const HIDDEN: Record<Kind, Record<string, string>>;
/**
 * Old names common enough elsewhere - a menu's `menu`, a message's `weapon`,
 * a memory's `memory`, a ban's `authid` - that a use on a value the code does
 * not say is one of ours is not listed.
 */
export declare const COMMON: Set<string>;
/**
 * Server events by their old names - the Pawn forward's and the short one
 * before it - each by the name in the author's words
 * (scripts/generate-host.ts's EVENT_NAMES).
 */
export declare const SERVER_EVENTS: Record<string, string>;
/** Server events that are a game event: `game.addEventListener` by this name. */
export declare const SERVER_GAME_EVENTS: Record<string, string>;
/** Server events whose game events ask it otherwise: listed, with what to write. */
export declare const SERVER_EVENTS_BY_HAND: Record<string, string>;
/** Server events' classes by their old names, where the event is another's now. */
export declare const SERVER_EVENT_CLASSES: Record<string, string>;
/** A server event's fields by their old names, for each event by its name. */
export declare const SERVER_EVENT_FIELDS: Record<string, Record<string, string>>;
/** The server events whose fields are renamed, by the class an annotation names them with. */
export declare const SERVER_FIELD_CLASSES: Record<string, string>;
/** A game event's fields by their old names - reapi's parameters as they were - for each event (scripts/generate-hooks.ts's WORDS). */
export declare const GAME_EVENT_FIELDS: Record<string, Record<string, string>>;
/** The fake server's options for a test's player by their old names: `server.join(name, { authid })`. */
export declare const JOIN_OPTIONS: Record<string, string>;
/** Flag names that are more than the old one in lowerCamelCase: KillRarity's `"ThruSmoke"` is `"throughSmoke"`. */
export declare const FLAG_NAMES: Record<string, string>;
