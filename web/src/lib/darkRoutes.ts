// Pages that use the dark palette (home, games, pricing). The nav and footer read this to match.
export function isDarkRoute(pathname: string) {
  return pathname === '/' || pathname === '/pricing' || pathname === '/games' || pathname.startsWith('/games/')
}
