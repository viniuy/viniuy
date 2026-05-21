'use client'

import { useState, useEffect } from 'react'
import type { ComponentType } from 'react'
import { Activity, Lock, MapPin, Mail, CircleDot } from 'lucide-react'
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
  video?: string
}

const projects: Project[] = [
  {
    name: 'DIDASKO',
    type: 'RFID Grading SaaS',
    stack: 'React · PostgreSQL · Java',
    status: 'shipped',
    color: '#4ec9b0',
    icon: '/didasko.png',
    video: '/project_mp4/didasko.mp4',
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
    video: '/project_mp4/chronosync.mp4',
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

const row1 = [
  { label: 'React',       icon: 'devicon-react-original',      color: '#61dafb' },
  { label: 'Next.js',     icon: 'devicon-nextjs-plain',         color: '#fff'    },
  { label: 'TypeScript',  icon: 'devicon-typescript-plain',     color: '#3178c6' },
  { label: 'Java',        icon: 'devicon-java-plain',           color: '#f89820' },
  { label: 'PostgreSQL',  icon: 'devicon-postgresql-plain',     color: '#336791' },
  { label: 'Node.js',     icon: 'devicon-nodejs-plain',         color: '#68a063' },
  { label: 'Supabase',    icon: 'devicon-supabase-plain',       color: '#3ecf8e' },
  { label: 'Python',      icon: 'devicon-python-plain',         color: '#3572A5' },
]

const row2 = [
  { label: 'Git',         icon: 'devicon-git-plain',            color: '#f05032' },
  { label: 'Blender',     icon: 'devicon-blender-original',     color: '#f5792a' },
  { label: 'Firebase',    icon: 'devicon-firebase-plain',       color: '#ffca28' },
  { label: 'PHP',         icon: 'devicon-php-plain',            color: '#8892be' },
  { label: 'C++',         icon: 'devicon-cplusplus-plain',      color: '#00599c' },
  { label: 'Linux',       icon: 'devicon-linux-plain',          color: '#fff'    },
  { label: 'VS Code',     icon: 'devicon-vscode-plain',         color: '#007acc' },
  { label: 'Prisma',      icon: 'devicon-prisma-original',      color: '#5a67d8' },
]

function TechChip({ label, icon, color }: { label: string; icon: string; color: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 14px',
      background: '#16161c',
      border: '1px solid #ffffff0d',
      borderRadius: '8px',
      flexShrink: 0,
    }}>
      <i className={`${icon} colored`} style={{ fontSize: '18px', color }} />
      <span style={{ fontSize: '12px', color: '#ccc', fontFamily: "'Segoe UI', system-ui, sans-serif", whiteSpace: 'nowrap' }}>
        {label}
      </span>
    </div>
  )
}

