'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Sidebar from '@/components/sidebar/Sidebar'
import CodeEditor from '@/components/editor/CodeEditor'
import Terminal from '@/components/terminal/Terminal'
import TabBar from '@/components/tabs/TabBar'
import WelcomeModal from '@/components/welcome/WelcomeModal'
import { RunBuildProvider } from '@/components/editor/RunBuildContext'

type MobileTab = 'explorer' | 'editor' | 'terminal'

const bottomTabs: { id: MobileTab; icon: string; label: string }[] = [
  { id: 'explorer', icon: 'ti-files',    label: 'Explorer' },
  { id: 'editor',   icon: 'ti-code',     label: 'Editor'   },
  { id: 'terminal', icon: 'ti-terminal', label: 'Terminal' },
]

const drawerLinks: { id: MobileTab; icon: string; label: string }[] = [
  { id: 'explorer', icon: 'ti-files',    label: 'Explorer' },
  { id: 'editor',   icon: 'ti-code',     label: 'Editor'   },
  { id: 'terminal', icon: 'ti-terminal', label: 'Terminal' },
]


interface Props {
  showWelcome: boolean
  setShowWelcome: (v: boolean) => void
}

export default function MobileLayout({ showWelcome, setShowWelcome }: Props) {
  const [activeTab, setActiveTab] = useState<MobileTab>('editor')
  const [showMenu, setShowMenu] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const openDrawer  = useCallback(() => setDrawerOpen(true),  [])
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  const [slideDir, setSlideDir] = useState<'left' | 'right'>('right')
  const [animKey, setAnimKey] = useState(0)

  const tabOrder: MobileTab[] = ['explorer', 'editor', 'terminal']

  function switchTab(tab: MobileTab) {
    const from = tabOrder.indexOf(activeTab)
    const to   = tabOrder.indexOf(tab)
    if (tab === activeTab) return
    setSlideDir(to > from ? 'right' : 'left')
    setAnimKey(k => k + 1)
    setActiveTab(tab)
  }

  // Swipe gesture
  const startX = useRef<number | null>(null)

  useEffect(() => {
    function onTouchStart(e: TouchEvent) {
      startX.current = e.touches[0].clientX
    }
    function onTouchEnd(e: TouchEvent) {
      if (startX.current === null) return
      const diff = e.changedTouches[0].clientX - startX.current
      if (Math.abs(diff) < 40) return
      if (diff > 0 && startX.current < 32) openDrawer()   // swipe right from left edge
      else if (diff < 0) closeDrawer()                     // swipe left anywhere
      startX.current = null
    }
    window.addEventListener('touchstart', onTouchStart)
    window.addEventListener('touchend', onTouchEnd)
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [openDrawer, closeDrawer])

  return (
    <RunBuildProvider>
      <div style={{
        display: 'flex', flexDirection: 'column', height: '100dvh',
        overflow: 'hidden', background: '#1e1e1e', color: '#d4d4d4',
        fontFamily: "'Segoe UI', system-ui, sans-serif", fontSize: '13px',
        position: 'relative',
      }}>

        {/* ── Drawer backdrop ── */}
        <div
          onClick={closeDrawer}
          style={{
            position: 'fixed', inset: 0, zIndex: 50,
            background: 'rgba(0,0,0,0.5)',
            opacity: drawerOpen ? 1 : 0,
            pointerEvents: drawerOpen ? 'auto' : 'none',
            transition: 'opacity 0.25s ease',
          }}
        />

        {/* ── Drawer panel ── */}
        <div style={{
          position: 'fixed', top: 0, left: 0, bottom: 0,
          width: '72vw', maxWidth: '260px',
          background: '#252526',
          borderRight: '1px solid #3a3a3a',
          zIndex: 60,
          transform: drawerOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
          display: 'flex', flexDirection: 'column',
          boxShadow: drawerOpen ? '8px 0 32px rgba(0,0,0,0.5)' : 'none',
          willChange: 'transform',
        }}>
          {/* Drawer header */}
          <div style={{
            height: '44px', background: '#323233',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px', flexShrink: 0,
            borderBottom: '1px solid #3a3a3a',
          }}>
            <span style={{ fontSize: '12px', color: '#9d9d9d', fontFamily: 'monospace' }}>
              vincent-portfolio
            </span>
            <button
              onClick={closeDrawer}
              style={{
                background: 'none', border: 'none', color: '#858585',
                cursor: 'pointer', padding: '4px', lineHeight: 1,
                fontSize: '16px',
              }}
            >
              ✕
            </button>
          </div>

          {/* Drawer nav */}
          <nav style={{ padding: '8px 0', flex: 1 }}>
            <div style={{ padding: '8px 12px 4px', fontSize: '10px', color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Navigation
            </div>
            {drawerLinks.map(item => (
              <div
                key={item.id}
                onClick={() => { switchTab(item.id); closeDrawer() }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '11px 16px',
                  color: activeTab === item.id ? '#fff' : '#858585',
                  background: activeTab === item.id ? '#094771' : 'transparent',
                  borderLeft: `2px solid ${activeTab === item.id ? '#007acc' : 'transparent'}`,
                  cursor: 'pointer', fontSize: '13px',
                  transition: 'all 0.15s',
                }}
              >
                <i className={`ti ${item.icon}`} style={{ fontSize: '17px' }} />
                {item.label}
              </div>
            ))}

            {/* Divider */}
            <div style={{ height: '1px', background: '#3a3a3a', margin: '8px 0' }} />

            <div style={{ padding: '8px 12px 4px', fontSize: '10px', color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Links
            </div>
            {[
              { label: 'GitHub',   icon: 'ti-brand-github', action: () => window.open('https://github.com/viniuy', '_blank') },
              { label: 'LinkedIn', icon: 'ti-brand-linkedin', action: () => window.open('https://www.linkedin.com/in/vincentenolpe/', '_blank') },
              { label: 'Email',    icon: 'ti-mail', action: () => window.open('mailto:vincent.enolpe@gmail.com', '_blank') },
            ].map(item => (
              <div
                key={item.label}
                onClick={() => { closeDrawer(); item.action() }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '11px 16px',
                  color: '#858585', cursor: 'pointer', fontSize: '13px',
                  borderLeft: '2px solid transparent',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = '#2a2d2e' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#858585'; e.currentTarget.style.background = 'transparent' }}
              >
                <i className={`ti ${item.icon}`} style={{ fontSize: '17px' }} />
                {item.label}
              </div>
            ))}
          </nav>

          {/* Drawer footer */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid #3a3a3a' }}>
            <div
              onClick={() => { closeDrawer(); setShowWelcome(true); localStorage.removeItem('vince-portfolio-welcomed') }}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#858585', cursor: 'pointer', fontSize: '13px', padding: '4px 0' }}
            >
              <i className="ti ti-help-circle" style={{ fontSize: '17px' }} />
              Welcome Tour
            </div>
            <p style={{ color: '#3a3a3a', fontSize: '10px', fontFamily: 'monospace', margin: '12px 0 0' }}>
              ← swipe left to close
            </p>
          </div>
        </div>

        {/* Mobile title bar */}
        <div style={{
          height: '44px', background: '#323233',
          display: 'flex', alignItems: 'center',
          padding: '0 12px', flexShrink: 0,
          justifyContent: 'space-between',
        }}>
          {/* Hamburger */}
          <button
            onClick={openDrawer}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '4px', padding: '4px', opacity: drawerOpen ? 0 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            {[0,1,2].map(i => (
              <span key={i} style={{ width: '15px', height: '1.5px', background: '#9d9d9d', borderRadius: '2px', display: 'block' }} />
            ))}
          </button>

          <span style={{ fontSize: '12px', color: '#9d9d9d' }}>vincent-portfolio</span>

          <div
            onClick={(e) => { e.stopPropagation(); setShowMenu(v => !v) }}
            style={{ cursor: 'pointer', color: '#9d9d9d', padding: '4px' }}
          >
            <i className="ti ti-dots-vertical" style={{ fontSize: '18px' }} />
          </div>
        </div>

        {/* Dropdown menu — unchanged */}
        {showMenu && (
          <div
            onClick={() => setShowMenu(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 400 }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute', top: '44px', right: '8px',
                background: '#252526', border: '1px solid #3a3a3a',
                borderRadius: '6px', minWidth: '180px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                padding: '4px 0', zIndex: 401,
              }}
            >
              {[
                { label: '👋 Welcome tour', action: () => { setShowWelcome(true); localStorage.removeItem('vince-portfolio-welcomed') } },
                { label: '🐙 GitHub',       action: () => window.open('https://github.com/viniuy', '_blank') },
                { label: '💼 LinkedIn',     action: () => window.open('https://www.linkedin.com/in/vincentenolpe/', '_blank') },
                { label: '📧 Email me',     action: () => window.open('mailto:vincent.enolpe@gmail.com', '_blank') },
              ].map(item => (
                <div
                  key={item.label}
                  onClick={() => { setShowMenu(false); item.action() }}
                  style={{ padding: '10px 16px', fontSize: '13px', color: '#ccc', cursor: 'pointer' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#094771')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Panel area — unchanged */}
        <div
          key={animKey}
          style={{
            flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column',
            animation: `slide-in-${slideDir} 0.28s cubic-bezier(0.22, 1, 0.36, 1) forwards`,
          }}
        >
          <div style={{ display: activeTab === 'explorer' ? 'flex' : 'none', flex: 1, overflow: 'hidden' }}>
            <div style={{ flex: 1, overflow: 'hidden' }} id="file-explorer">
              <Sidebar />
            </div>
          </div>
          <div style={{ display: activeTab === 'editor' ? 'flex' : 'none', flex: 1, overflow: 'hidden', flexDirection: 'column' }}>
            <TabBar />
            <div id="code-editor" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <CodeEditor />
            </div>
          </div>
          <div style={{ display: activeTab === 'terminal' ? 'flex' : 'none', flex: 1, overflow: 'hidden', flexDirection: 'column' }} id="terminal-panel">
            <Terminal fullHeight />
          </div>
        </div>

        {/* Bottom tab bar — unchanged */}
        <div style={{
          height: '52px', background: '#252526',
          borderTop: '1px solid #333',
          display: 'flex', flexShrink: 0,
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}>
          {bottomTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => switchTab(tab.id)}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: '2px',
                background: 'transparent', border: 'none',
                borderTop: `2px solid ${activeTab === tab.id ? '#007acc' : 'transparent'}`,
                color: activeTab === tab.id ? '#fff' : '#858585',
                cursor: 'pointer', padding: '6px 0',
                transition: 'color 0.15s, border-color 0.15s',
              }}
            >
              <i className={`ti ${tab.icon}`} style={{ fontSize: '20px' }} />
              <span style={{ fontSize: '10px' }}>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Status bar — unchanged */}
        <div style={{
          height: '22px', background: '#007acc',
          display: 'flex', alignItems: 'center',
          padding: '0 10px', gap: '12px', flexShrink: 0,
        }}>
          <div style={{ fontSize: '11px', color: '#fff', display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.9 }}>
            <i className="ti ti-git-branch" style={{ fontSize: '12px' }} /> main
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
            <span style={{ fontSize: '11px', color: '#fff', opacity: 0.9 }}>TypeScript</span>
            <span style={{ fontSize: '11px', color: '#fff', opacity: 0.9 }}>UTF-8</span>
            <span
              onClick={() => { setShowWelcome(true); localStorage.removeItem('vince-portfolio-welcomed') }}
              style={{ fontSize: '11px', color: '#fff', opacity: 0.9, cursor: 'pointer', textDecoration: 'underline' }}
            >
              vincent.dev
            </span>
          </div>
        </div>

        {showWelcome && <WelcomeModal onDismiss={() => setShowWelcome(false)} />}
      </div>
    </RunBuildProvider>
  )
}