// /app/api/nova-poshta/warehouses/route.ts
import { NextResponse } from 'next/server'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const cityRef = searchParams.get('cityRef')

  const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
    method: 'POST',
    body: JSON.stringify({
      apiKey: process.env.NOVA_POSHTA_KEY,
      modelName: 'AddressGeneral',
      calledMethod: 'getWarehouses',
      methodProperties: {
        CityRef: cityRef,
      },
    }),
    headers: { 'Content-Type': 'application/json' },
  })

  const json = await response.json()
  return NextResponse.json(json.data)
}