'use client'

import { useState } from 'react'
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

interface Props {
  showWelcome: boolean
  setShowWelcome: (v: boolean) => void
}

export default function MobileLayout({ showWelcome, setShowWelcome }: Props) {
  const [activeTab, setActiveTab] = useState<MobileTab>('editor')
  const [showMenu, setShowMenu] = useState(false)

  return (
    <RunBuildProvider>
      <div style={{
        display: 'flex', flexDirection: 'column', height: '100dvh',
        overflow: 'hidden', background: '#1e1e1e', color: '#d4d4d4',
        fontFamily: "'Segoe UI', system-ui, sans-serif", fontSize: '13px',
      }}>

        {/* Mobile title bar */}
        <div style={{
          height: '44px', background: '#323233',
          display: 'flex', alignItems: 'center',
          padding: '0 12px', flexShrink: 0,
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
          </div>
          <span style={{ fontSize: '12px', color: '#9d9d9d' }}>vincent-portfolio</span>
          <div
            onClick={(e) => { e.stopPropagation(); setShowMenu(v => !v) }}
            style={{ cursor: 'pointer', color: '#9d9d9d', padding: '4px' }}
          >
            <i className="ti ti-dots-vertical" style={{ fontSize: '18px' }} />
          </div>
        </div>

        {/* Dropdown menu */}
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
                { label: '👋 Welcome tour',  action: () => { setShowWelcome(true); localStorage.removeItem('vince-portfolio-welcomed') } },
                { label: '🐙 GitHub',        action: () => window.open('https://github.com/viniuy', '_blank') },
                { label: '💼 LinkedIn',      action: () => window.open('https://www.linkedin.com/in/vincentenolpe/', '_blank') },
                { label: '📧 Email Vince',   action: () => window.open('mailto:vincent.enolpe@gmail.com', '_blank') },
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

        {/* Panel area — only active panel renders visually, all mounted to preserve state */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

          {/* Explorer */}
          <div style={{
            display: activeTab === 'explorer' ? 'flex' : 'none',
            flex: 1, overflow: 'hidden',
          }}>
            <div style={{ flex: 1, overflow: 'hidden' }} id="file-explorer">
              <Sidebar />
            </div>
          </div>

          {/* Editor */}
          <div style={{
            display: activeTab === 'editor' ? 'flex' : 'none',
            flex: 1, overflow: 'hidden', flexDirection: 'column',
          }}>
            <TabBar />
            <div id="code-editor" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <CodeEditor />
            </div>
          </div>

          {/* Terminal — full height */}
          <div style={{
            display: activeTab === 'terminal' ? 'flex' : 'none',
            flex: 1, overflow: 'hidden', flexDirection: 'column',
          }} id="terminal-panel">
            <Terminal fullHeight />
          </div>

        </div>

        {/* Bottom tab bar */}
        <div style={{
          height: '52px', background: '#252526',
          borderTop: '1px solid #333',
          display: 'flex', flexShrink: 0,
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}>
          {bottomTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
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

        {/* Status bar */}
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
