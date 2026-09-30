/** Every file in the archive, by its path inside it; folders are left out. */
export declare function unzip(zip: Uint8Array): Map<string, Uint8Array>;
