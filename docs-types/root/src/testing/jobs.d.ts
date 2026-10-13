import type { FakeServer, PluginInstance } from './server';
export declare class FakeJobs {
    private readonly server;
    private readonly jobs;
    private readonly ended;
    private nextId;
    constructor(server: FakeServer);
    /** Whether a started job waits for its frame. */
    get busy(): boolean;
    start(plugin: PluginInstance, op: number, path: string, data: Uint8Array, size: number, fn: number): number;
    run(plugin: PluginInstance, op: number, path: string, data: Uint8Array, size: number): number;
    private work;
    private of;
    size(plugin: PluginInstance, id: number): number;
    read(plugin: PluginInstance, id: number, out: number, max: number): number;
    crc(plugin: PluginInstance, id: number): number;
    error(plugin: PluginInstance, id: number, out: number, max: number): number;
    close(plugin: PluginInstance, id: number): void;
    /** One frame: every started job goes to its callback, unless its plugin let it go or is gone. */
    frame(): void;
}
