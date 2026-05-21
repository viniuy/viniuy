'use client'

import { useState, useEffect } from 'react'
import type { ComponentType } from 'react'
import { Activity, GraduationCap, Mail, MapPin, Users } from 'lucide-react'
import { personalInfo } from '@/data/files'

interface Props {
  onClose: () => void
}

type Project = {
  name: string
  type: string
  stack: string
  status: string
  color: string
  icon: string | ComponentType<any>
  users?: number | null
  github?: string
}

const projects: Project[] = [
  {
    name: 'DIDASKO',
    type: 'RFID Grading SaaS',
    stack: 'React · PostgreSQL · Java',
    status: 'shipped',
    color: '#4ec9b0',
    icon: '/didasko.png',
    github: 'https://github.com/viniuy/didasko-capstone',
  },
  {
    name: 'CHRONOSYNC',
    type: 'Collaboration Platform',
    stack: 'React · Firebase · TypeScript',
    users: null,
    status: 'shipped',
    color: '#569cd6',
    icon: '/chronos.png',
    github: 'https://github.com/viniuy/ChronoSync4.0',
  },
  {
    name: 'ARISE',
    type: 'Fitness RPG App',
    stack: 'React Native · Claude API',
    users: null,
    status: 'active',
    color: '#ce9178',
    icon: Activity,
    github: 'https://github.com/viniuy/Arise',
  },
]

const skills = [
  { label: 'React / Next.js', pct: 92 },
  { label: 'TypeScript', pct: 88 },
  { label: 'Java / PostgreSQL', pct: 85 },
  { label: 'Node.js / Supabase', pct: 82 },
  { label: 'Claude AI API', pct: 78 },
]

