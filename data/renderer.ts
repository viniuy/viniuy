export function renderLine(parts: (string | [string, string])[]): string {
  let html = ''
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i]
    if (Array.isArray(p)) {
      const [type, val] = p
      const escaped = escHtml(val)
      switch (type) {
        case 'key':     html += `<span style="color:#569cd6">${escaped}</span>`; break
        case 'str':     html += `<span style="color:#ce9178">${escaped}</span>`; break
        case 'fn':      html += `<span style="color:#dcdcaa">${escaped}</span>`; break
        case 'var':     html += `<span style="color:#9cdcfe">${escaped}</span>`; break
        case 'num':     html += `<span style="color:#b5cea8">${escaped}</span>`; break
        case 'type':    html += `<span style="color:#4ec9b0">${escaped}</span>`; break
        case 'tag':     html += `<span style="color:#4ec9b0">${escaped}</span>`; break
        case 'attr':    html += `<span style="color:#9cdcfe">${escaped}</span>`; break
        case 'comment': html += `<span style="color:#6a9955">${escaped}</span>`; break
        case 'log':     html += `<span style="color:#4ec9b0">${escaped}</span>`; break
        case 'ini':     html += `<span style="color:#9cdcfe">${escaped}</span>`; break
        default:        html += escaped
      }
    } else {
      html += escHtml(p)
    }
  }
  return html
}

export function escHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
