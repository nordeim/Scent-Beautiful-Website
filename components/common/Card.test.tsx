// components/common/Card.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from './Card'

describe('Card Component', () => {
  test('renders all parts of the card correctly', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card content goes here.</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>,
    )

    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card content goes here.')).toBeInTheDocument()
    expect(screen.getByText('Card Footer')).toBeInTheDocument()
  })
})
