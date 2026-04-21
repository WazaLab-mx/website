import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ServicesPage from '@/app/services/page'

vi.mock('next/link', () => ({ default: ({ children }: any) => children }))

describe('Services page operating model banner', () => {
  it('renders the banner linking to About → Operating Model', () => {
    render(<ServicesPage />)
    expect(
      screen.getByText(/We’ve updated our operating model/i)
    ).toBeInTheDocument()
    expect(screen.getByText(/About → Operating Model/i)).toBeInTheDocument()
  })
})