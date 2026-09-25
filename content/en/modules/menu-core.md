---
title: "Menus: menu-core"
navigation:
  title: "menu-core"
---

Menus described in an ini file or built in code, shown with `show_menu`, the
keys answered through `register_menucmd`. It is menu_core in TypeScript: a
module a TypeScript plugin imports, and a plugin that gives Pawn plugins
menu_core's `mc_*` natives.

::warning
**In progress**<br>
menu-core is still being finished. It has been tried in game only once, and
behaviour may still change.
::

## From TypeScript

```ts twoslash
import { Player } from "~/facade";
import * as menus from "~/modules/menu-core";

menus.addCondition("IS_HURT", (player) => player.health < 100);
menus.addPlaceholder("hp", (player) => `${player.health}`);
menus.addAction("RESET_SCORE", resetScore);

const shop = menus.create("SHOP", "Shop");
menus.addItem(shop, "Heal (%hp% HP)", { condition: "IS_HURT", onSelect: heal });
menus.addItem(shop, "Reset score", { action: "RESET_SCORE" });
menus.addItem(shop, "Close", { action: "CLOSE_MENU", spaceBefore: 1 });

function heal(player: Player) {
	player.health = 100;
}

function resetScore(player: Player) {
	player.frags = 0;
}

menus.show(player, "SHOP");
menus.show(player, "LIST_KICK", { target: victim.id, time: 10 });
```

A menu is a plain object (`Menu`): its fields — `hideExit`, `locked`,
`time` — are set directly. Everything else is the module's functions, as
with `fs`.

- `create(name, title)` — a menu in code; the one already there when the
  name is taken. A name starting with `LIST_` makes a list menu.
- `addItem(menu, name, options)` / `addFixedItem(menu, slot, name, options)` —
  options: `placeholder`, `condition`, `action` or `onSelect`, `restriction`,
  `restrictionMessage`, `at`, `spaceBefore`, `spaceAfter`.
- `addCondition`, `addAction`, `addPlaceholder`, `addRestriction`,
  `addActionCheck`, `addConditionFilter`, `setListSource` — what the menus
  name, answered by functions.
- `addEventListener("open" | "close" | "show", listener)` — "show" comes
  before a menu opens; `event.preventDefault()` stops it.
- `show(player, name, options)` — false when it does not open; options:
  `time`, `target`, `resetHistory`, `force`, `skipHistory`.
- `close(player)`, `refresh("A B")`, `conditionChanged(name)`,
  `lock(player)`, `setTimer(menu, seconds)`, `cancelTimer(menu)`.

Keys: 1-7 choose, 8 is the next page, 9 the previous page or back to the menu
this one was opened from, 0 closes.

## From any plugin: one menu-core for the server

The server has one instance of `~/modules/menu-core`: the menu-core
plugin's. Any plugin of yours that imports it calls that instance, with the
same functions and types (see [Shared modules](/docs/shared-modules)). So a
menu that several plugins fill — a main menu that Pawn plugins add their
items to through `mc_*` — is one menu, and a player has one open menu
whoever opened it.

