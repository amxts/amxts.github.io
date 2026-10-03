/** A float as the cell Pawn carries it in: its bit pattern. */
export declare function floatBits(value: number): number;
/** The other way: a cell that holds a float. */
export declare function bitsFloat(cell: number): number;
/** How many of the bytes fit in `max` without cutting a UTF-8 character in two. */
export declare function utf8Fit(bytes: Uint8Array, max: number): number;
export declare class Memory {
    private exports;
    private dataView?;
    constructor(exports: any);
    private get view();
    cell(pointer: number): number;
    setCell(pointer: number, value: number): void;
    float(pointer: number): number;
    setFloat(pointer: number, value: number): void;
    vector(pointer: number): number[];
    setVector(pointer: number, value: number[]): void;
    /** A Pawn string: a byte of UTF-8 a cell, up to the zero cell - what get_amxstring reads. */
    text(pointer: number, max?: number): string;
    /** A Pawn string's bytes as they are, at most `max` of them. */
    bytes(pointer: number, max?: number): Uint8Array;
    /** Fills a Pawn buffer: at most `max` bytes of UTF-8 and the terminator, as set_amxstring. */
    setText(pointer: number, max: number, value: string): number;
    /** An AssemblyScript string. */
    string(pointer: number): string;
    /** Bytes as they are, into the plugin's memory. */
    setRaw(pointer: number, bytes: Uint8Array): void;
    /** A text's UTF-8 length, and as much of it as fits into `max` bytes at `pointer`. */
    setUtf8(pointer: number, max: number, value: string): number;
    /** UTF-8 into a byte buffer the plugin decodes with String.UTF8 - the module's WriteBytes. */
    setBytes(pointer: number, max: number, value: string): number;
}
