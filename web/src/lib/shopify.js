// Built by Rakshita Dogra — Happy's Cookiez © 2025
import { createStorefrontApiClient } from '@shopify/storefront-api-client'

export const shopifyClient = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  apiVersion: '2026-04',
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN,
})

// ── Fetch all products ─────────────────────────────────
export async function getShopifyProducts() {
  const query = `
    query GetProducts {
      products(first: 20, sortKey: BEST_SELLING) {
        edges {
          node {
            id
            handle
            title
            description
            availableForSale
            tags
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 4) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
            variants(first: 5) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  quantityAvailable
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  const { data, errors } = await shopifyClient.request(query)
  if (errors) throw new Error(errors.message)
  return data.products.edges.map(({ node }) => node)
}

// ── Fetch single product ───────────────────────────────
export async function getShopifyProduct(handle) {
  const query = `
    query GetProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id
        handle
        title
        description
        availableForSale
        tags
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 4) {
          edges {
            node {
              url
              altText
              width
              height
            }
          }
        }
        variants(first: 5) {
          edges {
            node {
              id
              title
              availableForSale
              quantityAvailable
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `

  const { data, errors } = await shopifyClient.request(query, {
    variables: { handle }
  })
  if (errors) throw new Error(errors.message)
  return data.productByHandle
}

// ── Create cart ────────────────────────────────────────
export async function createShopifyCart(lines) {
  const mutation = `
    mutation CartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            subtotalAmount {
              amount
              currencyCode
            }
            totalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 20) {
            edges {
              node {
                id
                quantity
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    product {
                      id
                      handle
                      title
                      images(first: 1) {
                        edges {
                          node {
                            url
                            altText
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const { data, errors } = await shopifyClient.request(mutation, {
    variables: { input: { lines } }
  })
  if (errors) throw new Error(errors.message)
  if (data.cartCreate.userErrors.length) {
    throw new Error(data.cartCreate.userErrors[0].message)
  }
  return data.cartCreate.cart
}

// ── Add to cart ────────────────────────────────────────
export async function addToShopifyCart(cartId, lines) {
  const mutation = `
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            subtotalAmount { amount currencyCode }
            totalAmount { amount currencyCode }
          }
          lines(first: 20) {
            edges {
              node {
                id
                quantity
                cost {
                  totalAmount { amount currencyCode }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price { amount currencyCode }
                    product {
                      id
                      handle
                      title
                      images(first: 1) {
                        edges {
                          node { url altText }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        userErrors { field message }
      }
    }
  `

  const { data, errors } = await shopifyClient.request(mutation, {
    variables: { cartId, lines }
  })
  if (errors) throw new Error(errors.message)
  if (data.cartLinesAdd.userErrors.length) {
    throw new Error(data.cartLinesAdd.userErrors[0].message)
  }
  return data.cartLinesAdd.cart
}

// ── Update cart line ───────────────────────────────────
export async function updateShopifyCartLine(cartId, lineId, quantity) {
  const mutation = `
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            subtotalAmount { amount currencyCode }
            totalAmount { amount currencyCode }
          }
          lines(first: 20) {
            edges {
              node {
                id
                quantity
                cost {
                  totalAmount { amount currencyCode }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price { amount currencyCode }
                    product {
                      id
                      handle
                      title
                      images(first: 1) {
                        edges {
                          node { url altText }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        userErrors { field message }
      }
    }
  `

  const { data, errors } = await shopifyClient.request(mutation, {
    variables: { cartId, lines: [{ id: lineId, quantity }] }
  })
  if (errors) throw new Error(errors.message)
  return data.cartLinesUpdate.cart
}

// ── Remove cart line ───────────────────────────────────
export async function removeShopifyCartLine(cartId, lineId) {
  const mutation = `
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            subtotalAmount { amount currencyCode }
            totalAmount { amount currencyCode }
          }
          lines(first: 20) {
            edges {
              node {
                id
                quantity
                cost {
                  totalAmount { amount currencyCode }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price { amount currencyCode }
                    product {
                      id
                      handle
                      title
                      images(first: 1) {
                        edges {
                          node { url altText }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        userErrors { field message }
      }
    }
  `

  const { data, errors } = await shopifyClient.request(mutation, {
    variables: { cartId, lineIds: [lineId] }
  })
  if (errors) throw new Error(errors.message)
  return data.cartLinesRemove.cart
}

// ── Helper functions ───────────────────────────────────
export const getFirstImage = (product) =>
  product?.images?.edges?.[0]?.node ?? null

export const getDefaultVariant = (product) =>
  product?.variants?.edges?.[0]?.node ?? null

export const formatPrice = (amount, currencyCode = 'CAD') =>
  new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount))