export type EntvarKind = 'string' | 'vector' | 'float' | 'int' | 'entity' | 'bytes';
export interface Entvar {
    /** Bytes from the start of entvars_t. */
    offset: number;
    kind: EntvarKind;
}
/** sizeof(entvars_t). */
export declare const ENTVARS_SIZE = 676;
/** Every entvar by its reapi name, from reapi_engine_const.inc's EntVars. */
export declare function entvarLayout(text?: string): Map<string, Entvar>;
