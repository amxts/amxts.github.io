/**
 * The types of Config Core's API: configs, sections and their entries.
 */
/** Строка `key = value` или блок `key = { ... }`. */
export type EntryKind = "value" | "block";
/** Содержимое блока, одно из: одно значение, строка из нескольких значений или строки. */
export type ContentKind = "value" | "strings" | "entries";
/** Строка секции или строка блока. */
export interface Entry {
    /** Имя до `=`; "" для строки блока. */
    key: string;
    /** "value" для `key = value`, "block" для `key = { ... }`. */
    kind: EntryKind;
    /** Содержимое записи, одно из: одно значение, строка из нескольких значений или строки. */
    content: ContentKind;
    /** Значения записи по порядку; пусто для блока из строк. */
    values: string[];
    /** Строки блока; в остальных случаях пусто. */
    rows: Entry[];
    /** Комментарий и пустые строки, прочитанные перед ней; null для записи, созданной во время работы. */
    comments: string[] | null;
}
/** [Секция] файла конфига. */
export interface Section {
    /** Имя в квадратных скобках. */
    name: string;
    /** Комментарий и пустые строки, прочитанные перед ней; null для секции, созданной во время работы. */
    comments: string[] | null;
    /** Строки секции в порядке файла. */
    entries: Entry[];
}
/** Загруженный файл конфига. */
export interface Config {
    /** Имя, под которым он загружен, вместе с ".ini". */
    name: string;
    /** В порядке файла; имя, которое встречается в файле дважды, здесь тоже дважды. */
    sections: Section[];
}
/** Одна запись секции в том виде, в каком её отдаёт `entries()`. */
export interface SectionEntry {
    /** Имя до `=`. */
    key: string;
    /** Значения записи; пусто для блока. */
    values: string[];
    /** Блок ли это `key = { ... }`. */
    block: boolean;
}
/** Дамп одной секции — заголовок, затем записи, — как его печатает `dump_config`. */
export interface SectionDump {
    /** Заголовок вида "Section 0: NAME". */
    heading: string;
    /** Записи секции, по строке на каждую. */
    lines: string[];
}
/** Настройки Config Core: `configs` в amxts.config.ts. */
export interface ConfigCoreOptions {
    /** Папка внутри configs/, из которой загружаются файлы по имени, например "myserver"; "" — сама configs/. */
    baseDir: string;
}
declare module "@amxts/core" {
    interface ModuleOptions {
        configs?: Partial<ConfigCoreOptions>;
    }
}