function ProjectSpotlight() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [animating, setAnimating] = useState(false)

  const current = projects[index]

  function go(dir: 'left' | 'right') {
    if (animating) return
    setDirection(dir)
    setAnimating(true)
    setTimeout(() => {
      setIndex((i) =>
        dir === 'right'
          ? (i + 1) % projects.length
          : (i - 1 + projects.length) % projects.length
      )
      setAnimating(false)
    }, 220)
  }

  return (
    <div style={{ padding: '32px 40px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <p style={{ color: '#555', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px', fontFamily: 'monospace' }}>
        Shipped Projects
      </p>

      {/* Main spotlight card */}
      <div style={{
        flex: 1,
        background: '#16161c',
        border: `1px solid ${current.color}22`,
        borderTop: `3px solid ${current.color}`,
        borderRadius: '12px',
        padding: '36px',
        display: 'flex',
        flexDirection: 'column',
        opacity: animating ? 0 : 1,
        transform: animating
          ? `translateX(${direction === 'right' ? '-24px' : '24px'})`
          : 'translateX(0)',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
      }}>
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Icon */}
            <div style={{
              width: '64px', height: '64px', borderRadius: '14px',
              background: '#111214', display: 'grid', placeItems: 'center', flexShrink: 0,
              border: `1px solid ${current.color}30`,
            }}>
              {typeof current.icon === 'string' ? (
                <img src={current.icon} alt={current.name} style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
              ) : (
                <current.icon size={28} color={current.color} />
              )}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: '22px', fontFamily: "'Segoe UI', system-ui, sans-serif", letterSpacing: '-0.5px' }}>
                  {current.name}
                </span>
                <span style={{
                  fontSize: '10px',
                  background: current.status === 'active' ? '#23d18b18' : '#ffffff0d',
                  color: current.status === 'active' ? '#23d18b' : '#666',
                  border: `1px solid ${current.status === 'active' ? '#23d18b33' : '#333'}`,
                  padding: '2px 8px', borderRadius: '10px', fontFamily: 'monospace',
                }}>
                  {current.status}
                </span>
              </div>
              <p style={{ color: '#888', fontSize: '13px', margin: 0, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
                {current.type}
              </p>
            </div>
          </div>

          {/* Project counter */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: current.color, fontFamily: 'monospace', lineHeight: 1 }}>
              {String(index + 1).padStart(2, '0')}
            </div>
            <div style={{ fontSize: '11px', color: '#333', fontFamily: 'monospace' }}>
              / {String(projects.length).padStart(2, '0')}
            </div>
          </div>
        </div>

        {/* Stack tags */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {current.stack.split(' · ').map((s) => (
            <span key={s} style={{
              fontSize: '11px', padding: '4px 10px', borderRadius: '6px', fontFamily: 'monospace',
              background: current.color + '15', color: current.color, border: `1px solid ${current.color}30`,
            }}>
              {s}
            </span>
          ))}
        </div>

        {/* Video */}
        {current.video && (
          <div style={{
            width: '100%',
            borderRadius: '8px',
            overflow: 'hidden',
            border: `1px solid ${current.color}20`,
            marginBottom: '24px',
            background: '#0f0f13',
            aspectRatio: '16/9',
          }}>
            <video
              key={current.video}
              src={current.video}
              autoPlay
              muted
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        )}

        {/* Stats row */}
        {current.users && (
          <div style={{
            display: 'flex', gap: '24px', padding: '16px 20px',
            background: '#0f0f13', borderRadius: '8px', marginBottom: '24px',
          }}>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: current.color, fontFamily: 'monospace' }}>300+</div>
              <div style={{ fontSize: '11px', color: '#555' }}>Active Users</div>
            </div>
            <div style={{ width: '1px', background: '#ffffff08' }} />
            <div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: current.color, fontFamily: 'monospace' }}>2025</div>
              <div style={{ fontSize: '11px', color: '#555' }}>Year Shipped</div>
            </div>
            <div style={{ width: '1px', background: '#ffffff08' }} />
            <div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: current.color, fontFamily: 'monospace' }}>Thesis</div>
              <div style={{ fontSize: '11px', color: '#555' }}>Category</div>
            </div>
          </div>
        )}

        {/* GitHub link */}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {current.github ? (
            <a
              href={current.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                color: current.color, fontSize: '12px', textDecoration: 'none',
                fontFamily: 'monospace', padding: '8px 16px',
                border: `1px solid ${current.color}40`, borderRadius: '6px',
                background: current.color + '10', transition: 'all 0.15s',
              }}
            >
              <i className="devicon-github-original" style={{ fontSize: '16px' }} />
              View on GitHub →
            </a>
          ) : <div />}

          {/* Nav arrows */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => go('left')}
              style={{
                width: '36px', height: '36px', borderRadius: '8px',
                background: '#ffffff08', border: '1px solid #ffffff14',
                color: '#ccc', cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: '16px',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#ffffff14'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff08'; e.currentTarget.style.color = '#ccc' }}
            >
              ←
            </button>
            <button
              onClick={() => go('right')}
              style={{
                width: '36px', height: '36px', borderRadius: '8px',
                background: '#ffffff08', border: '1px solid #ffffff14',
                color: '#ccc', cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: '16px',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#ffffff14'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff08'; e.currentTarget.style.color = '#ccc' }}
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '16px' }}>
        {projects.map((_, i) => (
          <div
            key={i}
            onClick={() => { setDirection(i > index ? 'right' : 'left'); setIndex(i) }}
            style={{
              width: i === index ? '20px' : '6px', height: '6px',
              borderRadius: '3px', cursor: 'pointer',
              background: i === index ? projects[i].color : '#333',
              transition: 'all 0.2s',
            }}
          />
        ))}
      </div>
    </div>
  )
}

