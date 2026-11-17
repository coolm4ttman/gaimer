// Pages that use the dark palette (home, games, pricing, beta, login). The nav and footer read this to match.
export function isDarkRoute(pathname: string) {
  return pathname === '/' || pathname === '/pricing' || pathname === '/beta' || pathname === '/login' || pathname === '/games' || pathname.startsWith('/games/')
}
