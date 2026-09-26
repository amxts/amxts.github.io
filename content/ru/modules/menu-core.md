---
title: "Меню: menu-core"
navigation:
  title: "menu-core"
---

Меню из ini-файла или из кода: показывается через `show_menu`, клавиши
приходят через `register_menucmd`. Это menu_core на TypeScript: модуль, который
TS-плагин импортирует, и плагин, который отдаёт Pawn-плагинам нативы `mc_*`
menu_core.

::warning
**В работе**<br>
menu-core ещё доделывается. В игре его пробовали пока один раз, и поведение
может измениться.
::

## Из TypeScript

```ts twoslash locale-ru
import { Player } from "~/facade";
import * as menus from "@amxts/menu-core";

menus.addCondition("IS_HURT", (player) => player.health < 100);
menus.addPlaceholder("hp", (player) => `${player.health}`);
menus.addAction("RESET_SCORE", resetScore);

const shop = menus.create("SHOP", "Магазин");
menus.addItem(shop, "Лечение (%hp% HP)", { condition: "IS_HURT", onSelect: heal });
menus.addItem(shop, "Сбросить счёт", { action: "RESET_SCORE" });
menus.addItem(shop, "Закрыть", { action: "CLOSE_MENU", spaceBefore: 1 });

function heal(player: Player) {
	player.health = 100;
}

function resetScore(player: Player) {
	player.frags = 0;
}

menus.show(player, "SHOP");
menus.show(player, "LIST_KICK", { target: victim.id, time: 10 });
```

Меню — обычный объект (`Menu`): его поля — `hideExit`, `locked`, `time` —
меняются напрямую. Всё остальное — функции модуля, как у `fs`.

- `create(name, title)` — меню из кода; если имя занято — то, что уже есть.
  Имя на `LIST_` — меню-список.
- `addItem(menu, name, options)` / `addFixedItem(menu, slot, name, options)` —
  опции: `placeholder`, `condition`, `action` или `onSelect`, `restriction`,
  `restrictionMessage`, `at`, `spaceBefore`, `spaceAfter`.
- `addCondition`, `addAction`, `addPlaceholder`, `addRestriction`,
  `addActionCheck`, `addConditionFilter`, `setListSource` — то, что меню
  называют по имени, отвечают функции.
- `addEventListener("open" | "close" | "show", listener)` — "show" приходит
  до открытия; `event.preventDefault()` его отменяет.
- `show(player, name, options)` — false, если меню не открылось; опции:
  `time`, `target`, `resetHistory`, `force`, `skipHistory`.
- `close(player)`, `refresh("A B")`, `conditionChanged(name)`,
  `lock(player)`, `setTimer(menu, seconds)`, `cancelTimer(menu)`.

Клавиши: 1-7 — выбор, 8 — следующая страница, 9 — предыдущая или назад, в
меню, откуда пришли, 0 — закрыть.

## Из любого плагина: один menu-core на сервер

На сервере один экземпляр `@amxts/menu-core` — плагина menu-core. Любой
ваш плагин, который его импортирует, вызывает этот экземпляр, с теми же
функциями и типами (см. [Общие модули](/ru/docs/shared-modules)). Поэтому меню,
которое наполняют несколько плагинов, — главное меню, куда Pawn-плагины
добавляют пункты через `mc_*`, — это одно меню, а у игрока одно открытое
меню, кто бы его ни открыл.

