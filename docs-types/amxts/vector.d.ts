/// <reference path="../as-types.d.ts" />
/** Three numbers, x y z, with the math a plugin needs on them. */
export declare class Vector extends Array<number> {
    constructor(x?: number, y?: number, z?: number);
    /** The first number, `vector[0]`. */
    get x(): number;
    set x(value: number);
    /** The second number, `vector[1]`. */
    get y(): number;
    set y(value: number);
    /** The third number, `vector[2]`. */
    get z(): number;
    set z(value: number);
    /** A new vector: this one plus `other`, number by number. */
    add(other: number[]): Vector;
    /** A new vector: this one minus `other` - the way from `other` to this point. */
    subtract(other: number[]): Vector;
    /** A new vector with every number multiplied by `factor`. */
    scale(factor: number): Vector;
    /** The dot product with `other`; zero when the two are at right angles. */
    dot(other: number[]): number;
    /** How long it is: the distance from the origin of the map to this point. */
    magnitude(): number;
    /** How far it is from this point to `other`, in game units. */
    distanceTo(other: number[]): number;
    /** The same direction, one unit long; a zero vector stays zero. */
    normalize(): Vector;
}
