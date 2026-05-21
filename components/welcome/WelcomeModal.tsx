'use client'

import { useEffect, useState } from 'react'

const steps = [
  {
    element: '#file-explorer',
    title: '📁 File Explorer',
    description: 'Browse my projects and files here. Click any file to open it in the editor — just like a real codebase.',
  },
  {
    element: '#code-editor',
    title: '💻 Code Editor',
    description: "This is my portfolio — but written as actual code. Each file tells a different part of my story: projects, skills, and personal stuff.",
  },
  {
    element: '#terminal-panel',
    title: '⚡ Terminal',
    description: "This terminal actually works. Type <code>help</code> to see commands, or <code>chat &lt;message&gt;</code> to talk to my AI assistant.",
  },
  {
    element: '#run-button-area',
    title: '▶ Run Button',
    description: 'Hit Run to simulate a build — then a live preview of my portfolio site pops up in a browser window.',
  },
]

interface Props {
  onDismiss: () => void
}

export default function WelcomeModal({ onDismiss }: Props) {
  const [visible, setVisible] = useState(false)
  const [step, setStep] = useState<'welcome' | 'tour' | number>('welcome')
  const [spotlight, setSpotlight] = useState<DOMRect | null>(null)
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number } | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (typeof step === 'number') {
      const el = document.querySelector(steps[step].element)
      if (el) {
        const rect = el.getBoundingClientRect()
        const clipped = new DOMRect(
          rect.left,
          Math.max(rect.top, 0),
          rect.width,
          Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
        )
        setSpotlight(clipped)
        // position tooltip below or above
        const below = rect.bottom + 12 + 160 < window.innerHeight
        setTooltipPos({
          top: below ? rect.bottom + 12 : rect.top - 172,
          left: Math.min(Math.max(rect.left, 12), window.innerWidth - 340),
        })
        el.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      }
    } else {
      setSpotlight(null)
      setTooltipPos(null)
    }
  }, [step])

  function close() {
    setVisible(false)
    setTimeout(onDismiss, 250)
  }

  function startTour() {
    setStep(0)
  }

  function next() {
    if (typeof step === 'number') {
      if (step < steps.length - 1) setStep(step + 1)
      else close()
    }
  }

  function prev() {
    if (typeof step === 'number' && step > 0) setStep(step - 1)
  }

  const isTour = typeof step === 'number'
  const currentStep = isTour ? steps[step as number] : null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        transition: 'opacity 0.25s ease',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {/* Overlay */}
      {!isTour && (
        <div
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)' }}
          onClick={close}
        />
      )}

      {/* Spotlight overlay for tour */}
      {isTour && spotlight && (
        <>
          {/* Top */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: spotlight.top - 6, background: 'rgba(0,0,0,0.72)', pointerEvents: 'none' }} />
          {/* Bottom */}
          <div style={{ position: 'absolute', top: spotlight.bottom + 6, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.72)', pointerEvents: 'none' }} />
          {/* Left */}
          <div style={{ position: 'absolute', top: spotlight.top - 6, left: 0, width: spotlight.left - 6, height: spotlight.height + 12, background: 'rgba(0,0,0,0.72)', pointerEvents: 'none' }} />
          {/* Right */}
          <div style={{ position: 'absolute', top: spotlight.top - 6, left: spotlight.right + 6, right: 0, height: spotlight.height + 12, background: 'rgba(0,0,0,0.72)', pointerEvents: 'none' }} />
          {/* Highlight border */}
          <div style={{
            position: 'absolute',
            top: spotlight.top - 6,
            left: spotlight.left - 6,
            width: spotlight.width + 12,
            height: spotlight.height + 12,
            border: '2px solid #007acc',
            borderRadius: '4px',
            boxShadow: '0 0 0 4px rgba(0,122,204,0.15)',
            pointerEvents: 'none',
          }} />
        </>
      )}

      {/* Welcome card */}
      {step === 'welcome' && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: visible ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -52%) scale(0.96)',
          transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          width: 'min(480px, 92vw)',
          background: '#1e1e1e',
          border: '1px solid #3a3a3a',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        }}>
          {/* Top accent */}
          <div style={{ height: '3px', background: 'linear-gradient(90deg, #007acc, #23d18b)' }} />

          <div style={{ padding: '32px 32px 28px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#007acc', fontFamily: 'monospace', marginBottom: '6px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  vincent-portfolio — v1.0.0
                </div>
                <div style={{ fontSize: '22px', fontWeight: 600, color: '#fff', letterSpacing: '-0.5px' }}>
                  Welcome 👋
                </div>
              </div>
              <button onClick={close} style={{ background: 'transparent', border: 'none', color: '#555', cursor: 'pointer', padding: '4px', borderRadius: '4px', fontSize: '18px', lineHeight: 1 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#555')}>
                ×
              </button>
            </div>

            <p style={{ color: '#9d9d9d', fontSize: '13px', lineHeight: 1.7, marginBottom: '20px', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
              This portfolio is styled as a <span style={{ color: '#569cd6' }}>VS Code editor</span> — my actual dev environment. 
              You can browse files, read code, and use the terminal below.
            </p>

            {/* Quick hints */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
              {[
                { icon: '📁', label: 'Explorer', desc: 'Click files on the left to open them' },
                { icon: '⚡', label: 'Terminal', desc: "Type 'help' in the terminal below" },
                { icon: '▶', label: 'Run', desc: 'Hit the green Run button to see a live preview' },
              ].map((h) => (
                <div key={h.label} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#252526', border: '1px solid #333', borderRadius: '6px', padding: '10px 14px' }}>
                  <span style={{ fontSize: '16px', flexShrink: 0 }}>{h.icon}</span>
                  <div>
                    <div style={{ fontSize: '12px', color: '#fff', fontWeight: 500, marginBottom: '1px' }}>{h.label}</div>
                    <div style={{ fontSize: '11px', color: '#666', fontFamily: 'monospace' }}>{h.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={startTour}
                style={{
                  flex: 1, padding: '10px', background: '#007acc', border: 'none',
                  borderRadius: '6px', color: '#fff', fontSize: '13px', fontWeight: 600,
                  cursor: 'pointer', fontFamily: "'Segoe UI', system-ui, sans-serif",
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#0098ff')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#007acc')}
              >
                Take a Tour →
              </button>
              <button
                onClick={close}
                style={{
                  flex: 1, padding: '10px', background: 'transparent',
                  border: '1px solid #3a3a3a', borderRadius: '6px', color: '#9d9d9d',
                  fontSize: '13px', cursor: 'pointer', fontFamily: "'Segoe UI', system-ui, sans-serif",
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#555'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#3a3a3a'; e.currentTarget.style.color = '#9d9d9d' }}
              >
                Explore Myself
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tour tooltip */}
      {isTour && currentStep && tooltipPos && (
        <div style={{
          position: 'absolute',
          top: tooltipPos.top,
          left: tooltipPos.left,
          width: '320px',
          background: '#252526',
          border: '1px solid #007acc55',
          borderRadius: '8px',
          padding: '16px 18px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          zIndex: 1000,
        }}>
          {/* Step indicator */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ display: 'flex', gap: '5px' }}>
              {steps.map((_, i) => (
                <div key={i} style={{ width: i === step ? '16px' : '6px', height: '6px', borderRadius: '3px', background: i === step ? '#007acc' : '#3a3a3a', transition: 'all 0.2s' }} />
              ))}
            </div>
            <span style={{ fontSize: '10px', color: '#555', fontFamily: 'monospace' }}>
              {(step as number) + 1} / {steps.length}
            </span>
          </div>

          <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>{currentStep.title}</div>
          <div
            style={{ fontSize: '12px', color: '#9d9d9d', lineHeight: 1.6, marginBottom: '14px', fontFamily: "'Segoe UI', system-ui, sans-serif" }}
            dangerouslySetInnerHTML={{ __html: currentStep.description }}
          />

          <div style={{ display: 'flex', gap: '8px' }}>
            {(step as number) > 0 && (
              <button onClick={prev} style={{ padding: '6px 14px', background: 'transparent', border: '1px solid #3a3a3a', borderRadius: '4px', color: '#9d9d9d', fontSize: '11px', cursor: 'pointer', fontFamily: 'inherit' }}>
                ← Back
              </button>
            )}
            <button
              onClick={next}
              style={{ flex: 1, padding: '6px 14px', background: '#007acc', border: 'none', borderRadius: '4px', color: '#fff', fontSize: '11px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#0098ff')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#007acc')}
            >
              {(step as number) === steps.length - 1 ? "Let's go ✓" : 'Next →'}
            </button>
            <button onClick={close} style={{ padding: '6px 10px', background: 'transparent', border: '1px solid #3a3a3a', borderRadius: '4px', color: '#555', fontSize: '11px', cursor: 'pointer', fontFamily: 'inherit' }}>
              Skip
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
