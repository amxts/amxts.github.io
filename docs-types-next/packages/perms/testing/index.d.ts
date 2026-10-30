import type { FakeServer } from "@amxts/core/test-utils";
/** An entry of AMX Mod X's admin list, as admins_push gave it. */
export interface PushedAdmin {
    auth: string;
    password: string;
    access: number;
    flags: number;
}
export interface PermsKit {
    /** AMX Mod X's admin list. */
    admins: PushedAdmin[];
    /** The plugin files find_plugin_byfile finds, as if they were loaded: `["admin.amxx"]`. */
    loadedPlugins: string[];
}
declare const _default: import("@amxts/core/test-utils").TestKit<PermsKit>;
export default _default;
/** The kit of a server Perms runs on. */
export declare function permsOf(server: FakeServer): PermsKit;