```ts twoslash locale-ru
import { hostIndex, handled, outcome, floatCell, rounded, cellFloat, ret, publicFor, nativeFn, arg, argText, argc, caller, setArg, setArgText, argString, cellsToString, stringToCells, cells, out, text, arrayOf, cell, putCell, noOrigin, hasModule, readText, playerIds, accessOf, paint, print, cmd, cmdWide, setTimeout, sleep, setInterval, clearTimeout, clearInterval, hook, ham, plugin, defineModule, createCellArray, destroyCellArray, cellArrayRows, pushCellArrayRow, cellsText, textCells, showMenu, Handler, WideHandler, Float, CellArray, CellBuffer, TEXT_MAX, Team, WeaponName, ItemName, PlayerFilter, ModuleName, KillOptions, Client, Player, CommandHandler, CommandOptions, ServerCommandHandler, HudOptions, HudEffect, HudLine, FadeDirection, FadeOptions, ShakeOptions, StatusIconState, Screen, CvarChangeEvent, CvarListener, Cvar, Server, server, Game, RoundWinner, EndRoundOptions, game, Variant, VariantName, Flag, Entity, Weapon, WeaponKind, weaponKindOf, Target, swapTeam, cvar, TimerHandler, SleepOptions, Call, PluginInfo, ModuleOptions, ForwardStop, NoArgument, Forward, Storage, EntityFilter, PawnFunction, PawnCall, addServerListener, removeServerListener, PluginInitEvent, PluginPauseEvent, PluginUnpauseEvent, ServerChangelevelEvent, PluginCfgEvent, PluginEndEvent, PluginLogEvent, PluginPrecacheEvent, ClientInfochangedEvent, ClientConnectEvent, ClientConnectexEvent, ClientAuthorizedEvent, ClientDisconnectEvent, ClientDisconnectedEvent, ClientRemoveEvent, ClientCommandEvent, ClientPutinserverEvent, InconsistentFileEvent, PluginModulesEvent, OnConfigsExecutedEvent, OnAutoConfigsBufferedEvent, CS_InternalCommandEvent, CS_OnBuyAttemptEvent, CS_OnBuyEvent, PfnTouchEvent, ServerFrameEvent, ClientKillEvent, Client_PreThinkEvent, Client_PostThinkEvent, ClientImpulseEvent, ClientCmdStartEvent, PfnThinkEvent, PfnPlaybackeventEvent, PfnKeyvalueEvent, PfnSpawnEvent, ServerEventMap, flagList, FlagFamily, FlagStore, EntvarFlags, MemberFlags, FlagList, HideHud, HIDE_HUD, Button, BUTTON, Effect, EFFECT, EntityFlag, ENTITY_FLAG, Damage, DAMAGE, Access, ACCESS, addGameListener, removeGameListener, HookEvent, HookEntry, RewardReason, ResourceType, TeamChoice, ItemRestriction, BotEvent, RoundEndReason, DeathMessageFlag, KillRarity, VguiMenu, ActivateServerEvent, AddAccountEvent, AddMultiDamageEvent, AddPlayerItemEvent, AddPointsEvent, AddPointsToTeamEvent, AddResourceEvent, AirAccelerateEvent, AirMoveEvent, AllocEvent, AllowPhysentEvent, ApplyMultiDamageEvent, BalanceTeamsEvent, BasePlayerDuckEvent, BasePlayerJumpEvent, BasePlayerSpawnEvent, BlindEvent, BounceGibTouchEvent, BuyGunAmmoEvent, BuyItemEvent, BuyWeaponByWeaponIdEvent, CanDeployEvent, CanHavePlayerItemEvent, CanPlayerHearPlayerEvent, CanSwitchTeamEvent, ChangeLevelEvent, CheckMapConditionsEvent, CheckTimeBasedDamageEvent, CheckUserInfoEvent, CheckWaterJumpEvent, CheckWinConditionsEvent, ChooseAppearanceEvent, ChooseTeamEvent, ClassifyEvent, CleanUpMapEvent, ClearMultiDamageEvent, ClientConnectedEvent, ClientPrintfEvent, ClientUserInfoChangedEvent, ConnectClientEvent, CreateWeaponBoxEvent, DeadPlayerWeaponsEvent, DeathNoticeEvent, DeathSoundEvent, DefaultDeployEvent, DefaultReloadEvent, DefaultShotgunReloadEvent, DefuseBombEndEvent, DefuseBombStartEvent, DirectSetEvent, DisappearEvent, DropClientEvent, DropIdlePlayerEvent, DropPlayerItemEvent, DropShieldEvent, EmitPingsEvent, EntSelectSpawnPointEvent, ExecuteServerStringCmdEvent, ExplodeBombEvent, ExplodeFlashbangEvent, ExplodeHeGrenadeEvent, ExplodeSmokeGrenadeEvent, FPlayerCanRespawnEvent, FPlayerCanTakeDamageEvent, FShouldSwitchWeaponEvent, FireBuckshotsEvent, FireBulletsEvent, FireBullets3Event, FlPlayerFallDamageEvent, FreeEvent, GetEntityInitEvent, GetForceCameraEvent, GetIntoGameEvent, GetNextBestWeaponEvent, GetPlayerSpawnSpotEvent, GibSpawnEvent, GiveAmmoEvent, GiveC4Event, GiveDefaultItemsEvent, GiveNamedItemEvent, GiveShieldEvent, GoToIntermissionEvent, HasRestrictItemEvent, HintMessageExEvent, ImpulseCommandsEvent, IsPenetrableEntityEvent, ItemPostFrameEvent, JoiningThinkEvent, KickBackEvent, KilledEvent, LadderMoveEvent, MakeBomberEvent, MakeVipEvent, MoveEvent, ObjectCapsEvent, ObserverFindNextPlayerEvent, ObserverIsValidTargetEvent, ObserverSetModeEvent, ObserverThinkEvent, OnEventEvent, OnRoundFreezeEndEvent, OnSpawnEquipEvent, PainEvent, PlantBombEvent, PlayStepSoundEvent, PlayerBlindEvent, PlayerDeathThinkEvent, PlayerGotWeaponEvent, PlayerKilledEvent, PlayerSpawnEvent, PmDuckEvent, PmJumpEvent, PostThinkEvent, PreThinkEvent, PrecacheEvent, PrecacheGenericIEvent, PrecacheModelIEvent, PrecacheSoundIEvent, PrintfEvent, RadioEvent, RemoveAllItemsEvent, RemoveGunsEvent, RemovePlayerItemEvent, RemoveSpawnProtectionEvent, ResetMaxSpeedEvent, ResetSequenceInfoEvent, RestartRoundEvent, RoundEndEvent, RoundRespawnEvent, SendDeathMessageEvent, SendResourcesEvent, SendWeaponAnimEvent, ServerDeactivateEvent, SetAnimationEvent, SetClientUserInfoModelEvent, SetClientUserInfoNameEvent, SetModelEvent, SetSpawnProtectionEvent, ShowMenuEvent, ShowVguiMenuEvent, SpawnHeadGibEvent, SpawnRandomGibsEvent, StartDeathCamEvent, StartObserverEvent, StartSoundEvent, SwitchTeamEvent, TakeDamageEvent, TakeHealthEvent, TeamFullEvent, TeamStackedEvent, ThinkEvent, ThrowFlashbangEvent, ThrowGrenadeEvent, ThrowHeGrenadeEvent, ThrowSmokeGrenadeEvent, TraceAttackEvent, TraceLineEvent, UnDuckEvent, UpdateClientDataEvent, UseEmptyEvent, WaitTillLandEvent, WaterJumpEvent, WriteFullClientUpdateEvent, GameEventMap, GameAnswerMap, Vector } from "~/facade";
// ---cut---
import * as menus from "@amxts/menu-core";

menus.register("MAIN_MENU");
menus.addCondition("IS_ALIVE", (player) => player.isAlive);
menus.addAction("RESET_SCORE", resetScore);
menus.setListSource("LIST_FPS_CHECK", rows);   // rows(viewer) возвращает строки menus.listRow(target, text)
menus.show(player, "MAIN_MENU", { resetHistory: true });
```

