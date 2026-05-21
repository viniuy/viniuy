import type { Metadata } from 'next'
import { EditorProvider } from '@/components/editor/EditorContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vincent Dizon — Portfolio',
  description: 'Full-Stack Developer · Builder · Creative',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />
      </head>
      <body>
        <EditorProvider>
          {children}
        </EditorProvider>
      </body>
    </html>
  )
}
