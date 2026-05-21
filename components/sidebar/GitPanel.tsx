'use client'

import { useEffect, useState } from 'react'

interface Commit {
  sha: string
  commit: {
    message: string
    author: { name: string; date: string }
  }
}

export default function GitPanel() {
  const [commits, setCommits] = useState<Commit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('https://api.github.com/repos/viniuy/didasko-capstone/commits?per_page=10')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setCommits(data)
        else setError(true)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime()
    const days = Math.floor(diff / 86400000)
    if (days === 0) return 'today'
    if (days === 1) return 'yesterday'
    if (days < 30) return `${days}d ago`
    return `${Math.floor(days / 30)}mo ago`
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 8px' }}>
      <div style={{ padding: '6px 12px', fontSize: '11px', color: '#4ec9b0', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <i className="ti ti-git-branch" style={{ fontSize: '13px' }} aria-hidden="true" /> main
      </div>
      {loading && <div style={{ padding: '12px', fontSize: '11px', color: '#555' }}>Loading commits...</div>}
      {error && <div style={{ padding: '12px', fontSize: '11px', color: '#f48771' }}>Could not load commits.</div>}
      {commits.map((c) => (
        <div key={c.sha} style={{ padding: '8px 12px', borderBottom: '1px solid #2a2a2a', cursor: 'default' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#2a2d2e')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
          <div style={{ fontSize: '11px', color: '#ccc', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {c.commit.message.split('\n')[0]}
          </div>
          <div style={{ fontSize: '10px', color: '#555', fontFamily: 'monospace', display: 'flex', gap: '8px' }}>
            <span style={{ color: '#569cd6' }}>{c.sha.substring(0, 7)}</span>
            <span>{timeAgo(c.commit.author.date)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}