Проект перечисляет menu-core в `amxts.config.ts`, а с ним и
universal-config: меню menu-core читает через `@amxts/universal-config` —
плагина universal-config. Сборка ставит оба плагина в `plugins.ini`,
universal-config первым.

```ts twoslash locale-ru
import { hostIndex, handled, outcome, floatCell, rounded, cellFloat, ret, publicFor, nativeFn, arg, argText, argc, caller, setArg, setArgText, argString, cellsToString, stringToCells, cells, out, text, arrayOf, cell, putCell, noOrigin, hasModule, readText, playerIds, accessOf, paint, print, cmd, cmdWide, setTimeout, sleep, setInterval, clearTimeout, clearInterval, hook, ham, plugin, defineModule, createCellArray, destroyCellArray, cellArrayRows, pushCellArrayRow, cellsText, textCells, showMenu, Handler, WideHandler, Float, CellArray, CellBuffer, TEXT_MAX, Team, WeaponName, ItemName, PlayerFilter, ModuleName, KillOptions, Client, Player, CommandHandler, CommandOptions, ServerCommandHandler, HudOptions, HudEffect, HudLine, FadeDirection, FadeOptions, ShakeOptions, StatusIconState, Screen, CvarChangeEvent, CvarListener, Cvar, Server, server, Game, RoundWinner, EndRoundOptions, game, Variant, VariantName, Flag, Entity, Weapon, WeaponKind, weaponKindOf, Target, swapTeam, cvar, TimerHandler, SleepOptions, Call, PluginInfo, ModuleOptions, ForwardStop, NoArgument, Forward, Storage, EntityFilter, PawnFunction, PawnCall, addServerListener, removeServerListener, PluginInitEvent, PluginPauseEvent, PluginUnpauseEvent, ServerChangelevelEvent, PluginCfgEvent, PluginEndEvent, PluginLogEvent, PluginPrecacheEvent, ClientInfochangedEvent, ClientConnectEvent, ClientConnectexEvent, ClientAuthorizedEvent, ClientDisconnectEvent, ClientDisconnectedEvent, ClientRemoveEvent, ClientCommandEvent, ClientPutinserverEvent, InconsistentFileEvent, PluginModulesEvent, OnConfigsExecutedEvent, OnAutoConfigsBufferedEvent, CS_InternalCommandEvent, CS_OnBuyAttemptEvent, CS_OnBuyEvent, PfnTouchEvent, ServerFrameEvent, ClientKillEvent, Client_PreThinkEvent, Client_PostThinkEvent, ClientImpulseEvent, ClientCmdStartEvent, PfnThinkEvent, PfnPlaybackeventEvent, PfnKeyvalueEvent, PfnSpawnEvent, ServerEventMap, flagList, FlagFamily, FlagStore, EntvarFlags, MemberFlags, FlagList, HideHud, HIDE_HUD, Button, BUTTON, Effect, EFFECT, EntityFlag, ENTITY_FLAG, Damage, DAMAGE, Access, ACCESS, addGameListener, removeGameListener, HookEvent, HookEntry, RewardReason, ResourceType, TeamChoice, ItemRestriction, BotEvent, RoundEndReason, DeathMessageFlag, KillRarity, VguiMenu, ActivateServerEvent, AddAccountEvent, AddMultiDamageEvent, AddPlayerItemEvent, AddPointsEvent, AddPointsToTeamEvent, AddResourceEvent, AirAccelerateEvent, AirMoveEvent, AllocEvent, AllowPhysentEvent, ApplyMultiDamageEvent, BalanceTeamsEvent, BasePlayerDuckEvent, BasePlayerJumpEvent, BasePlayerSpawnEvent, BlindEvent, BounceGibTouchEvent, BuyGunAmmoEvent, BuyItemEvent, BuyWeaponByWeaponIdEvent, CanDeployEvent, CanHavePlayerItemEvent, CanPlayerHearPlayerEvent, CanSwitchTeamEvent, ChangeLevelEvent, CheckMapConditionsEvent, CheckTimeBasedDamageEvent, CheckUserInfoEvent, CheckWaterJumpEvent, CheckWinConditionsEvent, ChooseAppearanceEvent, ChooseTeamEvent, ClassifyEvent, CleanUpMapEvent, ClearMultiDamageEvent, ClientConnectedEvent, ClientPrintfEvent, ClientUserInfoChangedEvent, ConnectClientEvent, CreateWeaponBoxEvent, DeadPlayerWeaponsEvent, DeathNoticeEvent, DeathSoundEvent, DefaultDeployEvent, DefaultReloadEvent, DefaultShotgunReloadEvent, DefuseBombEndEvent, DefuseBombStartEvent, DirectSetEvent, DisappearEvent, DropClientEvent, DropIdlePlayerEvent, DropPlayerItemEvent, DropShieldEvent, EmitPingsEvent, EntSelectSpawnPointEvent, ExecuteServerStringCmdEvent, ExplodeBombEvent, ExplodeFlashbangEvent, ExplodeHeGrenadeEvent, ExplodeSmokeGrenadeEvent, FPlayerCanRespawnEvent, FPlayerCanTakeDamageEvent, FShouldSwitchWeaponEvent, FireBuckshotsEvent, FireBulletsEvent, FireBullets3Event, FlPlayerFallDamageEvent, FreeEvent, GetEntityInitEvent, GetForceCameraEvent, GetIntoGameEvent, GetNextBestWeaponEvent, GetPlayerSpawnSpotEvent, GibSpawnEvent, GiveAmmoEvent, GiveC4Event, GiveDefaultItemsEvent, GiveNamedItemEvent, GiveShieldEvent, GoToIntermissionEvent, HasRestrictItemEvent, HintMessageExEvent, ImpulseCommandsEvent, IsPenetrableEntityEvent, ItemPostFrameEvent, JoiningThinkEvent, KickBackEvent, KilledEvent, LadderMoveEvent, MakeBomberEvent, MakeVipEvent, MoveEvent, ObjectCapsEvent, ObserverFindNextPlayerEvent, ObserverIsValidTargetEvent, ObserverSetModeEvent, ObserverThinkEvent, OnEventEvent, OnRoundFreezeEndEvent, OnSpawnEquipEvent, PainEvent, PlantBombEvent, PlayStepSoundEvent, PlayerBlindEvent, PlayerDeathThinkEvent, PlayerGotWeaponEvent, PlayerKilledEvent, PlayerSpawnEvent, PmDuckEvent, PmJumpEvent, PostThinkEvent, PreThinkEvent, PrecacheEvent, PrecacheGenericIEvent, PrecacheModelIEvent, PrecacheSoundIEvent, PrintfEvent, RadioEvent, RemoveAllItemsEvent, RemoveGunsEvent, RemovePlayerItemEvent, RemoveSpawnProtectionEvent, ResetMaxSpeedEvent, ResetSequenceInfoEvent, RestartRoundEvent, RoundEndEvent, RoundRespawnEvent, SendDeathMessageEvent, SendResourcesEvent, SendWeaponAnimEvent, ServerDeactivateEvent, SetAnimationEvent, SetClientUserInfoModelEvent, SetClientUserInfoNameEvent, SetModelEvent, SetSpawnProtectionEvent, ShowMenuEvent, ShowVguiMenuEvent, SpawnHeadGibEvent, SpawnRandomGibsEvent, StartDeathCamEvent, StartObserverEvent, StartSoundEvent, SwitchTeamEvent, TakeDamageEvent, TakeHealthEvent, TeamFullEvent, TeamStackedEvent, ThinkEvent, ThrowFlashbangEvent, ThrowGrenadeEvent, ThrowHeGrenadeEvent, ThrowSmokeGrenadeEvent, TraceAttackEvent, TraceLineEvent, UnDuckEvent, UpdateClientDataEvent, UseEmptyEvent, WaitTillLandEvent, WaterJumpEvent, WriteFullClientUpdateEvent, GameEventMap, GameAnswerMap, Vector } from "~/facade";
// ---cut---
// amxts.config.ts
export default defineConfig({
	modules: ["@amxts/universal-config", "@amxts/menu-core"],
	menus: { file: "myplugin/menu" },     // configs/myplugin/menu.ini
});
```

