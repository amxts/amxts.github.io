/**
 * An INI file as Config Core's tree - its sections an object of objects - and
 * the tree written back as INI. Not part of the API.
 */
import { Config } from "./ini";
import { TreeDocument, TreeNode } from "./internal";
/** The sections as an object; a name found twice is the last section of that name, as cfg_get_section finds it. */
export declare function iniTree(config: Config): TreeNode;
/** The document as INI lines: each member of the top an [section], what is not an object left out. */
export declare function writeIni(document: TreeDocument): string[];
