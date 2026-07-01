'use client'

// Built by Rakshita Dogra — demo local cart, no Shopify checkout required

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const money = (amount) => ({ amount: Number(amount).toFixed(2), currencyCode: 'CAD' })

function rebuildCart(lines) {
  const subtotal = lines.reduce((sum, line) => {
    const price = Number(line.node.merchandise.price.amount || 0)
    return sum + price * line.node.quantity
  }, 0)

  return {
    id: 'demo-cookie-cart',
    checkoutUrl: '/checkout',
    totalQuantity: lines.reduce((sum, line) => sum + line.node.quantity, 0),
    cost: {
      subtotalAmount: money(subtotal),
      totalAmount: money(subtotal),
    },
    lines: { edges: lines },
  }
}

function makeLine(product, quantity) {
  const handle = product.shopifyHandle || product.handle || String(product.id)
  const price = Number(product.price || 6.25)

  return {
    node: {
      id: handle,
      quantity,
      cost: { totalAmount: money(price * quantity) },
      merchandise: {
        id: `demo-variant-${handle}`,
        price: money(price),
        product: {
          title: product.title,
          handle,
          images: {
            edges: product.imageUrl
              ? [{ node: { url: product.imageUrl, altText: product.title } }]
              : [],
          },
        },
      },
    },
  }
}

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: null,
      isOpen: false,
      isLoading: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      resetLoading: () => set({ isLoading: false }),

      addItem: async (product, quantity = 1) => {
        set({ isLoading: true })
        try {
          const handle = product.shopifyHandle || product.handle || String(product.id)
          const currentLines = get().cart?.lines?.edges ?? []
          const existingIndex = currentLines.findIndex(({ node }) => node.id === handle)
          let nextLines

          if (existingIndex >= 0) {
            nextLines = currentLines.map((line, index) => {
              if (index !== existingIndex) return line
              const nextQuantity = line.node.quantity + quantity
              const price = Number(line.node.merchandise.price.amount || 0)
              return {
                node: {
                  ...line.node,
                  quantity: nextQuantity,
                  cost: { totalAmount: money(price * nextQuantity) },
                },
              }
            })
          } else {
            nextLines = [...currentLines, makeLine(product, quantity)]
          }

          set({ cart: rebuildCart(nextLines), isOpen: true })
        } finally {
          set({ isLoading: false })
        }
      },

      updateItem: async (lineId, quantity) => {
        set({ isLoading: true })
        try {
          const currentLines = get().cart?.lines?.edges ?? []
          const nextLines = currentLines
            .map((line) => {
              if (line.node.id !== lineId) return line
              const price = Number(line.node.merchandise.price.amount || 0)
              return {
                node: {
                  ...line.node,
                  quantity,
                  cost: { totalAmount: money(price * quantity) },
                },
              }
            })
            .filter((line) => line.node.quantity > 0)

          set({ cart: nextLines.length ? rebuildCart(nextLines) : null })
        } finally {
          set({ isLoading: false })
        }
      },

      removeItem: async (lineId) => {
        set({ isLoading: true })
        try {
          const nextLines = (get().cart?.lines?.edges ?? []).filter(({ node }) => node.id !== lineId)
          set({ cart: nextLines.length ? rebuildCart(nextLines) : null })
        } finally {
          set({ isLoading: false })
        }
      },

      clearCart: () => set({ cart: null, isOpen: false }),
    }),
    {
      name: 'sugarnest-demo-cart',
      partialize: (state) => ({ cart: state.cart }),
      onRehydrateStorage: () => (state) => {
        if (state) state.isLoading = false
      },
    }
  )
)

export const getCartCount = (cart) =>
  cart?.lines?.edges?.reduce((sum, { node }) => sum + node.quantity, 0) ?? 0