## Меню в файле

Меню читаются из файла, который называет `menus.file`, — под `configs/` и
без `.ini`: `"menu"`, то есть `configs/menu.ini`, если проект не сказал иначе.
Плагин может указать другой файл сам: `setConfigFile("myplugin/menu")` читает
`configs/myplugin/menu.ini`. Файл читается, когда меню понадобится впервые
(`register(name)` или `show` незнакомого имени).

```ini
[MAIN]
PREFIX = MYPLUGIN_CHAT_PREFIX       ; префикс сообщения "в списке никого"
KEY = {
	EXIT = MYPLUGIN_MENU_EXIT       ; кнопки: ключ перевода или сам текст
	NUMBER = MYPLUGIN_MENU_NUMBER   ; "\y[%d]\w", если словарь не говорит иначе
}

[MAIN_MENU]
TITLE = MYPLUGIN_MENU_MAIN_TITLE
HIDE_BACK = YES
ITEMS = {
	; имя | плейсхолдер | условие | действие | ограничение | сообщение | отступ
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
	; имя | условие | действие | ограничение | сообщение
	"%name%" "" "SWAP_WITH_SPECTATOR" "" ""
}
```

- `TITLE`, `ACTIVE_ON` (меню открывается, только пока условие выполнено),
  `HIDE_BACK`, `HIDE_EXIT`, `TIME` (таймер в секундах), `ON_TIMEOUT`
  (действие, когда он кончился), `LOCKED`, `GLOBAL` (один таймер на всех).