```ts twoslash
import { handled, outcome, floatCell, rounded, cellFloat, ret, publicFor, nativeFn, arg, argText, argc, caller, setArg, setArgText, argString, cellsToString, stringToCells, cells, out, text, arrayOf, cell, putCell, noOrigin, hasModule, readText, playerIds, paint, print, cmd, cmdWide, setTimeout, sleep, setInterval, clearTimeout, clearInterval, hook, ham, plugin, createCellArray, destroyCellArray, cellArrayRows, pushCellArrayRow, cellsText, textCells, showMenu, Handler, WideHandler, Float, CellArray, CellBuffer, TEXT_MAX, Team, WeaponName, ItemName, PlayerFilter, ModuleName, KillOptions, Player, CommandHandler, CommandOptions, ServerCommandHandler, HudOptions, HudEffect, HudLine, FadeDirection, FadeOptions, ShakeOptions, StatusIconState, Screen, CvarChangeEvent, CvarListener, Cvar, Server, server, Game, RoundWinner, EndRoundOptions, game, Variant, VariantName, Flag, Entity, Weapon, WeaponKind, weaponKindOf, Target, swapTeam, cvar, SleepOptions, Call, PluginInfo, ForwardStop, NoArgument, Forward, Storage, EntityFilter, PawnFunction, PawnCall, MenuShowOptions, MenuItemOptions, addServerListener, removeServerListener, PluginInitEvent, PluginPauseEvent, PluginUnpauseEvent, ServerChangelevelEvent, PluginCfgEvent, PluginEndEvent, PluginLogEvent, PluginPrecacheEvent, ClientInfochangedEvent, ClientConnectEvent, ClientConnectexEvent, ClientAuthorizedEvent, ClientDisconnectEvent, ClientDisconnectedEvent, ClientRemoveEvent, ClientCommandEvent, ClientPutinserverEvent, InconsistentFileEvent, PluginModulesEvent, OnConfigsExecutedEvent, OnAutoConfigsBufferedEvent, CS_InternalCommandEvent, CS_OnBuyAttemptEvent, CS_OnBuyEvent, PfnTouchEvent, ServerFrameEvent, ClientKillEvent, Client_PreThinkEvent, Client_PostThinkEvent, ClientImpulseEvent, ClientCmdStartEvent, PfnThinkEvent, PfnPlaybackeventEvent, PfnKeyvalueEvent, PfnSpawnEvent, ServerEventMap, flagList, FlagFamily, FlagStore, EntvarFlags, MemberFlags, FlagList, HideHud, HIDE_HUD, Button, BUTTON, Effect, EFFECT, EntityFlag, ENTITY_FLAG, Damage, DAMAGE, Access, ACCESS, addGameListener, removeGameListener, HookEvent, HookEntry, RewardReason, ResourceType, TeamChoice, ItemRestriction, BotEvent, RoundEndReason, DeathMessageFlag, KillRarity, VguiMenu, ActivateServerEvent, AddAccountEvent, AddMultiDamageEvent, AddPlayerItemEvent, AddPointsEvent, AddPointsToTeamEvent, AddResourceEvent, AirAccelerateEvent, AirMoveEvent, AllocEvent, AllowPhysentEvent, ApplyMultiDamageEvent, BalanceTeamsEvent, BasePlayerDuckEvent, BasePlayerJumpEvent, BasePlayerSpawnEvent, BlindEvent, BounceGibTouchEvent, BuyGunAmmoEvent, BuyItemEvent, BuyWeaponByWeaponIdEvent, CanDeployEvent, CanHavePlayerItemEvent, CanPlayerHearPlayerEvent, CanSwitchTeamEvent, ChangeLevelEvent, CheckMapConditionsEvent, CheckTimeBasedDamageEvent, CheckUserInfoEvent, CheckWaterJumpEvent, CheckWinConditionsEvent, ChooseAppearanceEvent, ChooseTeamEvent, ClassifyEvent, CleanUpMapEvent, ClearMultiDamageEvent, ClientConnectedEvent, ClientPrintfEvent, ClientUserInfoChangedEvent, ConnectClientEvent, CreateWeaponBoxEvent, DeadPlayerWeaponsEvent, DeathNoticeEvent, DeathSoundEvent, DefaultDeployEvent, DefaultReloadEvent, DefaultShotgunReloadEvent, DefuseBombEndEvent, DefuseBombStartEvent, DirectSetEvent, DisappearEvent, DropClientEvent, DropIdlePlayerEvent, DropPlayerItemEvent, DropShieldEvent, EmitPingsEvent, EntSelectSpawnPointEvent, ExecuteServerStringCmdEvent, ExplodeBombEvent, ExplodeFlashbangEvent, ExplodeHeGrenadeEvent, ExplodeSmokeGrenadeEvent, FPlayerCanRespawnEvent, FPlayerCanTakeDamageEvent, FShouldSwitchWeaponEvent, FireBuckshotsEvent, FireBulletsEvent, FireBullets3Event, FlPlayerFallDamageEvent, FreeEvent, GetEntityInitEvent, GetForceCameraEvent, GetIntoGameEvent, GetNextBestWeaponEvent, GetPlayerSpawnSpotEvent, GibSpawnEvent, GiveAmmoEvent, GiveC4Event, GiveDefaultItemsEvent, GiveNamedItemEvent, GiveShieldEvent, GoToIntermissionEvent, HasRestrictItemEvent, HintMessageExEvent, ImpulseCommandsEvent, IsPenetrableEntityEvent, ItemPostFrameEvent, JoiningThinkEvent, KickBackEvent, KilledEvent, LadderMoveEvent, MakeBomberEvent, MakeVipEvent, MoveEvent, ObjectCapsEvent, ObserverFindNextPlayerEvent, ObserverIsValidTargetEvent, ObserverSetModeEvent, ObserverThinkEvent, OnEventEvent, OnRoundFreezeEndEvent, OnSpawnEquipEvent, PainEvent, PlantBombEvent, PlayStepSoundEvent, PlayerBlindEvent, PlayerDeathThinkEvent, PlayerGotWeaponEvent, PlayerKilledEvent, PlayerSpawnEvent, PmDuckEvent, PmJumpEvent, PostThinkEvent, PreThinkEvent, PrecacheEvent, PrecacheGenericIEvent, PrecacheModelIEvent, PrecacheSoundIEvent, PrintfEvent, RadioEvent, RemoveAllItemsEvent, RemoveGunsEvent, RemovePlayerItemEvent, RemoveSpawnProtectionEvent, ResetMaxSpeedEvent, ResetSequenceInfoEvent, RestartRoundEvent, RoundEndEvent, RoundRespawnEvent, SendDeathMessageEvent, SendResourcesEvent, SendWeaponAnimEvent, ServerDeactivateEvent, SetAnimationEvent, SetClientUserInfoModelEvent, SetClientUserInfoNameEvent, SetModelEvent, SetSpawnProtectionEvent, ShowMenuEvent, ShowVguiMenuEvent, SpawnHeadGibEvent, SpawnRandomGibsEvent, StartDeathCamEvent, StartObserverEvent, StartSoundEvent, SwitchTeamEvent, TakeDamageEvent, TakeHealthEvent, TeamFullEvent, TeamStackedEvent, ThinkEvent, ThrowFlashbangEvent, ThrowGrenadeEvent, ThrowHeGrenadeEvent, ThrowSmokeGrenadeEvent, TraceAttackEvent, TraceLineEvent, UnDuckEvent, UpdateClientDataEvent, UseEmptyEvent, WaitTillLandEvent, WaterJumpEvent, WriteFullClientUpdateEvent, GameEventMap, GameAnswerMap, Vector } from "~/facade";
// ---cut---
import * as menus from "~/modules/menu-core";

menus.register("MAIN_MENU");
menus.addCondition("IS_ALIVE", (player) => player.isAlive);
menus.addAction("RESET_SCORE", resetScore);
menus.setListSource("LIST_FPS_CHECK", rows);   // rows(viewer) returns menus.listRow(target, text) rows
menus.show(player, "MAIN_MENU", { resetHistory: true });
```

