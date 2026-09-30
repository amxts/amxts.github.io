export interface Text {
    en: string;
    ru: string;
}
export interface EventDoc {
    summary: Text;
    /** Things worth knowing before relying on the event. */
    notes?: Text[];
    fields?: Record<string, Text>;
    /** One short listener - shown as @example. */
    example?: string;
}
export declare const EVENTS: Record<string, EventDoc>;
