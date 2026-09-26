// The playground's starter plugins. Each is a whole plugin made of the
// framework's own code: as/hello.ts, and the snippets its docs show for
// timers (plugin), menus (the menu-core page) and events (hooks).

export interface Example {
  key: 'hello' | 'timer' | 'menu' | 'events'
  code: string
}

export const examples: Example[] = [
  {
    key: 'hello',
    code: `import { Player, plugin, print, server } from "~/facade";

plugin({
\tname: "Hello",
\tversion: "1.0.0",
\tauthor: "you",
\tdescription: "An example to edit",
});

server.addCommand("/hp", sayHp, { description: "Show health" });

// The event's type comes from its name: \`event.player\` is a Player. A listener
// is a closure, as in JavaScript: it may use the variables around it.
server.addEventListener("putinserver", (event) => {
\tconst player = event.player;

\tconsole.log(\`\${player.name} connected\`);
\tprint(0, \`\${player.name} joined\`);
\tprint(player, "Welcome to the server!");
});

// Declared below what uses it, the way a TypeScript file reads.
function sayHp(player: Player) {
\tprint(player, \`\${player.name}, your HP: \${player.health}\`);

\tif (player.health < 50) {
\t\tplayer.health = 100;
\t\tprint(player, "Health restored!", "center");
\t}
}
`,
  },
  {
    key: 'timer',
    code: `import { Player, clearInterval, plugin, print, server, setInterval, setTimeout } from "~/facade";

plugin({
\tname: "Timers",
\tversion: "1.0.0",
\tauthor: "you",
\tdescription: "setTimeout and setInterval, as in the browser",
});

// Every 30 s, a line to everyone.
setInterval(() => print(0, "Say /countdown"), 30000);

server.addCommand("/countdown", countdown);

// A timer's function may use the variables around it: \`left\` is shared.
function countdown(player: Player) {
\tlet left = 3;
\tconst ticking = setInterval(() => {
\t\tprint(player, \`\${left}\`);
\t\tif (--left == 0) {
\t\t\tclearInterval(ticking);
\t\t\tsetTimeout(() => print(player, "Go!"), 1000);
\t\t}
\t}, 1000);
}
`,
  },
  {
    key: 'menu',
    code: `import { plugin, server } from "@amxts/core";
import * as menus from "@amxts/menu-core";

plugin({
\tname: "Shop",
\tversion: "1.0.0",
\tauthor: "you",
\tdescription: "A menu built in code with menu-core",
});

const shop = menus.create("SHOP", { title: "Shop" });
shop.addPlaceholder("hp", (player) => \`\${player.health}\`);

shop.addItem("Heal (%hp% HP)", {
\tvisible: (player) => player.health < 100,
\tonSelect: (player) => {
\t\tplayer.health = 100;
\t},
});
shop.addItem("Reset score", {
\tonSelect: (player) => {
\t\tplayer.frags = 0;
\t},
});
shop.addItem("Close", { action: "CLOSE_MENU", spaceBefore: 1 });

server.addCommand("/shop", (player) => {
\tshop.show(player);
});
`,
  },
  {
    key: 'events',
    code: `import { game, plugin, print, server } from "~/facade";

plugin({
\tname: "Events",
\tversion: "1.0.0",
\tauthor: "you",
\tdescription: "Server events and the game's hookchains",
});

// AMX Mod X's events: a player joins.
server.addEventListener("putinserver", (event) => {
\tprint(0, \`\${event.player.name} joined\`);
});

// reapi hookchains: players hear only their own team, fall damage is halved.
game.addEventListener("canPlayerHearPlayer", (event) => event.listener.team == event.sender.team);
game.addEventListener("flPlayerFallDamage", (event) => event.result / 2, true);
`,
  },
]
