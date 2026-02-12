import type { CSSProperties } from 'react'

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

function FlowerGarden({ name }: { name: string }) {
  return (
    <section className="garden">
      <div className="garden-glow" />
      <p className="garden-title">For you, {name} </p>

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
