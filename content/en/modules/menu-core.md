---
title: "Menu Core"
description: "An opinionated way to create menus for Counter-Strike 1.6 servers"
---

Describe a menu once, in an ini file or in code, and Menu Core handles the rest: pages, keys, the way back, countdowns, and items that appear, disappear or grey out depending on who is looking. It is an [amxts](https://amxts.github.io/) module written in TypeScript, and it also serves the original `menu_core.amxx` natives, so existing Pawn plugins keep working.

::warning
**In progress.** Menu Core has been tried in game only a few times, and its API may still change.
::

## Features

- **Menus from a file or from code.** Admins edit `menu.ini` without touching a plugin; plugins add their own items at run time.
- **Conditions and restrictions.** Show an item only when it applies (`IS_ALIVE`, `!IS_SPECTATOR`), or grey it out with a reason (`ADMIN`, `FLAG_abc`).
- **Placeholders.** `%hp%`, `%name%`, `%time%` and any value you register are filled in each time the menu is drawn.
- **List menus.** A row per player or per item of your own list, with filters and a message when nothing is left.
- **Variants.** `SPECTATE|JOIN` shows whichever variant's condition holds.
- **Countdowns and locks.** Timed menus, one timer per player or one for everyone, and menus that cannot be closed or replaced.
- **One instance per server.** Every plugin, TypeScript or Pawn, fills and opens the same menus.
- **No Pawn limits.** Long names, many items, Cyrillic menus over 500 bytes.

## Installation

```bash
npm install @amxts/menu-core
```

Then add it to your project's `amxts.config.ts`:

```ts twoslash
import { hostIndex, handled, outcome, floatCell, rounded, cellFloat, ret, publicFor, nativeFn, arg, argText, argc, caller, setArg, setArgText, argString, cellsToString, stringToCells, cells, out, text, arrayOf, cell, putCell, noOrigin, hasModule, readText, playerIds, accessOf, paint, print, cmd, cmdWide, setTimeout, sleep, setInterval, clearTimeout, clearInterval, hook, ham, plugin, defineModule, createCellArray, destroyCellArray, cellArrayRows, pushCellArrayRow, cellsText, textCells, showMenu, Handler, WideHandler, Float, CellArray, CellBuffer, TEXT_MAX, Team, WeaponName, ItemName, PlayerFilter, ModuleName, KillOptions, Client, Player, CommandHandler, CommandOptions, ServerCommandHandler, HudOptions, HudEffect, HudLine, FadeDirection, FadeOptions, ShakeOptions, StatusIconState, Screen, CvarChangeEvent, CvarListener, Cvar, Server, server, Game, RoundWinner, EndRoundOptions, game, Variant, VariantName, Flag, Entity, Weapon, WeaponKind, weaponKindOf, Target, swapTeam, cvar, TimerHandler, SleepOptions, Call, PluginInfo, ModuleOptions, ForwardStop, NoArgument, Forward, Storage, EntityFilter, PawnFunction, PawnCall, addServerListener, removeServerListener, PluginInitEvent, PluginPauseEvent, PluginUnpauseEvent, ServerChangelevelEvent, PluginCfgEvent, PluginEndEvent, PluginLogEvent, PluginPrecacheEvent, ClientInfochangedEvent, ClientConnectEvent, ClientConnectexEvent, ClientAuthorizedEvent, ClientDisconnectEvent, ClientDisconnectedEvent, ClientRemoveEvent, ClientCommandEvent, ClientPutinserverEvent, InconsistentFileEvent, PluginModulesEvent, OnConfigsExecutedEvent, OnAutoConfigsBufferedEvent, CS_InternalCommandEvent, CS_OnBuyAttemptEvent, CS_OnBuyEvent, PfnTouchEvent, ServerFrameEvent, ClientKillEvent, Client_PreThinkEvent, Client_PostThinkEvent, ClientImpulseEvent, ClientCmdStartEvent, PfnThinkEvent, PfnPlaybackeventEvent, PfnKeyvalueEvent, PfnSpawnEvent, ServerEventMap, flagList, FlagFamily, FlagStore, EntvarFlags, MemberFlags, FlagList, HideHud, HIDE_HUD, Button, BUTTON, Effect, EFFECT, EntityFlag, ENTITY_FLAG, Damage, DAMAGE, Access, ACCESS, addGameListener, removeGameListener, HookEvent, HookEntry, RewardReason, ResourceType, TeamChoice, ItemRestriction, BotEvent, RoundEndReason, DeathMessageFlag, KillRarity, VguiMenu, ActivateServerEvent, AddAccountEvent, AddMultiDamageEvent, AddPlayerItemEvent, AddPointsEvent, AddPointsToTeamEvent, AddResourceEvent, AirAccelerateEvent, AirMoveEvent, AllocEvent, AllowPhysentEvent, ApplyMultiDamageEvent, BalanceTeamsEvent, BasePlayerDuckEvent, BasePlayerJumpEvent, BasePlayerSpawnEvent, BlindEvent, BounceGibTouchEvent, BuyGunAmmoEvent, BuyItemEvent, BuyWeaponByWeaponIdEvent, CanDeployEvent, CanHavePlayerItemEvent, CanPlayerHearPlayerEvent, CanSwitchTeamEvent, ChangeLevelEvent, CheckMapConditionsEvent, CheckTimeBasedDamageEvent, CheckUserInfoEvent, CheckWaterJumpEvent, CheckWinConditionsEvent, ChooseAppearanceEvent, ChooseTeamEvent, ClassifyEvent, CleanUpMapEvent, ClearMultiDamageEvent, ClientConnectedEvent, ClientPrintfEvent, ClientUserInfoChangedEvent, ConnectClientEvent, CreateWeaponBoxEvent, DeadPlayerWeaponsEvent, DeathNoticeEvent, DeathSoundEvent, DefaultDeployEvent, DefaultReloadEvent, DefaultShotgunReloadEvent, DefuseBombEndEvent, DefuseBombStartEvent, DirectSetEvent, DisappearEvent, DropClientEvent, DropIdlePlayerEvent, DropPlayerItemEvent, DropShieldEvent, EmitPingsEvent, EntSelectSpawnPointEvent, ExecuteServerStringCmdEvent, ExplodeBombEvent, ExplodeFlashbangEvent, ExplodeHeGrenadeEvent, ExplodeSmokeGrenadeEvent, FPlayerCanRespawnEvent, FPlayerCanTakeDamageEvent, FShouldSwitchWeaponEvent, FireBuckshotsEvent, FireBulletsEvent, FireBullets3Event, FlPlayerFallDamageEvent, FreeEvent, GetEntityInitEvent, GetForceCameraEvent, GetIntoGameEvent, GetNextBestWeaponEvent, GetPlayerSpawnSpotEvent, GibSpawnEvent, GiveAmmoEvent, GiveC4Event, GiveDefaultItemsEvent, GiveNamedItemEvent, GiveShieldEvent, GoToIntermissionEvent, HasRestrictItemEvent, HintMessageExEvent, ImpulseCommandsEvent, IsPenetrableEntityEvent, ItemPostFrameEvent, JoiningThinkEvent, KickBackEvent, KilledEvent, LadderMoveEvent, MakeBomberEvent, MakeVipEvent, MoveEvent, ObjectCapsEvent, ObserverFindNextPlayerEvent, ObserverIsValidTargetEvent, ObserverSetModeEvent, ObserverThinkEvent, OnEventEvent, OnRoundFreezeEndEvent, OnSpawnEquipEvent, PainEvent, PlantBombEvent, PlayStepSoundEvent, PlayerBlindEvent, PlayerDeathThinkEvent, PlayerGotWeaponEvent, PlayerKilledEvent, PlayerSpawnEvent, PmDuckEvent, PmJumpEvent, PostThinkEvent, PreThinkEvent, PrecacheEvent, PrecacheGenericIEvent, PrecacheModelIEvent, PrecacheSoundIEvent, PrintfEvent, RadioEvent, RemoveAllItemsEvent, RemoveGunsEvent, RemovePlayerItemEvent, RemoveSpawnProtectionEvent, ResetMaxSpeedEvent, ResetSequenceInfoEvent, RestartRoundEvent, RoundEndEvent, RoundRespawnEvent, SendDeathMessageEvent, SendResourcesEvent, SendWeaponAnimEvent, ServerDeactivateEvent, SetAnimationEvent, SetClientUserInfoModelEvent, SetClientUserInfoNameEvent, SetModelEvent, SetSpawnProtectionEvent, ShowMenuEvent, ShowVguiMenuEvent, SpawnHeadGibEvent, SpawnRandomGibsEvent, StartDeathCamEvent, StartObserverEvent, StartSoundEvent, SwitchTeamEvent, TakeDamageEvent, TakeHealthEvent, TeamFullEvent, TeamStackedEvent, ThinkEvent, ThrowFlashbangEvent, ThrowGrenadeEvent, ThrowHeGrenadeEvent, ThrowSmokeGrenadeEvent, TraceAttackEvent, TraceLineEvent, UnDuckEvent, UpdateClientDataEvent, UseEmptyEvent, WaitTillLandEvent, WaterJumpEvent, WriteFullClientUpdateEvent, GameEventMap, GameAnswerMap, Vector } from "~/facade";
// ---cut---
export default defineConfig({
	modules: ["@amxts/menu-core"],
	menus: {
		file: "myserver/menu",   // configs/myserver/menu.ini
		fallback: "menu",        // configs/menu.ini when the first one has no menus
	},
});
```

Menu Core reads its menus through [Config Core](https://github.com/amxts/config-core). The package manager installs it along with Menu Core, and the build loads it first, so there is nothing to add for it.

| Option | Default | What it does |
| --- | --- | --- |
| `file` | `"menu"` | The menu file under `configs/`, without `.ini`. |
| `fallback` | `""` | Read instead when `file` has no menus; `""` is none. |

## Usage

```ts twoslash
import { server } from "@amxts/core";
import * as menus from "@amxts/menu-core";

menus.addCondition("IS_HURT", (player) => player.health < 100);
menus.addPlaceholder("hp", (player) => `${player.health}`);

const shop = menus.create("SHOP", "Shop");
menus.addItem(shop, "Heal (%hp% HP)", {
	condition: "IS_HURT",
	onSelect: (player) => {
		player.health = 100;
	},
});
menus.addItem(shop, "Reset score", {
	onSelect: (player) => {
		player.frags = 0;
	},
});
menus.addItem(shop, "Close", { action: "CLOSE_MENU", spaceBefore: 1 });

server.addCommand("/shop", (player) => {
	menus.show(player, "SHOP");
});
```

Keys: **1–7** choose, **8** is the next page, **9** the previous page or back to the menu this one was opened from, **0** closes.

Text colours are written as tags: `!y` yellow, `!r` red, `!w` white, `!d` grey, `!R` aligns right.

### API

| Function | What it does |
| --- | --- |
| `create(name, title)` | A menu in code, or the existing one with that name. A name starting with `LIST_` makes a list menu. |
| `register(name)` | Loads a menu from the file ahead of time. |
| `addItem(menu, name, options?)` | Adds an item. Options: `placeholder`, `condition`, `action` or `onSelect`, `restriction`, `restrictionMessage`, `at`, `spaceBefore`, `spaceAfter`. |
| `addFixedItem(menu, slot, name, options?)` | An item that keeps slot 1–7 on every page. |
| `addCondition(name, test)` | When an item is shown. |
| `addAction(name, handler)` | What an item named in the file does. |
| `addPlaceholder(name, value)` | What `%name%` becomes. |
| `addRestriction(name, test, message?)` | When an item is greyed out, and why. |
| `setListSource(name, rows)` | The rows of a list menu: `listRow(target, text)`, `textRow(text)`. |
| `addEventListener("open" \| "close" \| "show", listener)` | `"show"` comes before a menu opens; `event.preventDefault()` stops it. |
| `show(player, name, options?)` | Opens a menu; `false` when it does not open. Options: `time`, `target`, `resetHistory`, `force`, `skipHistory`. |
| `close(player)` · `refresh("A B")` · `conditionChanged(name)` | Close, redraw the named menus, redraw what depends on a condition. |
| `lock(player)` · `setTimer(menu, seconds)` · `cancelTimer(menu)` | Locks and countdowns. |

A menu is a plain `Menu` object: fields such as `hideExit`, `locked` and `time` are set directly.

## Menus in a file

A menu is read from the file the first time it is asked for: by `register(name)`, or by `show` of a name Menu Core does not know yet.

```ini
[MAIN]
PREFIX = MYPLUGIN_CHAT_PREFIX       ; chat prefix of the "nothing to list" message
KEY = {
	EXIT = MYPLUGIN_MENU_EXIT       ; the buttons: a lang key or the text itself
	NUMBER = MYPLUGIN_MENU_NUMBER   ; "!y[%d]!w" unless the dictionary says otherwise
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

- **Menu keys:** `TITLE`, `ACTIVE_ON` (the menu opens only while it holds), `HIDE_BACK`, `HIDE_EXIT`, `TIME` (a countdown in seconds), `ON_TIMEOUT` (the action when it ends), `LOCKED`, `GLOBAL` (one countdown for everyone).
- **Variants:** `A|B` in a name, condition or action; the first whose condition holds is shown.
- **Conditions:** `!NAME` turns one around; several names, space-separated, must all hold. `ADMIN` and `FLAG_<letters>` are answered from the player's access when nobody registered them; any other unknown condition does not hold.
- **Built-in actions:** `SHOW_<MENU>` opens that menu, `CLOSE_MENU` closes; an action line may list several.
- **Placeholders:** `%name%` (a list row's text), `%target%`, `%time%`, and any registered one.
- **List menus** draw their `VIEW` row per player, or per row of their list source, leaving out rows that fail a `FILTER`. With none left the menu does not open, and the player gets the filter's message.

::tip
Colour codes in menus written for Pawn (`\y`, `\r`) still work, so an existing `menu.ini` can be used as it is.
::

## Pawn plugins

Existing Pawn plugins keep working: Menu Core serves the 29 `mc_*` natives of the original `menu_core.amxx` with the same signatures, and the package ships `include/menu_core.inc`. Replace `menu_core.amxx` with it in `plugins.ini`. Details and the differences from the original: [PAWN.md](https://github.com/amxts/menu-core/blob/main/PAWN.md).

## Testing

`installMenus(server)` from the amxts testing library gives the fake server menus, keys, fake Pawn plugins and a dictionary. Call it before the plugins load:

```ts twoslash
import { hostIndex, handled, outcome, floatCell, rounded, cellFloat, ret, publicFor, nativeFn, arg, argText, argc, caller, setArg, setArgText, argString, cellsToString, stringToCells, cells, out, text, arrayOf, cell, putCell, noOrigin, hasModule, readText, playerIds, accessOf, paint, print, cmd, cmdWide, setTimeout, sleep, setInterval, clearTimeout, clearInterval, hook, ham, plugin, defineModule, createCellArray, destroyCellArray, cellArrayRows, pushCellArrayRow, cellsText, textCells, showMenu, Handler, WideHandler, Float, CellArray, CellBuffer, TEXT_MAX, Team, WeaponName, ItemName, PlayerFilter, ModuleName, KillOptions, Client, Player, CommandHandler, CommandOptions, ServerCommandHandler, HudOptions, HudEffect, HudLine, FadeDirection, FadeOptions, ShakeOptions, StatusIconState, Screen, CvarChangeEvent, CvarListener, Cvar, Server, server, Game, RoundWinner, EndRoundOptions, game, Variant, VariantName, Flag, Entity, Weapon, WeaponKind, weaponKindOf, Target, swapTeam, cvar, TimerHandler, SleepOptions, Call, PluginInfo, ModuleOptions, ForwardStop, NoArgument, Forward, Storage, EntityFilter, PawnFunction, PawnCall, addServerListener, removeServerListener, PluginInitEvent, PluginPauseEvent, PluginUnpauseEvent, ServerChangelevelEvent, PluginCfgEvent, PluginEndEvent, PluginLogEvent, PluginPrecacheEvent, ClientInfochangedEvent, ClientConnectEvent, ClientConnectexEvent, ClientAuthorizedEvent, ClientDisconnectEvent, ClientDisconnectedEvent, ClientRemoveEvent, ClientCommandEvent, ClientPutinserverEvent, InconsistentFileEvent, PluginModulesEvent, OnConfigsExecutedEvent, OnAutoConfigsBufferedEvent, CS_InternalCommandEvent, CS_OnBuyAttemptEvent, CS_OnBuyEvent, PfnTouchEvent, ServerFrameEvent, ClientKillEvent, Client_PreThinkEvent, Client_PostThinkEvent, ClientImpulseEvent, ClientCmdStartEvent, PfnThinkEvent, PfnPlaybackeventEvent, PfnKeyvalueEvent, PfnSpawnEvent, ServerEventMap, flagList, FlagFamily, FlagStore, EntvarFlags, MemberFlags, FlagList, HideHud, HIDE_HUD, Button, BUTTON, Effect, EFFECT, EntityFlag, ENTITY_FLAG, Damage, DAMAGE, Access, ACCESS, addGameListener, removeGameListener, HookEvent, HookEntry, RewardReason, ResourceType, TeamChoice, ItemRestriction, BotEvent, RoundEndReason, DeathMessageFlag, KillRarity, VguiMenu, ActivateServerEvent, AddAccountEvent, AddMultiDamageEvent, AddPlayerItemEvent, AddPointsEvent, AddPointsToTeamEvent, AddResourceEvent, AirAccelerateEvent, AirMoveEvent, AllocEvent, AllowPhysentEvent, ApplyMultiDamageEvent, BalanceTeamsEvent, BasePlayerDuckEvent, BasePlayerJumpEvent, BasePlayerSpawnEvent, BlindEvent, BounceGibTouchEvent, BuyGunAmmoEvent, BuyItemEvent, BuyWeaponByWeaponIdEvent, CanDeployEvent, CanHavePlayerItemEvent, CanPlayerHearPlayerEvent, CanSwitchTeamEvent, ChangeLevelEvent, CheckMapConditionsEvent, CheckTimeBasedDamageEvent, CheckUserInfoEvent, CheckWaterJumpEvent, CheckWinConditionsEvent, ChooseAppearanceEvent, ChooseTeamEvent, ClassifyEvent, CleanUpMapEvent, ClearMultiDamageEvent, ClientConnectedEvent, ClientPrintfEvent, ClientUserInfoChangedEvent, ConnectClientEvent, CreateWeaponBoxEvent, DeadPlayerWeaponsEvent, DeathNoticeEvent, DeathSoundEvent, DefaultDeployEvent, DefaultReloadEvent, DefaultShotgunReloadEvent, DefuseBombEndEvent, DefuseBombStartEvent, DirectSetEvent, DisappearEvent, DropClientEvent, DropIdlePlayerEvent, DropPlayerItemEvent, DropShieldEvent, EmitPingsEvent, EntSelectSpawnPointEvent, ExecuteServerStringCmdEvent, ExplodeBombEvent, ExplodeFlashbangEvent, ExplodeHeGrenadeEvent, ExplodeSmokeGrenadeEvent, FPlayerCanRespawnEvent, FPlayerCanTakeDamageEvent, FShouldSwitchWeaponEvent, FireBuckshotsEvent, FireBulletsEvent, FireBullets3Event, FlPlayerFallDamageEvent, FreeEvent, GetEntityInitEvent, GetForceCameraEvent, GetIntoGameEvent, GetNextBestWeaponEvent, GetPlayerSpawnSpotEvent, GibSpawnEvent, GiveAmmoEvent, GiveC4Event, GiveDefaultItemsEvent, GiveNamedItemEvent, GiveShieldEvent, GoToIntermissionEvent, HasRestrictItemEvent, HintMessageExEvent, ImpulseCommandsEvent, IsPenetrableEntityEvent, ItemPostFrameEvent, JoiningThinkEvent, KickBackEvent, KilledEvent, LadderMoveEvent, MakeBomberEvent, MakeVipEvent, MoveEvent, ObjectCapsEvent, ObserverFindNextPlayerEvent, ObserverIsValidTargetEvent, ObserverSetModeEvent, ObserverThinkEvent, OnEventEvent, OnRoundFreezeEndEvent, OnSpawnEquipEvent, PainEvent, PlantBombEvent, PlayStepSoundEvent, PlayerBlindEvent, PlayerDeathThinkEvent, PlayerGotWeaponEvent, PlayerKilledEvent, PlayerSpawnEvent, PmDuckEvent, PmJumpEvent, PostThinkEvent, PreThinkEvent, PrecacheEvent, PrecacheGenericIEvent, PrecacheModelIEvent, PrecacheSoundIEvent, PrintfEvent, RadioEvent, RemoveAllItemsEvent, RemoveGunsEvent, RemovePlayerItemEvent, RemoveSpawnProtectionEvent, ResetMaxSpeedEvent, ResetSequenceInfoEvent, RestartRoundEvent, RoundEndEvent, RoundRespawnEvent, SendDeathMessageEvent, SendResourcesEvent, SendWeaponAnimEvent, ServerDeactivateEvent, SetAnimationEvent, SetClientUserInfoModelEvent, SetClientUserInfoNameEvent, SetModelEvent, SetSpawnProtectionEvent, ShowMenuEvent, ShowVguiMenuEvent, SpawnHeadGibEvent, SpawnRandomGibsEvent, StartDeathCamEvent, StartObserverEvent, StartSoundEvent, SwitchTeamEvent, TakeDamageEvent, TakeHealthEvent, TeamFullEvent, TeamStackedEvent, ThinkEvent, ThrowFlashbangEvent, ThrowGrenadeEvent, ThrowHeGrenadeEvent, ThrowSmokeGrenadeEvent, TraceAttackEvent, TraceLineEvent, UnDuckEvent, UpdateClientDataEvent, UseEmptyEvent, WaitTillLandEvent, WaterJumpEvent, WriteFullClientUpdateEvent, GameEventMap, GameAnswerMap, Vector } from "~/facade";
// ---cut---
import { FakeServer, installMenus } from "@amxts/core/src/testing";

const server = new FakeServer({ files });
const menus = installMenus(server);
const admin = menus.pawnPlugin("admin.amxx", {
	OnKick: (_id: number, target: number) => kicked.push(target),
});
await server.load("@amxts/config-core");
await server.load("@amxts/menu-core");
server.start();

admin.native("mc_register_action", "KICK", "OnKick");
admin.native("mc_show_menu", player.id, "LIST_KICK");
menus.screen(player)?.text;   // what the player sees
menus.press(player, 1);
```