- `A|B` в имени, условии или действии — варианты: показывается первый, чьё
  условие выполнено. `!NAME` переворачивает условие; несколько имён через
  пробел должны выполняться все.
- Условие, ограничение или действие, которое никто не зарегистрировал:
  `ADMIN` и `FLAG_<буквы>` проверяются по доступу игрока; любое другое
  условие не выполнено.
- Встроенные действия: `SHOW_<МЕНЮ>` открывает меню, `CLOSE_MENU` закрывает;
  в строке действий их может быть несколько.
- Плейсхолдеры: `%name%` (текст строки списка), `%target%`, `%time%` и любой
  зарегистрированный.
- Меню-список рисует строку `VIEW` на каждого игрока — или на каждую строку
  своего источника, — пропуская тех, кто не прошёл `FILTER`. Если не осталось
  никого, меню не открывается, а игрок получает сообщение фильтра.

## Для Pawn-плагинов

Плагин menu-core отдаёт Pawn-плагинам 29 нативов menu_core —
`mc_register_action`, `mc_show_menu`, `mc_add_menu_item` и остальные — с
сигнатурами оригинального `menu_core.inc`, поэтому скомпилированные `.amxx`
работают с ним без изменений. Он заменяет menu_core.amxx: тот закомментировать
в `plugins.ini`; `amxts_host.amxx` остаётся на своём месте, последним. Меню он
читает через `@amxts/universal-config`, поэтому в `plugins.ini` amxts
universal-config стоит раньше — его туда ставит сборка.

