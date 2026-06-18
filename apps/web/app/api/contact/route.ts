import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(6).max(30),
  object: z.string().min(2).max(200),
  message: z.string().min(10).max(2000),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    // TODO: integrate with email / CRM / Telegram bot
    // For now just log and return success
    console.log('[contact]', data)

    // Example: send to Telegram bot
    // const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN
    // const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID
    // if (TELEGRAM_TOKEN && TELEGRAM_CHAT_ID) {
    //   const text = `🏠 Новая заявка!\n\n👤 ${data.name}\n📞 ${data.phone}\n🏢 ${data.object}\n\n${data.message}`
    //   await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'HTML' }),
    //   })
    // }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] error', err)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
