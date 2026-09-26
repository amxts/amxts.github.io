import { ContentKind, EntryKind, Section, SectionDump, SectionEntry, Config, ConfigCoreOptions } from "./types";
export * from "./types";
declare const _default: AmxtsModule<ConfigCoreOptions>;
export default _default;
/** Задаёт папку внутри configs/, от которой считаются имена файлов, например "myserver"; "" — сама configs/. */
export declare function setBaseDir(dir: string): void;
/**
 * Загружает `configs/<baseDir>/<name>`; ".ini" добавляется, если в имени его нет.
 * Файла нет — конфиг загружается пустым, чтобы плагин его заполнил и сохранил.
 */
export declare function load(name: string): Config;
/** Секция конфига по имени — последняя, если в файле их две. */
export declare function section(config: Config, name: string): Section | null;
/** Секция; если её в конфиге нет, она создаётся. */
export declare function createSection(config: Config, name: string): Section;
/**
 * Записывает все секции конфига в `configs/<baseDir>/<name>` вместе с
 * комментариями и пустыми строками, с которыми он был прочитан. Перед секцией
 * или записью, созданной во время работы, ставится пустая строка.
 */
export declare function save(config: Config, name: string): boolean;
/** Записывает одну секцию в `configs/<baseDir>/<name>`; `save()` пишет все. */
export declare function writeSection(written: Section, name: string): boolean;
/** Дамп всех загруженных конфигов — каждая секция с записями, как их печатает `dump_config`. */
export declare function dump(): SectionDump[];
/** Значение номер `index` в строке ключа, без кавычек; null, если его нет. Ключ с "/" — путь. */
export declare function getValue(section: Section, key: string, index?: number): string | null;
/**
 * Значение по пути, `line` — строка его блока. Если ключ встречается в секции
 * несколько раз и строка не указана, `index` выбирает, какой из них, — и, как
 * в оригинале, заодно выбирает значение в нём.
 */
export declare function getValueByPath(section: Section, path: string, index?: number, line?: number): string | null;
/** Целое число; 0, если его нет. */
export declare function getInt(section: Section, key: string, index?: number): number;
/** Число; 0, если его нет. */
export declare function getNumber(section: Section, key: string, index?: number): number;
/** Значение как булево: true для целого числа, отличного от 0, например "1" или "2"; false для всего остального, включая "true". */
export declare function getBoolean(section: Section, key: string, index?: number): boolean;
/**
 * Слова строки ключа — строки номер `index`, если ключ встречается несколько
 * раз. Для блока — все значения всех его строк. null, если такого ключа нет
 * или в нём пусто.
 */
export declare function getWords(section: Section, key: string, index?: number): string[] | null;
/** Числа в значении `index` — в "1.0 2.0 3.0" их три; null, если значения нет. */
export declare function getNumbers(section: Section, key: string, index?: number): number[] | null;
/** Все значения строки, к которой ведёт путь, вместе с кавычками; [] для пустой строки, null, если её нет. */
export declare function getValues(section: Section, path: string, index?: number, line?: number): string[] | null;
/** Ключи секции в порядке файла. */
export declare function keys(section: Section): string[];
/** Все записи: ключ и, если это строка, её значения. */
export declare function entries(section: Section): SectionEntry[];
/**
 * Число значений в строке, строк в блоке или — для ключа, который
 * встречается несколько раз, — число его повторов. Путь считает то, к чему
 * ведёт.
 */
export declare function size(section: Section, key: string): number;
/** Есть ли в секции такой ключ. Ключ с "/" здесь не путь. */
export declare function has(section: Section, key: string): boolean;
/**
 * Задаёт значение. Ключ, которого нет, создаётся; значение за концом строки
 * добавляется, а перед ним — пустые. Для блока `line` — строка блока; если
 * её нет, она создаётся вместе с предыдущими. Путь создаёт блоки, через
 * которые проходит.
 */
export declare function set(section: Section, key: string, text: string, index?: number, line?: number): boolean;
/** Задаёт целое число; дробная часть отбрасывается: 2.7 пишется как 2. */
export declare function setInt(section: Section, key: string, value: number, index?: number): boolean;
/** Задаёт число, оно пишется как есть: 2.5, а не 2.500000. */
export declare function setNumber(section: Section, key: string, value: number, index?: number): boolean;
/** Пишется как 1 или 0. */
export declare function setBoolean(section: Section, key: string, value: boolean, index?: number): boolean;
/** Удаляет все записи ключа; false, если их не было. */
export declare function remove(section: Section, key: string): boolean;
/**
 * Делает ключ строкой значений или блоком и очищает его, если вид меняется;
 * ключ, которого нет, создаётся. При превращении в блок остальные записи
 * этого ключа удаляются.
 */
export declare function setKind(section: Section, key: string, kind: EntryKind): void;
/** Задаёт, что хранит ключ; при переходе между строками и текстом он очищается. Ключ, которого нет, создаётся. */
export declare function setContent(section: Section, key: string, content: ContentKind): void;
/** Комментарий, который пишется перед строкой `row` блока `key`; "" его убирает. false, если такой строки нет. */
export declare function setRowComment(section: Section, key: string, row: number, comment: string): boolean;
/** Дескриптор конфига для Pawn-плагина: его номер среди загруженных; -1, если конфига нет. */
export declare function configHandle(config: Config): number;
/** Конфиг по дескриптору Pawn-плагина; null, если такого нет. */
export declare function configByHandle(handle: number): Config | null;
/** Дескриптор секции для Pawn-плагина: её номер среди всех загруженных; -1, если секции нет. */
export declare function sectionHandle(found: Section): number;
/** Секция по дескриптору Pawn-плагина; null, если такой нет. */
export declare function sectionByHandle(handle: number): Section | null;
/** Секция с таким именем в любом конфиге: последняя из загруженных. */
export declare function findSection(name: string): Section | null;
/** Все секции всех конфигов в порядке загрузки. */
export declare function allSections(): Section[];
