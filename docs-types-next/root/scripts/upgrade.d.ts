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
 * after the name - a second parameter it uses, or a server command's one - is
 * left, with what to write; one that takes nothing, or already one object, is
 * right.
 */
export declare function upgradeHandlers(file: string, text: string): {
    text: string;
    changes: Change[];
    left: Left[];
};
/** A piece of a file's text to replace: where, with what, and what it was. */
export interface Edit {
    start: number;
    end: number;
    with: string;
    from: string;
}
/** The text with its edits made - from the end, so every earlier position stays where it was - and each as a change. */
export declare function applyEdits(file: string, text: string, source: ts.SourceFile, edits: Edit[]): {
    text: string;
    changes: Change[];
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
 * player's `items`, `{ player }` taken from an event or a command, a
 * command handler's first parameter, `game`.
 * The rest is listed: an old name on a value the code does not say, options
 * not written out as `true` or a team's name, and a field or an event left out
 * of the API, which the natives reach.
 */
export declare function upgradeNames(file: string, text: string): {
    text: string;
    changes: Change[];
    left: Left[];
};
/**
 * A file's events by their names in the author's words. A server event's
 * name in `server.addEventListener` is the new one (`"putinserver"` is
 * `"putInServer"`), one that is a game event is heard through `game`
 * (`server.addEventListener("PreThink", ...)` is
 * `game.addEventListener("preThink", ...)`), and cstrike's buying is listed.
 * An event's field named after reapi's or Pawn's parameter is the new one
 * (`event.weapon_entity` is `event.weapon`) where the code says which event
 * it is: a listener given to `addEventListener` by its name - written in
 * place, or a function of the file - or a parameter annotated with the
 * event's class. A field destructured keeps its local name:
 * `({ weapon_entity })` is `({ weapon: weapon_entity })`.
 */
export declare function upgradeEvents(file: string, text: string): {
    text: string;
    changes: Change[];
    left: Left[];
};
/**
 * A file's game messages brought to their own methods:
 * `addEventListener("message:DeathMsg", ...)` is
 * `addMessageListener("death", ...)`, and `removeEventListener` likewise. A
 * name the game does not have is listed.
 */
export declare function upgradeMessages(file: string, text: string): {
    text: string;
    changes: Change[];
    left: Left[];
};
/**
 * A file's flag names brought to lowerCamelCase: `player.buttons.includes("Jump")`
 * is `includes("jump")`. A string is a flag's name where the code says so
 * without a type checker: assigned to a flag field (`player.hideHud =
 * ["Money"]`) or an option (`{ buttons: ["Jump"] }`, `{ access: "Kick" }`),
 * given to `includes`, `push` or `concat` of one, to `screen.hideHud`,
 * `heal` or `cmd`, compared with an element of one (`flag != "Bomb"` in its
 * `filter`, a `for of` over it, a `switch`), or held by a name annotated with
 * a family (`const parts: HideHud[] = ["Money"]`, a parameter `button:
 * Button`, and what the file's own function takes there). A name given where a
 * flag goes is followed to the literal it was declared with; one the file
 * does not say - a parameter, an import, a function's result - is listed.
 */
export declare function upgradeFlags(file: string, text: string): {
    text: string;
    changes: Change[];
    left: Left[];
};
/** Rewrites the project in `dir`: every change, in the order of the files, and what is left to do by hand. `write: false` only lists them. */
export declare function upgradeProject(dir: string, { write }?: {
    write?: boolean | undefined;
}): {
    changes: Change[];
    left: Left[];
};
