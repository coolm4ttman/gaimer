// Game-page content: example mods you could build in each game, and how GAIMER fits that game's modding toolchain.
// GTA V and RDR2 share the Cfx.re workflow (FiveM / RedM Lua resources tested on a real server).
// PLACEHOLDER: only GTA V (via FiveM) is live in GAIMER today; the other games describe the intended workflow.

export interface ModIdea {
  tag: string
  prompt: string
  result: string
  image: string // game screenshot that shows the kind of thing the mod adds (sources in public/games/SOURCES.md)
  focus?: string // object-position for the crop
  contain?: boolean // cut-out art (transparent PNG) shown whole on a sky gradient
}

export interface GameShowcase {
  intro: string
  ideas: ModIdea[]
  toolchain: {
    body: string
    rows: [string, string][]
    files: string[]
  }
}

export const gameShowcase: Record<string, GameShowcase> = {
  'gta-v': {
    intro: 'Jobs, businesses, chases and whole new systems for Los Santos, built as FiveM resources you can run on any server.',
    ideas: [
      { tag: 'Job', prompt: 'Add a taxi side job with tips and star ratings.', result: 'Shifts, fares across the city, tips for smooth driving and a rating saved per ride.', image: '/games/mods/gta-v-1.jpg' },
      { tag: 'Business', prompt: 'Let players run a food truck with a supplier and a rush hour.', result: 'Buy stock, cook on the go, sell at marked spots and earn 1.5× from 18:00 to 21:00.', image: '/app/viewport-beach.jpg' },
      { tag: 'Police', prompt: 'Make police chases smarter and harder to escape.', result: 'Units cut you off at junctions, call in a helicopter after two minutes and search your last seen spot.', image: '/games/mods/gta-v-3.jpg' },
      { tag: 'Mechanic', prompt: 'Add a grappling hook that works on rooftops.', result: 'Aim and press E to zip to any ledge within 40 m, with a cooldown and rope physics.', image: '/games/mods/gta-v-4.jpg' },
      { tag: 'World', prompt: 'Build an impound lot with a tow truck job.', result: 'A fenced lot, a dispatch desk and tow calls that pay when you drop a car at the gate.', image: '/app/viewport-impound.jpg' },
      { tag: 'Economy', prompt: 'Add a stock market that reacts to what players do.', result: 'Prices move with sales, robberies and jobs completed, with a phone app to trade.', image: '/games/mods/gta-v-6.jpg' },
    ],
    toolchain: {
      body: 'GAIMER builds GTA V mods as native FiveM resources, tests them on a real FiveM server and opens the scene in the GTA world editor.',
      rows: [
        ['Writes', 'Lua'],
        ['Framework', 'FiveM'],
        ['Tested on', 'A licensed FiveM test server'],
        ['You get', 'A resource folder (.zip)'],
        ['Install', 'Copy to resources/, add ensure to server.cfg'],
      ],
      files: ['fxmanifest.lua', 'client.lua', 'server.lua', 'config.lua'],
    },
  },
  minecraft: {
    intro: 'New mobs, blocks, dimensions and game modes, built as Fabric mods that run in single player or on your own server.',
    ideas: [
      { tag: 'Mob', prompt: 'Create a mob that steals torches at night.', result: 'Torch Thieves spawn after dark, grab the nearest torch and flee anything brighter than light level 10.', image: '/games/cards/minecraft-1.png', contain: true },
      { tag: 'Multiplayer', prompt: 'Add a co-op base building mode.', result: 'Shared claims, a team storage chest and build permissions you set per friend.', image: '/games/cards/minecraft-3.png', contain: true },
      { tag: 'Farming', prompt: 'Make crops grow faster near water.', result: 'Crops within four blocks of water grow 50% faster, with a particle so you can see it working.', image: '/games/heroes/minecraft.jpg', focus: '20% 70%' },
      { tag: 'Block', prompt: 'Add a block that launches you into the air.', result: 'A Spring Pad crafted from slime and pistons, with a launch height you can set with redstone.', image: '/games/cards/minecraft-2.png', contain: true },
      { tag: 'Dimension', prompt: 'Make a floating island dimension.', result: 'A new portal, sky islands with their own ores and a boss at the highest island.', image: '/games/heroes/minecraft.jpg', focus: '85% 30%' },
      { tag: 'Item', prompt: 'Add a backpack that keeps items on death.', result: 'A craftable backpack with 18 slots that stays with you when you respawn.', image: '/games/heroes/minecraft.jpg', focus: '55% 60%' },
    ],
    toolchain: {
      body: 'GAIMER writes Fabric mods in Java, builds them with Gradle and runs game tests in a Fabric dev client before you play.',
      rows: [
        ['Writes', 'Java, plus models, loot tables and lang files'],
        ['Framework', 'Fabric (Forge and NeoForge planned)'],
        ['Tested in', 'A Fabric dev client with game tests'],
        ['You get', 'A mod .jar'],
        ['Install', 'Drop into .minecraft/mods'],
      ],
      files: ['fabric.mod.json', 'TorchThiefEntity.java', 'FleeLightGoal.java', 'en_us.json'],
    },
  },
  skyrim: {
    intro: 'Quests, perks, loot and survival systems that fit Skyrim’s records and your load order.',
    ideas: [
      { tag: 'Loot', prompt: 'Make dragons drop legendary loot.', result: 'Every dragon carries a legendary item from a new leveled list, rarer on lower difficulties.', image: '/games/heroes/skyrim.jpg' },
      { tag: 'Survival', prompt: 'Add a hunger and fatigue system.', result: 'Eat and sleep or lose stamina regen, with effects shown in the active effects menu.', image: '/games/mods/skyrim-2.jpg' },
      { tag: 'Perks', prompt: 'Rebalance the archery perk tree.', result: 'Steadier zoom, faster draw at higher ranks and a new perk for headshot damage.', image: '/games/mods/skyrim-3.jpg' },
      { tag: 'Quest', prompt: 'Add a bounty hunter quest line in Riften.', result: 'A new giver at the Bee and Barb, five bounties and a unique bow as the reward.', image: '/games/mods/skyrim-4.jpg' },
      { tag: 'Followers', prompt: 'Let followers carry more and level with me.', result: 'Followers scale to your level and carry an extra 150 weight.', image: '/games/mods/skyrim-5.jpg' },
      { tag: 'World', prompt: 'Make wolves hunt in packs at night.', result: 'Wolves spawn in packs of three to five after dark and flank instead of charging.', image: '/games/mods/skyrim-6.jpg' },
    ],
    toolchain: {
      body: 'GAIMER writes Papyrus scripts and plugin records, checks them against your load order and tests them in a save with SKSE.',
      rows: [
        ['Writes', 'Papyrus, plus ESP records'],
        ['Framework', 'SKSE'],
        ['Tested in', 'Skyrim SE with a backed-up test save'],
        ['You get', 'An .esp with compiled scripts'],
        ['Install', 'Mod Organizer 2 or Vortex'],
      ],
      files: ['DragonLoot.esp', 'DragonLoot.psc', 'DragonLootQuest.psc', 'LItemDragonLegendary'],
    },
  },
  'cyberpunk-2077': {
    intro: 'Quickhacks, cyberware, perks and street life for Night City, hot-reloaded into your running game.',
    ideas: [
      { tag: 'Perk', prompt: 'Add a netrunner perk that refunds RAM on kills.', result: 'A new Intelligence perk that refunds a quarter of a quickhack’s RAM when it kills.', image: '/games/mods/cyberpunk-2077-1.jpg' },
      { tag: 'Cyberware', prompt: 'Add cyberware that slows time when I dodge.', result: 'Reflex Weave slows time to 30% for two seconds after a perfect dodge.', image: '/games/mods/cyberpunk-2077-2.jpg' },
      { tag: 'World', prompt: 'Make traffic react to gunfire.', result: 'Drivers swerve, abandon cars or floor it when shots ring out nearby.', image: '/games/mods/cyberpunk-2077-3.jpg' },
      { tag: 'Quickhack', prompt: 'Add a quickhack that turns turrets on their owners.', result: 'Override Turret, with a RAM cost and cooldown that scale with turret level.', image: '/games/mods/cyberpunk-2077-4.jpg' },
      { tag: 'Vehicles', prompt: 'Let me call any car I’ve driven to my location.', result: 'Every car you drive is saved to a garage list in your phone’s vehicle menu.', image: '/games/mods/cyberpunk-2077-5.jpg' },
      { tag: 'Economy', prompt: 'Make fixers pay more for stealthy gigs.', result: 'Gigs finished undetected pay 40% more, shown in the gig summary.', image: '/games/mods/cyberpunk-2077-6.jpg' },
    ],
    toolchain: {
      body: 'GAIMER writes redscript for game logic and TweakXL records for stats, then hot-reloads them into your game.',
      rows: [
        ['Writes', 'redscript, plus TweakXL YAML'],
        ['Framework', 'REDmod, redscript, TweakXL'],
        ['Tested in', 'Your running game, hot-reloaded'],
        ['You get', 'A zip in the game’s folder layout'],
        ['Install', 'Extract into the game folder or use Vortex'],
      ],
      files: ['NetrunnerPerks.reds', 'RamRefund.reds', 'NetrunnerPerks.yaml', 'en-us.json'],
    },
  },
  'fallout-4': {
    intro: 'Settlements, companions, power armor and survival systems for the Commonwealth, built to fit your load order.',
    ideas: [
      { tag: 'Settlements', prompt: 'Let settlers run shops that earn caps while I’m away.', result: 'Assign a settler to any shop stall and it earns caps each day, collected from a new terminal.', image: '/games/mods/fallout-4-1.jpg' },
      { tag: 'Companions', prompt: 'Make Dogmeat find loot and bring it back.', result: 'Send Dogmeat to scavenge and he returns with ammo, junk or the odd rare item.', image: '/games/mods/fallout-4-2.jpg' },
      { tag: 'Power armor', prompt: 'Add a jetpack upgrade that lasts longer.', result: 'A new Hover Pack mod for power armor with twice the burn time and a slower fall.', image: '/games/mods/fallout-4-3.jpg' },
      { tag: 'Survival', prompt: 'Add radiation storms that roll in every few days.', result: 'Storms build over an hour, push radiation up outdoors and send creatures into hiding.', image: '/games/mods/fallout-4-4.jpg' },
      { tag: 'Weapons', prompt: 'Add a laser rifle mod that chains to nearby enemies.', result: 'An Arc Capacitor mod that jumps each shot to two more targets for half damage.', image: '/games/mods/fallout-4-5.jpg' },
      { tag: 'Robots', prompt: 'Let me build a Mister Handy to guard my settlement.', result: 'A buildable robot at the workbench that patrols, repairs defences and calls out raids.', image: '/games/mods/fallout-4-6.jpg' },
    ],
    toolchain: {
      body: 'GAIMER writes Papyrus scripts and plugin records, checks them against your load order and tests them in a save with F4SE.',
      rows: [
        ['Writes', 'Papyrus, plus ESP records'],
        ['Framework', 'F4SE'],
        ['Tested in', 'Fallout 4 with a backed-up test save'],
        ['You get', 'An .esp with compiled scripts'],
        ['Install', 'Mod Organizer 2 or Vortex'],
      ],
      files: ['SettlerShops.esp', 'SettlerShops.psc', 'ShopTerminal.psc', 'CapsLedger.psc'],
    },
  },
  'red-dead-redemption-2': {
    intro: 'Jobs, bounties, camps and frontier systems, built as RedM resources the same way GAIMER builds GTA V mods.',
    ideas: [
      { tag: 'Bounties', prompt: 'Add a bounty board in every town.', result: 'Boards in nine towns, with rewards scaled by distance and how dangerous the target is.', image: '/games/mods/red-dead-redemption-2-1.jpg' },
      { tag: 'Horses', prompt: 'Rebalance horse stamina and bonding.', result: 'Stamina drains 30% slower and bonding levels up twice as fast.', image: '/games/mods/red-dead-redemption-2-2.jpg' },
      { tag: 'Job', prompt: 'Add a stagecoach delivery job.', result: 'Pick up parcels in Valentine, deliver across the map and get paid on time bonuses.', image: '/games/mods/red-dead-redemption-2-3.jpg' },
      { tag: 'Camp', prompt: 'Let players build and upgrade a camp.', result: 'Place a tent, fire and storage, then upgrade them with pelts and cash.', image: '/games/mods/red-dead-redemption-2-4.jpg' },
      { tag: 'Hunting', prompt: 'Make legendary animals roam instead of spawning.', result: 'Legendaries move between regions over in-game days, tracked by rumours in saloons.', image: '/games/mods/red-dead-redemption-2-5.jpg' },
      { tag: 'Law', prompt: 'Add a sheriff job that hunts wanted players.', result: 'Sheriffs get a badge, a wanted list and a reward for every outlaw brought in.', image: '/games/heroes/red-dead-redemption-2.jpg', focus: '75% 30%' },
    ],
    toolchain: {
      body: 'GAIMER builds RDR2 mods as native RedM resources, Cfx.re’s sister project to FiveM, and tests them on a real RedM server.',
      rows: [
        ['Writes', 'Lua'],
        ['Framework', 'RedM'],
        ['Tested on', 'A RedM test server'],
        ['You get', 'A resource folder (.zip)'],
        ['Install', 'Copy to resources/, add ensure to server.cfg'],
      ],
      files: ['fxmanifest.lua', 'client.lua', 'server.lua', 'config.lua'],
    },
  },
}