The menu-core plugin has to be in `plugins.ini`, and it reads its menus through
`~/modules/universal-config` — the universal-config plugin's — so that one
too.

## Menus in the file

`setConfigFile("myplugin/menu")` reads `configs/myplugin/menu.ini` when a
menu is first asked for (`register(name)`, or `show` of a name it does not
know).

```ini
[MAIN]
PREFIX = MYPLUGIN_CHAT_PREFIX       ; chat prefix of the "nothing to list" message
KEY = {
	EXIT = MYPLUGIN_MENU_EXIT       ; the buttons: a lang key or the text itself
	NUMBER = MYPLUGIN_MENU_NUMBER   ; "\y[%d]\w" unless the dictionary says otherwise
}

[MAIN_MENU]
TITLE = MYPLUGIN_MENU_MAIN_TITLE
HIDE_BACK = YES
ITEMS = {
	; name | placeholder | condition | action | restriction | message | spacing
	"MYPLUGIN_MENU_MAIN_ADMIN" "" "IS_ADMIN" "SHOW_ADMIN_MENU" "ADMIN" "" ""
	"MYPLUGIN_MENU_MAIN_SPECTATE|MYPLUGIN_MENU_MAIN_JOIN" "" "!IS_SPECTATOR|IS_SPECTATOR" "JOIN_SPECTATE|JOIN_TEAM" "" "" ""
}

[LIST_SPECTATORS_MENU]
TITLE = MYPLUGIN_MENU_SPECTATORS_TITLE
ACTIVE_ON = IS_ROUND_RUNNING
FILTER = {
	"IS_SPECTATOR" "MYPLUGIN_CHAT_NO_SPECTATORS"
}
VIEW = {
	; name | condition | action | restriction | message
	"%name%" "" "SWAP_WITH_SPECTATOR" "" ""
}
```

