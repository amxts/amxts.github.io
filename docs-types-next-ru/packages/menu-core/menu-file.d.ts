import { ConfigNode } from "@amxts/config-core";
import { MenuFile } from "./internal";
/** Where a value is: "configs/menu.yaml:12:9" - without the column where the file does not keep it (INI). */
export declare function whereOf(node: ConfigNode): string;
export declare function warn(where: string, message: string): void;
/** ` - did you mean "NAME"?` for the known name a slip away from `name`; "" when none is that close. */
export declare function suggestion(name: string, known: string[]): string;
/**
 * The menu file of that name, from configs/ - name.ini, name.yaml, name.yml,
 * name.json or name.jsonc, whichever is there - with its menus described.
 */
export declare function readMenuFile(name: string): MenuFile;
