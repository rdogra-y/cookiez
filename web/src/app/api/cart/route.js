// Demo cart helper only. No Shopify connection.
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const handle = searchParams.get('handle')

  return NextResponse.json({
    data: {
      productByHandle: {
        id: `demo-product-${handle}`,
        title: handle,
        variants: {
          edges: [
            {
              node: {
                id: `demo-variant-${handle}`,
                availableForSale: true,
                price: { amount: '6.25', currencyCode: 'CAD' },
              },
            },
          ],
        },
      },
    },
  })
}

export async function POST() {
  return NextResponse.json({ ok: true, checkoutUrl: '/checkout' })
}

export async function PATCH() {
  return NextResponse.json({ ok: true, checkoutUrl: '/checkout' })
}
