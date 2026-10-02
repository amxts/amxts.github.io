/** What an argument is read as. */
export type HamKind = 'entity' | 'player' | 'weapon' | 'int' | 'float' | 'bool' | 'vector' | 'string' | 'damage' | 'use';
/** What the function returns: the event's answer, a method's result. */
export type HamAnswer = 'none' | 'int' | 'bool' | 'float' | 'entity' | 'string' | 'vector';
export interface HamParam {
    name: string;
    kind: HamKind;
}
export interface HamFunction {
    /** The Ham_* constant. */
    ham: string;
    /** The event's name: the game's action. */
    event: string;
    /** What `this` is: the event's first field. */
    target: 'entity' | 'player' | 'weapon';
    /** The arguments after `this`. */
    params: HamParam[];
    answer: HamAnswer;
    /** The reapi hookchain's event of the same function, when there is one. */
    reapi?: string;
    /** A method on the target's class, for what is an action rather than a question. */
    method?: boolean;
}
export declare const HAM_FUNCTIONS: HamFunction[];