Pawn-плагин называет свои обработчики именем public, и menu-core зовёт их
через callfunc; id плагина берётся из вызова натива.

Сгенерированный `menu_core.inc` (при выкладке он копируется в
`addons/amxmodx/scripting/include` сервера) отличается от оригинала только
записью, а не тем, что передаёт скомпилированный плагин:

| оригинал | сгенерированный |
| --- | --- |
| `#define MP_LOCKED 0` ... `MP_FILTER 7` | `enum MenuProperty { MP_LOCKED = 0, ... }` |
| `property` в трёх нативах свойств | `MenuProperty:property` |
| `mc_get_menu_property_string(menuIdx, property, value[], len)` | `..., out[], len)` |
| `mc_add_list_text(Array:aItems, ...)` | `mc_add_list_text(aItems, ...)` |
| — | `mc_get_menu_text(id, out[], len)`: что показывает меню игрока, добавлено в amxts для тестов и логов |

Плагин, собранный с новым include, получит предупреждение о теге на голое
число там, где ждут `MenuProperty:`, и на `Array:` в `mc_add_list_text`.

## Чем отличается от оригинала

- Нет ограничений Pawn: имена, заголовки и плейсхолдеры любой длины, меню
  держит все пункты, путь назад любой длины, меню длиннее 500 байт (кириллица
  доходит до них быстро) приходит целиком.
- `mc_get_menu_property_string(idx, MP_SECTION)` работает: оригинал сравнивал
  `MP_SECTION` из include (5) с 4.
- Фильтр условия работает везде, где условие спрашивают, как написано в
  `menu_core.inc`; оригинал применял его только к ограничениям.
- `message` ограничения (`mc_register_restriction`) показывается у пункта,
  который оно гасит, если у пункта нет своего сообщения; оригинал хранил его и
  не показывал.
- Когда меню закрывается, потому что поверх открылось другое, обработчики
  закрытия получают его имя; оригинал передавал "".
- Заблокированное меню гасит пункты любого меню; оригинал гасил только строки
  списков.
- `mc_show_menu` секции, которую никто не зарегистрировал, читает её из файла.
- `isCritical` у `mc_register_action` принимается и ничего не делает, как в
  оригинале.

## Тесты

`installMenus(server)` из той же библиотеки для тестов, что и `loadPlugin`
([Тесты](/ru/docs/testing)), вызванный до загрузки плагинов, даёт поддельному
серверу меню, клавиши, поддельные Pawn-плагины и словарь:

