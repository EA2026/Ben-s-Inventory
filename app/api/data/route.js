import { kv } from '@vercel/kv'

const KEYS = { items:'inv-items', orders:'inv-orders', checklist:'inv-checklist', trip:'inv-trip' }

export async function GET(request) {
  const key = new URL(request.url).searchParams.get('key')
  if (!key || !KEYS[key]) return Response.json({ error:'bad key' }, { status:400 })
  try { return Response.json(await kv.get(KEYS[key]) ?? null) }
  catch(e) { return Response.json({ error:e.message }, { status:500 }) }
}

export async function POST(request) {
  try {
    const { key, value } = await request.json()
    if (!key || !KEYS[key]) return Response.json({ error:'bad key' }, { status:400 })
    await kv.set(KEYS[key], value)
    return Response.json({ ok:true })
  } catch(e) { return Response.json({ error:e.message }, { status:500 }) }
}