- `TITLE`, `ACTIVE_ON` (the menu opens only while it holds), `HIDE_BACK`,
  `HIDE_EXIT`, `TIME` (a countdown in seconds), `ON_TIMEOUT` (the action when
  it ends), `LOCKED`, `GLOBAL` (one countdown for everyone).
- `A|B` in a name, condition or action are variants: the first whose
  condition holds is shown. `!NAME` turns a condition around; several names,
  space-separated, must all hold.
- A condition, restriction or action nobody registered: `ADMIN` and
  `FLAG_<letters>` are answered from the player's access; any other
  condition does not hold.
- Built-in actions: `SHOW_<MENU>` opens that menu, `CLOSE_MENU` closes; an
  action line may list several.
- Placeholders: `%name%` (a list row's text), `%target%`, `%time%`, and any
  registered one.
- A list menu draws its `VIEW` row per player — or per row of its list
  source — leaving out those that fail a `FILTER`. With none left it does not
  open, and the player is told the filter's message.

## For Pawn plugins

The menu-core plugin gives Pawn plugins menu_core's 29 natives —
`mc_register_action`, `mc_show_menu`, `mc_add_menu_item` and the rest — with
the signatures of the original `menu_core.inc`, so compiled `.amxx` plugins
work against it unchanged. It replaces menu_core.amxx: comment that one out in
`plugins.ini`; `amxts_host.amxx` stays where it is, last. It reads its
menus through `~/modules/universal-config`, so universal-config comes before
it in the amxts `plugins.ini`.

A Pawn plugin names its callbacks by public name, and menu-core calls them
with callfunc, the calling plugin's id taken from the native call.

The generated `menu_core.inc` (deploying copies it into the server's
`addons/amxmodx/scripting/include`) differs from the original only in
spelling, not in what a compiled plugin passes:

| original | generated |
| --- | --- |
| `#define MP_LOCKED 0` ... `MP_FILTER 7` | `enum MenuProperty { MP_LOCKED = 0, ... }` |
| `property` in the three property natives | `MenuProperty:property` |
| `mc_get_menu_property_string(menuIdx, property, value[], len)` | `..., out[], len)` |
| `mc_add_list_text(Array:aItems, ...)` | `mc_add_list_text(aItems, ...)` |
| — | `mc_get_menu_text(id, out[], len)`: what the player's menu shows, an amxts addition for tests and logs |

A plugin compiled against the new include gets a tag warning for a bare
number where `MenuProperty:` is expected, and for an `Array:` passed to
`mc_add_list_text`.

## Where it differs from the original

- No Pawn limits: names, titles and placeholders are as long as they are
  written, a menu keeps every item, the way back is as long as it gets, and
  a menu longer than 500 bytes (Cyrillic reaches it quickly) is sent whole.
- `mc_get_menu_property_string(idx, MP_SECTION)` works: the original compared
  the include's `MP_SECTION` (5) with 4.
- A condition filter applies wherever the condition is asked, as
  `menu_core.inc` says; the original applied it to restrictions only.
- A restriction's `message` (`mc_register_restriction`) is shown beside an
  item it greys out when the item has no message of its own; the original
  stored it and never showed it.
- Closing a menu because another opens over it tells the close callbacks its
  name; the original passed "".
- A locked menu greys out the items of any menu; the original greyed out only
  list rows.
- `mc_show_menu` of a section nobody registered reads it from the file.
- `isCritical` of `mc_register_action` is accepted and does nothing, as in the
  original.

## Testing

`installMenus(server)`, from the same testing library as `loadPlugin`
([Testing](/docs/testing)), called before the plugins load, gives the fake
server menus, keys, fake Pawn plugins and a dictionary:

```ts twoslash
import { handled, outcome, floatCell, rounded, cellFloat, ret, publicFor, nativeFn, arg, argText, argc, caller, setArg, setArgText, argString, cellsToString, stringToCells, cells, out, text, arrayOf, cell, putCell, noOrigin, hasModule, readText, playerIds, paint, print, cmd, cmdWide, setTimeout, sleep, setInterval, clearTimeout, clearInterval, hook, ham, plugin, createCellArray, destroyCellArray, cellArrayRows, pushCellArrayRow, cellsText, textCells, showMenu, Handler, WideHandler, Float, CellArray, CellBuffer, TEXT_MAX, Team, WeaponName, ItemName, PlayerFilter, ModuleName, KillOptions, Player, CommandHandler, CommandOptions, ServerCommandHandler, HudOptions, HudEffect, HudLine, FadeDirection, FadeOptions, ShakeOptions, StatusIconState, Screen, CvarChangeEvent, CvarListener, Cvar, Server, server, Game, RoundWinner, EndRoundOptions, game, Variant, VariantName, Flag, Entity, Weapon, WeaponKind, weaponKindOf, Target, swapTeam, cvar, SleepOptions, Call, PluginInfo, ForwardStop, NoArgument, Forward, Storage, EntityFilter, PawnFunction, PawnCall, MenuShowOptions, MenuItemOptions, addServerListener, removeServerListener, PluginInitEvent, PluginPauseEvent, PluginUnpauseEvent, ServerChangelevelEvent, PluginCfgEvent, PluginEndEvent, PluginLogEvent, PluginPrecacheEvent, ClientInfochangedEvent, ClientConnectEvent, ClientConnectexEvent, ClientAuthorizedEvent, ClientDisconnectEvent, ClientDisconnectedEvent, ClientRemoveEvent, ClientCommandEvent, ClientPutinserverEvent, InconsistentFileEvent, PluginModulesEvent, OnConfigsExecutedEvent, OnAutoConfigsBufferedEvent, CS_InternalCommandEvent, CS_OnBuyAttemptEvent, CS_OnBuyEvent, PfnTouchEvent, ServerFrameEvent, ClientKillEvent, Client_PreThinkEvent, Client_PostThinkEvent, ClientImpulseEvent, ClientCmdStartEvent, PfnThinkEvent, PfnPlaybackeventEvent, PfnKeyvalueEvent, PfnSpawnEvent, ServerEventMap, flagList, FlagFamily, FlagStore, EntvarFlags, MemberFlags, FlagList, HideHud, HIDE_HUD, Button, BUTTON, Effect, EFFECT, EntityFlag, ENTITY_FLAG, Damage, DAMAGE, Access, ACCESS, addGameListener, removeGameListener, HookEvent, HookEntry, RewardReason, ResourceType, TeamChoice, ItemRestriction, BotEvent, RoundEndReason, DeathMessageFlag, KillRarity, VguiMenu, ActivateServerEvent, AddAccountEvent, AddMultiDamageEvent, AddPlayerItemEvent, AddPointsEvent, AddPointsToTeamEvent, AddResourceEvent, AirAccelerateEvent, AirMoveEvent, AllocEvent, AllowPhysentEvent, ApplyMultiDamageEvent, BalanceTeamsEvent, BasePlayerDuckEvent, BasePlayerJumpEvent, BasePlayerSpawnEvent, BlindEvent, BounceGibTouchEvent, BuyGunAmmoEvent, BuyItemEvent, BuyWeaponByWeaponIdEvent, CanDeployEvent, CanHavePlayerItemEvent, CanPlayerHearPlayerEvent, CanSwitchTeamEvent, ChangeLevelEvent, CheckMapConditionsEvent, CheckTimeBasedDamageEvent, CheckUserInfoEvent, CheckWaterJumpEvent, CheckWinConditionsEvent, ChooseAppearanceEvent, ChooseTeamEvent, ClassifyEvent, CleanUpMapEvent, ClearMultiDamageEvent, ClientConnectedEvent, ClientPrintfEvent, ClientUserInfoChangedEvent, ConnectClientEvent, CreateWeaponBoxEvent, DeadPlayerWeaponsEvent, DeathNoticeEvent, DeathSoundEvent, DefaultDeployEvent, DefaultReloadEvent, DefaultShotgunReloadEvent, DefuseBombEndEvent, DefuseBombStartEvent, DirectSetEvent, DisappearEvent, DropClientEvent, DropIdlePlayerEvent, DropPlayerItemEvent, DropShieldEvent, EmitPingsEvent, EntSelectSpawnPointEvent, ExecuteServerStringCmdEvent, ExplodeBombEvent, ExplodeFlashbangEvent, ExplodeHeGrenadeEvent, ExplodeSmokeGrenadeEvent, FPlayerCanRespawnEvent, FPlayerCanTakeDamageEvent, FShouldSwitchWeaponEvent, FireBuckshotsEvent, FireBulletsEvent, FireBullets3Event, FlPlayerFallDamageEvent, FreeEvent, GetEntityInitEvent, GetForceCameraEvent, GetIntoGameEvent, GetNextBestWeaponEvent, GetPlayerSpawnSpotEvent, GibSpawnEvent, GiveAmmoEvent, GiveC4Event, GiveDefaultItemsEvent, GiveNamedItemEvent, GiveShieldEvent, GoToIntermissionEvent, HasRestrictItemEvent, HintMessageExEvent, ImpulseCommandsEvent, IsPenetrableEntityEvent, ItemPostFrameEvent, JoiningThinkEvent, KickBackEvent, KilledEvent, LadderMoveEvent, MakeBomberEvent, MakeVipEvent, MoveEvent, ObjectCapsEvent, ObserverFindNextPlayerEvent, ObserverIsValidTargetEvent, ObserverSetModeEvent, ObserverThinkEvent, OnEventEvent, OnRoundFreezeEndEvent, OnSpawnEquipEvent, PainEvent, PlantBombEvent, PlayStepSoundEvent, PlayerBlindEvent, PlayerDeathThinkEvent, PlayerGotWeaponEvent, PlayerKilledEvent, PlayerSpawnEvent, PmDuckEvent, PmJumpEvent, PostThinkEvent, PreThinkEvent, PrecacheEvent, PrecacheGenericIEvent, PrecacheModelIEvent, PrecacheSoundIEvent, PrintfEvent, RadioEvent, RemoveAllItemsEvent, RemoveGunsEvent, RemovePlayerItemEvent, RemoveSpawnProtectionEvent, ResetMaxSpeedEvent, ResetSequenceInfoEvent, RestartRoundEvent, RoundEndEvent, RoundRespawnEvent, SendDeathMessageEvent, SendResourcesEvent, SendWeaponAnimEvent, ServerDeactivateEvent, SetAnimationEvent, SetClientUserInfoModelEvent, SetClientUserInfoNameEvent, SetModelEvent, SetSpawnProtectionEvent, ShowMenuEvent, ShowVguiMenuEvent, SpawnHeadGibEvent, SpawnRandomGibsEvent, StartDeathCamEvent, StartObserverEvent, StartSoundEvent, SwitchTeamEvent, TakeDamageEvent, TakeHealthEvent, TeamFullEvent, TeamStackedEvent, ThinkEvent, ThrowFlashbangEvent, ThrowGrenadeEvent, ThrowHeGrenadeEvent, ThrowSmokeGrenadeEvent, TraceAttackEvent, TraceLineEvent, UnDuckEvent, UpdateClientDataEvent, UseEmptyEvent, WaitTillLandEvent, WaterJumpEvent, WriteFullClientUpdateEvent, GameEventMap, GameAnswerMap, Vector } from "~/facade";
// ---cut---
const server = new FakeServer({ files });
const menus = installMenus(server);
const admin = menus.pawnPlugin("admin.amxx", {
	OnKick: (_id: number, target: number) => kicked.push(target),
	Hp: (_id: number, _target: number, value: PawnArray) => value.set("100"),
});
await server.load("as/menu-core.ts");
server.start();

admin.native("mc_register_action", "KICK", "OnKick");      // called from admin.amxx
admin.native("mc_show_menu", player.id, "LIST_KICK");
menus.screen(player)?.text;                                  // what he sees, keys too
menus.press(player, 1);
menus.translate({ MYPLUGIN_MENU_EXIT: "Exit" });
```
