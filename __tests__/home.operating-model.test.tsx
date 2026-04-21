import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

// Minimal shims for Next modules in tests
vi.mock('next/link', () => ({ default: ({ children }: any) => children }))
vi.mock('next/image', () => ({ default: (props: any) => <img alt={props.alt} /> }))

describe('Home Operating Model section', () => {
  it('renders Operating Model heading', () => {
    render(<Home />)
    expect(
      screen.getByRole('heading', { name: /Operating Model/i })
    ).toBeInTheDocument()
  })

  it('shows three pillars content', () => {
    render(<Home />)
    expect(screen.getByText(/Practice Areas/i)).toBeInTheDocument()
    expect(screen.getByText(/Ways of Working/i)).toBeInTheDocument()
    expect(screen.getByText(/Outcomes We Commit To/i)).toBeInTheDocument()
  })
})