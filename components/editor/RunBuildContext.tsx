'use client'

import { createContext, useContext, useState, ReactNode, useCallback } from 'react'

interface BuildLine {
  text: string
  color: string
}

interface RunBuildContextType {
  buildLines: BuildLine[]
  building: boolean
  addBuildLines: (lines: BuildLine[]) => void
  notifyBuildStart: () => void
}

const RunBuildContext = createContext<RunBuildContextType>({
  buildLines: [],
  building: false,
  addBuildLines: () => {},
  notifyBuildStart: () => {},
})

export function RunBuildProvider({ children }: { children: ReactNode }) {
  const [buildLines, setBuildLines] = useState<BuildLine[]>([])
  const [building, setBuilding] = useState(false)

  const notifyBuildStart = useCallback(() => {
    setBuildLines([])
    setBuilding(true)
  }, [])

  const addBuildLines = useCallback((lines: BuildLine[]) => {
    setBuildLines(lines)
    if (lines.some(l => l.text.includes('Compiled successfully'))) {
      setBuilding(false)
    }
  }, [])

  return (
    <RunBuildContext.Provider value={{ buildLines, building, addBuildLines, notifyBuildStart }}>
      {children}
    </RunBuildContext.Provider>
  )
}

export const useRunBuild = () => useContext(RunBuildContext)