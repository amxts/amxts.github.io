/**
 * The events of as/hooks.ts's GameEventMap reapi alone delivers: an event
 * class with no Ham Sandwich function behind it (`private static readonly
 * ham`) is a hookchain's alone.
 */
export declare function reapiEvents(hooksText?: string): Set<string>;
/** The events reapi alone delivers that plain HLDS does not hear at all. */
export declare function unheardEvents(hooksText?: string): Set<string>;
/** The listeners in a compile's sources for an event plain HLDS does not hear, each where it is written. */
export declare function reapiListeners(sources: any[], events?: Set<string>): string[];
/** What a project's target adds to a compile: for plain HLDS, the refusal of the events it does not hear. */
export declare function targetTransforms(target: string | undefined): {
    new (): {
        afterParse(parser: any): void;
    };
}[];
