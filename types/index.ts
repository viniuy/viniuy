export type FileKey =
  | 'readme'
  | 'projects'
  | 'boxing'
  | 'osu'
  | 'didasko'
  | 'arise'
  | 'chrono'
  | 'mikay'
  | 'room'

export interface Tab {
  key: FileKey
  label: string
  icon: string
  iconColor: string
  modified?: boolean
}

export interface TermLine {
  type: 'prompt' | 'success' | 'error' | 'muted' | 'ai' | 'normal'
  value: string
}

export type LinePart =
  | string
  | ['key', string]
  | ['str', string]
  | ['fn', string]
  | ['var', string]
  | ['num', string]
  | ['type', string]
  | ['tag', string]
  | ['attr', string]
  | ['comment', string]
  | ['log', string]
  | ['ini', string]

export interface FileData {
  breadcrumb: string[]
  lines: (string | LinePart[])[]
}
