import { useId } from 'react'

// Deterministic PRNG so server and client render identical "eyes"
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function makeHoles(seed: number, count: number) {
  const rand = mulberry32(seed)
  return Array.from({ length: count }, () => {
    const a = rand() * Math.PI * 2
    const r = Math.sqrt(rand()) * 88
    return {
      cx: +(100 + Math.cos(a) * r).toFixed(2),
      cy: +(100 + Math.sin(a) * r).toFixed(2),
      r: +(0.8 + rand() * 1.8).toFixed(2),
    }
  })
}

const HOLES = makeHoles(7, 260)

const STEWS = [
  { cx: 100, cy: 100, r: 26, from: '#c9452a', to: '#8f2a16', label: 'Doro wat' },
  { cx: 62, cy: 70, r: 18, from: '#e6b13a', to: '#c68a1c', label: 'Kik alicha' },
  { cx: 140, cy: 68, r: 18, from: '#6f9a45', to: '#456b26', label: 'Gomen' },
  { cx: 58, cy: 132, r: 17, from: '#d97a2b', to: '#a8511a', label: 'Misir wat' },
  { cx: 142, cy: 134, r: 17, from: '#f2e3c4', to: '#d8c39a', label: 'Ayib' },
  { cx: 100, cy: 156, r: 14, from: '#b5562e', to: '#7a3317', label: 'Shiro' },
]

export default function InjeraArt({
  stews = false,
  className,
}: {
  stews?: boolean
  className?: string
}) {
  const id = useId().replace(/:/g, '')

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label={stews ? 'Injera platter with traditional stews' : 'Injera'}
    >
      <defs>
        <radialGradient id={`base-${id}`} cx="40%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#f6e2bf" />
          <stop offset="65%" stopColor="#e5c391" />
          <stop offset="100%" stopColor="#c99a62" />
        </radialGradient>
        {STEWS.map((s, i) => (
          <radialGradient key={i} id={`stew-${i}-${id}`} cx="35%" cy="30%" r="80%">
            <stop offset="0%" stopColor={s.from} />
            <stop offset="100%" stopColor={s.to} />
          </radialGradient>
        ))}
      </defs>

      <circle cx="100" cy="100" r="96" fill={`url(#base-${id})`} />
      <circle cx="100" cy="100" r="96" fill="none" stroke="#b9874d" strokeOpacity=".35" strokeWidth="3" />

      {HOLES.map((h, i) => (
        <circle key={i} cx={h.cx} cy={h.cy} r={h.r} fill="#a8783f" fillOpacity=".38" />
      ))}

      {stews &&
        STEWS.map((s, i) => (
          <g key={i}>
            <ellipse cx={s.cx + 2} cy={s.cy + 3} rx={s.r} ry={s.r * 0.92} fill="#000" fillOpacity=".12" />
            <ellipse cx={s.cx} cy={s.cy} rx={s.r} ry={s.r * 0.92} fill={`url(#stew-${i}-${id})`} />
            <ellipse
              cx={s.cx - s.r * 0.3}
              cy={s.cy - s.r * 0.35}
              rx={s.r * 0.35}
              ry={s.r * 0.18}
              fill="#fff"
              fillOpacity=".35"
            />
          </g>
        ))}
    </svg>
  )
}
