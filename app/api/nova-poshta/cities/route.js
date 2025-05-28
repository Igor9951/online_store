import { NextResponse } from 'next/server'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search')

  const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
    method: 'POST',
    body: JSON.stringify({
      apiKey: process.env.NOVA_POSHTA_KEY,
      modelName: 'Address',
      calledMethod: 'searchSettlements',
      methodProperties: {
        CityName: search,
        Limit: 10,
      },
    }),
    headers: { 'Content-Type': 'application/json' },
  })

  const json = await response.json()
  const cities = json.data?.[0]?.Addresses || []
  return NextResponse.json(cities)
}