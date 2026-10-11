/** What the packages go out as. */
interface Plan {
    /** Each package's version as its folder has it. */
    own: Map<string, string>;
    /** Each package's version as it goes out. */
    out: Map<string, string>;
    /** The staged command's CORE_RANGE, when it is not the checkout's. */
    coreRange: string | null;
}
/**
 * A package.json as it is published: its version as it goes out, and every
 * `file:` or `link:` spec of one of these packages as `^<that package's
 * version>`. Every other spec of one of them must already be `^<its version>`.
 * A module that runs on more than one line of the core names them in its
 * `amxts.core` (`"^0.2.0 || ^0.3.0"`), its published range for the core,
 * which must take the core it goes out with.
 */
export declare function publishedManifest(manifest: any, { own, out }: Pick<Plan, 'own' | 'out'>): any;
export {};