```ts twoslash locale-ru
import { hostIndex, handled, outcome, floatCell, rounded, cellFloat, ret, publicFor, nativeFn, arg, argText, argc, caller, setArg, setArgText, argString, cellsToString, stringToCells, cells, out, text, arrayOf, cell, putCell, noOrigin, hasModule, readText, playerIds, accessOf, paint, print, cmd, cmdWide, setTimeout, sleep, setInterval, clearTimeout, clearInterval, hook, ham, plugin, defineModule, createCellArray, destroyCellArray, cellArrayRows, pushCellArrayRow, cellsText, textCells, showMenu, Handler, WideHandler, Float, CellArray, CellBuffer, TEXT_MAX, Team, WeaponName, ItemName, PlayerFilter, ModuleName, KillOptions, Client, Player, CommandHandler, CommandOptions, ServerCommandHandler, HudOptions, HudEffect, HudLine, FadeDirection, FadeOptions, ShakeOptions, StatusIconState, Screen, CvarChangeEvent, CvarListener, Cvar, Server, server, Game, RoundWinner, EndRoundOptions, game, Variant, VariantName, Flag, Entity, Weapon, WeaponKind, weaponKindOf, Target, swapTeam, cvar, TimerHandler, SleepOptions, Call, PluginInfo, ModuleOptions, ForwardStop, NoArgument, Forward, Storage, EntityFilter, PawnFunction, PawnCall, addServerListener, removeServerListener, PluginInitEvent, PluginPauseEvent, PluginUnpauseEvent, ServerChangelevelEvent, PluginCfgEvent, PluginEndEvent, PluginLogEvent, PluginPrecacheEvent, ClientInfochangedEvent, ClientConnectEvent, ClientConnectexEvent, ClientAuthorizedEvent, ClientDisconnectEvent, ClientDisconnectedEvent, ClientRemoveEvent, ClientCommandEvent, ClientPutinserverEvent, InconsistentFileEvent, PluginModulesEvent, OnConfigsExecutedEvent, OnAutoConfigsBufferedEvent, CS_InternalCommandEvent, CS_OnBuyAttemptEvent, CS_OnBuyEvent, PfnTouchEvent, ServerFrameEvent, ClientKillEvent, Client_PreThinkEvent, Client_PostThinkEvent, ClientImpulseEvent, ClientCmdStartEvent, PfnThinkEvent, PfnPlaybackeventEvent, PfnKeyvalueEvent, PfnSpawnEvent, ServerEventMap, flagList, FlagFamily, FlagStore, EntvarFlags, MemberFlags, FlagList, HideHud, HIDE_HUD, Button, BUTTON, Effect, EFFECT, EntityFlag, ENTITY_FLAG, Damage, DAMAGE, Access, ACCESS, addGameListener, removeGameListener, HookEvent, HookEntry, RewardReason, ResourceType, TeamChoice, ItemRestriction, BotEvent, RoundEndReason, DeathMessageFlag, KillRarity, VguiMenu, ActivateServerEvent, AddAccountEvent, AddMultiDamageEvent, AddPlayerItemEvent, AddPointsEvent, AddPointsToTeamEvent, AddResourceEvent, AirAccelerateEvent, AirMoveEvent, AllocEvent, AllowPhysentEvent, ApplyMultiDamageEvent, BalanceTeamsEvent, BasePlayerDuckEvent, BasePlayerJumpEvent, BasePlayerSpawnEvent, BlindEvent, BounceGibTouchEvent, BuyGunAmmoEvent, BuyItemEvent, BuyWeaponByWeaponIdEvent, CanDeployEvent, CanHavePlayerItemEvent, CanPlayerHearPlayerEvent, CanSwitchTeamEvent, ChangeLevelEvent, CheckMapConditionsEvent, CheckTimeBasedDamageEvent, CheckUserInfoEvent, CheckWaterJumpEvent, CheckWinConditionsEvent, ChooseAppearanceEvent, ChooseTeamEvent, ClassifyEvent, CleanUpMapEvent, ClearMultiDamageEvent, ClientConnectedEvent, ClientPrintfEvent, ClientUserInfoChangedEvent, ConnectClientEvent, CreateWeaponBoxEvent, DeadPlayerWeaponsEvent, DeathNoticeEvent, DeathSoundEvent, DefaultDeployEvent, DefaultReloadEvent, DefaultShotgunReloadEvent, DefuseBombEndEvent, DefuseBombStartEvent, DirectSetEvent, DisappearEvent, DropClientEvent, DropIdlePlayerEvent, DropPlayerItemEvent, DropShieldEvent, EmitPingsEvent, EntSelectSpawnPointEvent, ExecuteServerStringCmdEvent, ExplodeBombEvent, ExplodeFlashbangEvent, ExplodeHeGrenadeEvent, ExplodeSmokeGrenadeEvent, FPlayerCanRespawnEvent, FPlayerCanTakeDamageEvent, FShouldSwitchWeaponEvent, FireBuckshotsEvent, FireBulletsEvent, FireBullets3Event, FlPlayerFallDamageEvent, FreeEvent, GetEntityInitEvent, GetForceCameraEvent, GetIntoGameEvent, GetNextBestWeaponEvent, GetPlayerSpawnSpotEvent, GibSpawnEvent, GiveAmmoEvent, GiveC4Event, GiveDefaultItemsEvent, GiveNamedItemEvent, GiveShieldEvent, GoToIntermissionEvent, HasRestrictItemEvent, HintMessageExEvent, ImpulseCommandsEvent, IsPenetrableEntityEvent, ItemPostFrameEvent, JoiningThinkEvent, KickBackEvent, KilledEvent, LadderMoveEvent, MakeBomberEvent, MakeVipEvent, MoveEvent, ObjectCapsEvent, ObserverFindNextPlayerEvent, ObserverIsValidTargetEvent, ObserverSetModeEvent, ObserverThinkEvent, OnEventEvent, OnRoundFreezeEndEvent, OnSpawnEquipEvent, PainEvent, PlantBombEvent, PlayStepSoundEvent, PlayerBlindEvent, PlayerDeathThinkEvent, PlayerGotWeaponEvent, PlayerKilledEvent, PlayerSpawnEvent, PmDuckEvent, PmJumpEvent, PostThinkEvent, PreThinkEvent, PrecacheEvent, PrecacheGenericIEvent, PrecacheModelIEvent, PrecacheSoundIEvent, PrintfEvent, RadioEvent, RemoveAllItemsEvent, RemoveGunsEvent, RemovePlayerItemEvent, RemoveSpawnProtectionEvent, ResetMaxSpeedEvent, ResetSequenceInfoEvent, RestartRoundEvent, RoundEndEvent, RoundRespawnEvent, SendDeathMessageEvent, SendResourcesEvent, SendWeaponAnimEvent, ServerDeactivateEvent, SetAnimationEvent, SetClientUserInfoModelEvent, SetClientUserInfoNameEvent, SetModelEvent, SetSpawnProtectionEvent, ShowMenuEvent, ShowVguiMenuEvent, SpawnHeadGibEvent, SpawnRandomGibsEvent, StartDeathCamEvent, StartObserverEvent, StartSoundEvent, SwitchTeamEvent, TakeDamageEvent, TakeHealthEvent, TeamFullEvent, TeamStackedEvent, ThinkEvent, ThrowFlashbangEvent, ThrowGrenadeEvent, ThrowHeGrenadeEvent, ThrowSmokeGrenadeEvent, TraceAttackEvent, TraceLineEvent, UnDuckEvent, UpdateClientDataEvent, UseEmptyEvent, WaitTillLandEvent, WaterJumpEvent, WriteFullClientUpdateEvent, GameEventMap, GameAnswerMap, Vector } from "~/facade";
// ---cut---
const server = new FakeServer({ files });
const menus = installMenus(server);
const admin = menus.pawnPlugin("admin.amxx", {
	OnKick: (_id: number, target: number) => kicked.push(target),
	Hp: (_id: number, _target: number, value: PawnArray) => value.set("100"),
});
await server.load("@amxts/universal-config");
await server.load("@amxts/menu-core");
server.start();

admin.native("mc_register_action", "KICK", "OnKick");      // вызов из admin.amxx
admin.native("mc_show_menu", player.id, "LIST_KICK");
menus.screen(player)?.text;                                  // что он видит, и клавиши
menus.press(player, 1);
menus.translate({ MYPLUGIN_MENU_EXIT: "Выход" });
```
