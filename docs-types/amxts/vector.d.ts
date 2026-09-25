/// <reference path="../as-types.d.ts" />
/** Three numbers, x y z, with the math a plugin needs on them. */
export declare class Vector extends Array<number> {
    constructor(x?: number, y?: number, z?: number);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get z(): number;
    set z(value: number);
    add(other: number[]): Vector;
    subtract(other: number[]): Vector;
    scale(factor: number): Vector;
    dot(other: number[]): number;
    /** How long it is: the distance from the origin of the map to this point. */
    magnitude(): number;
    distanceTo(other: number[]): number;
    /** The same direction, one unit long; a zero vector stays zero. */
    normalize(): Vector;
}
