import { ConfigFormat, ConfigKind, ConfigCoreOptions } from "./types";
import { TreeDocument, TreeNode } from "./internal";
export * from "./types";
declare const _default: AmxtsModule<ConfigCoreOptions>;
export default _default;
/** Задаёт папку внутри `configs/`, от которой считаются имена файлов, например `"myserver"`; `""` — сама `configs/`. */
export declare function setBaseDir(dir: string): void;
/**
 * Читает файл конфига в объект той же формы, что `defaults`: каждое значение,
 * которое есть в файле и нужного вида, а для остальных — значение по умолчанию.
 * Файл — `configs/<baseDir>/<name>`: YAML, JSON или INI, какой есть
 * (`resolve()`). Значение не того вида, имя не из своего юниона и ключ,
 * которого у объекта нет, называются в консоли сервера с файлом, строкой и
 * столбцом. `save()` записывает объект обратно.
 *
 *     const settings = configs.load("settings", {
 *         chat: { prefix: "[HNS]" },
 *         round: { time: 2.5 },
 *     });
 *     settings.round.time = 3;
 *     configs.save(settings);
 */
export declare function load<T extends object>(name: string, defaults: T): T;
/**
 * Записывает объект, прочитанный `load()`, обратно в его файл, в формате
 * файла: комментарии на отдельных строках остаются на месте. `false`, если
 * записать не вышло или объект прочитан не через `load()`.
 */
export declare function save<T extends object>(settings: T): boolean;
/** A document read, and the ConfigNodes that show its values: one a value, made when it is first asked for. */
interface Loaded {
    document: TreeDocument;
    shown: Map<TreeNode, ConfigNode>;
}
/**
 * Значение файла конфига: объект, массив, текст, число, логическое значение
 * или `null`, с местом, откуда оно прочитано. `read()` отдаёт верхнее значение
 * файла; путь ведёт внутрь: `"chat.prefix"`, `"items[0].name"`. Для файла, форма
 * которого заранее неизвестна; конфиг известной формы читается в объект
 * через `load(name, defaults)`.
 *
 *     const maps = configs.read("maps");
 *     for (const map of maps.values()) if (map.getBoolean("enabled")) console.log(map.key);
 */
export declare class ConfigNode {
    private node;
    private loaded;
    /** Вид значения, одно из `"object"`, `"array"`, `"string"`, `"number"`, `"boolean"` или `"null"`. */
    readonly kind: ConfigKind;
    /** Ключ значения в его объекте, например `"prefix"`; `""` у элемента массива и у верхнего значения. */
    readonly key: string;
    /** Путь файла, из которого прочитано значение, например `"addons/amxmodx/configs/settings.yaml"`; `""` — для текста, отданного `parse()`. */
    readonly file: string;
    /** Формат файла, одно из `"ini"`, `"yaml"` или `"json"`. */
    readonly format: ConfigFormat;
    /** Строка, из которой прочитано значение — или его ключ, — с `1`; `0` — для значения, заданного во время работы. */
    readonly line: number;
    /** Столбец, с которого начинается значение — или его ключ, — с `1`; `0` — для значения, заданного во время работы, и в INI-файле. */
    readonly column: number;
    constructor(node: TreeNode, loaded: Loaded);
    /** Значение, к которому ведёт путь, например `"chat.prefix"` или `"items[0]"`; `null`, если его нет. */
    get(path: string): ConfigNode | null;
    /** Ведёт ли путь к значению, `null` в том числе. */
    has(path: string): boolean;
    /** Ключи объекта в порядке файла — этого или того, к которому ведёт путь; [] для всего остального. */
    keys(path?: string): string[];
    /** Элементы массива или значения объекта в порядке файла — этого или того, к которому ведёт путь; [] для всего остального. */
    values(path?: string): ConfigNode[];
    /** Значение как текст: текст как есть, число как записано, `"true"` или `"false"`; `fallback` (или `""`) — если значения нет, для `null`, объекта и массива. */
    getString(path?: string, fallback?: string): string;
    /** Значение как число: число или текст, который им является, например `"2.5"`; `fallback` для всего остального. */
    getNumber(path?: string, fallback?: number): number;
    /** Значение как логическое: `true` или `false`, число (`0` — ложь) или текст — `"yes"`, `"no"`, `"on"`, `"off"`, `"true"`, `"false"` в любом регистре или число; `fallback` для всего остального. */
    getBoolean(path?: string, fallback?: boolean): boolean;
    /** Список текста: текст каждого элемента массива или одно значение как список из одного; [] — если значения нет. */
    getStrings(path?: string): string[];
    /** Записывает текст по пути, создавая по дороге объекты — и списки перед элементом `"[0]"`; `false`, если путь идёт через значение, которое не объект и не список. */
    set(path: string, value: string): boolean;
    /** Записывает число по пути, как `set()` записывает текст. */
    setNumber(path: string, value: number): boolean;
    /** Записывает логическое значение по пути, как `set()` записывает текст. */
    setBoolean(path: string, value: boolean): boolean;
    /** Записывает список текста по пути, как `set()` записывает текст. */
    setStrings(path: string, values: string[]): boolean;
    /** Удаляет значение, к которому ведёт путь; `false`, если его не было. */
    remove(path: string): boolean;
    /** Записывает весь файл обратно в его формате, с комментариями, которые стояли на отдельных строках. `false` для текста, отданного `parse()`. */
    save(): boolean;
    private put;
}
/**
 * Файл, из которого `read()` читает имя: само имя, если оно кончается на `.ini`,
 * `.yaml`, `.yml`, `.json` или `.jsonc`; иначе первый из `name.ini`, `name.yaml`,
 * `name.yml`, `name.json` и `name.jsonc`, который есть, — два из них — ошибка
 * в консоли сервера, — и `name.yaml`, если нет ни одного.
 */
export declare function resolve(name: string): string;
/**
 * Читает файл конфига из `configs/<baseDir>/` — INI, YAML или JSON — как
 * дерево значений. Имя без расширения находит файл (`resolve()`). Файла нет —
 * читается пустой объект, чтобы его заполнить и сохранить; файл, который не
 * прочитать, называется в консоли сервера со строкой и столбцом и тоже
 * читается пустым объектом. Для файла, форма которого заранее неизвестна;
 * конфиг известной формы читается в объект через `load(name, defaults)`.
 *
 *     const maps = configs.read("maps");     // maps.ini, .yaml, .yml, .json или .jsonc
 *     for (const key of maps.keys()) console.log(key);
 */
export declare function read(name: string): ConfigNode;
/** Читает текст в формате — `"ini"`, `"yaml"` или `"json"` — как `read()` читает файл; `save()` писать его некуда. */
export declare function parse(text: string, format: ConfigFormat): ConfigNode;
