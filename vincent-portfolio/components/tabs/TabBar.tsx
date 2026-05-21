'use client'

import { useEditor } from '@/components/editor/EditorContext'
import { FileKey } from '@/types'

export default function TabBar() {
  const { activeFile, openTabs, openFile, closeTab } = useEditor()

  return (
    <div style={{
      height: '35px',
      background: '#252526',
      display: 'flex',
      alignItems: 'flex-end',
      overflowX: 'auto',
      flexShrink: 0,
    }}>
      {openTabs.length > 0 ? openTabs.map((tab) => {
        const isActive = tab.key === activeFile
        return (
          <div
            key={tab.key}
            onClick={() => openFile(tab.key)}
            style={{
              height: '35px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0 14px',
              fontSize: '12px',
              borderRight: '1px solid #1e1e1e',
              borderTop: `1px solid ${isActive ? '#007acc' : 'transparent'}`,
              background: isActive ? '#1e1e1e' : '#2d2d2d',
              color: isActive ? '#fff' : '#9d9d9d',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              userSelect: 'none',
            }}
          >
            <i className={`ti ${tab.icon}`} style={{ fontSize: '13px', color: tab.iconColor }} aria-hidden="true" />
            {tab.label}
            <span
              onClick={(e) => { e.stopPropagation(); closeTab(tab.key as FileKey) }}
              style={{
                fontSize: '14px',
                color: '#9d9d9d',
                lineHeight: 1,
                padding: '1px 3px',
                borderRadius: '2px',
                marginLeft: '2px',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.background = '#555'; (e.target as HTMLElement).style.color = '#fff' }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.background = 'transparent'; (e.target as HTMLElement).style.color = '#9d9d9d' }}
            >
              ×
            </span>
          </div>
        )
      }) : (
        <div style={{
          height: '35px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 14px',
          fontSize: '12px',
          color: '#9d9d9d',
          background: '#2d2d2d',
          whiteSpace: 'nowrap',
          flexShrink: 0,
          userSelect: 'none',
        }}>
          No tabs open
        </div>
      )}
    </div>
  )
}
