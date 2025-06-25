// components/features/product/ProductCard.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ProductCard } from './ProductCard'
import type { ProductCardType } from '@/types'

const mockProduct: ProductCardType = {
  id: '1',
  name: 'Lavender Dreams',
  slug: 'lavender-dreams',
  price: 29.99,
  images: [{ url: '/lavender.jpg', altText: 'A bottle of lavender oil' }],
  variants: [{ price: 29.99 }],
  // Add other required fields from Product model with dummy data
  sku: 'LD-001',
  description: ' calming lavender oil',
  shortDescription: 'Calming oil',
  isActive: true,
  isFeatured: false,
  scentNotes: {},
  ingredients: ['lavender'],
  usageInstructions: 'Apply to pulse points.',
  createdAt: new Date(),
  updatedAt: new Date(),
  categoryId: 'cat1',
  brandId: 'brand1',
}

describe('ProductCard Component', () => {
  test('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />)

    expect(screen.getByText('Lavender Dreams')).toBeInTheDocument()
    expect(screen.getByText('$29.99')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /a bottle of lavender oil/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument()
  })
})
