'use client'

import { useState } from 'react'
import { useEditor } from '@/components/editor/EditorContext'
import { FileKey } from '@/types'
import { personalInfo } from '@/data/files'

interface FolderItem {
  label: string
  children: { key: FileKey; label: string; icon: string; iconColor: string }[]
}

const explorerTree: FolderItem[] = [
  {
    label: 'PROJECTS',
    children: [
      { key: 'didasko', label: 'DIDASKO/index.tsx',   icon: 'ti-brand-typescript', iconColor: '#007acc' },
      { key: 'arise',   label: 'ARISE/index.tsx',     icon: 'ti-brand-typescript', iconColor: '#007acc' },
      { key: 'chrono',  label: 'CHRONOSYNC/index.tsx',icon: 'ti-brand-typescript', iconColor: '#007acc' },
      { key: 'room',    label: 'ROOM/scene.tsx',      icon: 'ti-brand-typescript', iconColor: '#007acc' },
    ],
  },
  {
    label: 'ABOUT',
    children: [
      { key: 'readme',   label: 'README.md',    icon: 'ti-markdown',        iconColor: '#519aba' },
      { key: 'projects', label: 'projects.tsx', icon: 'ti-brand-typescript', iconColor: '#007acc' },
    ],
  },
]

export default function Sidebar() {
  const { activeFile, openFile } = useEditor()
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({ PROJECTS: true, ABOUT: true })

  function toggleFolder(label: string) {
    setOpenFolders((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <div style={{ width: '100%', maxWidth: '220px', background: '#252526', display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden', borderRight: '1px solid #1e1e1e', height: '100%' }}>
      <div style={{ height: '35px', display: 'flex', alignItems: 'center', padding: '0 12px', fontSize: '11px', fontWeight: 500, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.08em', flexShrink: 0 }}>
        Explorer
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: '2px 8px 6px 12px', fontSize: '11px', color: '#9d9d9d', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          vincent-portfolio
        </div>

        {explorerTree.map((folder) => (
          <div key={folder.label}>
            {/* Folder row */}
            <div
              onClick={() => toggleFolder(folder.label)}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '3px 8px 3px 12px', cursor: 'pointer', fontSize: '12px', color: '#ccc', userSelect: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#2a2d2e')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ fontSize: '10px', color: '#858585', width: '12px' }}>
                {openFolders[folder.label] ? '▾' : '▸'}
              </span>
              <i className={`ti ${openFolders[folder.label] ? 'ti-folder-open' : 'ti-folder'}`} style={{ color: '#dcb67a', fontSize: '14px' }} aria-hidden="true" />
              {folder.label}
            </div>

            {/* Files */}
            {openFolders[folder.label] && folder.children.map((file) => (
              <div
                key={file.key}
                onClick={() => openFile(file.key)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '3px 8px 3px 32px', cursor: 'pointer', fontSize: '12px',
                  color: activeFile === file.key ? '#fff' : '#ccc',
                  background: activeFile === file.key ? '#094771' : 'transparent',
                }}
                onMouseEnter={(e) => { if (activeFile !== file.key) e.currentTarget.style.background = '#2a2d2e' }}
                onMouseLeave={(e) => { if (activeFile !== file.key) e.currentTarget.style.background = 'transparent' }}
              >
                <i className={`ti ${file.icon}`} style={{ fontSize: '14px', color: file.iconColor }} aria-hidden="true" />
                {file.label}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Social links at bottom */}
      <div style={{ padding: '10px 14px', borderTop: '1px solid #333', display: 'flex', gap: '12px' }}>
        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" style={{ color: '#858585', textDecoration: 'none' }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#fff')}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#858585')}>
          <i className="ti ti-brand-github" style={{ fontSize: '18px' }} aria-hidden="true" />
        </a>
        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#858585', textDecoration: 'none' }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#fff')}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#858585')}>
          <i className="ti ti-brand-linkedin" style={{ fontSize: '18px' }} aria-hidden="true" />
        </a>
        <a href={`mailto:${personalInfo.email}`} style={{ color: '#858585', textDecoration: 'none' }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#fff')}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#858585')}>
          <i className="ti ti-mail" style={{ fontSize: '18px' }} aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
