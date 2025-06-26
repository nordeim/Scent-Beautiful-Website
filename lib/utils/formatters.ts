// lib/utils/formatters.ts

export function formatPrice(
  price: number | string | undefined | null,
  options: {
    currency?: 'USD' | 'EUR' | 'GBP'
    notation?: Intl.NumberFormatOptions['notation']
  } = {},
) {
  const { currency = 'USD', notation = 'compact' } = options
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price ?? 0

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice)
}
