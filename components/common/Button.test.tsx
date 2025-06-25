// components/common/Button.test.tsx
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Button } from './Button'

describe('Button Component', () => {
  test('renders with default props', () => {
    render(<Button>Click Me</Button>)
    const buttonElement = screen.getByRole('button', { name: /click me/i })
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveClass('bg-sage') // Primary variant
  })

  test('applies secondary variant classes', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const buttonElement = screen.getByRole('button', { name: /secondary/i })
    expect(buttonElement).toHaveClass('border-sage')
  })

  test('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Clickable</Button>)
    const buttonElement = screen.getByRole('button', { name: /clickable/i })
    fireEvent.click(buttonElement)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('is disabled when the disabled prop is true', () => {
    const handleClick = jest.fn()
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>,
    )
    const buttonElement = screen.getByRole('button', { name: /disabled/i })
    expect(buttonElement).toBeDisabled()
    fireEvent.click(buttonElement)
    expect(handleClick).not.toHaveBeenCalled()
  })
})
