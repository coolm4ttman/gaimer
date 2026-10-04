import type { PlatformContent } from '../components/Platform'

// Per-game copy for the "One editor" section on each game page.
// PLACEHOLDER: claims about loader support and features describe the intended product; confirm before launch.

const ideaTitle = 'Describe it. Gaimer builds it.'

export const gameContent: Record<string, PlatformContent> = {
  'gta-v': {
    images: [
      { src: '/games/cards/gta-v-1.jpg', alt: 'A red muscle car parked on a Los Santos street' },
      { src: '/games/cards/gta-v-2.jpg', alt: 'A motorbike fleeing police through neon-lit Los Santos' },
      { src: '/games/cards/gta-v-3.jpg', alt: 'The Los Santos skyline at dusk' },
    ],
    heading: 'One editor. Endless GTA V mods.',
    intro:
      'Los Santos is one of the most modded worlds in gaming. Gaimer reads the game’s scripts and natives so you can add missions, vehicles and mechanics to story mode just by describing them.',
    idea: {
      title: ideaTitle,
      body: 'Describe a mission, vehicle or mechanic and Gaimer writes the C# against Script Hook V and the game’s natives.',
      prompt: 'Add a grappling hook to GTA V…',
    },
    refine: {
      title: 'Tune it mid-chase, then ship it',
      body: 'Scripts hot-reload while Los Santos keeps running, so you can tweak your mod mid-chase and package it when ready.',
      mod: 'Rooftop grappling hook',
      detail: 'Hold aim and press E to zip to any ledge within 40 m.',
    },
    stack: {
      title: 'Mod every corner of Los Santos',
      body: 'Script Hook V, ScriptHookVDotNet and OpenIV are handled for you, so your mods can reach anywhere in the city.',
      rows: ['Game natives', 'Script Hook V', 'ScriptHookVDotNet', 'OpenIV archives', 'Save backups', 'Versions', 'Publish'],
      active: 1,
    },
  },
  minecraft: {
    images: [
      { src: '/games/cards/minecraft-1.png', alt: 'Alex fighting a creeper', contain: true },
      { src: '/games/cards/minecraft-2.png', alt: 'Steve running with a pickaxe', contain: true },
      { src: '/games/cards/minecraft-3.png', alt: 'Alex and Steve building with blocks', contain: true },
    ],
    heading: 'One editor. Endless Minecraft mods.',
    intro:
      'From a single new block to a full modpack, Gaimer writes the Java, registers your content and hot-swaps it into a running world.',
    idea: {
      title: ideaTitle,
      body: 'Describe blocks, mobs, biomes or whole dimensions and Gaimer writes the Java and data files for your chosen loader.',
      prompt: 'Make a mob that steals torches at night…',
    },
    refine: {
      title: 'Test it live, then ship it',
      body: 'Try every change in a running world with hot-swapping, then export a ready-to-install jar for your friends or server.',
      mod: 'Torch goblins',
      detail: 'Spawn in dark caves and run off with any torch they can reach.',
    },
    stack: {
      title: 'Mod every block of your world',
      body: 'Fabric, Forge and NeoForge projects are set up for you, with mappings, metadata and version targets taken care of.',
      rows: ['Game index', 'Fabric', 'Forge', 'NeoForge', 'Textures and models', 'Versions', 'Publish'],
      active: 1,
    },
  },
  skyrim: {
    images: [
      { src: '/games/cards/skyrim-1.jpg', alt: 'The Dragonborn fighting in dragon priest armour' },
      { src: '/games/cards/skyrim-2.jpg', alt: 'The Dragonborn walking through Whiterun' },
      { src: '/games/cards/skyrim-3.jpg', alt: 'Snow-covered Nordic ruins in Skyrim' },
    ],
    heading: 'One editor. Endless Skyrim mods.',
    intro:
      'Skyrim modding runs on records, scripts and load orders. Gaimer understands all three, so new quests, perks and loot slot in without breaking your setup.',
    idea: {
      title: ideaTitle,
      body: 'Describe a quest, perk or item and Gaimer writes the Papyrus and plugin records, then checks your load order.',
      prompt: 'Make dragons drop legendary loot…',
    },
    refine: {
      title: 'Try it in Tamriel, then ship it',
      body: 'Load into the game and test straight away, adjust until it feels right, then package a plugin that’s ready to share.',
      mod: 'Dragons drop legendary loot',
      detail: 'Every dragon kill rolls a weighted table of 38 unique weapons.',
    },
    stack: {
      title: 'Mod every corner of Skyrim',
      body: 'SKSE, Papyrus and plugin records are handled for you, with conflict checks across every mod in your load order.',
      rows: ['Plugin records', 'Papyrus scripts', 'SKSE', 'Load order', 'Save backups', 'Versions', 'Publish'],
      active: 3,
    },
  },
  'cyberpunk-2077': {
    images: [
      { src: '/games/cards/cyberpunk-2077-1.jpg', alt: 'A sports car being worked on in a Night City garage' },
      { src: '/games/cards/cyberpunk-2077-2.jpg', alt: 'A police chase through Night City' },
      { src: '/games/cards/cyberpunk-2077-3.jpg', alt: 'Night City streets lit up at night' },
    ],
    heading: 'One editor. Endless Cyberpunk 2077 mods.',
    intro:
      'Night City is built to be bent. Gaimer works with REDmod, Cyber Engine Tweaks and redscript to change how quickhacks, cyberware and the city itself behave.',
    idea: {
      title: ideaTitle,
      body: 'Describe a perk, quickhack or vehicle tweak and Gaimer writes the redscript and Lua, wired into the right systems.',
      prompt: 'Add cyberware that slows time on dodge…',
    },
    refine: {
      title: 'Test it mid-fight, then ship it',
      body: 'Changes reload into your running game, so you can try a quickhack mid-fight and package the mod when it’s ready.',
      mod: 'Slow-mo dodge cyberware',
      detail: 'Dodging at the last moment slows time for two seconds.',
    },
    stack: {
      title: 'Mod every corner of Night City',
      body: 'REDmod, Cyber Engine Tweaks and redscript projects are set up for you, with archive packing and patch checks handled.',
      rows: ['Game index', 'REDmod', 'Cyber Engine Tweaks', 'redscript', 'Archives', 'Versions', 'Publish'],
      active: 2,
    },
  },
  'elden-ring': {
    images: [
      { src: '/games/cards/elden-ring-1.jpg', alt: 'Godrick the Grafted, a boss in Elden Ring' },
      { src: '/games/cards/elden-ring-2.jpg', alt: 'A Tarnished on horseback fighting a dragon' },
      { src: '/games/cards/elden-ring-3.jpg', alt: 'Resting at a Site of Grace under the stars' },
    ],
    heading: 'One editor. Endless Elden Ring mods.',
    intro:
      'The Lands Between run on params, scripts and events. Gaimer edits them safely, so you can rebalance builds, reshape bosses or add co-op mechanics for offline play.',
    idea: {
      title: ideaTitle,
      body: 'Describe a rebalance, new mechanic or boss change and Gaimer finds the right params and scripts and makes the edits.',
      prompt: 'Make every boss drop a unique talisman…',
    },
    refine: {
      title: 'Tune the numbers, then ship it',
      body: 'Test changes offline in your own game, tweak until the fight feels right, then package a mod for ModEngine 2.',
      mod: 'Boss talismans',
      detail: 'Every major boss drops a talisman built around its moveset.',
    },
    stack: {
      title: 'Safe edits, save intact',
      body: 'ModEngine 2 and param editing are handled for you, and every single change is checked before it touches your save.',
      rows: ['Game index', 'Param editing', 'ModEngine 2', 'Event scripts', 'Save backups', 'Versions', 'Publish'],
      active: 1,
    },
  },
  'red-dead-redemption-2': {
    images: [
      { src: '/games/cards/red-dead-redemption-2-1.jpg', alt: 'Two outlaws in a gunfight' },
      { src: '/games/cards/red-dead-redemption-2-2.jpg', alt: 'Riders on horseback at sunset' },
      { src: '/games/cards/red-dead-redemption-2-3.jpg', alt: 'Arthur and the gang crossing snowy mountains' },
    ],
    heading: 'One editor. Endless Red Dead 2 mods.',
    intro:
      'From horse bonding to bounty hunting, Gaimer reads the game’s scripts and natives so you can change how the frontier plays in story mode.',
    idea: {
      title: ideaTitle,
      body: 'Describe a mechanic, job or rebalance and Gaimer writes the script against ScriptHookRDR2 and the game’s natives.',
      prompt: 'Add a bounty board to every town…',
    },
    refine: {
      title: 'Test it on horseback, then ship it',
      body: 'Reload scripts while the game runs, tune them out on the trail, then package a mod ready for Lenny’s Mod Loader.',
      mod: 'Town bounty boards',
      detail: 'Every town gets a board with rotating bounties and rewards.',
    },
    stack: {
      title: 'Mod every corner of the frontier',
      body: 'ScriptHookRDR2 and Lenny’s Mod Loader are handled for you, from snowy peaks to swamps, with your game backed up.',
      rows: ['Game natives', 'ScriptHookRDR2', 'Lenny’s Mod Loader', 'Game files', 'Save backups', 'Versions', 'Publish'],
      active: 1,
    },
  },
}
