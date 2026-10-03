import type { System } from './system';
import { manifestName } from './system';
/** One file of a release, as its manifest lists it. */
export interface ReleaseFile {
    name: string;
    size: number;
    sha256: string;
}
/** amxts-<system>.json: what one system's build attached, and what it was built from. */
export interface Manifest {
    name: 'amxts';
    version: string;
    tag: string;
    system: System;
    commit: string;
    /** Whether the working tree had changes the commit does not. */
    dirty: boolean;
    built: string;
    files: ReleaseFile[];
}
/** An asset attached to the release, as GitHub lists it. */
export interface Asset {
    name: string;
    size: number;
}
export { manifestName };
/**
 * What stands between this release and publishing it; empty when nothing does.
 * `tag` is the release's (`v0.1.0`), `manifests` the amxts-*.json attached to
 * it, `assets` everything attached.
 */
export declare function releaseProblems(tag: string, manifests: Manifest[], assets: Asset[]): string[];
