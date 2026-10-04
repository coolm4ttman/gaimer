import { useEffect, useRef, useState } from 'react'

// Muted, looping YouTube background for the hero. Starts (and loops back to) START seconds in.
// Source: IGN, "nopixel V - Official Gameplay Trailer". Third-party footage: check usage rights before launch.
const VIDEO_ID = 's9JJlpY17JE'
const START = 5

type YTPlayer = { mute(): void; playVideo(): void; seekTo(s: number, allowSeekAhead: boolean): void; destroy(): void }
type YTNamespace = {
  Player: new (el: HTMLElement, opts: object) => YTPlayer
  PlayerState: { ENDED: number; PLAYING: number }
}
declare global {
  interface Window {
    YT?: YTNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

function loadYouTubeApi(): Promise<YTNamespace> {
  return new Promise((resolve) => {
    if (window.YT?.Player) return resolve(window.YT)
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      prev?.()
      resolve(window.YT!)
    }
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const s = document.createElement('script')
      s.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(s)
    }
  })
}

export function HeroVideo() {
  const mount = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let player: YTPlayer | null = null
    let cancelled = false
    loadYouTubeApi().then((YT) => {
      if (cancelled || !mount.current) return
      player = new YT.Player(mount.current, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          start: START,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: (e: { target: YTPlayer }) => {
            e.target.mute()
            e.target.playVideo()
          },
          onStateChange: (e: { data: number; target: YTPlayer }) => {
            if (e.data === YT.PlayerState.PLAYING) setPlaying(true)
            // YouTube's own loop restarts at 0, so loop back to START by hand.
            if (e.data === YT.PlayerState.ENDED) {
              e.target.seekTo(START, true)
              e.target.playVideo()
            }
          },
        },
      })
    })
    return () => {
      cancelled = true
      player?.destroy()
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden bg-[#0d0b14]">
      {/* Poster for when autoplay is blocked (common on phones) or motion is reduced. */}
      <img
        src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
        alt=""
        className="absolute inset-0 size-full object-cover"
      />
      {/* Oversized 16:9 box so the video always covers the hero (like object-fit: cover), scaled up to crop YouTube's title bar and buttons. */}
      <div
        className={`absolute top-1/2 left-1/2 h-[max(56.25vw,100%)] w-[max(100%,177.78dvh)] -translate-x-1/2 -translate-y-1/2 scale-[1.35] transition-opacity duration-1000 [&>iframe]:size-full ${
          playing ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div ref={mount} />
      </div>
      {/* Darken for legible text, fading into the page at the bottom. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(13_11_20/0.25)_0%,rgb(13_11_20/0.55)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-page" />
    </div>
  )
}
