/**
 * `perms ...` in the server console and over rcon. A player with `perms.view`
 * runs the commands that only show - `groups`, `check`, `nodes`, `user ...
 * info`, `group ... info` - in his console or chat (`/perms`); changes are the
 * server console's and the web editor's, which the server console opens:
 *
 *     perms user <player|id> info
 *     perms user <player|id> group add|remove <group> [30d]
 *     perms user <player|id> permission set|unset <node> [true|false] [30d]
 *     perms group <group> info|create [weight]|delete
 *     perms group <group> permission set|unset <node> [true|false] [30d]
 *     perms group <group> parent add|remove <group>
 *     perms group <group> weight <n>
 *     perms groups | check <player|id> <node> | nodes [plugin] | editor [close] | reload | import [users.ini]
 */
import { Player } from "@amxts/core";
type Print = (line: string) => void;
export declare function run(player: Player | null, words: string[], print: Print): Promise<void>;
export {};
