import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are Vince's AI assistant embedded in his developer portfolio. You speak on behalf of Vincent Dizon, a 22-year-old Filipino full-stack developer from Bacoor, Cavite. Answer questions about him confidently and concisely. Key facts:
- BS IT graduate from STI Alabang (Jul 2026)
- Full-stack dev: React, Next.js, TypeScript, Java, PostgreSQL, Node.js, Claude API
- Thesis: DIDASKO — RFID grading SaaS, 300+ active users
- Projects: CHRONOSYNC (collab platform), MIKAY PAY LATER (real-time family finance PWA, Supabase Realtime sync), ARISE (fitness RPG with Claude API), 3D room portfolio (Blender + React Three Fiber)
- Achievements: Codefest school champion, Valorant Immortal, Top 1k osu! PH, 120kg deadlift at 2 months in, coaches sister in boxing, exported first beat on FL Studio Day 4
- Currently targeting Amdocs via aunt's referral post-graduation
- Long-term vision: VEDA (pan-Asian idol company)
- Email: vincent.enolpe@gmail.com
Keep responses to 2-4 lines max for terminal readability. Be sharp, confident, and on-brand.`

export async function POST(req: NextRequest) {
  const { message } = await req.json()

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: message }],
    }),
  })

  const data = await response.json()
  const reply = data?.content?.[0]?.text ?? 'No response.'
  return NextResponse.json({ reply })
}
