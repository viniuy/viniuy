'use client'

import { useState, useEffect, useRef } from 'react'
import PortfolioPreview from './PortfolioPreview'

type Phase = 'idle' | 'building' | 'done'

const BUILD_STEPS = [
  { delay: 0,    text: '▶  Starting dev server...', color: '#4ec9b0' },
  { delay: 400,  text: '   Compiling TypeScript...', color: '#858585' },
  { delay: 900,  text: '   Bundling modules (Next.js)...', color: '#858585' },
  { delay: 1400, text: '   Building pages...', color: '#858585' },
  { delay: 1900, text: '   Optimizing assets...', color: '#858585' },
  { delay: 2300, text: '✓  Compiled successfully in 2.3s', color: '#4ec9b0' },
  { delay: 2700, text: '   Local: http://localhost:3000', color: '#569cd6' },
  { delay: 3000, text: '', color: '' },
]

interface TermLine {
  text: string
  color: string
}

interface RunButtonProps {
  onBuildLines: (lines: TermLine[]) => void
  onBuildStart: () => void
}

export default function RunButton({ onBuildLines, onBuildStart }: RunButtonProps) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [showPreview, setShowPreview] = useState(false)
  const [hovering, setHovering] = useState(false)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  function clearTimers() {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  function handleRun() {
    if (phase === 'building') return
    if (phase === 'done') {
      setShowPreview(true)
      return
    }

    setPhase('building')
    onBuildStart()
    clearTimers()

    const accumulated: TermLine[] = []

    BUILD_STEPS.forEach((step, i) => {
      const t = setTimeout(() => {
        if (step.text) {
          accumulated.push({ text: step.text, color: step.color })
          onBuildLines([...accumulated])
        }
        if (i === BUILD_STEPS.length - 1) {
          setPhase('done')
          setTimeout(() => setShowPreview(true), 300)
        }
      }, step.delay)
      timersRef.current.push(t)
    })
  }

  useEffect(() => () => clearTimers(), [])

  const label =
    phase === 'idle'     ? '▶  Run'       :
    phase === 'building' ? '◌  Building…' :
    '⚡ View Live'

  const bg =
    phase === 'idle'     ? '#23d18b' :
    phase === 'building' ? '#3a3a3a' :
    '#007acc'

  const textColor =
    phase === 'building' ? '#858585' : '#fff'

  return (
    <>
      {/* Floating run button */}
      <button
        id="run-button-area"
        onClick={handleRun}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        disabled={phase === 'building'}
        style={{
          position: 'absolute',
          top: '12px',
          right: phase === 'done' ? '80px' : '16px',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 14px',
          background: bg,
          border: 'none',
          borderRadius: '4px',
          color: textColor,
          fontSize: '12px',
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          fontWeight: 600,
          cursor: phase === 'building' ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          transform: hovering && phase !== 'building' ? 'translateY(-1px)' : 'none',
          boxShadow: hovering && phase !== 'building'
            ? `0 4px 12px ${phase === 'done' ? '#007acc44' : '#23d18b44'}`
            : 'none',
          whiteSpace: 'nowrap',
        }}
        title={phase === 'done' ? 'View your live portfolio' : 'Run the portfolio'}
      >
        {label}
      </button>

      {/* Preview overlay */}
      {showPreview && (
        <PortfolioPreview onClose={() => setShowPreview(false)} />
      )}
    </>
  )
}