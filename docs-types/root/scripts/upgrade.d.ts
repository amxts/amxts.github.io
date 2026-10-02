import ts from 'typescript';
/** The old spelling of a specifier and the new one. */
export type Renames = Map<string, string>;
/** One rewritten specifier: where, and from what to what. */
export interface Change {
    file: string;
    line: number;
    from: string;
    to: string;
}
/**
 * What `~/<place>` meant and is now written: the core's entries, the files
 * the facade exports, the modules the project lists. A place the project's
 * plugins folder has a file at is its own, and stays.
 */
export declare function renamesFor(modules: {
    name: string;
    short: string;
}[], own?: (place: string) => boolean): Renames;
/** A specifier's new spelling, or null: a package's file by its path inside the package too. */
export declare function renamed(spec: string, renames: Renames): string | null;
/** The module specifiers of a file: imports, exports, `import()` and `declare module`. */
export declare function specifiers(source: ts.SourceFile): ts.StringLiteral[];
/** A file's text with its specifiers renamed, and what changed. */
export declare function upgradeText(file: string, text: string, renames: Renames): {
    text: string;
    changes: Change[];
};
/** A command handler upgrade cannot rewrite itself: where, and what to do. */
export interface Left {
    file: string;
    line: number;
    why: string;
}
/**
 * A file's imports of fetch from `@amxts/core/http` taken out, each with its
 * line: fetch, Response and RequestInit are globals. What reads a response's
 * `text` as a field is the author's to change, so every file that had the
 * import is listed.
 */
export declare function dropHttpImports(file: string, text: string): {
    text: string;
    changes: Change[];
    left: Left[];
};
/**
 * A file's command handlers brought to one argument: `(player) =>` becomes
 * `({ player }) =>`, a function passed by its name and taking the player is
 * called from `({ player }) => name(player)`. A handler that reads the words
 * after the name - a second parameter, or a server command's one - is left,
 * with what to write; one that takes nothing, or already one object, is right.
 */
export declare function upgradeHandlers(file: string, text: string): {
    text: string;
    changes: Change[];
    left: Left[];
};
/**
 * A file brought to the API's names. `Player.all()` is `server.players`, and
 * its options a `filter` of what each one tested. A field or a method named
 * after the engine's member (`player.account`, `game.numCtWins`,
 * `weapon.inReload`) is the player's word (`money`, `ctWins`, `isReloading`),
 * and a game event's name in `addEventListener` and its class are the new
 * ones. Without a type checker a value is a player, a weapon, an entity or the
 * game where the code says so: `event.player`, `new Weapon(id)`, an
 * annotation, `player.activeItem`, an element of `server.players` or of a
 * player's `items`, `{ player }` taken from an event or a command, `game`.
 * The rest is listed: an old name on a value the code does not say, options
 * not written out as `true` or a team's name, and a field or an event left out
 * of the API, which the natives reach.
 */
export declare function upgradeNames(file: string, text: string): {
    text: string;
    changes: Change[];
    left: Left[];
};
/** Rewrites the project in `dir`: every change, in the order of the files, and what is left to do by hand. */
export declare function upgradeProject(dir: string): {
    changes: Change[];
    left: Left[];
};
