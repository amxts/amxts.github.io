/// <reference path="../as-types.d.ts" />
/** add(any:dest[], any:len, const any:src[], any:max) */
export declare function add(src: string, max?: number): string;
/** AddTranslation(const any:lang[], TransKey:key, const any:phrase[]) */
export declare function AddTranslation(lang: number[], key: number, phrase: string): number;
/** admins_flush() */
export declare function admins_flush(): number;
/** admins_lookup(any:num, AdminProp:Property, any:Buffer[], any:BufferSize) */
export declare function admins_lookup(num: number, Property: number, Buffer?: string, BufferSize?: number): number;
/** admins_num() */
export declare function admins_num(): number;
/** admins_push(const any:AuthData[], const any:Password[], any:Access, any:Flags) */
export declare function admins_push(AuthData: string, Password: string, Access: number, Flags: number): number;
/** amxclient_cmd(any:index, const any:command[], const any:arg1[], const any:arg2[]) */
export declare function amxclient_cmd(index: number, command: string, arg1?: string, arg2?: string): number;
/** angle_vector(const Float:vector[], any:FRU, Float:ret[]) */
export declare function angle_vector(vector: number[], FRU: number, ret: number[]): number;
/** argparse(const any:text[], any:pos, any:argbuffer[], any:maxlen) */
export declare function argparse(text: string, pos: number): string;
/** ArrayClear(Array:which) */
export declare function ArrayClear(which: number): number;
/** ArrayClone(Array:which) */
export declare function ArrayClone(which: number): number;
/** ArrayCreate(any:cellsize, any:reserved) */
export declare function ArrayCreate(cellsize?: number, reserved?: number): number;
/** ArrayDeleteItem(Array:which, any:item) */
export declare function ArrayDeleteItem(which: number, item: number): number;
/** ArrayDestroy(Array:which) */
export declare function ArrayDestroy(which: number): number;
/** ArrayFindString(Array:which, const any:item[]) */
export declare function ArrayFindString(which: number, item: string): number;
/** ArrayFindValue(Array:which, any:item) */
export declare function ArrayFindValue(which: number, item: number): number;
/** which, item, output: pointer, size */
export declare function ArrayGetArray(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** ArrayGetCell(Array:which, any:item, any:block, bool:asChar) */
export declare function ArrayGetCell(which: number, item: number, block?: number, asChar?: boolean): number;
/** ArrayGetString(Array:which, any:item, any:output[], any:size) */
export declare function ArrayGetString(which: number, item: number): string;
/** ArrayGetStringHandle(Array:which, any:item) */
export declare function ArrayGetStringHandle(which: number, item: number): number;
/** ArrayInsertArrayAfter(Array:which, any:item, const any:input[]) */
export declare function ArrayInsertArrayAfter(which: number, item: number, input: string): number;
/** ArrayInsertArrayBefore(Array:which, any:item, const any:input[]) */
export declare function ArrayInsertArrayBefore(which: number, item: number, input: string): number;
/** ArrayInsertCellAfter(Array:which, any:item, any:input) */
export declare function ArrayInsertCellAfter(which: number, item: number, input: number): number;
/** ArrayInsertCellBefore(Array:which, any:item, const any:input) */
export declare function ArrayInsertCellBefore(which: number, item: number, input: number): number;
/** ArrayInsertStringAfter(Array:which, any:item, const any:input[]) */
export declare function ArrayInsertStringAfter(which: number, item: number, input: string): number;
/** ArrayInsertStringBefore(Array:which, any:item, const any:input[]) */
export declare function ArrayInsertStringBefore(which: number, item: number, input: string): number;
/** which, input: pointer, size */
export declare function ArrayPushArray(a0: i32, a1: i32, a2: i32): i32;
/** ArrayPushCell(Array:which, any:input) */
export declare function ArrayPushCell(which: number, input: number): number;
/** ArrayPushString(Array:which, const any:input[]) */
export declare function ArrayPushString(which: number, input: string): number;
/** ArrayResize(Array:which, any:newsize) */
export declare function ArrayResize(which: number, newsize: number): boolean;
/** array: pointer, value, size */
export declare function arrayset(a0: i32, a1: i32, a2: i32): i32;
/** which, item, input: pointer, size */
export declare function ArraySetArray(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** ArraySetCell(Array:which, any:item, any:input, any:block, bool:asChar) */
export declare function ArraySetCell(which: number, item: number, input: number, block?: number, asChar?: boolean): number;
/** ArraySetString(Array:which, any:item, const any:input[]) */
export declare function ArraySetString(which: number, item: number, input: string): number;
/** ArraySize(Array:which) */
export declare function ArraySize(which: number): number;
/** ArraySort(Array:array, const any:comparefunc[], any:data[], any:data_size) */
export declare function ArraySort(array: number, comparefunc: string, data?: string, data_size?: number): number;
/** ArraySortEx(Array:array, const any:comparefunc[], any:data[], any:data_size) */
export declare function ArraySortEx(array: number, comparefunc: string, data?: string, data_size?: number): number;
/** ArraySwap(Array:which, any:item1, any:item2) */
export declare function ArraySwap(which: number, item1: number, item2: number): number;
/** attach_view(any:iIndex, any:iTargetIndex) */
export declare function attach_view(iIndex: number, iTargetIndex: number): number;
/** AutoExecConfig(bool:autoCreate, const any:name[], const any:folder[]) */
export declare function AutoExecConfig(autoCreate?: boolean, name?: string, folder?: string): number;
/** bind_pcvar_float(any:pcvar, Float:var) */
export declare function bind_pcvar_float(pcvar: number, var_: number): number;
/** bind_pcvar_num(any:pcvar, any:var) */
export declare function bind_pcvar_num(pcvar: number, var_: number): number;
/** pcvar, var: pointer, varlen */
export declare function bind_pcvar_string(a0: i32, a1: i32, a2: i32): i32;
/** call_think(any:entity) */
export declare function call_think(entity: number): number;
/** callfunc_begin(const any:func[], const any:plugin[]) */
export declare function callfunc_begin(func: string, plugin?: string): number;
/** callfunc_begin_i(any:func, any:plugin) */
export declare function callfunc_begin_i(func: number, plugin?: number): number;
/** callfunc_end() */
export declare function callfunc_end(): number;
/** callfunc_push_array(const any:VALUE[], any:array_size, bool:copyback) */
export declare function callfunc_push_array(VALUE: string, array_size: number, copyback?: boolean): number;
/** callfunc_push_float(Float:value) */
export declare function callfunc_push_float(value: number): number;
/** value: pointer */
export declare function callfunc_push_floatrf(a0: i32): i32;
/** callfunc_push_int(any:value) */
export declare function callfunc_push_int(value: number): number;
/** value: pointer */
export declare function callfunc_push_intrf(a0: i32): i32;
/** callfunc_push_str(const any:VALUE[], bool:copyback) */
export declare function callfunc_push_str(VALUE: string, copyback?: boolean): number;
/** cfg_create_section(ConfigFile:cfg, const any:sectionName[]) */
export declare function cfg_create_section(cfg: number, sectionName: string): number;
/** cfg_delete_key(ConfigSection:section, const any:key[]) */
export declare function cfg_delete_key(section: number, key: string): boolean;
/** cfg_get_array_size(ConfigSection:section, const any:key[]) */
export declare function cfg_get_array_size(section: number, key: string): number;
/** cfg_get_bool(ConfigSection:section, const any:key[], any:index) */
export declare function cfg_get_bool(section: number, key: string, index?: number): boolean;
/** cfg_get_float(ConfigSection:section, const any:key[], any:index) */
export declare function cfg_get_float(section: number, key: string, index?: number): number;
/** cfg_get_float_array(ConfigSection:section, const any:key[], any:index) */
export declare function cfg_get_float_array(section: number, key: string, index?: number): number;
/** cfg_get_int(ConfigSection:section, const any:key[], any:index) */
export declare function cfg_get_int(section: number, key: string, index?: number): number;
/** cfg_get_section(ConfigFile:cfg, const any:sectionName[]) */
export declare function cfg_get_section(cfg: number, sectionName: string): number;
/** cfg_get_section_data(ConfigSection:section) */
export declare function cfg_get_section_data(section: number): number;
/** cfg_get_section_name(any:index, any:name[], any:len) */
export declare function cfg_get_section_name(index: number): string;
/** cfg_get_sections_count() */
export declare function cfg_get_sections_count(): number;
/** cfg_get_top_level_keys(ConfigSection:section) */
export declare function cfg_get_top_level_keys(section: number): number;
/** cfg_get_value(ConfigSection:section, const any:key[], any:value[], any:len, any:index) */
export declare function cfg_get_value(section: number, key: string, index?: number): string;
/** cfg_get_value_array(ConfigSection:section, const any:key[], any:index) */
export declare function cfg_get_value_array(section: number, key: string, index?: number): number;
/** cfg_get_value_array_by_path(ConfigSection:section, const any:path[], any:index, any:lineIndex) */
export declare function cfg_get_value_array_by_path(section: number, path: string, index?: number, lineIndex?: number): number;
/** cfg_get_value_by_path(ConfigSection:section, const any:path[], any:value[], any:len, any:index, any:lineIndex) */
export declare function cfg_get_value_by_path(section: number, path: string, index?: number, lineIndex?: number): string;
/** cfg_has_key(ConfigSection:section, const any:key[]) */
export declare function cfg_has_key(section: number, key: string): boolean;
/** cfg_load_file(const any:fileName[]) */
export declare function cfg_load_file(fileName: string): number;
/** cfg_save_config(ConfigFile:cfg, const any:fileName[]) */
export declare function cfg_save_config(cfg: number, fileName?: string): boolean;
/** cfg_set_base_dir(const any:dir[]) */
export declare function cfg_set_base_dir(dir: string): number;
/** cfg_set_bool(ConfigSection:section, const any:key[], bool:value, any:index) */
export declare function cfg_set_bool(section: number, key: string, value: boolean, index?: number): boolean;
/** cfg_set_entry_content_type(ConfigSection:section, const any:key[], ContentType:contentType) */
export declare function cfg_set_entry_content_type(section: number, key: string, contentType: number): boolean;
/** cfg_set_entry_type(ConfigSection:section, const any:key[], EntryType:entryType) */
export declare function cfg_set_entry_type(section: number, key: string, entryType: number): boolean;
/** cfg_set_float(ConfigSection:section, const any:key[], Float:value, any:index) */
export declare function cfg_set_float(section: number, key: string, value: number, index?: number): boolean;
/** cfg_set_int(ConfigSection:section, const any:key[], any:value, any:index) */
export declare function cfg_set_int(section: number, key: string, value: number, index?: number): boolean;
/** cfg_set_row_comment(ConfigSection:section, const any:key[], any:row, const any:comment[]) */
export declare function cfg_set_row_comment(section: number, key: string, row: number, comment: string): boolean;
/** cfg_set_value(ConfigSection:section, const any:key[], const any:value[], any:index, any:lineIndex) */
export declare function cfg_set_value(section: number, key: string, value: string, index?: number, lineIndex?: number): boolean;
/** cfg_write_file(ConfigFile:cfg, const any:fileName[], const any:sectionName[]) */
export declare function cfg_write_file(cfg: number, fileName: string, sectionName: string): boolean;
/** change_task(any:id, Float:newTime, any:outside) */
export declare function change_task(id?: number, newTime?: number, outside?: number): number;
/** CheckVisibilityInOrigin(const any:ent, Float:origin[], CheckVisibilityType:type) */
export declare function CheckVisibilityInOrigin(ent: number, origin: number[], type_?: number): number;
/** clamp(any:value, any:min, any:max) */
export declare function clamp(value: number, min: number, max: number): number;
/** ClearSyncHud(any:target, any:syncObj) */
export declare function ClearSyncHud(target: number, syncObj: number): number;
/** close_dir(any:dirh) */
export declare function close_dir(dirh: number): number;
/** CloseGameConfigFile(GameConfig:handle) */
export declare function CloseGameConfigFile(handle: number): number;
/** contain(const any:source[], const any:string[]) */
export declare function contain(source: string, string_: string): number;
/** containi(const any:source[], const any:string[]) */
export declare function containi(source: string, string_: string): number;
/** copy(any:dest[], any:len, const any:src[]) */
export declare function copy(src: string): string;
/** copy_infokey_buffer(any:infoBuffer, any:out[], any:maxlen) */
export declare function copy_infokey_buffer(infoBuffer: number): string;
/** szClassName: pointer, sizea, szKeyName: pointer, sizeb, szValue: pointer, sizec */
export declare function copy_keyvalue(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32, a5: i32): i32;
/** copyc(any:dest[], any:len, const any:src[], any:ch) */
export declare function copyc(src: string, ch: number): string;
/** create_cvar(const any:name[], const any:string[], any:flags, const any:description[], bool:has_min, Float:min_val, bool:has_max, Float:max_val) */
export declare function create_cvar(name: string, string_: string, flags?: number, description?: string, has_min?: boolean, min_val?: number, has_max?: boolean, max_val?: number): number;
/** create_entity(const any:szClassname[]) */
export declare function create_entity(szClassname: string): number;
/** create_kvd() */
export declare function create_kvd(): number;
/** create_tr2() */
export declare function create_tr2(): number;
/** CreateDataPack() */
export declare function CreateDataPack(): number;
/** CreateHamItemInfo() */
export declare function CreateHamItemInfo(): number;
/** CreateLangKey(const any:key[]) */
export declare function CreateLangKey(key: string): number;
/** CreateStack(any:blocksize) */
export declare function CreateStack(blocksize?: number): number;
/** cs_create_entity(const any:classname[]) */
export declare function cs_create_entity(classname: string): number;
/** cs_find_ent_by_class(any:start_index, const any:classname[]) */
export declare function cs_find_ent_by_class(start_index: number, classname: string): number;
/** cs_find_ent_by_owner(any:start_index, const any:classname[], any:owner) */
export declare function cs_find_ent_by_owner(start_index: number, classname: string, owner: number): number;
/** index, count: pointer */
export declare function cs_get_armoury_type(a0: i32, a1: i32): i32;
/** cs_get_c4_defusing(any:c4index) */
export declare function cs_get_c4_defusing(c4index: number): boolean;
/** cs_get_c4_explode_time(any:index) */
export declare function cs_get_c4_explode_time(index: number): number;
/** cs_get_hostage_foll(any:index) */
export declare function cs_get_hostage_foll(index: number): number;
/** cs_get_hostage_id(any:index) */
export declare function cs_get_hostage_id(index: number): number;
/** cs_get_hostage_lastuse(any:index) */
export declare function cs_get_hostage_lastuse(index: number): number;
/** cs_get_hostage_nextuse(any:index) */
export declare function cs_get_hostage_nextuse(index: number): number;
/** itemid, name: pointer, name_maxlen, altname: pointer, altname_maxlen */
export declare function cs_get_item_alias(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32): i32;
/** cs_get_item_id(const any:name[], CsWeaponClassType:classid) */
export declare function cs_get_item_id(name: string, classid?: number): number;
/** cs_get_no_knives() */
export declare function cs_get_no_knives(): number;
/** cs_get_translated_item_alias(const any:alias[], any:itemname[], any:maxlength) */
export declare function cs_get_translated_item_alias(alias: string): string;
/** cs_get_user_armor(any:index, CsArmorType:armortype) */
export declare function cs_get_user_armor(index: number, armortype?: number): number;
/** cs_get_user_bpammo(any:index, any:weapon) */
export declare function cs_get_user_bpammo(index: number, weapon: number): number;
/** cs_get_user_buyzone(any:index) */
export declare function cs_get_user_buyzone(index: number): number;
/** cs_get_user_deaths(any:index) */
export declare function cs_get_user_deaths(index: number): number;
/** cs_get_user_defuse(any:index) */
export declare function cs_get_user_defuse(index: number): number;
/** cs_get_user_driving(any:index) */
export declare function cs_get_user_driving(index: number): number;
/** cs_get_user_hasprim(any:index) */
export declare function cs_get_user_hasprim(index: number): number;
/** cs_get_user_hostagekills(any:index) */
export declare function cs_get_user_hostagekills(index: number): number;
/** cs_get_user_lastactivity(any:index) */
export declare function cs_get_user_lastactivity(index: number): number;
/** cs_get_user_mapzones(any:index) */
export declare function cs_get_user_mapzones(index: number): number;
/** cs_get_user_model(any:index, any:model[], any:len) */
export declare function cs_get_user_model(index: number): string;
/** cs_get_user_money(any:index) */
export declare function cs_get_user_money(index: number): number;
/** cs_get_user_nvg(any:index) */
export declare function cs_get_user_nvg(index: number): number;
/** cs_get_user_plant(any:index) */
export declare function cs_get_user_plant(index: number): number;
/** cs_get_user_shield(any:index) */
export declare function cs_get_user_shield(index: number): number;
/** cs_get_user_stationary(any:index) */
export declare function cs_get_user_stationary(index: number): number;
/** cs_get_user_submodel(any:index) */
export declare function cs_get_user_submodel(index: number): number;
/** cs_get_user_team(any:index, any:model) */
export declare function cs_get_user_team(index: number, model?: number): number;
/** cs_get_user_tked(any:index) */
export declare function cs_get_user_tked(index: number): number;
/** cs_get_user_vip(any:index) */
export declare function cs_get_user_vip(index: number): number;
/** cs_get_user_weapon(any:playerIndex, any:clip, any:ammo) */
export declare function cs_get_user_weapon(playerIndex: number, clip?: number, ammo?: number): number;
/** cs_get_user_weapon_entity(any:playerIndex) */
export declare function cs_get_user_weapon_entity(playerIndex: number): number;
/** cs_get_user_zoom(any:index) */
export declare function cs_get_user_zoom(index: number): number;
/** cs_get_weapon_ammo(any:index) */
export declare function cs_get_weapon_ammo(index: number): number;
/** cs_get_weapon_burst(any:index) */
export declare function cs_get_weapon_burst(index: number): number;
/** cs_get_weapon_id(any:index) */
export declare function cs_get_weapon_id(index: number): number;
/** cs_get_weapon_info(any:weapon_id, CsWeaponInfo:type) */
export declare function cs_get_weapon_info(weapon_id: number, type_: number): number;
/** cs_get_weapon_silen(any:index) */
export declare function cs_get_weapon_silen(index: number): number;
/** cs_get_weaponbox_item(any:weaponboxIndex) */
export declare function cs_get_weaponbox_item(weaponboxIndex: number): number;
/** cs_reset_user_model(any:index) */
export declare function cs_reset_user_model(index: number): number;
/** cs_set_armoury_type(any:index, any:type, any:count) */
export declare function cs_set_armoury_type(index: number, type_: number, count?: number): number;
/** cs_set_c4_defusing(any:c4index, bool:defusing) */
export declare function cs_set_c4_defusing(c4index: number, defusing: boolean): number;
/** cs_set_c4_explode_time(any:index, Float:value) */
export declare function cs_set_c4_explode_time(index: number, value: number): number;
/** cs_set_ent_class(any:index, const any:classname[]) */
export declare function cs_set_ent_class(index: number, classname: string): number;
/** cs_set_hostage_foll(any:index, any:followedindex) */
export declare function cs_set_hostage_foll(index: number, followedindex?: number): number;
/** cs_set_hostage_lastuse(any:index, Float:value) */
export declare function cs_set_hostage_lastuse(index: number, value: number): number;
/** cs_set_hostage_nextuse(any:index, Float:value) */
export declare function cs_set_hostage_nextuse(index: number, value: number): number;
/** cs_set_no_knives(any:noknives) */
export declare function cs_set_no_knives(noknives?: number): number;
/** cs_set_user_armor(any:index, any:armorvalue, CsArmorType:armortype) */
export declare function cs_set_user_armor(index: number, armorvalue: number, armortype: number): number;
/** cs_set_user_bpammo(any:index, any:weapon, any:amount) */
export declare function cs_set_user_bpammo(index: number, weapon: number, amount: number): number;
/** cs_set_user_deaths(any:index, any:newdeaths, bool:scoreboard) */
export declare function cs_set_user_deaths(index: number, newdeaths: number, scoreboard?: boolean): number;
/** cs_set_user_defuse(any:index, any:defusekit, any:r, any:g, any:b, any:icon[], any:flash) */
export declare function cs_set_user_defuse(index: number, defusekit?: number, r?: number, g?: number, b?: number, icon?: string, flash?: number): number;
/** cs_set_user_hostagekills(any:index, any:value) */
export declare function cs_set_user_hostagekills(index: number, value: number): number;
/** cs_set_user_lastactivity(any:index, Float:value) */
export declare function cs_set_user_lastactivity(index: number, value: number): number;
/** cs_set_user_model(any:index, const any:model[], bool:update_index) */
export declare function cs_set_user_model(index: number, model: string, update_index?: boolean): number;
/** cs_set_user_money(any:index, any:money, any:flash) */
export declare function cs_set_user_money(index: number, money: number, flash?: number): number;
/** cs_set_user_nvg(any:index, any:nvgoggles) */
export declare function cs_set_user_nvg(index: number, nvgoggles?: number): number;
/** cs_set_user_plant(any:index, any:plant, any:showbombicon) */
export declare function cs_set_user_plant(index: number, plant?: number, showbombicon?: number): number;
/** cs_set_user_submodel(any:index, any:value) */
export declare function cs_set_user_submodel(index: number, value: number): number;
/** cs_set_user_team(any:index, any:team, any:model, bool:send_teaminfo) */
export declare function cs_set_user_team(index: number, team: number, model?: number, send_teaminfo?: boolean): number;
/** cs_set_user_tked(any:index, any:tk, any:subtract) */
export declare function cs_set_user_tked(index: number, tk?: number, subtract?: number): number;
/** cs_set_user_vip(any:index, any:vip, any:model, any:scoreboard) */
export declare function cs_set_user_vip(index: number, vip?: number, model?: number, scoreboard?: number): number;
/** cs_set_user_zoom(any:index, any:type, any:mode) */
export declare function cs_set_user_zoom(index: number, type_: number, mode: number): number;
/** cs_set_weapon_ammo(any:index, any:newammo) */
export declare function cs_set_weapon_ammo(index: number, newammo: number): number;
/** cs_set_weapon_burst(any:index, any:burstmode) */
export declare function cs_set_weapon_burst(index: number, burstmode?: number): number;
/** cs_set_weapon_silen(any:index, any:silence, any:draw_animation) */
export declare function cs_set_weapon_silen(index: number, silence?: number, draw_animation?: number): number;
/** cs_user_spawn(any:player) */
export declare function cs_user_spawn(player: number): number;
/** cvar_exists(const any:cvar[]) */
export declare function cvar_exists(cvar: string): number;
/** date(any:year, any:month, any:day) */
export declare function date(year?: number, month?: number, day?: number): number;
/** dbg_fmt_error(any:buffer[], any:maxLength) */
export declare function dbg_fmt_error(): string;
/** dbg_trace_begin() */
export declare function dbg_trace_begin(): number;
/** trace, line: pointer, function: pointer, maxLength1, file: pointer, maxLength2 */
export declare function dbg_trace_info(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32, a5: i32): i32;
/** dbg_trace_next(any:trace) */
export declare function dbg_trace_next(trace: number): number;
/** delete_file(const any:file[], bool:use_valve_fs, const any:valve_path_id[]) */
export declare function delete_file(file: string, use_valve_fs?: boolean, valve_path_id?: string): number;
/** DestroyDataPack(DataPack:pack) */
export declare function DestroyDataPack(pack: number): number;
/** DestroyForward(any:forward_handle) */
export declare function DestroyForward(forward_handle: number): number;
/** DestroyStack(Stack:handle) */
export declare function DestroyStack(handle: number): number;
/** dir_exists(const any:dir[], bool:use_valve_fs) */
export declare function dir_exists(dir: string, use_valve_fs?: boolean): number;
/** disable_cvar_hook(cvarhook:handle) */
export declare function disable_cvar_hook(handle: number): number;
/** disable_event(any:handle) */
export declare function disable_event(handle: number): number;
/** disable_logevent(any:handle) */
export declare function disable_logevent(handle: number): number;
/** DisableHamForward(HamHook:fwd) */
export declare function DisableHamForward(fwd: number): number;
/** DisableHookChain(HookChain:hook) */
export declare function DisableHookChain(hook: number): boolean;
/** DisableHookMessage(const MessageHook:handle) */
export declare function DisableHookMessage(handle: number): boolean;
/** DispatchSpawn(any:iIndex) */
export declare function DispatchSpawn(iIndex: number): number;
/** drop_to_floor(any:entity) */
export declare function drop_to_floor(entity: number): number;
/** emessage_begin(any:dest, any:msg_type, const any:origin[], any:player) */
export declare function emessage_begin(dest: number, msg_type: number, origin?: number[], player?: number): number;
/** emessage_begin_f(any:dest, any:msg_type, const Float:origin[], any:player) */
export declare function emessage_begin_f(dest: number, msg_type: number, origin?: number[], player?: number): number;
/** emessage_end() */
export declare function emessage_end(): number;
/** emit_sound(any:index, any:channel, const any:sample[], Float:vol, Float:att, any:flags, any:pitch) */
export declare function emit_sound(index: number, channel: number, sample: string, vol: number, att: number, flags: number, pitch: number): number;
/** enable_cvar_hook(cvarhook:handle) */
export declare function enable_cvar_hook(handle: number): number;
/** enable_event(any:handle) */
export declare function enable_event(handle: number): number;
/** enable_logevent(any:handle) */
export declare function enable_logevent(handle: number): number;
/** EnableHamForward(HamHook:fwd) */
export declare function EnableHamForward(fwd: number): number;
/** EnableHookChain(HookChain:hook) */
export declare function EnableHookChain(hook: number): boolean;
/** EnableHookMessage(const MessageHook:handle) */
export declare function EnableHookMessage(handle: number): boolean;
/** eng_get_string(any:_string, any:_returnString[], any:_len) */
export declare function eng_get_string(_string: number): string;
/** engclient_cmd(any:index, const any:command[], const any:arg1[], const any:arg2[]) */
export declare function engclient_cmd(index: number, command: string, arg1?: string, arg2?: string): number;
/** engine_changelevel(const any:map[]) */
export declare function engine_changelevel(map: string): number;
/** engset_view(const any:index, const any:viewEntity) */
export declare function engset_view(index: number, viewEntity: number): number;
/** entity_count() */
export declare function entity_count(): number;
/** entity_get_byte(any:iIndex, any:iKey) */
export declare function entity_get_byte(iIndex: number, iKey: number): number;
/** entity_get_edict(any:iIndex, any:iKey) */
export declare function entity_get_edict(iIndex: number, iKey: number): number;
/** entity_get_edict2(any:iIndex, any:iKey) */
export declare function entity_get_edict2(iIndex: number, iKey: number): number;
/** entity_get_float(any:iIndex, any:iKey) */
export declare function entity_get_float(iIndex: number, iKey: number): number;
/** entity_get_int(any:iIndex, any:iKey) */
export declare function entity_get_int(iIndex: number, iKey: number): number;
/** entity_get_string(any:iIndex, any:iKey, any:szReturn[], any:iRetLen) */
export declare function entity_get_string(iIndex: number, iKey: number): string;
/** entity_get_vector(any:iIndex, any:iKey, Float:vRetVector[]) */
export declare function entity_get_vector(iIndex: number, iKey: number, vRetVector: number[]): number;
/** entity_intersects(any:entity, any:other) */
export declare function entity_intersects(entity: number, other: number): boolean;
/** entity_range(any:ida, any:idb) */
export declare function entity_range(ida: number, idb: number): number;
/** entity_set_byte(any:iIndex, any:iKey, any:iVal) */
export declare function entity_set_byte(iIndex: number, iKey: number, iVal: number): number;
/** entity_set_edict(any:iIndex, any:iKey, any:iNewIndex) */
export declare function entity_set_edict(iIndex: number, iKey: number, iNewIndex: number): number;
/** entity_set_float(any:iIndex, any:iKey, Float:iVal) */
export declare function entity_set_float(iIndex: number, iKey: number, iVal: number): number;
/** entity_set_int(any:iIndex, any:iKey, any:iVal) */
export declare function entity_set_int(iIndex: number, iKey: number, iVal: number): number;
/** entity_set_model(any:iIndex, const any:szModel[]) */
export declare function entity_set_model(iIndex: number, szModel: string): number;
/** entity_set_origin(any:iIndex, const Float:fNewOrigin[]) */
export declare function entity_set_origin(iIndex: number, fNewOrigin: number[]): number;
/** entity_set_size(any:index, const Float:mins[], const Float:maxs[]) */
export declare function entity_set_size(index: number, mins: number[], maxs: number[]): number;
/** entity_set_string(any:iIndex, any:iKey, const any:szNewVal[]) */
export declare function entity_set_string(iIndex: number, iKey: number, szNewVal: string): number;
/** entity_set_vector(any:iIndex, any:iKey, const Float:vNewVector[]) */
export declare function entity_set_vector(iIndex: number, iKey: number, vNewVector: number[]): number;
/** equal(const any:a[], const any:b[], any:c) */
export declare function equal(a: string, b: string, c?: number): number;
/** equali(const any:a[], const any:b[], any:c) */
export declare function equali(a: string, b: string, c?: number): number;
/** ewrite_angle(any:x) */
export declare function ewrite_angle(x: number): number;
/** ewrite_angle_f(Float:x) */
export declare function ewrite_angle_f(x: number): number;
/** ewrite_byte(any:x) */
export declare function ewrite_byte(x: number): number;
/** ewrite_char(any:x) */
export declare function ewrite_char(x: number): number;
/** ewrite_coord(any:x) */
export declare function ewrite_coord(x: number): number;
/** ewrite_coord_f(Float:x) */
export declare function ewrite_coord_f(x: number): number;
/** ewrite_entity(any:x) */
export declare function ewrite_entity(x: number): number;
/** ewrite_long(any:x) */
export declare function ewrite_long(x: number): number;
/** ewrite_short(any:x) */
export declare function ewrite_short(x: number): number;
/** ewrite_string(const any:x[]) */
export declare function ewrite_string(x: string): number;
/** fake_touch(any:entTouched, any:entToucher) */
export declare function fake_touch(entTouched: number, entToucher: number): number;
/** FClassnameIs(const any:entityIndex, const any:className[]) */
export declare function FClassnameIs(entityIndex: number, className: string): boolean;
/** fclose(any:file) */
export declare function fclose(file: number): number;
/** feof(any:file) */
export declare function feof(file: number): number;
/** fflush(any:file) */
export declare function fflush(file: number): number;
/** fgetc(any:file) */
export declare function fgetc(file: number): number;
/** fgets(any:file, any:buffer[], any:maxlength) */
export declare function fgets(file: number): string;
/** file_exists(const any:file[], bool:use_valve_fs) */
export declare function file_exists(file: string, use_valve_fs?: boolean): number;
/** file_size(const any:file[], any:flag, bool:use_valve_fs, const any:valve_path_id[]) */
export declare function file_size(file: string, flag?: number, use_valve_fs?: boolean, valve_path_id?: string): number;
/** FileReadInt16(any:file, any:data) */
export declare function FileReadInt16(file: number, data: number): boolean;
/** FileReadInt32(any:file, any:data) */
export declare function FileReadInt32(file: number, data: number): boolean;
/** FileReadInt8(any:file, any:data) */
export declare function FileReadInt8(file: number, data: number): boolean;
/** FileReadUint16(any:file, any:data) */
export declare function FileReadUint16(file: number, data: number): boolean;
/** FileReadUint8(any:file, any:data) */
export declare function FileReadUint8(file: number, data: number): boolean;
/** FileWriteInt16(any:file, any:data) */
export declare function FileWriteInt16(file: number, data: number): boolean;
/** FileWriteInt32(any:file, any:data) */
export declare function FileWriteInt32(file: number, data: number): boolean;
/** FileWriteInt8(any:file, any:data) */
export declare function FileWriteInt8(file: number, data: number): boolean;
/** find_ent_by_class(any:iIndex, const any:szClass[]) */
export declare function find_ent_by_class(iIndex: number, szClass: string): number;
/** find_ent_by_model(any:iIndex, const any:szClass[], const any:szModel[]) */
export declare function find_ent_by_model(iIndex: number, szClass: string, szModel: string): number;
/** find_ent_by_owner(any:iIndex, const any:szClass[], any:iOwner, any:iJghgType) */
export declare function find_ent_by_owner(iIndex: number, szClass: string, iOwner: number, iJghgType?: number): number;
/** find_ent_by_target(any:iIndex, const any:szClass[]) */
export declare function find_ent_by_target(iIndex: number, szClass: string): number;
/** find_ent_by_tname(any:iIndex, const any:szClass[]) */
export declare function find_ent_by_tname(iIndex: number, szClass: string): number;
/** find_ent_data_info(const any:class[], const any:member[], FieldType:type, any:arraysize, bool:unsigned) */
export declare function find_ent_data_info(class_: string, member: string, type_: number, arraysize: number, unsigned: number): number;
/** find_ent_in_sphere(any:start_from_ent, const Float:origin[], Float:radius) */
export declare function find_ent_in_sphere(start_from_ent: number, origin: number[], radius: number): number;
/** find_gamerules_info(const any:class[], const any:member[], FieldType:type, any:arraysize, bool:unsigned) */
export declare function find_gamerules_info(class_: string, member: string, type_: number, arraysize: number, unsigned: number): number;
/** find_plugin_byfile(const any:filename[], any:ignoreCase) */
export declare function find_plugin_byfile(filename: string, ignoreCase?: number): number;
/** aroundent, _lookforclassname: pointer, radius, entlist: pointer, maxents, origin: pointer */
export declare function find_sphere_class(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32, a5: i32): i32;
/** float(any:value) */
export declare function float_(value: number): number;
/** float_to_str(Float:fl, any:string[], any:len) */
export declare function float_to_str(fl: number): string;
/** floatabs(Float:value) */
export declare function floatabs(value: number): number;
/** floatacos(Float:angle, anglemode:radix) */
export declare function floatacos(angle: number, radix: number): number;
/** floatadd(Float:dividend, Float:divisor) */
export declare function floatadd(dividend: number, divisor: number): number;
/** floatasin(Float:angle, anglemode:radix) */
export declare function floatasin(angle: number, radix: number): number;
/** floatatan(Float:angle, anglemode:radix) */
export declare function floatatan(angle: number, radix: number): number;
/** floatatan2(Float:x, Float:y, anglemode:radix) */
export declare function floatatan2(x: number, y: number, radix: number): number;
/** floatcmp(Float:fOne, Float:fTwo) */
export declare function floatcmp(fOne: number, fTwo: number): number;
/** floatcos(Float:value, anglemode:mode) */
export declare function floatcos(value: number, mode?: number): number;
/** floatcosh(Float:angle, anglemode:mode) */
export declare function floatcosh(angle: number, mode?: number): number;
/** floatdiv(Float:dividend, Float:divisor) */
export declare function floatdiv(dividend: number, divisor: number): number;
/** floatfract(Float:value) */
export declare function floatfract(value: number): number;
/** floatlog(Float:value, Float:base) */
export declare function floatlog(value: number, base?: number): number;
/** floatmul(Float:oper1, Float:oper2) */
export declare function floatmul(oper1: number, oper2: number): number;
/** floatpower(Float:value, Float:exponent) */
export declare function floatpower(value: number, exponent: number): number;
/** floatround(Float:value, floatround_method:method) */
export declare function floatround(value: number, method?: number): number;
/** floatsin(Float:value, anglemode:mode) */
export declare function floatsin(value: number, mode?: number): number;
/** floatsinh(Float:angle, anglemode:mode) */
export declare function floatsinh(angle: number, mode?: number): number;
/** floatsqroot(Float:value) */
export declare function floatsqroot(value: number): number;
/** floatstr(const any:string[]) */
export declare function floatstr(string_: string): number;
/** floatsub(Float:oper1, Float:oper2) */
export declare function floatsub(oper1: number, oper2: number): number;
/** floattan(Float:value, anglemode:mode) */
export declare function floattan(value: number, mode?: number): number;
/** floattanh(Float:angle, anglemode:mode) */
export declare function floattanh(angle: number, mode?: number): number;
/** fopen(const any:filename[], const any:mode[], bool:use_valve_fs, const any:valve_path_id[]) */
export declare function fopen(filename: string, mode: string, use_valve_fs?: boolean, valve_path_id?: string): number;
/** force_unmodified(any:force_type, const any:mins[], const any:maxs[], const any:filename[]) */
export declare function force_unmodified(force_type: number, mins: number[], maxs: number[], filename: string): number;
/** force_use(any:entUsed, any:entUser) */
export declare function force_use(entUsed: number, entUser: number): number;
/** format_args(any:output[], any:len, any:pos) */
export declare function format_args(pos?: number): string;
/** format_time(any:output[], any:len, const any:format[], any:time) */
export declare function format_time(format: string, time?: number): string;
/** fputc(any:file, any:data) */
export declare function fputc(file: number, data: number): number;
/** fputs(any:file, const any:text[], bool:null_term) */
export declare function fputs(file: number, text: string, null_term?: boolean): number;
/** fread(any:file, any:data, any:mode) */
export declare function fread(file: number, data: number, mode: number): number;
/** file, data: pointer, blocks, mode */
export declare function fread_blocks(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** file, stream: pointer, blocksize, blocks */
export declare function fread_raw(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** free_kvd(any:kvd_handle) */
export declare function free_kvd(kvd_handle: number): number;
/** free_tr2(any:tr_handle) */
export declare function free_tr2(tr_handle: number): number;
/** FreeHamItemInfo(any:itemInfo_handle) */
export declare function FreeHamItemInfo(itemInfo_handle: number): number;
/** fseek(any:file, any:position, any:start) */
export declare function fseek(file: number, position: number, start: number): number;
/** ftell(any:file) */
export declare function ftell(file: number): number;
/** funcidx(const any:name[]) */
export declare function funcidx(name: string): number;
/** fungetc(any:file, any:data) */
export declare function fungetc(file: number, data: number): number;
/** fwrite(any:file, any:data, any:mode) */
export declare function fwrite(file: number, data: number, mode: number): number;
/** fwrite_blocks(any:file, const any:data[], any:blocks, any:mode) */
export declare function fwrite_blocks(file: number, data: string, blocks: number, mode: number): number;
/** fwrite_raw(any:file, const any:stream[], any:blocks, any:mode) */
export declare function fwrite_raw(file: number, stream: string, blocks: number, mode: number): number;
/** GameConfGetAddress(GameConfig:handle, const any:name[]) */
export declare function GameConfGetAddress(handle: number, name: string): number;
/** GameConfGetClassOffset(GameConfig:handle, const any:classname[], const any:key[]) */
export declare function GameConfGetClassOffset(handle: number, classname: string, key: string): number;
/** GameConfGetKeyValue(GameConfig:handle, const any:key[], any:buffer[], any:maxlen) */
export declare function GameConfGetKeyValue(handle: number, key: string): string;
/** GameConfGetOffset(GameConfig:handle, const any:key[]) */
export declare function GameConfGetOffset(handle: number, key: string): number;
/** get_addr_val(any:addr) */
export declare function get_addr_val(addr: number): number;
/** get_amxx_verstring(any:buffer[], any:length) */
export declare function get_amxx_verstring(): string;
/** param, dest: pointer, size */
export declare function get_array(a0: i32, a1: i32, a2: i32): i32;
/** get_array_f(any:param, Float:dest[], any:size) */
export declare function get_array_f(param: number, dest: number[], size: number): number;
/** get_char_bytes(const any:source[]) */
export declare function get_char_bytes(source: string): number;
/** index, command: pointer, len1, flags: pointer, info: pointer, len2, flag, info_ml: pointer */
export declare function get_clcmd(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32, a5: i32, a6: i32, a7: i32): i32;
/** get_clcmdsnum(any:flag) */
export declare function get_clcmdsnum(flag: number): number;
/** get_client_listen(any:receiver, any:sender) */
export declare function get_client_listen(receiver: number, sender: number): number;
/** index, cmd: pointer, len1, flags: pointer, info: pointer, len2, flag, id, info_ml: pointer */
export declare function get_concmd(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32, a5: i32, a6: i32, a7: i32, a8: i32): i32;
/** get_concmd_plid(any:cid, any:flag_mask, any:id_type) */
export declare function get_concmd_plid(cid: number, flag_mask: number, id_type: number): number;
/** get_concmdsnum(any:flag, any:id) */
export declare function get_concmdsnum(flag: number, id?: number): number;
/** get_cvar_flags(const any:cvar[]) */
export declare function get_cvar_flags(cvar: string): number;
/** get_cvar_float(const any:cvarname[]) */
export declare function get_cvar_float(cvarname: string): number;
/** get_cvar_num(const any:cvarname[]) */
export declare function get_cvar_num(cvarname: string): number;
/** get_cvar_pointer(const any:cvar[]) */
export declare function get_cvar_pointer(cvar: string): number;
/** get_cvar_string(const any:cvarname[], any:output[], any:iLen) */
export declare function get_cvar_string(cvarname: string): string;
/** get_decal_index(const any:szDecalName[]) */
export declare function get_decal_index(szDecalName: string): number;
/** get_distance(const any:origin1[], const any:origin2[]) */
export declare function get_distance(origin1: number[], origin2: number[]): number;
/** get_distance_f(const Float:Origin1[], const Float:Origin2[]) */
export declare function get_distance_f(Origin1: number[], Origin2: number[]): number;
/** get_ent_data(any:entity, const any:class[], const any:member[], any:element) */
export declare function get_ent_data(entity: number, class_: string, member: string, element?: number): number;
/** get_ent_data_entity(any:entity, const any:class[], const any:member[], any:element) */
export declare function get_ent_data_entity(entity: number, class_: string, member: string, element?: number): number;
/** get_ent_data_float(any:entity, const any:class[], const any:member[], any:element) */
export declare function get_ent_data_float(entity: number, class_: string, member: string, element?: number): number;
/** get_ent_data_size(const any:class[], const any:member[]) */
export declare function get_ent_data_size(class_: string, member: string): number;
/** get_ent_data_string(any:entity, const any:class[], const any:member[], any:value[], any:maxlen, any:element) */
export declare function get_ent_data_string(entity: number, class_: string, member: string, element?: number): string;
/** get_ent_data_vector(any:entity, const any:class[], const any:member[], Float:value[], any:element) */
export declare function get_ent_data_vector(entity: number, class_: string, member: string, value: number[], element?: number): number;
/** get_flags(any:flags, any:output[], any:len) */
export declare function get_flags(flags: number): string;
/** get_float_byref(any:param) */
export declare function get_float_byref(param: number): number;
/** get_func_id(const any:funcName[], any:pluginId) */
export declare function get_func_id(funcName: string, pluginId?: number): number;
/** get_gamerules_entity(const any:class[], const any:member[], any:element) */
export declare function get_gamerules_entity(class_: string, member: string, element?: number): number;
/** get_gamerules_float(const any:class[], const any:member[], any:element) */
export declare function get_gamerules_float(class_: string, member: string, element?: number): number;
/** get_gamerules_int(const any:class[], const any:member[], any:element) */
export declare function get_gamerules_int(class_: string, member: string, element?: number): number;
/** get_gamerules_size(const any:class[], const any:member[]) */
export declare function get_gamerules_size(class_: string, member: string): number;
/** get_gamerules_string(const any:class[], const any:member[], any:value[], any:maxlen, any:element) */
export declare function get_gamerules_string(class_: string, member: string, element?: number): string;
/** get_gamerules_vector(const any:class[], const any:member[], Float:value[], any:element) */
export declare function get_gamerules_vector(class_: string, member: string, value: number[], element?: number): number;
/** get_gametime() */
export declare function get_gametime(): number;
/** get_global_edict(any:variable) */
export declare function get_global_edict(variable: number): number;
/** get_global_edict2(any:variable) */
export declare function get_global_edict2(variable: number): number;
/** get_global_float(any:variable) */
export declare function get_global_float(variable: number): number;
/** get_global_int(any:variable) */
export declare function get_global_int(variable: number): number;
/** get_global_string(any:variable, any:string[], any:maxlen) */
export declare function get_global_string(variable: number): string;
/** get_global_vector(any:variable, Float:vector[]) */
export declare function get_global_vector(variable: number, vector: number[]): number;
/** get_grenade_id(any:id, any:model[], any:len, any:grenadeid) */
export declare function get_grenade_id(id: number, grenadeid?: number): string;
/** get_info_keybuffer(any:id, any:buffer[], any:length) */
export declare function get_info_keybuffer(id: number): string;
/** pbuffer, key: pointer, value: pointer, maxlen */
export declare function get_key_value(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** pbuffer, output: pointer, maxlen */
export declare function get_key_value_buffer(a0: i32, a1: i32, a2: i32): i32;
/** get_keyvalue(any:entity, const any:szKey[], any:value[], any:maxLength) */
export declare function get_keyvalue(entity: number, szKey: string): string;
/** get_lang(any:id, any:name[]) */
export declare function get_lang(id: number, name: number[]): number;
/** get_langsnum() */
export declare function get_langsnum(): number;
/** get_localinfo(const any:info[], any:output[], any:len) */
export declare function get_localinfo(info: string): string;
/** get_mapname(any:name[], any:len) */
export declare function get_mapname(): string;
/** get_maxplayers() */
export declare function get_maxplayers(): number;
/** get_modname(any:name[], any:len) */
export declare function get_modname(): string;
/** id, name: pointer, nameLen, author: pointer, authorLen, version: pointer, versionLen, status: pointer */
export declare function get_module(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32, a5: i32, a6: i32, a7: i32): i32;
/** get_modulesnum() */
export declare function get_modulesnum(): number;
/** get_msg_arg_float(any:argn) */
export declare function get_msg_arg_float(argn: number): number;
/** get_msg_arg_int(any:argn) */
export declare function get_msg_arg_int(argn: number): number;
/** get_msg_arg_string(any:argn, any:szReturn[], any:iLength) */
export declare function get_msg_arg_string(argn: number): string;
/** get_msg_args() */
export declare function get_msg_args(): number;
/** get_msg_argtype(any:argn) */
export declare function get_msg_argtype(argn: number): number;
/** get_msg_block(any:iMessage) */
export declare function get_msg_block(iMessage: number): number;
/** get_msg_origin(const Float:_Origin[]) */
export declare function get_msg_origin(_Origin: number[]): number;
/** get_param(any:param) */
export declare function get_param(param: number): number;
/** get_param_byref(any:param) */
export declare function get_param_byref(param: number): number;
/** get_param_f(any:param) */
export declare function get_param_f(param: number): number;
/** get_pcvar_bool(any:pcvar) */
export declare function get_pcvar_bool(pcvar: number): boolean;
/** pcvar, type, value: pointer */
export declare function get_pcvar_bounds(a0: i32, a1: i32, a2: i32): i32;
/** get_pcvar_flags(any:pcvar) */
export declare function get_pcvar_flags(pcvar: number): number;
/** get_pcvar_float(any:pcvar) */
export declare function get_pcvar_float(pcvar: number): number;
/** get_pcvar_num(any:pcvar) */
export declare function get_pcvar_num(pcvar: number): number;
/** get_pcvar_string(any:pcvar, any:string[], any:maxlen) */
export declare function get_pcvar_string(pcvar: number): string;
/** get_pdata_bool(any:_index, any:_offset, any:_linuxdiff, any:_macdiff) */
export declare function get_pdata_bool(_index: number, _offset: number, _linuxdiff?: number, _macdiff?: number): boolean;
/** get_pdata_byte(any:_index, any:_offset, any:_linuxdiff, any:_macdiff) */
export declare function get_pdata_byte(_index: number, _offset: number, _linuxdiff?: number, _macdiff?: number): number;
/** get_pdata_cbase(any:id, any:offset, any:linuxdiff, any:macdiff) */
export declare function get_pdata_cbase(id: number, offset: number, linuxdiff?: number, macdiff?: number): number;
/** get_pdata_cbase_safe(any:id, any:offset, any:linuxdiff, any:macdiff) */
export declare function get_pdata_cbase_safe(id: number, offset: number, linuxdiff?: number, macdiff?: number): number;
/** get_pdata_ehandle(any:_index, any:_offset, any:_linuxdiff, any:_macdiff) */
export declare function get_pdata_ehandle(_index: number, _offset: number, _linuxdiff?: number, _macdiff?: number): number;
/** get_pdata_ent(any:_index, any:_offset, any:_linuxdiff, any:_macdiff) */
export declare function get_pdata_ent(_index: number, _offset: number, _linuxdiff?: number, _macdiff?: number): number;
/** get_pdata_float(any:_index, any:_Offset, any:_linuxdiff, any:_macdiff) */
export declare function get_pdata_float(_index: number, _Offset: number, _linuxdiff?: number, _macdiff?: number): number;
/** get_pdata_int(any:_index, any:_Offset, any:_linuxdiff, any:_macdiff) */
export declare function get_pdata_int(_index: number, _Offset: number, _linuxdiff?: number, _macdiff?: number): number;
/** get_pdata_short(any:_index, any:_offset, any:_linuxdiff, any:_macdiff) */
export declare function get_pdata_short(_index: number, _offset: number, _linuxdiff?: number, _macdiff?: number): number;
/** get_pdata_string(any:entity, any:offset, any:dest[], any:maxlength, any:byref, any:linux, any:mac) */
export declare function get_pdata_string(entity: number, offset: number, byref: number, linux: number, mac: number): string;
/** get_pdata_vector(any:_index, any:_offset, Float:_output[], any:_linuxdiff, any:_macdiff) */
export declare function get_pdata_vector(_index: number, _offset: number, _output: number[], _linuxdiff?: number, _macdiff?: number): number;
/** players: pointer, num: pointer, flags: pointer, team: pointer */
export declare function get_players(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** get_playersnum(any:flag) */
export declare function get_playersnum(flag?: number): number;
/** get_plugin(any:index, any:filename[], any:len1, any:name[], any:len2, any:version[], any:len3, any:author[], any:len4, any:status[], any:len5, any:url[], any:len6, any:desc[], any:len7) */
export declare function get_plugin(index: number, filename?: string, len1?: number, name?: string, len2?: number, version?: string, len3?: number, author?: string, len4?: number, status?: string, len5?: number, url?: string, len6?: number, desc?: string, len7?: number): number;
/** num, name: pointer, namelen, flags: pointer, plugin_id: pointer, pcvar_handle: pointer, description: pointer, desc_len */
export declare function get_plugins_cvar(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32, a5: i32, a6: i32, a7: i32): i32;
/** get_plugins_cvarsnum() */
export declare function get_plugins_cvarsnum(): number;
/** get_pluginsnum() */
export declare function get_pluginsnum(): number;
/** get_rebuy(const RebuyHandle:rebuyhandle, RebuyStruct:member) */
export declare function get_rebuy(rebuyhandle: number, member: number): number;
/** get_speak(any:iIndex) */
export declare function get_speak(iIndex: number): number;
/** index, server_cmd: pointer, len1, flags: pointer, info: pointer, len2, flag, info_ml: pointer */
export declare function get_srvcmd(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32, a5: i32, a6: i32, a7: i32): i32;
/** get_srvcmdsnum(any:flag) */
export declare function get_srvcmdsnum(flag: number): number;
/** get_string(any:param, any:dest[], any:maxlen) */
export declare function get_string(param: number): string;
/** get_systime(any:offset) */
export declare function get_systime(offset?: number): number;
/** get_time(const any:format[], any:output[], any:len) */
export declare function get_time(format: string): string;
/** get_timeleft() */
export declare function get_timeleft(): number;
/** get_user_aiming(any:index, any:id, any:body, any:dist) */
export declare function get_user_aiming(index: number, id: number, body?: number, dist?: number): number;
/** get_user_ammo(any:index, any:weapon, any:clip, any:ammo) */
export declare function get_user_ammo(index: number, weapon: number, clip: number, ammo: number): number;
/** get_user_armor(any:index) */
export declare function get_user_armor(index: number): number;
/** get_user_authid(any:index, any:authid[], any:len) */
export declare function get_user_authid(index: number): string;
/** get_user_deaths(any:index) */
export declare function get_user_deaths(index: number): number;
/** get_user_flags(any:index, any:id) */
export declare function get_user_flags(index: number, id?: number): number;
/** get_user_footsteps(any:index) */
export declare function get_user_footsteps(index: number): number;
/** get_user_frags(any:index) */
export declare function get_user_frags(index: number): number;
/** get_user_godmode(any:index) */
export declare function get_user_godmode(index: number): number;
/** get_user_gravity(any:index) */
export declare function get_user_gravity(index: number): number;
/** get_user_health(any:index) */
export declare function get_user_health(index: number): number;
/** get_user_hitzones(any:index, any:target) */
export declare function get_user_hitzones(index: number, target: number): number;
/** get_user_index(const any:name[]) */
export declare function get_user_index(name: string): number;
/** get_user_info(any:index, const any:info[], any:output[], any:len) */
export declare function get_user_info(index: number, info: string): string;
/** get_user_ip(any:index, any:ip[], any:len, any:without_port) */
export declare function get_user_ip(index: number, without_port?: number): string;
/** get_user_maxspeed(any:index) */
export declare function get_user_maxspeed(index: number): number;
/** get_user_menu(any:index, any:id, any:keys) */
export declare function get_user_menu(index: number, id: number, keys: number): number;
/** get_user_msgid(const any:name[]) */
export declare function get_user_msgid(name: string): number;
/** get_user_msgname(any:msgid, any:name[], any:len) */
export declare function get_user_msgname(msgid: number): string;
/** get_user_name(any:index, any:name[], any:len) */
export declare function get_user_name(index: number): string;
/** get_user_noclip(any:index) */
export declare function get_user_noclip(index: number): number;
/** get_user_origin(any:index, any:origin[], any:mode) */
export declare function get_user_origin(index: number, origin: number[], mode?: number): number;
/** get_user_ping(any:index, any:ping, any:loss) */
export declare function get_user_ping(index: number, ping: number, loss: number): number;
/** get_user_rendering(any:index, any:fx, any:r, any:g, any:b, any:render, any:amount) */
export declare function get_user_rendering(index: number, fx?: number, r?: number, g?: number, b?: number, render?: number, amount?: number): number;
/** get_user_team(any:index, any:team[], any:len) */
export declare function get_user_team(index: number, team?: string, len?: number): number;
/** get_user_time(any:index, any:flag) */
export declare function get_user_time(index: number, flag?: number): number;
/** get_user_userid(any:index) */
export declare function get_user_userid(index: number): number;
/** get_user_weapon(any:index, any:clip, any:ammo) */
export declare function get_user_weapon(index: number, clip?: number, ammo?: number): number;
/** index, weapons: pointer, num: pointer */
export declare function get_user_weapons(a0: i32, a1: i32, a2: i32): i32;
/** get_vaultdata(const any:key[], any:data[], any:len) */
export declare function get_vaultdata(key: string, data?: string, len?: number): number;
/** get_viewent(const any:index) */
export declare function get_viewent(index: number): number;
/** get_weaponid(const any:name[]) */
export declare function get_weaponid(name: string): number;
/** get_weaponname(any:id, any:weapon[], any:len) */
export declare function get_weaponname(id: number): string;
/** get_xvar_float(any:id) */
export declare function get_xvar_float(id: number): number;
/** get_xvar_id(const any:name[]) */
export declare function get_xvar_id(name: string): number;
/** get_xvar_num(any:id) */
export declare function get_xvar_num(id: number): number;
/** getarg(any:arg, any:index) */
export declare function getarg(arg: number, index?: number): number;
/** GetAttachment(const any:entity, const any:attachment, Float:vecOrigin[], Float:vecAngles[]) */
export declare function GetAttachment(entity: number, attachment: number, vecOrigin: number[], vecAngles?: number[]): number;
/** GetBodygroup(const any:entity, const any:group) */
export declare function GetBodygroup(entity: number, group: number): number;
/** GetBonePosition(const any:entity, const any:bone, Float:vecOrigin[], Float:vecAngles[]) */
export declare function GetBonePosition(entity: number, bone: number, vecOrigin: number[], vecAngles?: number[]): number;
/** GetCurrentHookChainHandle() */
export declare function GetCurrentHookChainHandle(): number;
/** GetFileTime(const any:file[], FileTimeType:tmode) */
export declare function GetFileTime(file: string, tmode: number): number;
/** GetGrenadeType(const any:entityIndex) */
export declare function GetGrenadeType(entityIndex: number): number;
/** output: pointer */
export declare function GetHamReturnEntity(a0: i32): i32;
/** output: pointer */
export declare function GetHamReturnFloat(a0: i32): i32;
/** output: pointer */
export declare function GetHamReturnInteger(a0: i32): i32;
/** GetHamReturnStatus() */
export declare function GetHamReturnStatus(): number;
/** GetHamReturnString(any:output[], any:size) */
export declare function GetHamReturnString(): string;
/** GetHamReturnVector(Float:output[]) */
export declare function GetHamReturnVector(output: number[]): number;
/** GetLangTransKey(const any:key[]) */
export declare function GetLangTransKey(key: string): number;
/** GetMessageArgsNum() */
export declare function GetMessageArgsNum(): number;
/** GetMessageArgType(const any:number) */
export declare function GetMessageArgType(number_: number): number;
/** GetMessageBlock(const any:msgid) */
export declare function GetMessageBlock(msgid: number): number;
/** GetModelBoundingBox(any:entity, Float:mins[], Float:maxs[], any:sequence) */
export declare function GetModelBoundingBox(entity: number, mins: number[], maxs: number[], sequence?: number): number;
/** output: pointer */
export declare function GetOrigHamReturnEntity(a0: i32): i32;
/** output: pointer */
export declare function GetOrigHamReturnFloat(a0: i32): i32;
/** output: pointer */
export declare function GetOrigHamReturnInteger(a0: i32): i32;
/** GetOrigHamReturnString(any:output[], any:size) */
export declare function GetOrigHamReturnString(): string;
/** GetOrigHamReturnVector(Float:output[]) */
export declare function GetOrigHamReturnVector(output: number[]): number;
/** GetPackPosition(DataPack:pack) */
export declare function GetPackPosition(pack: number): number;
/** GetSequenceInfo(const any:entity, any:piFlags, Float:pflFrameRate, Float:pflGroundSpeed) */
export declare function GetSequenceInfo(entity: number, piFlags: number, pflFrameRate: number, pflGroundSpeed: number): boolean;
/** give_item(any:index, const any:item[]) */
export declare function give_item(index: number, item: string): number;
/** halflife_time() */
export declare function halflife_time(): number;
/** has_map_ent_class(const any:classname[]) */
export declare function has_map_ent_class(classname: string): boolean;
/** has_rechecker() */
export declare function has_rechecker(): boolean;
/** has_reunion() */
export declare function has_reunion(): boolean;
/** has_vtc() */
export declare function has_vtc(): boolean;
/** hash_file(const any:fileName[], const HashType:type, any:output[], const any:outputSize) */
export declare function hash_file(fileName: string, type_: number): string;
/** hash_string(const any:string[], const HashType:type, any:output[], const any:outputSize) */
export declare function hash_string(string_: string, type_: number): string;
/** heapspace() */
export declare function heapspace(): number;
/** hook_cvar_change(any:pcvar, const any:callback[]) */
export declare function hook_cvar_change(pcvar: number, callback: string): number;
/** INI_CreateParser() */
export declare function INI_CreateParser(): number;
/** INI_DestroyParser(INIParser:handle) */
export declare function INI_DestroyParser(handle: number): number;
/** INI_ParseFile(INIParser:handle, const any:file[], any:line, any:col, any:data) */
export declare function INI_ParseFile(handle: number, file: string, line?: number, col?: number, data?: number): boolean;
/** INI_SetParseEnd(INIParser:handle, const any:func[]) */
export declare function INI_SetParseEnd(handle: number, func: string): number;
/** INI_SetParseStart(INIParser:handle, const any:func[]) */
export declare function INI_SetParseStart(handle: number, func: string): number;
/** INI_SetRawLine(INIParser:handle, const any:func[]) */
export declare function INI_SetRawLine(handle: number, func: string): number;
/** INI_SetReaders(INIParser:smc, const any:kvFunc[], const any:nsFunc[]) */
export declare function INI_SetReaders(smc: number, kvFunc: string, nsFunc?: string): number;
/** int3() */
export declare function int3(): number;
/** is_amd64_server() */
export declare function is_amd64_server(): number;
/** is_char_lower(any:ch) */
export declare function is_char_lower(ch: number): boolean;
/** is_char_mb(any:ch) */
export declare function is_char_mb(ch: number): number;
/** is_char_upper(any:ch) */
export declare function is_char_upper(ch: number): boolean;
/** is_dedicated_server() */
export declare function is_dedicated_server(): number;
/** is_entity(const any:entityIndex) */
export declare function is_entity(entityIndex: number): boolean;
/** is_in_viewcone(any:entity, const Float:origin[], any:use3d) */
export declare function is_in_viewcone(entity: number, origin: number[], use3d?: number): number;
/** is_jit_enabled() */
export declare function is_jit_enabled(): number;
/** is_linux_server() */
export declare function is_linux_server(): number;
/** is_map_valid(const any:mapname[]) */
export declare function is_map_valid(mapname: string): number;
/** is_module_loaded(const any:name[]) */
export declare function is_module_loaded(name: string): number;
/** is_plugin_loaded(const any:name[], bool:usefilename) */
export declare function is_plugin_loaded(name: string, usefilename?: boolean): number;
/** is_regamedll() */
export declare function is_regamedll(): boolean;
/** is_rehlds() */
export declare function is_rehlds(): boolean;
/** input: pointer, input_size, flags, output_size: pointer */
export declare function is_string_category(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** is_user_alive(any:index) */
export declare function is_user_alive(index: number): number;
/** is_user_authorized(any:index) */
export declare function is_user_authorized(index: number): number;
/** is_user_bot(any:index) */
export declare function is_user_bot(index: number): number;
/** is_user_connected(any:index) */
export declare function is_user_connected(index: number): number;
/** is_user_connecting(any:index) */
export declare function is_user_connecting(index: number): number;
/** is_user_hltv(any:index) */
export declare function is_user_hltv(index: number): number;
/** is_valid_ent(any:iIndex) */
export declare function is_valid_ent(iIndex: number): number;
/** is_visible(any:entity, any:target) */
export declare function is_visible(entity: number, target: number): number;
/** isalnum(any:ch) */
export declare function isalnum(ch: number): number;
/** isalpha(any:ch) */
export declare function isalpha(ch: number): number;
/** isdigit(any:ch) */
export declare function isdigit(ch: number): number;
/** IsHamValid(Ham:function) */
export declare function IsHamValid(function_: number): boolean;
/** IsMessageDataModified(MsgDataType:type, const any:number) */
export declare function IsMessageDataModified(type_?: number, number_?: number): boolean;
/** IsPackEnded(DataPack:pack) */
export declare function IsPackEnded(pack: number): boolean;
/** IsReapiHookOriginalWasCalled(ReAPIFunc:function_id) */
export declare function IsReapiHookOriginalWasCalled(function_id: number): boolean;
/** isspace(any:ch) */
export declare function isspace(ch: number): number;
/** IsStackEmpty(Stack:handle) */
export declare function IsStackEmpty(handle: number): boolean;
/** lang_exists(const any:name[]) */
export declare function lang_exists(name: string): number;
/** LibraryExists(const any:library[], LibType:type) */
export declare function LibraryExists(library: string, type_: number): number;
/** file: pointer, buffer: pointer, maxlength, length: pointer */
export declare function LoadFileForMe(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** LoadGameConfigFile(const any:file[]) */
export declare function LoadGameConfigFile(file: string): number;
/** lookup_sequence(any:entity, const any:name[], Float:framerate, bool:loops, Float:groundspeed) */
export declare function lookup_sequence(entity: number, name: string, framerate: number, loops: number, groundspeed?: number): number;
/** LookupLangKey(any:Output[], any:OutputSize, const any:Key[], const any:id) */
export declare function LookupLangKey(Key: string, id: number): string;
/** max(any:value1, any:value2) */
export declare function max(value1: number, value2: number): number;
/** mb_strtolower(any:string[], any:maxlength) */
export declare function mb_strtolower(): string;
/** mb_strtotitle(any:string[], any:maxlength) */
export declare function mb_strtotitle(): string;
/** mb_strtoupper(any:string[], any:maxlength) */
export declare function mb_strtoupper(): string;
/** mb_ucfirst(any:string[], any:maxlength) */
export declare function mb_ucfirst(): string;
/** mc_add_fixed_menu_item(const any:section[], any:slot, const any:name[], const any:placeholder[], const any:action[], const any:condition[], const any:restriction[], any:emptyBefore, any:emptyAfter) */
export declare function mc_add_fixed_menu_item(section: string, slot: number, name: string, placeholder?: string, action?: string, condition?: string, restriction?: string, emptyBefore?: number, emptyAfter?: number): number;
/** mc_add_list_text(Array:aItems, const any:text[], bool:centered) */
export declare function mc_add_list_text(aItems: number, text: string, centered?: boolean): number;
/** mc_add_menu_item(const any:section[], const any:name[], const any:placeholder[], const any:condition[], const any:action[], const any:restriction[], const any:restrictMsg[], any:iPosition, any:emptyBefore, any:emptyAfter) */
export declare function mc_add_menu_item(section: string, name: string, placeholder?: string, condition?: string, action?: string, restriction?: string, restrictMsg?: string, iPosition?: number, emptyBefore?: number, emptyAfter?: number): number;
/** mc_cancel_menu_timer(const any:section[]) */
export declare function mc_cancel_menu_timer(section: string): number;
/** mc_clear_menu_items(const any:section[]) */
export declare function mc_clear_menu_items(section: string): number;
/** mc_create_menu(const any:section[], const any:title[]) */
export declare function mc_create_menu(section: string, title: string): number;
/** mc_get_active_menu(any:id) */
export declare function mc_get_active_menu(id: number): number;
/** mc_get_menu_property_string(any:menuIdx, any:property, any:value[], any:len) */
export declare function mc_get_menu_property_string(menuIdx: number, property: number): string;
/** mc_hide_menu(any:id) */
export declare function mc_hide_menu(id: number): number;
/** mc_is_menu_locked(any:id) */
export declare function mc_is_menu_locked(id: number): boolean;
/** mc_lock_menu(any:id, bool:lock) */
export declare function mc_lock_menu(id: number, lock?: boolean): number;
/** mc_notify_condition_changed(const any:condition[]) */
export declare function mc_notify_condition_changed(condition: string): number;
/** mc_refresh_menu(const any:sections[]) */
export declare function mc_refresh_menu(sections: string): number;
/** mc_register_action(const any:name[], const any:callback[], bool:isCritical) */
export declare function mc_register_action(name: string, callback: string, isCritical?: boolean): number;
/** mc_register_action_condition(const any:menuSection[], const any:actionName[], const any:callback[]) */
export declare function mc_register_action_condition(menuSection: string, actionName: string, callback: string): number;
/** mc_register_condition(const any:name[], const any:callback[]) */
export declare function mc_register_condition(name: string, callback: string): number;
/** mc_register_condition_filter(const any:condition[], const any:callback[]) */
export declare function mc_register_condition_filter(condition: string, callback: string): number;
/** mc_register_list_data_source(const any:menuName[], const any:callback[]) */
export declare function mc_register_list_data_source(menuName: string, callback: string): number;
/** mc_register_menu(const any:section[]) */
export declare function mc_register_menu(section: string): number;
/** mc_register_menu_close_callback(const any:callback[]) */
export declare function mc_register_menu_close_callback(callback: string): number;
/** mc_register_menu_open_callback(const any:callback[]) */
export declare function mc_register_menu_open_callback(callback: string): number;
/** mc_register_placeholder(const any:name[], const any:callback[]) */
export declare function mc_register_placeholder(name: string, callback: string): number;
/** mc_register_restriction(const any:name[], const any:callback[], const any:message[]) */
export declare function mc_register_restriction(name: string, callback: string, message?: string): number;
/** mc_register_show_filter(const any:callback[]) */
export declare function mc_register_show_filter(callback: string): number;
/** mc_set_menu_page(any:id, any:page) */
export declare function mc_set_menu_page(id: number, page: number): number;
/** mc_set_menu_property(const any:section[], any:property, any:value) */
export declare function mc_set_menu_property(section: string, property: number, value: number): number;
/** mc_set_menu_property_string(const any:section[], any:property, const any:value[]) */
export declare function mc_set_menu_property_string(section: string, property: number, value: string): number;
/** mc_set_menu_timer(const any:section[], any:time) */
export declare function mc_set_menu_timer(section: string, time: number): number;
/** mc_show_menu(any:id, const any:section[], any:time, any:targetId, bool:resetHistory, bool:forceOpen, bool:ignoreHistory) */
export declare function mc_show_menu(id: number, section: string, time?: number, targetId?: number, resetHistory?: boolean, forceOpen?: boolean, ignoreHistory?: boolean): number;
/** md5(const any:szString[], any:md5buffer[]) */
export declare function md5(szString: string, md5buffer: number[]): number;
/** md5_file(const any:file[], any:md5buffer[]) */
export declare function md5_file(file: string, md5buffer: number[]): number;
/** menu_addblank(any:menu, any:slot) */
export declare function menu_addblank(menu: number, slot?: number): number;
/** menu_addblank2(any:menu) */
export declare function menu_addblank2(menu: number): number;
/** menu_additem(any:menu, const any:name[], const any:info[], any:paccess, any:callback) */
export declare function menu_additem(menu: number, name: string, info?: string, paccess?: number, callback?: number): number;
/** menu_addtext(any:menu, const any:text[], any:slot) */
export declare function menu_addtext(menu: number, text: string, slot?: number): number;
/** menu_addtext2(any:menu, const any:text[]) */
export declare function menu_addtext2(menu: number, text: string): number;
/** menu_cancel(any:player) */
export declare function menu_cancel(player: number): number;
/** menu_create(const any:title[], const any:handler[], bool:ml) */
export declare function menu_create(title: string, handler: string, ml?: boolean): number;
/** menu_destroy(any:menu) */
export declare function menu_destroy(menu: number): number;
/** menu_display(any:id, any:menu, any:page, any:time) */
export declare function menu_display(id: number, menu: number, page?: number, time?: number): number;
/** menu_find_id(any:menu, any:page, any:key) */
export declare function menu_find_id(menu: number, page: number, key: number): number;
/** menu_item_getinfo(any:menu, any:item, any:access, any:info[], any:infolen, any:name[], any:namelen, any:callback) */
export declare function menu_item_getinfo(menu: number, item: number, access?: number, info?: string, infolen?: number, name?: string, namelen?: number, callback?: number): number;
/** menu_item_setaccess(any:menu, any:item, any:access) */
export declare function menu_item_setaccess(menu: number, item: number, access?: number): number;
/** menu_item_setcall(any:menu, any:item, any:callback) */
export declare function menu_item_setcall(menu: number, item: number, callback?: number): number;
/** menu_item_setcmd(any:menu, any:item, const any:info[]) */
export declare function menu_item_setcmd(menu: number, item: number, info: string): number;
/** menu_item_setname(any:menu, any:item, const any:name[]) */
export declare function menu_item_setname(menu: number, item: number, name: string): number;
/** menu_items(any:menu) */
export declare function menu_items(menu: number): number;
/** menu_makecallback(const any:function[]) */
export declare function menu_makecallback(function_: string): number;
/** menu_pages(any:menu) */
export declare function menu_pages(menu: number): number;
/** message_begin(any:dest, any:msg_type, const any:origin[], any:player) */
export declare function message_begin(dest: number, msg_type: number, origin?: number[], player?: number): number;
/** message_begin_f(any:dest, any:msg_type, const Float:origin[], any:player) */
export declare function message_begin_f(dest: number, msg_type: number, origin?: number[], player?: number): number;
/** message_end() */
export declare function message_end(): number;
/** min(any:value1, any:value2) */
export declare function min(value1: number, value2: number): number;
/** mkdir(const any:dirname[], any:mode, bool:use_valve_fs, const any:valve_path_id[]) */
export declare function mkdir(dirname: string, mode: number, use_valve_fs?: boolean, valve_path_id?: string): number;
/** module_exists(const any:logtag[]) */
export declare function module_exists(logtag: string): number;
/** next_file(any:dirh, any:buffer[], any:length, FileType:type) */
export declare function next_file(dirh: number, type_?: number): string;
/** next_hudchannel(any:player) */
export declare function next_hudchannel(player: number): number;
/** num_to_str(any:num, any:string[], any:len) */
export declare function num_to_str(num: number): string;
/** num_to_word(any:num, any:output[], any:len) */
export declare function num_to_word(num: number): string;
/** numargs() */
export declare function numargs(): number;
/** nvault_close(any:vault) */
export declare function nvault_close(vault: number): number;
/** nvault_lookup(any:vault, const any:key[], any:value[], any:maxlen, any:timestamp) */
export declare function nvault_lookup(vault: number, key: string, timestamp: number): string;
/** nvault_open(const any:name[]) */
export declare function nvault_open(name: string): number;
/** nvault_prune(any:vault, any:start, any:end) */
export declare function nvault_prune(vault: number, start: number, end: number): number;
/** nvault_pset(any:vault, const any:key[], const any:value[]) */
export declare function nvault_pset(vault: number, key: string, value: string): number;
/** nvault_remove(any:vault, const any:key[]) */
export declare function nvault_remove(vault: number, key: string): number;
/** nvault_set(any:vault, const any:key[], const any:value[]) */
export declare function nvault_set(vault: number, key: string, value: string): number;
/** nvault_touch(any:vault, const any:key[], any:timestamp) */
export declare function nvault_touch(vault: number, key: string, timestamp?: number): number;
/** open_dir(const any:dir[], any:firstfile[], any:length, FileType:type, bool:use_valve_fs, const any:valve_path_id[]) */
export declare function open_dir(dir: string, type_?: number, use_valve_fs?: boolean, valve_path_id?: string): string;
/** param_convert(any:num) */
export declare function param_convert(num: number): number;
/** parse_loguser(const any:text[], any:name[], any:nlen, any:userid, any:authid[], any:alen, any:team[], any:tlen) */
export declare function parse_loguser(text: string, userid?: number, authid?: string, alen?: number, team?: string, tlen?: number): string;
/** parse_time(const any:input[], const any:format[], any:time) */
export declare function parse_time(input: string, format: string, time?: number): number;
/** pause(const any:flag[], const any:param1[], const any:param2[]) */
export declare function pause(flag: string, param1?: string, param2?: string): number;
/** pev_serial(any:entindex) */
export declare function pev_serial(entindex: number): number;
/** pev_valid(any:entindex) */
export declare function pev_valid(entindex: number): number;
/** playback_event(any:flags, any:invoker, any:eventindex, Float:delay, const Float:origin[], const Float:angles[], Float:fparam1, Float:fparam2, any:iparam1, any:iparam2, any:bparam1, any:bparam2) */
export declare function playback_event(flags: number, invoker: number, eventindex: number, delay: number, origin: number[], angles: number[], fparam1: number, fparam2: number, iparam1: number, iparam2: number, bparam1: number, bparam2: number): number;
/** player_menu_info(any:id, any:menu, any:newmenu, any:menupage) */
export declare function player_menu_info(id: number, menu: number, newmenu: number, menupage?: number): number;
/** plugin_flags(any:hdr, any:plid) */
export declare function plugin_flags(hdr?: number, plid?: number): number;
/** point_contents(const Float:fCheckAt[]) */
export declare function point_contents(fCheckAt: number[]): number;
/** handle, buffer: pointer, size */
export declare function PopStackArray(a0: i32, a1: i32, a2: i32): i32;
/** handle, value: pointer, block, asChar */
export declare function PopStackCell(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** handle, buffer: pointer, maxlength, written: pointer */
export declare function PopStackString(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** power(any:value, any:exponent) */
export declare function power(value: number, exponent: number): number;
/** precache_generic(const any:szFile[]) */
export declare function precache_generic(szFile: string): number;
/** precache_model(const any:name[]) */
export declare function precache_model(name: string): number;
/** precache_sound(const any:name[]) */
export declare function precache_sound(name: string): number;
/** array: pointer, size, copyback */
export declare function PrepareArray(a0: i32, a1: i32, a2: i32): i32;
/** handle, values: pointer, size */
export declare function PushStackArray(a0: i32, a1: i32, a2: i32): i32;
/** PushStackCell(Stack:handle, any:value) */
export declare function PushStackCell(handle: number, value: number): number;
/** PushStackString(Stack:handle, const any:value[]) */
export declare function PushStackString(handle: number, value: string): number;
/** query_client_cvar(any:id, const any:cvar[], const any:resultFunc[], any:paramlen, const any:params[]) */
export declare function query_client_cvar(id: number, cvar: string, resultFunc: string, paramlen?: number, params?: string): number;
/** radius_damage(const Float:fExplodeAt[], any:iDamageMultiplier, any:iRadiusMultiplier) */
export declare function radius_damage(fExplodeAt: number[], iDamageMultiplier: number, iRadiusMultiplier: number): number;
/** random(any:max) */
export declare function random(max: number): number;
/** random_float(Float:a, Float:b) */
export declare function random_float(a: number, b: number): number;
/** random_num(any:a, any:b) */
export declare function random_num(a: number, b: number): number;
/** read_argc() */
export declare function read_argc(): number;
/** read_args(any:output[], any:len) */
export declare function read_args(): string;
/** read_argv(any:id, any:output[], any:len) */
export declare function read_argv(id: number): string;
/** read_argv_float(any:id) */
export declare function read_argv_float(id: number): number;
/** read_argv_int(any:id) */
export declare function read_argv_int(id: number): number;
/** read_datanum() */
export declare function read_datanum(): number;
/** read_datatype() */
export declare function read_datatype(): number;
/** dirname: pointer, pos, output: pointer, len, outlen: pointer */
export declare function read_dir(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32): i32;
/** read_file(const any:file[], any:line, any:text[], any:len, any:txtlen) */
export declare function read_file(file: string, line: number, txtlen?: number): string;
/** read_flags(const any:flags[]) */
export declare function read_flags(flags: string): number;
/** read_logargc() */
export declare function read_logargc(): number;
/** read_logargv(any:id, any:output[], any:len) */
export declare function read_logargv(id: number): string;
/** read_logdata(any:output[], any:len) */
export declare function read_logdata(): string;
/** ReadPackCell(DataPack:pack) */
export declare function ReadPackCell(pack: number): number;
/** ReadPackFloat(DataPack:pack) */
export declare function ReadPackFloat(pack: number): number;
/** ReadPackString(DataPack:pack, any:buffer[], any:maxlen) */
export declare function ReadPackString(pack: number): string;
/** register_clcmd(const any:client_cmd[], const any:function[], any:flags, const any:info[], any:FlagManager, bool:info_ml) */
export declare function register_clcmd(client_cmd: string, function_: string, flags?: number, info?: string, FlagManager?: number, info_ml?: boolean): number;
/** register_concmd(const any:cmd[], const any:function[], any:flags, const any:info[], any:FlagManager, bool:info_ml) */
export declare function register_concmd(cmd: string, function_: string, flags?: number, info?: string, FlagManager?: number, info_ml?: boolean): number;
/** register_cvar(const any:name[], const any:string[], any:flags, Float:fvalue) */
export declare function register_cvar(name: string, string_: string, flags?: number, fvalue?: number): number;
/** register_dictionary(const any:filename[]) */
export declare function register_dictionary(filename: string): number;
/** register_forward(any:_forwardType, const any:_function[], any:_post) */
export declare function register_forward(_forwardType: number, _function: string, _post?: number): number;
/** register_impulse(any:impulse, const any:function[]) */
export declare function register_impulse(impulse: number, function_: string): number;
/** register_library(const any:library[]) */
export declare function register_library(library: string): number;
/** register_menucmd(any:menuid, any:keys, const any:function[]) */
export declare function register_menucmd(menuid: number, keys: number, function_: string): number;
/** register_menuid(const any:menu[], any:outside) */
export declare function register_menuid(menu: string, outside?: number): number;
/** register_message(any:iMsgId, const any:szFunction[]) */
export declare function register_message(iMsgId: number, szFunction: string): number;
/** register_native(const any:name[], const any:handler[], any:style) */
export declare function register_native(name: string, handler: string, style?: number): number;
/** register_plugin(const any:plugin_name[], const any:version[], const any:author[], const any:url[], const any:description[]) */
export declare function register_plugin(plugin_name: string, version: string, author: string, url?: string, description?: string): number;
/** register_srvcmd(const any:server_cmd[], const any:function[], any:flags, const any:info[], bool:info_ml) */
export declare function register_srvcmd(server_cmd: string, function_: string, flags?: number, info?: string, info_ml?: boolean): number;
/** register_think(const any:Classname[], const any:function[]) */
export declare function register_think(Classname: string, function_: string): number;
/** register_touch(const any:Touched[], const any:Toucher[], const any:function[]) */
export declare function register_touch(Touched: string, Toucher: string, function_: string): number;
/** RegisterHam(Ham:function, const any:EntityClass[], const any:Callback[], any:Post, bool:specialbot) */
export declare function RegisterHam(function_: number, EntityClass: string, Callback: string, Post?: number, specialbot?: boolean): number;
/** RegisterHamFromEntity(Ham:function, any:EntityId, const any:Callback[], any:Post) */
export declare function RegisterHamFromEntity(function_: number, EntityId: number, Callback: string, Post?: number): number;
/** RegisterHookChain(ReAPIFunc:function_id, const any:callback[], any:post) */
export declare function RegisterHookChain(function_id: number, callback: string, post?: number): number;
/** RegisterMessage(const any:msg_id, const any:callback[], any:post) */
export declare function RegisterMessage(msg_id: number, callback: string, post?: number): number;
/** remove_cvar_flags(const any:cvar[], any:flags) */
export declare function remove_cvar_flags(cvar: string, flags?: number): number;
/** remove_entity(any:iIndex) */
export declare function remove_entity(iIndex: number): number;
/** text: pointer */
export declare function remove_quotes(a0: i32): i32;
/** remove_task(any:id, any:outside) */
export declare function remove_task(id?: number, outside?: number): number;
/** remove_user_flags(any:index, any:flags, any:id) */
export declare function remove_user_flags(index: number, flags?: number, id?: number): number;
/** remove_vaultdata(const any:key[]) */
export declare function remove_vaultdata(key: string): number;
/** rename_file(const any:oldname[], const any:newname[], any:relative) */
export declare function rename_file(oldname: string, newname: string, relative?: number): number;
/** replace(any:text[], any:len, const any:what[], const any:with[]) */
export declare function replace(what: string, with_: string): string;
/** replace_string(any:text[], any:maxlength, const any:search[], const any:replace[], bool:caseSensitive) */
export declare function replace_string(search: string, replace: string, caseSensitive?: boolean): string;
/** text: pointer, maxlength, search: pointer, replace: pointer, searchLen, replaceLen, caseSensitive */
export declare function replace_stringex(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32, a5: i32, a6: i32): i32;
/** RequestFrame(const any:callback[], any:data) */
export declare function RequestFrame(callback: string, data?: number): number;
/** require_module(const any:module[]) */
export declare function require_module(module_: string): number;
/** resemiclip_get_user_mask(any:id) */
export declare function resemiclip_get_user_mask(id: number): number;
/** resemiclip_set_user_mask(any:id, any:mask) */
export declare function resemiclip_set_user_mask(id: number, mask: number): number;
/** resemiclip_take_control(bool:take) */
export declare function resemiclip_take_control(take: boolean): number;
/** ResetModifiedMessageData(MsgDataType:type, const any:number) */
export declare function ResetModifiedMessageData(type_?: number, number_?: number): boolean;
/** ResetPack(DataPack:pack, bool:clear) */
export declare function ResetPack(pack: number, clear?: boolean): number;
/** rg_add_account(const any:index, any:amount, AccountSet:typeSet, const bool:bTrackChange) */
export declare function rg_add_account(index: number, amount: number, typeSet?: number, bTrackChange?: boolean): number;
/** rg_add_ammo_registry(const any:szAmmoname[]) */
export declare function rg_add_ammo_registry(szAmmoname: string): number;
/** rg_balance_teams() */
export declare function rg_balance_teams(): number;
/** rg_check_win_conditions() */
export declare function rg_check_win_conditions(): number;
/** rg_create_entity(const any:classname[], const bool:useHashTable) */
export declare function rg_create_entity(classname: string, useHashTable?: boolean): number;
/** rg_create_weaponbox(const any:pItem, const any:pPlayerOwner, const any:modelName[], Float:origin[], Float:angles[], Float:velocity[], Float:lifeTime, bool:packAmmo) */
export declare function rg_create_weaponbox(pItem: number, pPlayerOwner: number, modelName: string, origin: number[], angles: number[], velocity: number[], lifeTime: number, packAmmo: boolean): number;
/** rg_death_notice(const any:pVictim, const any:pKiller, const any:pevInflictor) */
export declare function rg_death_notice(pVictim: number, pKiller: number, pevInflictor: number): number;
/** rg_decal_trace(const any:ptr, Decal:decalNumber) */
export declare function rg_decal_trace(ptr: number, decalNumber: number): number;
/** rg_disappear(const any:player) */
export declare function rg_disappear(player: number): number;
/** rg_dmg_radius(Float:vecSrc[], const any:inflictor, const any:attacker, const Float:flDamage, const Float:flRadius, const any:iClassIgnore, const any:bitsDamageType) */
export declare function rg_dmg_radius(vecSrc: number[], inflictor: number, attacker: number, flDamage: number, flRadius: number, iClassIgnore: number, bitsDamageType: number): number;
/** rg_drop_item(const any:index, const any:item_name[]) */
export declare function rg_drop_item(index: number, item_name: string): number;
/** rg_drop_items_by_slot(const any:index, const InventorySlotType:slot) */
export declare function rg_drop_items_by_slot(index: number, slot: number): number;
/** rg_emit_texture_sound(const any:ptr, Float:vecSrc[], Float:vecEnd[], Bullet:iBulletType) */
export declare function rg_emit_texture_sound(ptr: number, vecSrc: number[], vecEnd: number[], iBulletType: number): number;
/** rg_find_ent_by_class(any:start_index, const any:classname[], const bool:useHashTable) */
export declare function rg_find_ent_by_class(start_index: number, classname: string, useHashTable?: boolean): number;
/** rg_find_ent_by_owner(any:start_index, const any:classname[], any:owner) */
export declare function rg_find_ent_by_owner(start_index: number, classname: string, owner: number): boolean;
/** rg_find_weapon_bpack_by_name(const any:index, const any:weapon[]) */
export declare function rg_find_weapon_bpack_by_name(index: number, weapon: string): number;
/** rg_fire_buckshots(const any:inflictor, const any:attacker, const any:shots, Float:vecSrc[], Float:vecDirShooting[], Float:vecSpread[], const Float:flDistance, const any:iTracerFreq, const any:iDamage) */
export declare function rg_fire_buckshots(inflictor: number, attacker: number, shots: number, vecSrc: number[], vecDirShooting: number[], vecSpread: number[], flDistance: number, iTracerFreq: number, iDamage: number): number;
/** rg_fire_bullets(const any:inflictor, const any:attacker, const any:shots, Float:vecSrc[], Float:vecDirShooting[], Float:vecSpread[], const Float:flDistance, const Bullet:iBulletType, const any:iTracerFreq, const any:iDamage) */
export declare function rg_fire_bullets(inflictor: number, attacker: number, shots: number, vecSrc: number[], vecDirShooting: number[], vecSpread: number[], flDistance: number, iBulletType: number, iTracerFreq: number, iDamage: number): number;
/** rg_get_account_rules(const RewardRules:rules_index) */
export declare function rg_get_account_rules(rules_index: number): number;
/** rg_get_can_hear_player(const any:listener, const any:sender) */
export declare function rg_get_can_hear_player(listener: number, sender: number): boolean;
/** rg_get_join_team_priority() */
export declare function rg_get_join_team_priority(): number;
/** rg_get_user_ammo(const any:index, WeaponIdType:weapon) */
export declare function rg_get_user_ammo(index: number, weapon: number): number;
/** rg_get_user_armor(const any:index, ArmorType:armortype) */
export declare function rg_get_user_armor(index: number, armortype?: number): number;
/** rg_get_user_bpammo(const any:index, WeaponIdType:weapon) */
export declare function rg_get_user_bpammo(index: number, weapon: number): number;
/** rg_get_user_footsteps(const any:index) */
export declare function rg_get_user_footsteps(index: number): number;
/** rg_get_weaponbox_id(const any:entity) */
export declare function rg_get_weaponbox_id(entity: number): number;
/** rg_give_custom_item(const any:index, const any:pszName[], GiveType:type, const any:uid) */
export declare function rg_give_custom_item(index: number, pszName: string, type_?: number, uid?: number): number;
/** rg_give_default_items(const any:index) */
export declare function rg_give_default_items(index: number): number;
/** rg_give_defusekit(const any:index, const bool:bDefusekit, const Float:color[], const any:icon[], const bool:bFlash) */
export declare function rg_give_defusekit(index: number, bDefusekit?: boolean, color?: number[], icon?: string, bFlash?: boolean): number;
/** rg_give_item(const any:index, const any:pszName[], GiveType:type) */
export declare function rg_give_item(index: number, pszName: string, type_?: number): number;
/** rg_give_shield(const any:index, const bool:bDeploy) */
export declare function rg_give_shield(index: number, bDeploy?: boolean): number;
/** rg_has_item_by_name(const any:index, const any:item[]) */
export declare function rg_has_item_by_name(index: number, item: string): boolean;
/** rg_hint_message(const any:index, const any:message[], Float:duration, bool:bDisplayIfPlayerDead, bool:bOverride) */
export declare function rg_hint_message(index: number, message: string, duration?: number, bDisplayIfPlayerDead?: boolean, bOverride?: boolean): boolean;
/** num_alive_terrorist: pointer, num_alive_ct: pointer, num_dead_terrorist: pointer, num_dead_ct: pointer */
export declare function rg_initialize_player_counts(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** rg_instant_reload_weapons(const any:index, const any:weapon) */
export declare function rg_instant_reload_weapons(index: number, weapon?: number): number;
/** rg_internal_cmd(const any:index, const any:cmd[], const any:arg[]) */
export declare function rg_internal_cmd(index: number, cmd: string, arg?: string): number;
/** rg_is_bomb_planted() */
export declare function rg_is_bomb_planted(): boolean;
/** rg_is_player_can_respawn(const any:index) */
export declare function rg_is_player_can_respawn(index: number): boolean;
/** rg_is_player_can_takedamage(const any:index, const any:attacker) */
export declare function rg_is_player_can_takedamage(index: number, attacker: number): boolean;
/** rg_join_team(const any:index, const TeamName:team) */
export declare function rg_join_team(index: number, team: number): number;
/** rg_multidmg_add(const any:inflictor, const any:victim, const Float:flDamage, const any:bitsDamageType) */
export declare function rg_multidmg_add(inflictor: number, victim: number, flDamage: number, bitsDamageType: number): number;
/** rg_multidmg_apply(const any:inflictor, const any:attacker) */
export declare function rg_multidmg_apply(inflictor: number, attacker: number): number;
/** rg_multidmg_clear() */
export declare function rg_multidmg_clear(): number;
/** rg_observer_find_next_player(const any:player, const bool:bReverse, const any:name[]) */
export declare function rg_observer_find_next_player(player: number, bReverse?: boolean, name?: string): number;
/** rg_plant_bomb(const any:index, Float:vecOrigin[], Float:vecAngles[]) */
export declare function rg_plant_bomb(index: number, vecOrigin: number[], vecAngles?: number[]): number;
/** rg_player_relationship(const any:player, const any:target) */
export declare function rg_player_relationship(player: number, target: number): number;
/** rg_player_takedamage_impulse(const any:player, const any:attacker, const Float:flKnockbackForce, const Float:flVelModifier) */
export declare function rg_player_takedamage_impulse(player: number, attacker: number, flKnockbackForce: number, flVelModifier: number): number;
/** rg_remove_all_items(const any:index, const bool:removeSuit) */
export declare function rg_remove_all_items(index: number, removeSuit?: boolean): number;
/** rg_remove_entity(const any:pEntity) */
export declare function rg_remove_entity(pEntity: number): number;
/** rg_remove_item(const any:index, const any:item_name[], const bool:removeAmmo) */
export declare function rg_remove_item(index: number, item_name: string, removeAmmo?: boolean): number;
/** rg_remove_items_by_slot(const any:index, const InventorySlotType:slot, const bool:removeAmmo) */
export declare function rg_remove_items_by_slot(index: number, slot: number, removeAmmo?: boolean): number;
/** rg_reset_can_hear_player(const any:index) */
export declare function rg_reset_can_hear_player(index: number): number;
/** rg_reset_maxspeed(const any:index) */
export declare function rg_reset_maxspeed(index: number): number;
/** rg_reset_user_model(const any:index, const bool:update_index) */
export declare function rg_reset_user_model(index: number, update_index?: boolean): number;
/** rg_restart_round() */
export declare function rg_restart_round(): number;
/** rg_round_end(const Float:tmDelay, const WinStatus:st, const ScenarioEventEndRound:event, const any:message[], const any:sentence[], const bool:trigger) */
export declare function rg_round_end(tmDelay: number, st: number, event?: number, message?: string, sentence?: string, trigger?: boolean): number;
/** rg_round_respawn(const any:index) */
export declare function rg_round_respawn(index: number): number;
/** rg_send_audio(const any:index, const any:sample[], const any:pitch) */
export declare function rg_send_audio(index: number, sample: string, pitch?: number): number;
/** rg_send_bartime(const any:index, const any:duration, const bool:observer) */
export declare function rg_send_bartime(index: number, duration: number, observer?: boolean): number;
/** rg_send_bartime2(const any:index, const any:duration, const Float:startPercent, const bool:observer) */
export declare function rg_send_bartime2(index: number, duration: number, startPercent: number, observer?: boolean): number;
/** rg_send_death_message(const any:pKiller, const any:pVictim, const any:pAssister, const any:pevInflictor, const any:killerWeaponName[], const DeathMessageFlags:iDeathMessageFlags, const KillRarity:iRarityOfKill) */
export declare function rg_send_death_message(pKiller: number, pVictim: number, pAssister: number, pevInflictor: number, killerWeaponName: string, iDeathMessageFlags: number, iRarityOfKill: number): number;
/** rg_set_account_rules(const RewardRules:rules_index, const any:amount) */
export declare function rg_set_account_rules(rules_index: number, amount: number): number;
/** rg_set_animation(const any:index, PLAYER_ANIM:playerAnim) */
export declare function rg_set_animation(index: number, playerAnim: number): number;
/** rg_set_can_hear_player(const any:listener, const any:sender, const bool:can_hear) */
export declare function rg_set_can_hear_player(listener: number, sender: number, can_hear: boolean): number;
/** rg_set_observer_mode(const any:player, const any:mode) */
export declare function rg_set_observer_mode(player: number, mode: number): number;
/** rg_set_user_ammo(const any:index, WeaponIdType:weapon, any:amount) */
export declare function rg_set_user_ammo(index: number, weapon: number, amount: number): number;
/** rg_set_user_armor(const any:index, any:armorvalue, ArmorType:armortype) */
export declare function rg_set_user_armor(index: number, armorvalue: number, armortype: number): number;
/** rg_set_user_bpammo(const any:index, WeaponIdType:weapon, any:amount) */
export declare function rg_set_user_bpammo(index: number, weapon: number, amount: number): number;
/** rg_set_user_footsteps(const any:index, bool:silent) */
export declare function rg_set_user_footsteps(index: number, silent?: boolean): number;
/** rg_set_user_model(const any:index, const any:model[], const bool:update_index) */
export declare function rg_set_user_model(index: number, model: string, update_index?: boolean): number;
/** rg_set_user_team(const any:index, TeamName:team, ModelName:model, const bool:send_teaminfo, const bool:check_win_conditions) */
export declare function rg_set_user_team(index: number, team: number, model?: number, send_teaminfo?: boolean, check_win_conditions?: boolean): number;
/** rg_spawn_grenade(WeaponIdType:weaponId, any:pevOwner, Float:vecSrc[], Float:vecThrow[], Float:time, TeamName:iTeam, any:usEvent) */
export declare function rg_spawn_grenade(weaponId: number, pevOwner: number, vecSrc: number[], vecThrow: number[], time: number, iTeam: number, usEvent?: number): number;
/** rg_spawn_head_gib(const any:index) */
export declare function rg_spawn_head_gib(index: number): number;
/** rg_spawn_random_gibs(const any:index, const any:cGibs, const bool:bHuman) */
export declare function rg_spawn_random_gibs(index: number, cGibs: number, bHuman?: boolean): number;
/** rg_swap_all_players() */
export declare function rg_swap_all_players(): number;
/** rg_switch_best_weapon(const any:player, const any:currentWeapon) */
export declare function rg_switch_best_weapon(player: number, currentWeapon?: number): number;
/** rg_switch_team(const any:index) */
export declare function rg_switch_team(index: number): number;
/** rg_switch_weapon(const any:index, const any:weapon) */
export declare function rg_switch_weapon(index: number, weapon: number): number;
/** rg_trace_hull(Float:vecStart[], Float:vecEnd[], const any:ignoreMonsters, const any:hullNumber, const any:ignoreEntity, const any:ptr, const any:traceFlags) */
export declare function rg_trace_hull(vecStart: number[], vecEnd: number[], ignoreMonsters: number, hullNumber: number, ignoreEntity: number, ptr: number, traceFlags?: number): number;
/** rg_trace_line(Float:vecStart[], Float:vecEnd[], const any:ignoreMonsters, const any:ignoreEntity, const any:ptr, const any:traceFlags) */
export declare function rg_trace_line(vecStart: number[], vecEnd: number[], ignoreMonsters: number, ignoreEntity: number, ptr: number, traceFlags?: number): number;
/** rg_transfer_c4(const any:index, const any:receiver) */
export declare function rg_transfer_c4(index: number, receiver?: number): number;
/** rg_update_teamscores(const any:iCtsWins, const any:iTsWins, const bool:bAdd) */
export declare function rg_update_teamscores(iCtsWins?: number, iTsWins?: number, bAdd?: boolean): number;
/** rg_weapon_deploy(const any:entity, const any:szViewModel[], const any:szWeaponModel[], any:iAnim, const any:szAnimExt[], any:skiplocal) */
export declare function rg_weapon_deploy(entity: number, szViewModel: string, szWeaponModel: string, iAnim: number, szAnimExt: string, skiplocal?: number): number;
/** rg_weapon_kickback(const any:entity, Float:up_base, Float:lateral_base, Float:up_modifier, Float:lateral_modifier, Float:up_max, Float:lateral_max, any:direction_change) */
export declare function rg_weapon_kickback(entity: number, up_base: number, lateral_base: number, up_modifier: number, lateral_modifier: number, up_max: number, lateral_max: number, direction_change: number): number;
/** rg_weapon_reload(const any:entity, any:iClipSize, any:iAnim, Float:fDelay) */
export declare function rg_weapon_reload(entity: number, iClipSize: number, iAnim: number, fDelay: number): number;
/** rg_weapon_send_animation(const any:entity, any:iAnim, any:skiplocal) */
export declare function rg_weapon_send_animation(entity: number, iAnim: number, skiplocal?: number): number;
/** rg_weapon_shotgun_reload(const any:entity, any:iAnim, any:iStartAnim, Float:fDelay, Float:fStartDelay, const any:pszReloadSound1[], const any:pszReloadSound2[]) */
export declare function rg_weapon_shotgun_reload(entity: number, iAnim: number, iStartAnim: number, fDelay: number, fStartDelay: number, pszReloadSound1?: string, pszReloadSound2?: string): number;
/** rh_drop_client(const any:index, const any:message[]) */
export declare function rh_drop_client(index: number, message?: string): number;
/** rh_emit_sound2(const any:entity, const any:recipient, const any:channel, const any:sample[], Float:vol, Float:attn, const any:flags, const any:pitch, any:emitFlags, const Float:origin[]) */
export declare function rh_emit_sound2(entity: number, recipient: number, channel: number, sample: string, vol?: number, attn?: number, flags?: number, pitch?: number, emitFlags?: number, origin?: number[]): boolean;
/** rh_get_client_connect_time(const any:index) */
export declare function rh_get_client_connect_time(index: number): number;
/** rh_get_mapname(any:output[], any:len, MapNameType:type) */
export declare function rh_get_mapname(type_?: number): string;
/** rh_get_net_from(any:output[], any:len) */
export declare function rh_get_net_from(): string;
/** rh_get_realtime() */
export declare function rh_get_realtime(): number;
/** rh_is_entity_fullpacked(const any:host, const any:entity, const any:frame) */
export declare function rh_is_entity_fullpacked(host: number, entity: number, frame?: number): boolean;
/** rh_is_server_paused() */
export declare function rh_is_server_paused(): boolean;
/** rh_reset_mapname() */
export declare function rh_reset_mapname(): number;
/** rh_set_mapname(const any:mapname[]) */
export declare function rh_set_mapname(mapname: string): number;
/** rh_set_server_pause(const bool:status) */
export declare function rh_set_server_pause(status: boolean): number;
/** rh_update_user_info(const any:index) */
export declare function rh_update_user_info(index: number): number;
/** rmdir(const any:path[]) */
export declare function rmdir(path: string): number;
/** server_exec() */
export declare function server_exec(): number;
/** set_addr_val(any:addr, any:val) */
export declare function set_addr_val(addr: number, val: number): number;
/** param, source: pointer, size */
export declare function set_array(a0: i32, a1: i32, a2: i32): i32;
/** set_array_f(any:param, const Float:source[], any:size) */
export declare function set_array_f(param: number, source: number[], size: number): number;
/** set_client_listen(any:receiver, any:sender, any:listen) */
export declare function set_client_listen(receiver: number, sender: number, listen: number): number;
/** set_controller(any:entity, any:controller, Float:value) */
export declare function set_controller(entity: number, controller: number, value: number): number;
/** set_cvar_flags(const any:cvar[], any:flags) */
export declare function set_cvar_flags(cvar: string, flags: number): number;
/** set_cvar_float(const any:cvar[], Float:value) */
export declare function set_cvar_float(cvar: string, value: number): number;
/** set_cvar_num(const any:cvarname[], any:value) */
export declare function set_cvar_num(cvarname: string, value: number): number;
/** set_cvar_string(const any:cvar[], const any:value[]) */
export declare function set_cvar_string(cvar: string, value: string): number;
/** set_dhudmessage(any:red, any:green, any:blue, Float:x, Float:y, any:effects, Float:fxtime, Float:holdtime, Float:fadeintime, Float:fadeouttime) */
export declare function set_dhudmessage(red?: number, green?: number, blue?: number, x?: number, y?: number, effects?: number, fxtime?: number, holdtime?: number, fadeintime?: number, fadeouttime?: number): number;
/** set_ent_data(any:entity, const any:class[], const any:member[], any:value, any:element) */
export declare function set_ent_data(entity: number, class_: string, member: string, value: number, element?: number): number;
/** set_ent_data_entity(any:entity, const any:class[], const any:member[], any:value, any:element) */
export declare function set_ent_data_entity(entity: number, class_: string, member: string, value: number, element?: number): number;
/** set_ent_data_float(any:entity, const any:class[], const any:member[], Float:value, any:element) */
export declare function set_ent_data_float(entity: number, class_: string, member: string, value: number, element?: number): number;
/** set_ent_data_string(any:entity, const any:class[], const any:member[], const any:value[], any:element) */
export declare function set_ent_data_string(entity: number, class_: string, member: string, value: string, element?: number): number;
/** set_ent_data_vector(any:entity, const any:class[], const any:member[], Float:value[], any:element) */
export declare function set_ent_data_vector(entity: number, class_: string, member: string, value: number[], element?: number): number;
/** set_ent_rendering(any:index, any:fx, any:r, any:g, any:b, any:render, any:amount) */
export declare function set_ent_rendering(index: number, fx?: number, r?: number, g?: number, b?: number, render?: number, amount?: number): number;
/** set_error_filter(const any:handler[]) */
export declare function set_error_filter(handler: string): number;
/** set_float_byref(any:param, Float:value) */
export declare function set_float_byref(param: number, value: number): number;
/** set_gamerules_entity(const any:class[], const any:member[], any:value, any:element) */
export declare function set_gamerules_entity(class_: string, member: string, value: number, element?: number): number;
/** set_gamerules_float(const any:class[], const any:member[], Float:value, any:element) */
export declare function set_gamerules_float(class_: string, member: string, value: number, element?: number): number;
/** set_gamerules_int(const any:class[], const any:member[], any:value, any:element) */
export declare function set_gamerules_int(class_: string, member: string, value: number, element?: number): number;
/** set_gamerules_string(const any:class[], const any:member[], const any:value[], any:element) */
export declare function set_gamerules_string(class_: string, member: string, value: string, element?: number): number;
/** set_gamerules_vector(const any:class[], const any:member[], Float:value[], any:element) */
export declare function set_gamerules_vector(class_: string, member: string, value: number[], element?: number): number;
/** set_hudmessage(any:red, any:green, any:blue, Float:x, Float:y, any:effects, Float:fxtime, Float:holdtime, Float:fadeintime, Float:fadeouttime, any:channel, any:alpha1, any:color2[]) */
export declare function set_hudmessage(red?: number, green?: number, blue?: number, x?: number, y?: number, effects?: number, fxtime?: number, holdtime?: number, fadeintime?: number, fadeouttime?: number, channel?: number, alpha1?: number, color2?: number[]): number;
/** set_key_value(const any:pbuffer, const any:key[], const any:value[]) */
export declare function set_key_value(pbuffer: number, key: string, value: string): number;
/** pbuffer, value: pointer, maxlen */
export declare function set_key_value_buffer(a0: i32, a1: i32, a2: i32): i32;
/** set_lights(const any:Lighting[]) */
export declare function set_lights(Lighting: string): number;
/** set_localinfo(const any:info[], const any:value[]) */
export declare function set_localinfo(info: string, value: string): number;
/** set_module_filter(const any:handler[]) */
export declare function set_module_filter(handler: string): number;
/** set_msg_arg_float(any:argn, any:argtype, Float:fValue) */
export declare function set_msg_arg_float(argn: number, argtype: number, fValue: number): number;
/** set_msg_arg_int(any:argn, any:argtype, any:iValue) */
export declare function set_msg_arg_int(argn: number, argtype: number, iValue: number): number;
/** set_msg_arg_string(any:argn, const any:szString[]) */
export declare function set_msg_arg_string(argn: number, szString: string): number;
/** set_msg_block(any:iMessage, any:iMessageFlags) */
export declare function set_msg_block(iMessage: number, iMessageFlags: number): number;
/** set_native_filter(const any:handler[]) */
export declare function set_native_filter(handler: string): number;
/** set_param_byref(any:param, any:value) */
export declare function set_param_byref(param: number, value: number): number;
/** set_pcvar_bool(any:pcvar, bool:num) */
export declare function set_pcvar_bool(pcvar: number, num: boolean): number;
/** set_pcvar_bounds(any:pcvar, CvarBounds:type, bool:set, Float:value) */
export declare function set_pcvar_bounds(pcvar: number, type_: number, set_: boolean, value?: number): number;
/** set_pcvar_flags(any:pcvar, any:flags) */
export declare function set_pcvar_flags(pcvar: number, flags: number): number;
/** set_pcvar_float(any:pcvar, Float:num) */
export declare function set_pcvar_float(pcvar: number, num: number): number;
/** set_pcvar_num(any:pcvar, any:num) */
export declare function set_pcvar_num(pcvar: number, num: number): number;
/** set_pcvar_string(any:pcvar, const any:string[]) */
export declare function set_pcvar_string(pcvar: number, string_: string): number;
/** set_pdata_bool(any:_index, any:_offset, bool:_value, any:_linuxdiff, any:_macdiff) */
export declare function set_pdata_bool(_index: number, _offset: number, _value: boolean, _linuxdiff?: number, _macdiff?: number): number;
/** set_pdata_byte(any:_index, any:_offset, any:_value, any:_linuxdiff, any:_macdiff) */
export declare function set_pdata_byte(_index: number, _offset: number, _value: number, _linuxdiff?: number, _macdiff?: number): number;
/** set_pdata_cbase(any:id, any:offset, any:value, any:linuxdiff, any:macdiff) */
export declare function set_pdata_cbase(id: number, offset: number, value: number, linuxdiff?: number, macdiff?: number): number;
/** set_pdata_ehandle(any:_index, any:_offset, any:_value, any:_linuxdiff, any:_macdiff) */
export declare function set_pdata_ehandle(_index: number, _offset: number, _value: number, _linuxdiff?: number, _macdiff?: number): number;
/** set_pdata_ent(any:_index, any:_offset, any:_value, any:_linuxdiff, any:_macdiff) */
export declare function set_pdata_ent(_index: number, _offset: number, _value: number, _linuxdiff?: number, _macdiff?: number): number;
/** set_pdata_float(any:_index, any:_Offset, Float:_Value, any:_linuxdiff, any:_macdiff) */
export declare function set_pdata_float(_index: number, _Offset: number, _Value: number, _linuxdiff?: number, _macdiff?: number): number;
/** set_pdata_int(any:_index, any:_Offset, any:_Value, any:_linuxdiff, any:_macdiff) */
export declare function set_pdata_int(_index: number, _Offset: number, _Value: number, _linuxdiff?: number, _macdiff?: number): number;
/** set_pdata_short(any:_index, any:_offset, any:_value, any:_linuxdiff, any:_macdiff) */
export declare function set_pdata_short(_index: number, _offset: number, _value: number, _linuxdiff?: number, _macdiff?: number): number;
/** set_pdata_string(any:entity, any:offset, const any:source[], any:realloc, any:linux, any:mac) */
export declare function set_pdata_string(entity: number, offset: number, source: string, realloc: number, linux: number, mac: number): number;
/** set_pdata_vector(any:_index, any:_offset, Float:_origin[], any:_linuxdiff, any:_macdiff) */
export declare function set_pdata_vector(_index: number, _offset: number, _origin: number[], _linuxdiff?: number, _macdiff?: number): number;
/** set_pev_string(any:_index, any:_value, any:_string) */
export declare function set_pev_string(_index: number, _value: number, _string: number): number;
/** set_rebuy(const RebuyHandle:rebuyhandle, const RebuyStruct:member, any:value) */
export declare function set_rebuy(rebuyhandle: number, member: number, value: number): number;
/** set_speak(any:iIndex, any:iSpeakFlags) */
export declare function set_speak(iIndex: number, iSpeakFlags: number): number;
/** set_string(any:param, any:dest[], any:maxlen) */
export declare function set_string(param: number): string;
/** time, function: pointer, id, parameter: pointer, len, flags: pointer, repeat */
export declare function set_task(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32, a5: i32, a6: i32): i32;
/** set_user_armor(any:index, any:armor) */
export declare function set_user_armor(index: number, armor: number): number;
/** set_user_flags(any:index, any:flags, any:id) */
export declare function set_user_flags(index: number, flags?: number, id?: number): number;
/** set_user_footsteps(any:id, any:set) */
export declare function set_user_footsteps(id: number, set_?: number): number;
/** set_user_frags(any:index, any:frags) */
export declare function set_user_frags(index: number, frags: number): number;
/** set_user_godmode(any:index, any:godmode) */
export declare function set_user_godmode(index: number, godmode?: number): number;
/** set_user_gravity(any:index, Float:gravity) */
export declare function set_user_gravity(index: number, gravity?: number): number;
/** set_user_health(any:index, any:health) */
export declare function set_user_health(index: number, health: number): number;
/** set_user_hitzones(any:index, any:target, any:body) */
export declare function set_user_hitzones(index: number, target: number, body: number): number;
/** set_user_info(any:index, const any:info[], const any:value[]) */
export declare function set_user_info(index: number, info: string, value: string): number;
/** set_user_maxspeed(any:index, Float:speed) */
export declare function set_user_maxspeed(index: number, speed?: number): number;
/** set_user_noclip(any:index, any:noclip) */
export declare function set_user_noclip(index: number, noclip?: number): number;
/** set_user_origin(any:index, const any:origin[]) */
export declare function set_user_origin(index: number, origin: number[]): number;
/** set_user_rendering(any:index, any:fx, any:r, any:g, any:b, any:render, any:amount) */
export declare function set_user_rendering(index: number, fx?: number, r?: number, g?: number, b?: number, render?: number, amount?: number): number;
/** set_vaultdata(const any:key[], const any:data[]) */
export declare function set_vaultdata(key: string, data?: string): number;
/** set_view(any:iIndex, any:ViewType) */
export declare function set_view(iIndex: number, ViewType: number): number;
/** set_xvar_float(any:id, Float:value) */
export declare function set_xvar_float(id: number, value?: number): number;
/** set_xvar_num(any:id, any:value) */
export declare function set_xvar_num(id: number, value?: number): number;
/** setarg(any:arg, any:index, any:value) */
export declare function setarg(arg: number, index: number, value: number): number;
/** ent, callback: pointer, params: pointer, len */
export declare function SetBlocked(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** SetBodygroup(const any:entity, const any:group, const any:value) */
export declare function SetBodygroup(entity: number, group: number, value: number): number;
/** setc(any:src[], any:len, any:ch) */
export declare function setc(ch: number): string;
/** SetFilePermissions(const any:path[], any:mode) */
export declare function SetFilePermissions(path: string, mode: number): boolean;
/** SetGlobalTransTarget(any:client) */
export declare function SetGlobalTransTarget(client: number): number;
/** SetHamParamEntity(any:which, any:value) */
export declare function SetHamParamEntity(which: number, value: number): number;
/** SetHamParamEntity2(any:which, any:value) */
export declare function SetHamParamEntity2(which: number, value: number): number;
/** SetHamParamFloat(any:which, Float:value) */
export declare function SetHamParamFloat(which: number, value: number): number;
/** SetHamParamInteger(any:which, any:value) */
export declare function SetHamParamInteger(which: number, value: number): number;
/** SetHamParamItemInfo(any:which, any:iteminfo_handle) */
export declare function SetHamParamItemInfo(which: number, iteminfo_handle: number): number;
/** SetHamParamString(any:which, const any:output[]) */
export declare function SetHamParamString(which: number, output: string): number;
/** SetHamParamTraceResult(any:which, any:tr_handle) */
export declare function SetHamParamTraceResult(which: number, tr_handle: number): number;
/** SetHamParamVector(any:which, const Float:value[]) */
export declare function SetHamParamVector(which: number, value: number[]): number;
/** SetHamReturnEntity(any:value) */
export declare function SetHamReturnEntity(value: number): number;
/** SetHamReturnFloat(Float:value) */
export declare function SetHamReturnFloat(value: number): number;
/** SetHamReturnInteger(any:value) */
export declare function SetHamReturnInteger(value: number): number;
/** SetHamReturnString(const any:value[]) */
export declare function SetHamReturnString(value: string): number;
/** SetHamReturnVector(const Float:value[]) */
export declare function SetHamReturnVector(value: number[]): number;
/** SetMessageBlock(const any:msgid, MsgBlockType:type) */
export declare function SetMessageBlock(msgid: number, type_: number): boolean;
/** ent, callback: pointer, params: pointer, len */
export declare function SetMoveDone(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** SetPackPosition(DataPack:pack, DataPackPos:position) */
export declare function SetPackPosition(pack: number, position: number): number;
/** ent, callback: pointer, params: pointer, len */
export declare function SetThink(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** ent, callback: pointer, params: pointer, len */
export declare function SetTouch(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** ent, callback: pointer, params: pointer, len */
export declare function SetUse(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** show_menu(any:index, any:keys, const any:menu[], any:time, const any:title[]) */
export declare function show_menu(index: number, keys: number, menu: string, time?: number, title?: string): number;
/** show_motd(any:player, const any:message[], const any:header[]) */
export declare function show_motd(player: number, message: string, header?: string): number;
/** SMC_CreateParser() */
export declare function SMC_CreateParser(): number;
/** SMC_DestroyParser(SMCParser:handle) */
export declare function SMC_DestroyParser(handle: number): number;
/** error, buffer: pointer, buf_max */
export declare function SMC_GetErrorString(a0: i32, a1: i32, a2: i32): i32;
/** SMC_ParseFile(SMCParser:handle, const any:file[], any:line, any:col, any:data) */
export declare function SMC_ParseFile(handle: number, file: string, line?: number, col?: number, data?: number): number;
/** SMC_SetParseEnd(SMCParser:handle, const any:func[]) */
export declare function SMC_SetParseEnd(handle: number, func: string): number;
/** SMC_SetParseStart(SMCParser:handle, const any:func[]) */
export declare function SMC_SetParseStart(handle: number, func: string): number;
/** SMC_SetRawLine(SMCParser:handle, const any:func[]) */
export declare function SMC_SetRawLine(handle: number, func: string): number;
/** SMC_SetReaders(SMCParser:smc, const any:kvFunc[], const any:nsFunc[], const any:esFunc[]) */
export declare function SMC_SetReaders(smc: number, kvFunc: string, nsFunc?: string, esFunc?: string): number;
/** SortADTArray(Array:array, SortMethod:order, SortType:type) */
export declare function SortADTArray(array: number, order: number, type_: number): number;
/** array: pointer, array_size, comparefunc: pointer, data: pointer, data_size */
export declare function SortCustom1D(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32): i32;
/** array: pointer, array_size, comparefunc: pointer, data: pointer, data_size */
export declare function SortCustom2D(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32): i32;
/** SortFloats(Float:array[], any:array_size, SortMethod:order) */
export declare function SortFloats(array: number[], array_size: number, order?: number): number;
/** array: pointer, array_size, order */
export declare function SortIntegers(a0: i32, a1: i32, a2: i32): i32;
/** SortStrings(any:array[], any:num_strings, SortMethod:order) */
export declare function SortStrings(order?: number): string;
/** spawn(any:index) */
export declare function spawn(index: number): number;
/** split_string(const any:source[], const any:split[], any:part[], any:partLen) */
export declare function split_string(source: string, split: string): string;
/** sqroot(any:value) */
export declare function sqroot(value: number): number;
/** str_to_float(const any:string[]) */
export declare function str_to_float(string_: string): number;
/** str_to_num(const any:string[]) */
export declare function str_to_num(string_: string): number;
/** dest: pointer, source: pointer, maxlength */
export declare function strcat(a0: i32, a1: i32, a2: i32): i32;
/** strcmp(const any:string1[], const any:string2[], bool:ignorecase) */
export declare function strcmp(string1: string, string2: string, ignorecase?: boolean): number;
/** strfind(const any:string[], const any:sub[], bool:ignorecase, any:pos) */
export declare function strfind(string_: string, sub: string, ignorecase?: boolean, pos?: number): number;
/** strip_user_weapons(any:index) */
export declare function strip_user_weapons(index: number): number;
/** strlen(const any:string[]) */
export declare function strlen(string_: string): number;
/** string1: pointer, string2: pointer, num, ignorecase */
export declare function strncmp(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** strtof(const any:string[], any:endPos) */
export declare function strtof(string_: string, endPos?: number): number;
/** text: pointer, Left: pointer, leftLen, Right: pointer, rightLen, token, trimSpaces */
export declare function strtok(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32, a5: i32, a6: i32): i32;
/** text: pointer, left: pointer, llen, right: pointer, rlen, token, trim */
export declare function strtok2(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32, a5: i32, a6: i32): i32;
/** strtol(const any:string[], any:endPos, any:base) */
export declare function strtol(string_: string, endPos?: number, base?: number): number;
/** string: pointer */
export declare function strtolower(a0: i32): i32;
/** string: pointer */
export declare function strtoupper(a0: i32): i32;
/** swapchars(any:c) */
export declare function swapchars(c: number): number;
/** task_exists(any:id, any:outside) */
export declare function task_exists(id?: number, outside?: number): number;
/** tickcount(any:granularity) */
export declare function tickcount(granularity?: number): number;
/** time(any:hour, any:minute, any:second) */
export declare function time(hour?: number, minute?: number, second?: number): number;
/** tolower(any:c) */
export declare function tolower(c: number): number;
/** toupper(any:c) */
export declare function toupper(c: number): number;
/** trace_forward(const Float:start[], const Float:angle[], Float:give, any:ignoreEnt, Float:hitX, Float:hitY, Float:shortestDistance, Float:shortestDistLow, Float:shortestDistHigh) */
export declare function trace_forward(start: number[], angle: number[], give: number, ignoreEnt: number, hitX: number, hitY: number, shortestDistance: number, shortestDistLow: number, shortestDistHigh: number): number;
/** trace_hull(const Float:origin[], any:hull, any:ignoredent, any:ignoremonsters, const Float:end[]) */
export declare function trace_hull(origin: number[], hull: number, ignoredent: number, ignoremonsters: number, end: number[]): number;
/** trace_line(any:iIgnoreEnt, const Float:fStart[], const Float:fEnd[], Float:vReturn[]) */
export declare function trace_line(iIgnoreEnt: number, fStart: number[], fEnd: number[], vReturn: number[]): number;
/** trace_normal(any:iIgnoreEnt, const Float:fStart[], const Float:fEnd[], Float:vReturn[]) */
export declare function trace_normal(iIgnoreEnt: number, fStart: number[], fEnd: number[], vReturn: number[]): number;
/** TrieClear(Trie:handle) */
export declare function TrieClear(handle: number): number;
/** TrieCreate() */
export declare function TrieCreate(): number;
/** TrieDeleteKey(Trie:handle, const any:key[]) */
export declare function TrieDeleteKey(handle: number, key: string): boolean;
/** TrieDestroy(Trie:handle) */
export declare function TrieDestroy(handle: number): number;
/** handle, key: pointer, output: pointer, outputsize, size: pointer */
export declare function TrieGetArray(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32): i32;
/** handle, key: pointer, value: pointer */
export declare function TrieGetCell(a0: i32, a1: i32, a2: i32): i32;
/** TrieGetSize(Trie:handle) */
export declare function TrieGetSize(handle: number): number;
/** handle, key: pointer, output: pointer, outputsize, size: pointer */
export declare function TrieGetString(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32): i32;
/** TrieIterCreate(Trie:handle) */
export declare function TrieIterCreate(handle: number): number;
/** TrieIterDestroy(TrieIter:handle) */
export declare function TrieIterDestroy(handle: number): number;
/** TrieIterEnded(TrieIter:handle) */
export declare function TrieIterEnded(handle: number): boolean;
/** handle, array: pointer, outputsize, size: pointer */
export declare function TrieIterGetArray(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** handle, value: pointer */
export declare function TrieIterGetCell(a0: i32, a1: i32): i32;
/** handle, key: pointer, outputsize */
export declare function TrieIterGetKey(a0: i32, a1: i32, a2: i32): i32;
/** TrieIterGetSize(TrieIter:handle) */
export declare function TrieIterGetSize(handle: number): number;
/** handle, buffer: pointer, outputsize, size: pointer */
export declare function TrieIterGetString(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** TrieIterNext(TrieIter:handle) */
export declare function TrieIterNext(handle: number): number;
/** TrieKeyExists(Trie:handle, const any:key[]) */
export declare function TrieKeyExists(handle: number, key: string): boolean;
/** handle, key: pointer, buffer: pointer, size, replace */
export declare function TrieSetArray(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32): i32;
/** TrieSetCell(Trie:handle, const any:key[], any:value, bool:replace) */
export declare function TrieSetCell(handle: number, key: string, value: number, replace?: boolean): number;
/** TrieSetString(Trie:handle, const any:key[], const any:value[], bool:replace) */
export declare function TrieSetString(handle: number, key: string, value: string, replace?: boolean): number;
/** TrieSnapshotCreate(Trie:handle) */
export declare function TrieSnapshotCreate(handle: number): number;
/** TrieSnapshotDestroy(Snapshot:handle) */
export declare function TrieSnapshotDestroy(handle: number): number;
/** TrieSnapshotGetKey(Snapshot:handle, any:index, any:buffer[], any:maxlength) */
export declare function TrieSnapshotGetKey(handle: number, index: number): string;
/** TrieSnapshotKeyBufferSize(Snapshot:handle, any:index) */
export declare function TrieSnapshotKeyBufferSize(handle: number, index: number): number;
/** TrieSnapshotLength(Snapshot:handle) */
export declare function TrieSnapshotLength(handle: number): number;
/** text: pointer */
export declare function trim(a0: i32): i32;
/** string: pointer */
export declare function ucfirst(a0: i32): i32;
/** unlink(const any:filename[], bool:use_valve_fs, const any:valve_path_id[]) */
export declare function unlink(filename: string, use_valve_fs?: boolean, valve_path_id?: string): number;
/** unpause(const any:flag[], const any:param1[], const any:param2[]) */
export declare function unpause(flag: string, param1?: string, param2?: string): number;
/** unregister_forward(any:_forwardType, any:registerId, any:post) */
export declare function unregister_forward(_forwardType: number, registerId: number, post?: number): number;
/** unregister_impulse(any:registerid) */
export declare function unregister_impulse(registerid: number): number;
/** unregister_message(any:iMsgId, any:registeredmsg) */
export declare function unregister_message(iMsgId: number, registeredmsg: number): number;
/** unregister_think(any:registerid) */
export declare function unregister_think(registerid: number): number;
/** unregister_touch(any:registerid) */
export declare function unregister_touch(registerid: number): number;
/** UnregisterMessage(const MessageHook:handle) */
export declare function UnregisterMessage(handle: number): boolean;
/** user_has_weapon(any:index, any:weapon, any:setweapon) */
export declare function user_has_weapon(index: number, weapon: number, setweapon?: number): number;
/** user_kill(any:index, any:flag) */
export declare function user_kill(index: number, flag?: number): number;
/** user_slap(any:index, any:power, any:rnddir) */
export declare function user_slap(index: number, power: number, rnddir?: number): number;
/** vaultdata_exists(const any:key[]) */
export declare function vaultdata_exists(key: string): number;
/** vector_distance(const Float:vVector[], const Float:vVector2[]) */
export declare function vector_distance(vVector: number[], vVector2: number[]): number;
/** vector_length(const Float:vVector[]) */
export declare function vector_length(vVector: number[]): number;
/** vector_to_angle(const Float:fVector[], Float:vReturn[]) */
export declare function vector_to_angle(fVector: number[], vReturn: number[]): number;
/** velocity_by_aim(any:iIndex, any:iVelocity, Float:vRetValue[]) */
export declare function velocity_by_aim(iIndex: number, iVelocity: number, vRetValue: number[]): number;
/** vformat(any:buffer[], any:len, const any:fmt[], any:vararg) */
export declare function vformat(fmt: string, vararg: number): string;
/** write_angle(any:x) */
export declare function write_angle(x: number): number;
/** write_angle_f(Float:x) */
export declare function write_angle_f(x: number): number;
/** write_byte(any:x) */
export declare function write_byte(x: number): number;
/** write_char(any:x) */
export declare function write_char(x: number): number;
/** write_coord(any:x) */
export declare function write_coord(x: number): number;
/** write_coord_f(Float:x) */
export declare function write_coord_f(x: number): number;
/** write_entity(any:x) */
export declare function write_entity(x: number): number;
/** write_file(const any:file[], const any:text[], any:line) */
export declare function write_file(file: string, text: string, line?: number): number;
/** write_long(any:x) */
export declare function write_long(x: number): number;
/** write_short(any:x) */
export declare function write_short(x: number): number;
/** write_string(const any:x[]) */
export declare function write_string(x: string): number;
/** WritePackCell(DataPack:pack, any:cell) */
export declare function WritePackCell(pack: number, cell: number): number;
/** WritePackFloat(DataPack:pack, Float:val) */
export declare function WritePackFloat(pack: number, val: number): number;
/** WritePackString(DataPack:pack, const any:str[]) */
export declare function WritePackString(pack: number, str: string): number;
/** xvar_exists(const any:name[]) */
export declare function xvar_exists(name: string): number;
import { NoArgument } from "./facade";
/** What a field of get_entvar holds: 0 a whole number, 1 a Float, 2 a vector, 3 text; 4 more for an array member. */
export declare function __get_entvar_kind(field: i32): i32;
/** What a field of get_ucmd holds: 0 a whole number, 1 a Float, 2 a vector, 3 text; 4 more for an array member. */
export declare function __get_ucmd_kind(field: i32): i32;
/** What a field of get_netadr holds: 0 a whole number, 1 a Float, 2 a vector, 3 text; 4 more for an array member. */
export declare function __get_netadr_kind(field: i32): i32;
/** What a field of get_netchan holds: 0 a whole number, 1 a Float, 2 a vector, 3 text; 4 more for an array member. */
export declare function __get_netchan_kind(field: i32): i32;
/** What a field of get_member_game holds: 0 a whole number, 1 a Float, 2 a vector, 3 text; 4 more for an array member. */
export declare function __get_member_game_kind(field: i32): i32;
/** What a field of get_member holds: 0 a whole number, 1 a Float, 2 a vector, 3 text; 4 more for an array member. */
export declare function __get_member_kind(field: i32): i32;
/** What a field of get_pmove holds: 0 a whole number, 1 a Float, 2 a vector, 3 text; 4 more for an array member. */
export declare function __get_pmove_kind(field: i32): i32;
/** What a field of get_movevar holds: 0 a whole number, 1 a Float, 2 a vector, 3 text; 4 more for an array member. */
export declare function __get_movevar_kind(field: i32): i32;
/** What a field of get_pmtrace holds: 0 a whole number, 1 a Float, 2 a vector, 3 text; 4 more for an array member. */
export declare function __get_pmtrace_kind(field: i32): i32;
/** Which arguments of the tail of engfunc are Floats, by its last fixed argument: bit i the tail's argument i, 65536 the result. */
export declare function __engfunc_floats(selector: i32): i32;
/** Which arguments of the tail of dllfunc are Floats, by its last fixed argument: bit i the tail's argument i, 65536 the result. */
export declare function __dllfunc_floats(selector: i32): i32;
/** Which arguments of the tail of get_tr, set_tr, get_tr2, set_tr2 are Floats, by its last fixed argument: bit i the tail's argument i, 65536 the result. */
export declare function __get_tr_floats(selector: i32): i32;
/** Which arguments of the tail of get_cd, set_cd are Floats, by its last fixed argument: bit i the tail's argument i, 65536 the result. */
export declare function __get_cd_floats(selector: i32): i32;
/** Which arguments of the tail of get_es, set_es are Floats, by its last fixed argument: bit i the tail's argument i, 65536 the result. */
export declare function __get_es_floats(selector: i32): i32;
/** Which arguments of the tail of get_uc, set_uc are Floats, by its last fixed argument: bit i the tail's argument i, 65536 the result. */
export declare function __get_uc_floats(selector: i32): i32;
/** Which arguments of the tail of forward_return are Floats, by its last fixed argument: bit i the tail's argument i, 65536 the result. */
export declare function __forward_return_floats(selector: i32): i32;
/** Which arguments of the tail of ExecuteHam, ExecuteHamB are Floats, by its first fixed argument: bit i the tail's argument i, 65536 the result. */
export declare function __ExecuteHam_floats(selector: i32): i32;
/** Which arguments of the tail of pev, set_pev are Floats, by its last fixed argument: bit i the tail's argument i, 65536 the result. */
export declare function __pev_floats(selector: i32): i32;
/** Which arguments of the tail of global_get are Floats, by its last fixed argument: bit i the tail's argument i, 65536 the result. */
export declare function __global_get_floats(selector: i32): i32;
/** abort(error, fmt, ...) - the dispatcher's id for it */
export declare const NATIVE_abort: i32;
/** abort(any:error, const any:fmt[], ...) */
export declare function abort(error: number, fmt: string): number;
/** client_cmd(index, command, ...) - the dispatcher's id for it */
export declare const NATIVE_client_cmd: i32;
/** client_cmd(any:index, const any:command[], ...) */
export declare function client_cmd<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(index: number, command: string, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** client_print(index, type, message, ...) - the dispatcher's id for it */
export declare const NATIVE_client_print: i32;
/** client_print(any:index, any:type, const any:message[], ...) */
export declare function client_print(index: number, type_: number, message: string): number;
/** client_print_color(index, sender, message, ...) - the dispatcher's id for it */
export declare const NATIVE_client_print_color: i32;
/** client_print_color(any:index, any:sender, const any:message[], ...) */
export declare function client_print_color(index: number, sender: number, message: string): number;
/** console_cmd(id, cmd, ...) - the dispatcher's id for it */
export declare const NATIVE_console_cmd: i32;
/** console_cmd(any:id, const any:cmd[], ...) */
export declare function console_cmd<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(id: number, cmd: string, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** console_print(id, message, ...) - the dispatcher's id for it */
export declare const NATIVE_console_print: i32;
/** console_print(any:id, const any:message[], ...) */
export declare function console_print(id: number, message: string): number;
/** CreateHudSyncObj(num, ...) - the dispatcher's id for it */
export declare const NATIVE_CreateHudSyncObj: i32;
/** CreateHudSyncObj(any:num, ...) */
export declare function CreateHudSyncObj<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(num?: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** CreateMultiForward(name, stop_type, ...) - the dispatcher's id for it */
export declare const NATIVE_CreateMultiForward: i32;
/** CreateMultiForward(const any:name[], any:stop_type, ...) */
export declare function CreateMultiForward<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(name: string, stop_type: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** CreateOneForward(plugin_id, name, ...) - the dispatcher's id for it */
export declare const NATIVE_CreateOneForward: i32;
/** CreateOneForward(any:plugin_id, const any:name[], ...) */
export declare function CreateOneForward<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(plugin_id: number, name: string, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** DispatchKeyValue(...) - the dispatcher's id for it */
export declare const NATIVE_DispatchKeyValue: i32;
/** DispatchKeyValue(...) */
export declare function DispatchKeyValue<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** dllfunc(type, ...) - the dispatcher's id for it */
export declare const NATIVE_dllfunc: i32;
/** dllfunc(any:type, ...) */
export declare function dllfunc<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(type_: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** elog_message(message, ...) - the dispatcher's id for it */
export declare const NATIVE_elog_message: i32;
/** elog_message(const any:message[], ...) */
export declare function elog_message(message: string): number;
/** engclient_print(player, type, message, ...) - the dispatcher's id for it */
export declare const NATIVE_engclient_print: i32;
/** engclient_print(any:player, any:type, const any:message[], ...) */
export declare function engclient_print(player: number, type_: number, message: string): number;
/** engfunc(type, ...) - the dispatcher's id for it */
export declare const NATIVE_engfunc: i32;
/** engfunc(any:type, ...) */
export declare function engfunc<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(type_: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** ExecuteForward(forward_handle, ret, ...) - the dispatcher's id for it */
export declare const NATIVE_ExecuteForward: i32;
/** ExecuteForward(any:forward_handle, &any:ret, ...) */
export declare function ExecuteForward<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(forward_handle: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** ExecuteHam(function, this, ...) - the dispatcher's id for it */
export declare const NATIVE_ExecuteHam: i32;
/** ExecuteHam(Ham:function, any:this, ...) */
export declare function ExecuteHam<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(function_: number, this_: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** ExecuteHamB(function, this, ...) - the dispatcher's id for it */
export declare const NATIVE_ExecuteHamB: i32;
/** ExecuteHamB(Ham:function, any:this, ...) */
export declare function ExecuteHamB<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(function_: number, this_: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** filesize(filename, ...) - the dispatcher's id for it */
export declare const NATIVE_filesize: i32;
/** filesize(const any:filename[], ...) */
export declare function filesize<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(filename: string, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** find_player(flags, ...) - the dispatcher's id for it */
export declare const NATIVE_find_player: i32;
/** find_player(const any:flags[], ...) */
export declare function find_player<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(flags: string, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** find_player_ex(flags, ...) - the dispatcher's id for it */
export declare const NATIVE_find_player_ex: i32;
/** find_player_ex(FindPlayerFlags:flags, ...) */
export declare function find_player_ex<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(flags: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** format(output, len, format, ...) - the dispatcher's id for it */
export declare const NATIVE_format: i32;
/** formatex(output, len, format, ...) - the dispatcher's id for it */
export declare const NATIVE_formatex: i32;
/** forward_return(type, ...) - the dispatcher's id for it */
export declare const NATIVE_forward_return: i32;
/** forward_return(any:type, ...) */
export declare function forward_return<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(type_: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** fprintf(file, fmt, ...) - the dispatcher's id for it */
export declare const NATIVE_fprintf: i32;
/** fprintf(any:file, const any:fmt[], ...) */
export declare function fprintf(file: number, fmt: string): number;
/** get_cd(cd_handle, member, ...) - the dispatcher's id for it */
export declare const NATIVE_get_cd: i32;
/** get_cd(any:cd_handle, ClientData:member, ...) */
export declare function get_cd<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(cd_handle: number, member: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** get_entvar(index, var, ...) - the dispatcher's id for it */
export declare const NATIVE_get_entvar: i32;
/** get_entvar(const any:index, const EntVars:var, ...) */
export declare function get_entvar<T = number>(index: number, var_: number, element?: number): T;
/** get_es(es_handle, member, ...) - the dispatcher's id for it */
export declare const NATIVE_get_es: i32;
/** get_es(any:es_handle, EntityState:member, ...) */
export declare function get_es<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(es_handle: number, member: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** get_kvd(kvd_handle, member, ...) - the dispatcher's id for it */
export declare const NATIVE_get_kvd: i32;
/** get_kvd(any:kvd_handle, KeyValueData:member, ...) */
export declare function get_kvd<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(kvd_handle: number, member: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** get_member(index, member, ...) - the dispatcher's id for it */
export declare const NATIVE_get_member: i32;
/** get_member(const any:index, any:member, ...) */
export declare function get_member<T = number>(index: number, member: number, element?: number): T;
/** get_member_game(member, ...) - the dispatcher's id for it */
export declare const NATIVE_get_member_game: i32;
/** get_member_game(CSGameRules_Members:member, ...) */
export declare function get_member_game<T = number>(member: number, element?: number): T;
/** get_member_s(index, member, ...) - the dispatcher's id for it */
export declare const NATIVE_get_member_s: i32;
/** get_member_s(const any:index, any:member, ...) */
export declare function get_member_s<T = number>(index: number, member: number, element?: number): T;
/** get_movevar(var, ...) - the dispatcher's id for it */
export declare const NATIVE_get_movevar: i32;
/** get_movevar(const MoveVars:var, ...) */
export declare function get_movevar<T = number>(var_: number, element?: number): T;
/** get_netadr(adr, var, ...) - the dispatcher's id for it */
export declare const NATIVE_get_netadr: i32;
/** get_netadr(const any:adr, const NetAdrVars:var, ...) */
export declare function get_netadr<T = number>(adr: number, var_: number, element?: number): T;
/** get_netchan(index, var, ...) - the dispatcher's id for it */
export declare const NATIVE_get_netchan: i32;
/** get_netchan(const any:index, const NetChan:var, ...) */
export declare function get_netchan<T = number>(index: number, var_: number, element?: number): T;
/** get_orig_retval(...) - the dispatcher's id for it */
export declare const NATIVE_get_orig_retval: i32;
/** get_orig_retval(...) */
export declare function get_orig_retval<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** get_pmove(var, ...) - the dispatcher's id for it */
export declare const NATIVE_get_pmove: i32;
/** get_pmove(const PlayerMove:var, ...) */
export declare function get_pmove<T = number>(var_: number, element?: number): T;
/** get_pmtrace(tracehandle, var, ...) - the dispatcher's id for it */
export declare const NATIVE_get_pmtrace: i32;
/** get_pmtrace(const any:tracehandle, const PMTrace:var, ...) */
export declare function get_pmtrace<T = number>(tracehandle: number, var_: number, element?: number): T;
/** get_tr(tr_member, ...) - the dispatcher's id for it */
export declare const NATIVE_get_tr: i32;
/** get_tr(TraceResult:tr_member, ...) */
export declare function get_tr<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(tr_member: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** get_tr2(tr_handle, tr_member, ...) - the dispatcher's id for it */
export declare const NATIVE_get_tr2: i32;
/** get_tr2(any:tr_handle, any:tr_member, ...) */
export declare function get_tr2<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(tr_handle: number, tr_member: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** get_uc(uc_handle, member, ...) - the dispatcher's id for it */
export declare const NATIVE_get_uc: i32;
/** get_uc(any:uc_handle, UserCmd:member, ...) */
export declare function get_uc<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(uc_handle: number, member: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** get_ucmd(ucmd, var, ...) - the dispatcher's id for it */
export declare const NATIVE_get_ucmd: i32;
/** get_ucmd(const any:ucmd, const UCmd:var, ...) */
export declare function get_ucmd<T = number>(ucmd: number, var_: number, element?: number): T;
/** get_user_attacker(index, ...) - the dispatcher's id for it */
export declare const NATIVE_get_user_attacker: i32;
/** get_user_attacker(any:index, ...) */
export declare function get_user_attacker<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(index: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** get_usercmd(type, ...) - the dispatcher's id for it */
export declare const NATIVE_get_usercmd: i32;
/** get_usercmd(any:type, ...) */
export declare function get_usercmd<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(type_: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** get_var_addr(...) - the dispatcher's id for it */
export declare const NATIVE_get_var_addr: i32;
/** get_var_addr(...) */
export declare function get_var_addr<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** GetHamItemInfo(iteminfo_handle, type, ...) - the dispatcher's id for it */
export declare const NATIVE_GetHamItemInfo: i32;
/** GetHamItemInfo(any:iteminfo_handle, HamItemInfo:type, ...) */
export declare function GetHamItemInfo<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(iteminfo_handle: number, type_: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** GetHookChainReturn(type, ...) - the dispatcher's id for it */
export declare const NATIVE_GetHookChainReturn: i32;
/** GetHookChainReturn(AType:type, ...) */
export declare function GetHookChainReturn<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(type_: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** GetMessageData(type, ...) - the dispatcher's id for it */
export declare const NATIVE_GetMessageData: i32;
/** GetMessageData(const MsgDataType:type, ...) */
export declare function GetMessageData<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(type_: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** GetMessageOrigData(type, ...) - the dispatcher's id for it */
export declare const NATIVE_GetMessageOrigData: i32;
/** GetMessageOrigData(const MsgDataType:type, ...) */
export declare function GetMessageOrigData<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(type_: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** global_get(_value, ...) - the dispatcher's id for it */
export declare const NATIVE_global_get: i32;
/** global_get(any:_value, ...) */
export declare function global_get<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(_value: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** log_amx(string, ...) - the dispatcher's id for it */
export declare const NATIVE_log_amx: i32;
/** log_amx(const any:string[], ...) */
export declare function log_amx(string_: string): number;
/** log_error(error, fmt, ...) - the dispatcher's id for it */
export declare const NATIVE_log_error: i32;
/** log_error(any:error, const any:fmt[], ...) */
export declare function log_error(error: number, fmt: string): number;
/** log_message(message, ...) - the dispatcher's id for it */
export declare const NATIVE_log_message: i32;
/** log_message(const any:message[], ...) */
export declare function log_message(message: string): number;
/** log_to_file(file, message, ...) - the dispatcher's id for it */
export declare const NATIVE_log_to_file: i32;
/** log_to_file(const any:file[], const any:message[], ...) */
export declare function log_to_file(file: string, message: string): number;
/** menu_setprop(menu, prop, ...) - the dispatcher's id for it */
export declare const NATIVE_menu_setprop: i32;
/** menu_setprop(any:menu, any:prop, ...) */
export declare function menu_setprop<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(menu: number, prop: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** nvault_get(vault, key, ...) - the dispatcher's id for it */
export declare const NATIVE_nvault_get: i32;
/** nvault_get(any:vault, const any:key[], ...) */
export declare function nvault_get<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(vault: number, key: string, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** parse(text, ...) - the dispatcher's id for it */
export declare const NATIVE_parse: i32;
/** parse(const any:text[], ...) */
export declare function parse(text: string): number;
/** pev(_index, _value, ...) - the dispatcher's id for it */
export declare const NATIVE_pev: i32;
/** pev(any:_index, any:_value, ...) */
export declare function pev<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(_index: number, _value: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** precache_event(type, Name, ...) - the dispatcher's id for it */
export declare const NATIVE_precache_event: i32;
/** precache_event(any:type, const any:Name[], ...) */
export declare function precache_event<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(type_: number, Name: string, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** read_data(value, ...) - the dispatcher's id for it */
export declare const NATIVE_read_data: i32;
/** read_data(any:value, ...) */
export declare function read_data<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(value: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** register_event(event, function, flags, cond, ...) - the dispatcher's id for it */
export declare const NATIVE_register_event: i32;
/** register_event(const any:event[], const any:function[], const any:flags[], const any:cond[], ...) */
export declare function register_event<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(event: string, function_: string, flags: string, cond?: string, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** register_event_ex(event, function, flags, cond, ...) - the dispatcher's id for it */
export declare const NATIVE_register_event_ex: i32;
/** register_event_ex(const any:event[], const any:function[], RegisterEventFlags:flags, const any:cond[], ...) */
export declare function register_event_ex<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(event: string, function_: string, flags: number, cond?: string, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** register_logevent(function, argsnum, ...) - the dispatcher's id for it */
export declare const NATIVE_register_logevent: i32;
/** register_logevent(const any:function[], any:argsnum, ...) */
export declare function register_logevent<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(function_: string, argsnum: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** rg_get_global_iteminfo(weapon_id, type, ...) - the dispatcher's id for it */
export declare const NATIVE_rg_get_global_iteminfo: i32;
/** rg_get_global_iteminfo(const WeaponIdType:weapon_id, ItemInfo:type, ...) */
export declare function rg_get_global_iteminfo<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(weapon_id: number, type_: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** rg_get_iteminfo(ent, type, ...) - the dispatcher's id for it */
export declare const NATIVE_rg_get_iteminfo: i32;
/** rg_get_iteminfo(const any:ent, ItemInfo:type, ...) */
export declare function rg_get_iteminfo<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(ent: number, type_: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** rg_get_weapon_info(...) - the dispatcher's id for it */
export declare const NATIVE_rg_get_weapon_info: i32;
/** rg_get_weapon_info(...) */
export declare function rg_get_weapon_info<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** rg_set_global_iteminfo(weapon_id, type, ...) - the dispatcher's id for it */
export declare const NATIVE_rg_set_global_iteminfo: i32;
/** rg_set_global_iteminfo(const WeaponIdType:weapon_id, ItemInfo:type, ...) */
export declare function rg_set_global_iteminfo<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(weapon_id: number, type_: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** rg_set_iteminfo(entity, type, ...) - the dispatcher's id for it */
export declare const NATIVE_rg_set_iteminfo: i32;
/** rg_set_iteminfo(const any:entity, ItemInfo:type, ...) */
export declare function rg_set_iteminfo<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(entity: number, type_: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** rg_set_weapon_info(weapon_id, type, ...) - the dispatcher's id for it */
export declare const NATIVE_rg_set_weapon_info: i32;
/** rg_set_weapon_info(const WeaponIdType:weapon_id, WpnInfo:type, ...) */
export declare function rg_set_weapon_info<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(weapon_id: number, type_: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** server_cmd(command, ...) - the dispatcher's id for it */
export declare const NATIVE_server_cmd: i32;
/** server_cmd(const any:command[], ...) */
export declare function server_cmd<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(command: string, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** server_print(message, ...) - the dispatcher's id for it */
export declare const NATIVE_server_print: i32;
/** server_print(const any:message[], ...) */
export declare function server_print(message: string): number;
/** set_cd(cd_handle, member, ...) - the dispatcher's id for it */
export declare const NATIVE_set_cd: i32;
/** set_cd(any:cd_handle, ClientData:member, ...) */
export declare function set_cd<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(cd_handle: number, member: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** set_entvar(index, var, ...) - the dispatcher's id for it */
export declare const NATIVE_set_entvar: i32;
/** set_entvar(const any:index, const EntVars:var, ...) */
export declare function set_entvar<T = number>(index: number, var_: number, value: T, element?: number): number;
/** set_es(es_handle, member, ...) - the dispatcher's id for it */
export declare const NATIVE_set_es: i32;
/** set_es(any:es_handle, EntityState:member, ...) */
export declare function set_es<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(es_handle: number, member: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** set_fail_state(fmt, ...) - the dispatcher's id for it */
export declare const NATIVE_set_fail_state: i32;
/** set_fail_state(const any:fmt[], ...) */
export declare function set_fail_state(fmt: string): number;
/** set_kvd(kvd_handle, member, ...) - the dispatcher's id for it */
export declare const NATIVE_set_kvd: i32;
/** set_kvd(any:kvd_handle, KeyValueData:member, ...) */
export declare function set_kvd<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(kvd_handle: number, member: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** set_member(index, member, ...) - the dispatcher's id for it */
export declare const NATIVE_set_member: i32;
/** set_member(const any:index, any:member, ...) */
export declare function set_member<T = number>(index: number, member: number, value: T, element?: number): number;
/** set_member_game(member, ...) - the dispatcher's id for it */
export declare const NATIVE_set_member_game: i32;
/** set_member_game(CSGameRules_Members:member, ...) */
export declare function set_member_game<T = number>(member: number, value: T, element?: number): number;
/** set_member_s(index, member, ...) - the dispatcher's id for it */
export declare const NATIVE_set_member_s: i32;
/** set_member_s(const any:index, any:member, ...) */
export declare function set_member_s<T = number>(index: number, member: number, value: T, element?: number): number;
/** set_movevar(var, ...) - the dispatcher's id for it */
export declare const NATIVE_set_movevar: i32;
/** set_movevar(const MoveVars:var, ...) */
export declare function set_movevar<T = number>(var_: number, value: T, element?: number): number;
/** set_netadr(adr, var, ...) - the dispatcher's id for it */
export declare const NATIVE_set_netadr: i32;
/** set_netadr(const any:adr, const NetAdrVars:var, ...) */
export declare function set_netadr<T = number>(adr: number, var_: number, value: T, element?: number): number;
/** set_netchan(index, var, ...) - the dispatcher's id for it */
export declare const NATIVE_set_netchan: i32;
/** set_netchan(const any:index, const NetChan:var, ...) */
export declare function set_netchan<T = number>(index: number, var_: number, value: T, element?: number): number;
/** set_pev(_index, _value, ...) - the dispatcher's id for it */
export declare const NATIVE_set_pev: i32;
/** set_pev(any:_index, any:_value, ...) */
export declare function set_pev<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(_index: number, _value: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** set_pmove(var, ...) - the dispatcher's id for it */
export declare const NATIVE_set_pmove: i32;
/** set_pmove(const PlayerMove:var, ...) */
export declare function set_pmove<T = number>(var_: number, value: T, element?: number): number;
/** set_pmtrace(tracehandle, var, ...) - the dispatcher's id for it */
export declare const NATIVE_set_pmtrace: i32;
/** set_pmtrace(const any:tracehandle, const PMTrace:var, ...) */
export declare function set_pmtrace<T = number>(tracehandle: number, var_: number, value: T, element?: number): number;
/** set_tr(tr_member, ...) - the dispatcher's id for it */
export declare const NATIVE_set_tr: i32;
/** set_tr(TraceResult:tr_member, ...) */
export declare function set_tr<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(tr_member: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** set_tr2(tr_handle, tr_member, ...) - the dispatcher's id for it */
export declare const NATIVE_set_tr2: i32;
/** set_tr2(any:tr_handle, any:tr_member, ...) */
export declare function set_tr2<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(tr_handle: number, tr_member: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** set_uc(uc_handle, member, ...) - the dispatcher's id for it */
export declare const NATIVE_set_uc: i32;
/** set_uc(any:uc_handle, UserCmd:member, ...) */
export declare function set_uc<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(uc_handle: number, member: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** set_ucmd(ucmd, var, ...) - the dispatcher's id for it */
export declare const NATIVE_set_ucmd: i32;
/** set_ucmd(const any:ucmd, const UCmd:var, ...) */
export declare function set_ucmd<T = number>(ucmd: number, var_: number, value: T, element?: number): number;
/** set_usercmd(type, ...) - the dispatcher's id for it */
export declare const NATIVE_set_usercmd: i32;
/** set_usercmd(any:type, ...) */
export declare function set_usercmd<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(type_: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** SetHamItemInfo(iteminfo_handle, type, ...) - the dispatcher's id for it */
export declare const NATIVE_SetHamItemInfo: i32;
/** SetHamItemInfo(any:iteminfo_handle, HamItemInfo:type, ...) */
export declare function SetHamItemInfo<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(iteminfo_handle: number, type_: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** SetHookChainArg(number, type, ...) - the dispatcher's id for it */
export declare const NATIVE_SetHookChainArg: i32;
/** SetHookChainArg(any:number, AType:type, ...) */
export declare function SetHookChainArg<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(number_: number, type_: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** SetHookChainReturn(type, ...) - the dispatcher's id for it */
export declare const NATIVE_SetHookChainReturn: i32;
/** SetHookChainReturn(AType:type, ...) */
export declare function SetHookChainReturn<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(type_: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** SetMessageData(type, ...) - the dispatcher's id for it */
export declare const NATIVE_SetMessageData: i32;
/** SetMessageData(const MsgDataType:type, ...) */
export declare function SetMessageData<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(type_: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): boolean;
/** show_dhudmessage(index, message, ...) - the dispatcher's id for it */
export declare const NATIVE_show_dhudmessage: i32;
/** show_dhudmessage(any:index, const any:message[], ...) */
export declare function show_dhudmessage(index: number, message: string): number;
/** show_hudmessage(index, message, ...) - the dispatcher's id for it */
export declare const NATIVE_show_hudmessage: i32;
/** show_hudmessage(any:index, const any:message[], ...) */
export declare function show_hudmessage(index: number, message: string): number;
/** ShowSyncHudMsg(target, syncObj, fmt, ...) - the dispatcher's id for it */
export declare const NATIVE_ShowSyncHudMsg: i32;
/** ShowSyncHudMsg(any:target, any:syncObj, const any:fmt[], ...) */
export declare function ShowSyncHudMsg(target: number, syncObj: number, fmt: string): number;
/** traceresult(type, ...) - the dispatcher's id for it */
export declare const NATIVE_traceresult: i32;
/** traceresult(any:type, ...) */
export declare function traceresult<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument>(type_: number, a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12): number;
/** vdformat(buffer, len, fmt_arg, vararg, ...) - the dispatcher's id for it */
export declare const NATIVE_vdformat: i32;
