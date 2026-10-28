/**
 * The permission model: groups, players, their grants, and the answer to
 * "does this player have this node". Every change - a command, a plugin's
 * call, the web editor, the database's - is a `Change`, applied here.
 */
/** A permission given (`value` true) or taken away (false) - `node` may end in `*`. */
export interface Grant {
    node: string;
    value: boolean;
    /** When it ends, ms since 1970; 0 never. */
    until: number;
    /** The server it counts on; "" every server. */
    server: string;
}
/** A player's place in a group. */
export interface Membership {
    group: string;
    until: number;
    server: string;
}
export interface Group {
    name: string;
    weight: number;
    inherits: string[];
    grants: Grant[];
}
/** A player as he is recognised: `STEAM_0:1:5`, `ip:1.2.3.4` or `name:Bob`. */
export interface User {
    id: string;
    name: string;
    /** A `name:` entry's password, `sha256:<hex>`; "" for none. */
    password: string;
    groups: Membership[];
    grants: Grant[];
}
export type ChangeOp = "grant" | "revoke" | "groupCreate" | "groupDelete" | "groupWeight" | "parentAdd" | "parentRemove" | "memberAdd" | "memberRemove" | "userCreate";
/** One change, the editor's contract in one shape: the fields an op does not use stay empty. */
export interface Change {
    op: ChangeOp;
    /** The group a grant is for, or the group a player joins. */
    group: string;
    /** The player a grant or a membership is for. */
    user: string;
    node: string;
    value: boolean;
    until: number;
    server: string;
    weight: number;
    parent: string;
    name: string;
}
/** Why a change was skipped, as the editor's contract names it; "" when it was applied. */
export type SkipCode = "" | "groupMissing" | "groupExists" | "userMissing" | "parentMissing" | "cycle" | "defaultGroup" | "invalid";
export interface Declared {
    node: string;
    description: string;
    byDefault: boolean;
    /** Declared by a Pawn plugin, through perms_declare. */
    pawn: boolean;
}
export declare const DEFAULT_GROUP = "default";
/** A blank change of an op, to fill. */
export declare function changeOf(op: ChangeOp): Change;
/** Replaces every group and player, as a store read them; `default` is made when missing. */
export declare function replaceAll(newGroups: Group[], newUsers: User[]): void;
export declare function allGroups(): Group[];
export declare function allUsers(): User[];
export declare function setThisServer(name: string): void;
export declare function serverName(): string;
export declare function groupNamed(name: string): Group | null;
/** A player's entry; `name:` ids match in any case. */
export declare function userWith(id: string): User | null;
/** `name:` ids are kept in lower case, the rest as written. */
export declare function normalId(id: string): string;
/** Declares a node; `false` when another plugin declared it first. */
export declare function declare(node: string, description: string, byDefault: boolean, pawn: boolean): boolean;
export declare function declaredNodes(): Declared[];
/** The groups a player is in now, highest weight first, `default` last. */
export declare function groupsOf(user: User | null, now: number): Group[];
/**
 * Where a player's answers come from, first first: his own grants, then each
 * of his groups with what it inherits. A node is answered by the first source
 * that says anything about it.
 */
export declare function sourcesOf(user: User | null, now: number): Map<string, boolean>[];
/** Whether the sources give the node; a node none of them names is its declared default. */
export declare function answer(sources: Map<string, boolean>[], node: string): boolean;
/** The grant that answers a node for `perms check`: "<source>: <node>", or "the default". */
export declare function explain(user: User | null, node: string, now: number): string;
/** The player's primary group: the active one of the highest weight. */
export declare function primaryGroup(user: User | null, now: number): string;
/** The nearest moment a grant or a membership of these players, or of any group, ends; 0 for none. */
export declare function nextExpiry(online: User[], now: number): number;
/** Applies a change; what made it skip, or "" when it was applied. */
export declare function apply(change: Change): SkipCode;
/** A skip code in words, for the console and the editor's `reason`. */
export declare function reasonOf(code: SkipCode, change: Change): string;
/** Drops grants and memberships that ended; whether any did, so the store writes them out. */
export declare function dropExpired(now: number): boolean;
