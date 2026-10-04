// Supported games, shared by the logo strip, nav dropdown and game pages.
// Logos and hero art: see public/games/SOURCES.md (publishers' trademarks).
// PLACEHOLDER: loaders and example mods describe what support could look like; confirm before launch.
export interface Game {
  slug: string
  name: string
  short: string
  logo: string
  logoClass: string
  hero: string
  // Hero logo box height; squarer logos need more height to read at the same size.
  heroLogoClass?: string
  loaders: string[]
  blurb: string
  ideas: string[]
}

export const games: Game[] = [
  {
    slug: 'gta-v',
    hero: '/games/heroes/gta-v.jpg',
    heroLogoClass: 'h-[130px] md:h-[190px]',
    name: 'Grand Theft Auto V',
    short: 'GTA V',
    logo: '/games/gta5.svg',
    logoClass: 'h-[72px]',
    loaders: ['ScriptHookV', 'ScriptHookVDotNet', 'OpenIV'],
    blurb: 'Script new missions, vehicles and mechanics into Los Santos, then test them live without restarting the game.',
    ideas: ['Add a grappling hook that works on rooftops', 'Make police chases smarter and harder to escape', 'Build a taxi side job with tips and ratings'],
  },
  {
    slug: 'minecraft',
    hero: '/games/heroes/minecraft.jpg',
    name: 'Minecraft',
    short: 'Minecraft',
    logo: '/games/minecraft.svg',
    logoClass: 'h-7',
    loaders: ['Fabric', 'Forge', 'NeoForge'],
    blurb: 'Describe new blocks, mobs and dimensions and Gaimer writes the Java, registers everything and hot-swaps it in.',
    ideas: ['Add a co-op base building mode', 'Create a mob that steals torches at night', 'Make crops grow faster near water'],
  },
  {
    slug: 'skyrim',
    hero: '/games/heroes/skyrim.jpg',
    name: 'The Elder Scrolls V: Skyrim',
    short: 'Skyrim',
    logo: '/games/skyrim.png',
    logoClass: 'h-12',
    loaders: ['SKSE', 'Papyrus', 'Creation Kit records'],
    blurb: 'Gaimer reads the game’s records and scripts so new quests, perks and loot fit Skyrim’s systems and your load order.',
    ideas: ['Make dragons drop legendary loot', 'Add a survival hunger and fatigue system', 'Rebalance archery perks'],
  },
  {
    slug: 'cyberpunk-2077',
    hero: '/games/heroes/cyberpunk-2077.jpg',
    name: 'Cyberpunk 2077',
    short: 'Cyberpunk 2077',
    logo: '/games/cyberpunk.svg',
    logoClass: 'h-9',
    loaders: ['REDmod', 'Cyber Engine Tweaks', 'redscript'],
    blurb: 'Tweak Night City’s quickhacks, cyberware and vehicles with changes that hot-reload into your running game.',
    ideas: ['Add a new netrunner perk tree', 'Make traffic react to gunfire', 'Create a cyberware that slows time on dodge'],
  },
  {
    slug: 'elden-ring',
    hero: '/games/heroes/elden-ring.jpg',
    name: 'Elden Ring',
    short: 'Elden Ring',
    logo: '/games/eldenring.svg',
    logoClass: 'h-6',
    loaders: ['ModEngine 2', 'Param editing'],
    blurb: 'Rebalance weapons, enemies and co-op with param and script changes that Gaimer checks before they touch your save.',
    ideas: ['Add a co-op revive mechanic', 'Make every boss drop a unique talisman', 'Scale enemies to party size'],
  },
  {
    slug: 'red-dead-redemption-2',
    hero: '/games/heroes/red-dead-redemption-2.jpg',
    name: 'Red Dead Redemption 2',
    short: 'Red Dead 2',
    logo: '/games/rdr2.png',
    logoClass: 'h-14',
    loaders: ['ScriptHookRDR2', 'Lenny’s Mod Loader'],
    blurb: 'Change how the frontier plays, from horse stamina to bounty hunting, without hand-writing a line of script.',
    ideas: ['Rebalance horse stamina and bonding', 'Add a bounty board in every town', 'Make camp upgrades cheaper'],
  },
]
