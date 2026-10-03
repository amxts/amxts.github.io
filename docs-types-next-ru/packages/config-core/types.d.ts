/**
 * The types of Config Core's API: a config file's format, a value's kind and
 * the module's options.
 */
/** Формат файла конфига, одно из `"ini"`, `"yaml"` (`.yaml`, `.yml`) или `"json"` (`.json`, `.jsonc`). */
export type ConfigFormat = "ini" | "yaml" | "json";
/** Вид значения конфига, одно из `"object"`, `"array"`, `"string"`, `"number"`, `"boolean"` или `"null"` — виды JSON. */
export type ConfigKind = "object" | "array" | "string" | "number" | "boolean" | "null";
/** Настройки Config Core: `configs` в `amxts.config.ts`. */
export interface ConfigCoreOptions {
    /** Папка внутри `configs/`, из которой загружаются файлы по имени, например `"myserver"`; `""` — сама `configs/`. */
    baseDir: string;
}
declare module "@amxts/core" {
    interface ModuleOptions {
        configs?: Partial<ConfigCoreOptions>;
    }
}
