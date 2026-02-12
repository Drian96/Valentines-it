import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import songFile from '../../assets/song.mp3'

type FlowerConfig = {
  left: number
  scale: number
  delay: number
  hue: number
  sway: number
}

const FLOWERS: FlowerConfig[] = [
  { left: 8, scale: 0.88, delay: 0.1, hue: 0, sway: 5.2 },
  { left: 20, scale: 1.02, delay: 0.65, hue: 12, sway: 5.8 },
  { left: 34, scale: 1.14, delay: 0.25, hue: -8, sway: 6.4 },
  { left: 50, scale: 1.28, delay: 0.4, hue: 5, sway: 6.8 },
  { left: 66, scale: 1.1, delay: 0.9, hue: -12, sway: 5.9 },
  { left: 80, scale: 0.98, delay: 0.3, hue: 16, sway: 5.4 },
  { left: 92, scale: 0.86, delay: 0.75, hue: -4, sway: 5.1 },
]

const PETALS = Array.from({ length: 10 }, (_, index) => index)
const SPARKLES = Array.from({ length: 20 }, (_, index) => index)
const HEARTS = Array.from({ length: 9 }, (_, index) => index)

const styleVars = (flower: FlowerConfig): CSSProperties =>
  ({
    '--left': `${flower.left}%`,
    '--scale': flower.scale,
    '--delay': `${flower.delay}s`,
    '--hue': `${flower.hue}deg`,
    '--sway': `${flower.sway}s`,
  }) as CSSProperties

function FlowerGarden() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const idleTimerRef = useRef<number | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isControlVisible, setIsControlVisible] = useState(true)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) {
      return
    }

    audio.muted = isMuted
  }, [isMuted])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) {
      return
    }

    audio.volume = 0.9
    audio.currentTime = 0

    const playPromise = audio.play()
    if (playPromise) {
      void playPromise.catch(() => {
        // Some browsers block autoplay until a user gesture.
      })
    }

    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, [])

  useEffect(() => {
    const clearIdleTimer = () => {
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current)
      }
    }

    const startIdleTimer = () => {
      clearIdleTimer()
      idleTimerRef.current = window.setTimeout(() => {
        setIsControlVisible(false)
      }, 3000)
    }

    const handleUserActivity = () => {
      setIsControlVisible(true)
      startIdleTimer()
    }

    startIdleTimer()
    window.addEventListener('pointerdown', handleUserActivity)

    return () => {
      clearIdleTimer()
      window.removeEventListener('pointerdown', handleUserActivity)
    }
  }, [])

  const handleToggleMute = () => {
    const nextMuted = !isMuted
    setIsMuted(nextMuted)
    setIsControlVisible(true)

    const audio = audioRef.current
    if (!nextMuted && audio) {
      const playPromise = audio.play()
      if (playPromise) {
        void playPromise.catch(() => {
          // If blocked, user can tap again.
        })
      }
    }
  }

  return (
    <section className="garden">
      <audio ref={audioRef} src={songFile} preload="auto" />
      <button
        className={`audio-toggle ${isControlVisible ? 'is-visible' : 'is-hidden'}`}
        type="button"
        onClick={handleToggleMute}
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
      >
        <span aria-hidden="true">{isMuted ? '🔇' : '🔊'}</span>
      </button>
      <div className="garden-glow" />
      <p className="garden-title">For you, baby</p>

      <div className="sparkle-layer" aria-hidden="true">
        {SPARKLES.map((sparkle) => (
          <span
            className="sparkle"
            key={sparkle}
            style={
              {
                '--sx': `${(sparkle * 17 + 9) % 100}%`,
                '--duration': `${5 + (sparkle % 6)}s`,
                '--delay': `${(sparkle % 5) * 0.5}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="flower-field" aria-hidden="true">
        {FLOWERS.map((flower) => (
          <article className="flower" key={flower.left} style={styleVars(flower)}>
            <div className="flower-head">
              {PETALS.map((petal) => (
                <span
                  className="flower-petal"
                  key={petal}
                  style={{ '--petal-rotation': `${petal * 36}deg` } as CSSProperties}
                />
              ))}
              <span className="flower-core" />
            </div>
            <span className="flower-stem" />
            <span className="flower-leaf flower-leaf-left" />
            <span className="flower-leaf flower-leaf-right" />
          </article>
        ))}
      </div>

      <div className="heart-layer" aria-hidden="true">
        {HEARTS.map((heart) => (
          <span
            className="heart"
            key={heart}
            style={
              {
                '--hx': `${8 + heart * 11}%`,
                '--h-delay': `${(heart % 4) * 0.65}s`,
                '--h-duration': `${6.2 + (heart % 5) * 0.9}s`,
              } as CSSProperties
            }
          >
            ❤
          </span>
        ))}
      </div>
    </section>
  )
}

export default FlowerGarden
