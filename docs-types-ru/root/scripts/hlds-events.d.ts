import type { Text } from './docs/events';
export interface HeardEvent {
    class: 'A' | 'B';
    /** The stock hook that hears it. */
    backend: string;
    /** What plain HLDS does not give: B only. */
    gaps?: Text;
    /** A backend of its own for the listeners after the game. */
    post?: boolean;
    /**
     * The original game's function the module hooks itself, heard through
     * hook() where the module finds it (original_hook): `only` nothing else
     * hears it, no backend in as/hlds.ts; `first` the backend hears it where
     * the module does not.
     */
    original?: 'only' | 'first';
}
export declare const HEARD: Record<string, HeardEvent>;
/**
 * The events nothing on plain HLDS hears, with the reason: ReGameDLL's own
 * function, one the game calls inside another with no hook between, or the
 * engine's own, which Metamod does not see.
 */
export declare const NOT_HEARD: Record<string, string>;
/** A game rules field of ReGameDLL's own, read on plain HLDS from what the server does have. */
export interface HeardField {
    class: 'A' | 'B';
    backend: string;
    gaps?: Text;
}
export declare const HEARD_FIELDS: Record<string, HeardField>;
export declare const FIELDS_NOT_HEARD: Record<string, string>;
