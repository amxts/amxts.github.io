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
 * a memory's `memory` - that a use on a value the code does not say is one of
 * ours is not listed.
 */
export declare const COMMON: Set<string>;