export default function PortfolioPreview({ onClose }: Props) {
  const [visible, setVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<'home' | 'projects' | 'contact'>('home')

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 20)
    return () => clearTimeout(t)
  }, [])

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 250)
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.25s ease',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
    >
      {/* Browser window */}
      <div
        style={{
          width: 'min(980px, 96vw)',
          height: 'min(720px, 94vh)',
          background: '#fff',
          borderRadius: '10px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.94) translateY(20px)',
          transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
        }}
      >
        {/* Browser chrome */}
        <div style={{
          height: '38px',
          background: '#f0f0f0',
          borderBottom: '1px solid #ddd',
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          gap: '8px',
          flexShrink: 0,
          userSelect: 'none',
        }}>
          {/* Traffic lights */}
          <div style={{ display: 'flex', gap: '6px' }}>
            <div onClick={handleClose} style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57', cursor: 'pointer' }} title="Close" />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28c840' }} />
          </div>
          {/* URL bar */}
          <div style={{
            flex: 1,
            height: '24px',
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            gap: '6px',
            maxWidth: '400px',
            margin: '0 auto',
          }}>
            <span style={{ fontSize: '11px', color: '#666' }}>🔒</span>
            <span style={{ fontSize: '12px', color: '#333', fontFamily: 'monospace' }}>
              vincentdizon.dev
            </span>
            <span style={{ marginLeft: 'auto', fontSize: '10px', background: '#23d18b22', color: '#1a9e6a', borderRadius: '3px', padding: '1px 5px', fontFamily: 'sans-serif', fontWeight: 600 }}>
              LIVE
            </span>
          </div>
          <div style={{ width: '60px' }} />
        </div>

        {/* Site content */}
        <div style={{ flex: 1, overflowY: 'auto', background: '#0f0f13' }}>

          {/* Nav */}
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 40px',
            borderBottom: '1px solid #ffffff14',
            position: 'sticky',
            top: 0,
            background: '#0f0f13',
            zIndex: 10,
          }}>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '16px', fontFamily: 'monospace', letterSpacing: '-0.5px' }}>
              vince<span style={{ color: '#23d18b' }}>.dev</span>
            </span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {(['home', 'projects', 'contact'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '5px 14px',
                    background: activeTab === tab ? '#23d18b18' : 'transparent',
                    border: activeTab === tab ? '1px solid #23d18b55' : '1px solid transparent',
                    borderRadius: '20px',
                    color: activeTab === tab ? '#23d18b' : '#888',
                    fontSize: '12px',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    transition: 'all 0.15s',
                    fontFamily: "'Segoe UI', system-ui, sans-serif",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </nav>

          {/* HOME */}
          {activeTab === 'home' && (
            <div style={{ padding: '48px 40px 40px' }}>
              {/* Hero */}
              <div style={{ marginBottom: '48px' }}>
                <div style={{
                  display: 'inline-block',
                  background: '#23d18b18',
                  border: '1px solid #23d18b33',
                  borderRadius: '20px',
                  padding: '4px 14px',
                  marginBottom: '16px',
                  fontSize: '12px',
                  color: '#23d18b',
                  fontFamily: "'Segoe UI', system-ui, sans-serif",
                }}>
                  🟢 Open to work · Graduating Jul 2026
                </div>
                <h1 style={{
                  color: '#fff',
                  fontSize: '38px',
                  fontWeight: 700,
                  margin: '0 0 8px',
                  lineHeight: 1.15,
                  fontFamily: "'Segoe UI', system-ui, sans-serif",
                  letterSpacing: '-1px',
                }}>
                  {personalInfo.name}
                </h1>
                <p style={{
                  color: '#23d18b',
                  fontSize: '16px',
                  margin: '0 0 16px',
                  fontFamily: 'monospace',
                }}>
                  Full-Stack Developer · Builder · Creative
                </p>
                <p style={{
                  color: '#999',
                  fontSize: '14px',
                  maxWidth: '480px',
                  lineHeight: 1.7,
                  margin: '0 0 28px',
                  fontFamily: "'Segoe UI', system-ui, sans-serif",
                }}>
                  BSIT student from STI Alabang. I build production apps that real people use —
                  from grading to fitness RPG apps powered by Claude AI.
                </p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => setActiveTab('projects')}
                    style={{
                      padding: '10px 22px',
                      background: '#23d18b',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#000',
                      fontWeight: 600,
                      fontSize: '13px',
                      cursor: 'pointer',
                      fontFamily: "'Segoe UI', system-ui, sans-serif",
                    }}>
                    See My Work
                  </button>
                  <button
                    onClick={() => setActiveTab('contact')}
                    style={{
                      padding: '10px 22px',
                      background: 'transparent',
                      border: '1px solid #333',
                      borderRadius: '6px',
                      color: '#ccc',
                      fontSize: '13px',
                      cursor: 'pointer',
                      fontFamily: "'Segoe UI', system-ui, sans-serif",
                    }}>
                    Get in Touch
                  </button>
                </div>
              </div>

              {/* Skills */}
              <div>
                <p style={{ color: '#555', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px', fontFamily: 'monospace' }}>
                  Tech Stack
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '420px' }}>
                  {skills.map(s => (
                    <div key={s.label}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span style={{ color: '#ccc', fontSize: '12px', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>{s.label}</span>
                        <span style={{ color: '#555', fontSize: '11px', fontFamily: 'monospace' }}>{s.pct}%</span>
                      </div>
                      <div style={{ height: '4px', background: '#1e1e24', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          width: `${s.pct}%`,
                          background: 'linear-gradient(90deg, #23d18b, #007acc)',
                          borderRadius: '2px',
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PROJECTS */}
          {activeTab === 'projects' && (
            <div style={{ padding: '40px' }}>
              <p style={{ color: '#555', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px', fontFamily: 'monospace' }}>
                Shipped Projects
              </p>
              <div style={{ display: 'grid', gap: '16px' }}>
                {projects.map(p => (
                  <div key={p.name} style={{
                    background: '#16161c',
                    border: `1px solid ${p.color}22`,
                    borderLeft: `3px solid ${p.color}`,
                    borderRadius: '8px',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '16px',
                  }}>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '110px',
                        height: '110px',
                        borderRadius: '14px',
                        background: '#111214',
                        display: 'grid',
                        placeItems: 'center',
                        flexShrink: 0,
                      }}>
                        {typeof p.icon === 'string' ? (
                          <img src={p.icon} alt={p.name} style={{ width: '110px', height: '110px', objectFit: 'contain' }} />
                        ) : (
                          <p.icon size={28} color={p.color} />
                        )}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', marginTop: '15px' }}>
                          <span style={{ color: '#fff', fontWeight: 700, fontSize: '15px', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>{p.name}</span>
                          <span style={{
                            fontSize: '10px',
                            background: p.status === 'active' ? '#23d18b18' : '#ffffff0d',
                            color: p.status === 'active' ? '#23d18b' : '#666',
                            border: `1px solid ${p.status === 'active' ? '#23d18b33' : '#333'}`,
                            padding: '1px 7px',
                            borderRadius: '10px',
                            fontFamily: 'monospace',
                          }}>
                            {p.status}
                          </span>
                        </div>
                        <p style={{ color: '#888', fontSize: '13px', margin: '0 0 6px', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>{p.type}</p>
                        <p style={{ color: '#555', fontSize: '11px', margin: '0 0 8px', fontFamily: 'monospace' }}>{p.stack}</p>
                        {p.github && (
                          <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ color: '#23d18b', fontSize: '11px', textDecoration: 'none', fontFamily: 'monospace' }}>→ View on GitHub</a>
                        )}
                      </div>
                    </div>
                    {p.users && (
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ color: p.color, fontSize: '18px', fontWeight: 700, fontFamily: 'monospace' }}>300+</div>
                        <div style={{ color: '#555', fontSize: '11px', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>active users</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTACT */}
          {activeTab === 'contact' && (
            <div style={{ padding: '40px', maxWidth: '500px' }}>
              <p style={{ color: '#555', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px', fontFamily: 'monospace' }}>
                Get in Touch
              </p>
              <p style={{ color: '#888', fontSize: '14px', lineHeight: 1.7, marginBottom: '32px', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
                Currently looking for full-time roles post-graduation (Jul 2026). 
                Whether you&apos;re a recruiter, a fellow developer, or just curious — I&apos;d love to chat.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                  { icon: '/icons/github.svg', label: 'GitHub', value: 'https://github.com/viniuy', href: personalInfo.github },
                  { icon: '/icons/linkedin.svg', label: 'LinkedIn', value: 'https://www.linkedin.com/in/vincentenolpe/', href: personalInfo.linkedin },
                  { icon: MapPin, label: 'Location', value: personalInfo.location, href: null },
                ].map(item => (
                  <div key={item.label} style={{
                    background: '#16161c',
                    border: '1px solid #ffffff0d',
                    borderRadius: '8px',
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                  }}>
                    {typeof item.icon === 'string' ? (
                      <img src={item.icon} alt={item.label} style={{ width: '18px', height: '18px' }} />
                    ) : (
                      <item.icon size={18} color="#23d18b" />
                    )}
                    <div>
                      <div style={{ color: '#555', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'monospace', marginBottom: '2px' }}>{item.label}</div>
                      {item.href ? (
                        <a href={item.href} style={{ color: '#23d18b', fontSize: '13px', textDecoration: 'none', fontFamily: 'monospace' }}>{item.value}</a>
                      ) : (
                        <span style={{ color: '#ccc', fontSize: '13px', fontFamily: 'monospace' }}>{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div style={{
            padding: '24px 40px',
            borderTop: '1px solid #ffffff08',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span style={{ color: '#333', fontSize: '11px', fontFamily: 'monospace' }}>
              © 2026 Vincent Dizon
            </span>
            <span style={{ color: '#2a6640', fontSize: '11px', fontFamily: 'monospace' }}>
              Built with Next.js · Deployed on Vercel
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}