function ContactSection() {
  const [copied, setCopied] = useState<string | null>(null)

  function copy(val: string, key: string) {
    navigator.clipboard.writeText(val)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const links = [
    {
      key: 'email',
      label: 'Email',
      value: 'vincent.enolpe@gmail.com',
      display: 'vincent.enolpe@gmail.com',
      color: '#ea4335',
      icon: <Mail size={16} />,
      action: 'copy',
    },
    {
      key: 'github',
      label: 'GitHub',
      value: 'https://github.com/viniuy',
      display: 'github.com/viniuy',
      color: '#ffffff',
      icon: <i className="devicon-github-original" style={{ fontSize: '16px' }} />,
      action: 'open',
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      value: 'https://www.linkedin.com/in/vincentenolpe/',
      display: 'linkedin.com/in/vincentenolpe',
      color: '#0a66c2',
      icon: <i className="devicon-linkedin-plain colored" style={{ fontSize: '16px' }} />,
      action: 'open',
    },
    {
      key: 'location',
      label: 'Location',
      value: 'Imus, Cavite, PH',
      display: 'Imus, Cavite, PH',
      color: '#23d18b',
      icon: <MapPin size={16} />,
      action: 'copy',
    },
  ]

  return (
    <div style={{ padding: '32px 40px', height: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Header card — like a VS Code notification */}
      <div style={{
        background: '#16161c',
        border: '1px solid #ffffff0d',
        borderRadius: '12px',
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
      }}>
        {/* Avatar */}
        <div style={{
          width: '56px', height: '56px', borderRadius: '14px',
          background: 'linear-gradient(135deg, #007acc, #23d18b)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '20px', fontWeight: 700, color: '#fff', flexShrink: 0,
          fontFamily: 'monospace',
        }}>
          VD
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '16px', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
              Vincent Dizon
            </span>
            {/* Online indicator */}
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#23d18b15', border: '1px solid #23d18b30', borderRadius: '20px', padding: '2px 8px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#23d18b', display: 'inline-block' }} />
              <span style={{ fontSize: '10px', color: '#23d18b', fontFamily: 'monospace' }}>Open to work</span>
            </span>
          </div>
          <p style={{ color: '#666', fontSize: '12px', margin: 0, fontFamily: 'monospace' }}>
            Full-Stack Developer · Graduating Jul 2026 · Imus, Cavite PH
          </p>
        </div>

        {/* Response time */}
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#23d18b', fontFamily: 'monospace' }}>&lt; 24h</div>
          <div style={{ fontSize: '10px', color: '#555', fontFamily: 'monospace' }}>response time</div>
        </div>
      </div>

      {/* Contact cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {links.map((link) => (
          <div
            key={link.key}
            onClick={() => link.action === 'copy' ? copy(link.value, link.key) : window.open(link.value, '_blank')}
            style={{
              background: '#16161c',
              border: `1px solid ${copied === link.key ? link.color + '60' : '#ffffff0d'}`,
              borderRadius: '10px',
              padding: '16px 18px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.border = `1px solid ${link.color}40`
              e.currentTarget.style.background = link.color + '08'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border = copied === link.key ? `1px solid ${link.color}60` : '1px solid #ffffff0d'
              e.currentTarget.style.background = '#16161c'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {/* Glow */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
              background: `linear-gradient(90deg, transparent, ${link.color}60, transparent)`,
              opacity: copied === link.key ? 1 : 0,
              transition: 'opacity 0.3s',
            }} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ color: link.color }}>{link.icon}</div>
              <span style={{ fontSize: '9px', color: '#444', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {link.action === 'copy' ? (copied === link.key ? '✓ copied' : 'click to copy') : 'click to open'}
              </span>
            </div>

            <div style={{ fontSize: '10px', color: '#555', fontFamily: 'monospace', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {link.label}
            </div>
            <div style={{ fontSize: '12px', color: '#ccc', fontFamily: 'monospace', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {link.display}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <a
        href={`mailto:${personalInfo.email}`}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
          padding: '14px', background: '#23d18b', borderRadius: '10px',
          color: '#000', fontWeight: 700, fontSize: '13px', textDecoration: 'none',
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          transition: 'opacity 0.15s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        <Mail size={16} />
        Send me an email
      </a>

      {/* Footer note */}
      <p style={{ textAlign: 'center', color: '#333', fontSize: '11px', fontFamily: 'monospace', margin: 0 }}>
        Also reachable via the terminal below — type <span style={{ color: '#569cd6' }}>contact</span>
      </p>
    </div>
  )
}

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
            <Lock size={12} color="#666" />
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

          <div
            key={activeTab}
            style={{
              animation: 'tab-in 0.25s cubic-bezier(0.22, 1, 0.36, 1) forwards',
              flex: 1,
            }}
          >
          {/* HOME */}
            {activeTab === 'home' && (
              <div style={{ padding: '48px 40px 40px' }}>
                {/* Hero */}
                <div style={{ marginBottom: '48px' }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#23d18b18',
                    border: '1px solid #23d18b33',
                    borderRadius: '20px',
                    padding: '4px 14px',
                    marginBottom: '16px',
                    fontSize: '12px',
                    color: '#23d18b',
                    fontFamily: "'Segoe UI', system-ui, sans-serif",
                  }}>
                    <CircleDot size={12} color="#23d18b" />
                    <span>Open to work · Graduating Jul 2026</span>
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
                    Full-Stack Developer · Software Engineer · Open Source Enthusiast
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
                <div style={{ marginTop: '40px' }}>
                  <p style={{ color: '#555', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px', fontFamily: 'monospace' }}>
                    Tech Stack
                  </p>

                  {/* Scrolling marquee rows */}
                  <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
                    
                    {/* Row 1 — scrolls left */}
                    <div style={{
                      display: 'flex',
                      gap: '12px',
                      marginBottom: '12px',
                      animation: 'scroll-left 20s linear infinite',
                      width: 'max-content',
                    }}>
                      {[...row1, ...row1].map((tech, i) => (
                        <TechChip key={i} {...tech} />
                      ))}
                    </div>

                    {/* Row 2 — scrolls right */}
                    <div style={{
                      display: 'flex',
                      gap: '12px',
                      animation: 'scroll-right 24s linear infinite',
                      width: 'max-content',
                    }}>
                      {[...row2, ...row2].map((tech, i) => (
                        <TechChip key={i} {...tech} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PROJECTS */}
            {activeTab === 'projects' && (
              <ProjectSpotlight />
            )}

            {/* CONTACT */}
            {activeTab === 'contact' && (
              <ContactSection />
            )}
          </div>

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