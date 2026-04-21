import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import AboutPage from '@/app/about/page'

vi.mock('next/link', () => ({ default: ({ children }: any) => children }))
vi.mock('next/image', () => ({ default: (props: any) => <img alt={props.alt} /> }))

describe('About page content', () => {
  it('keeps The WAZA Manifesto section', () => {
    render(<AboutPage />)
    expect(
      screen.getByRole('heading', { name: /The WAZA Manifesto/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/Waza transcends simple definition/i)).toBeInTheDocument()
  })

  it('includes Operating Model section', () => {
    render(<AboutPage />)
    expect(
      screen.getByRole('heading', { name: /Operating Model/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/Practice Areas/i)).toBeInTheDocument()
    expect(screen.getByText(/Ways of Working/i)).toBeInTheDocument()
    expect(screen.getByText(/Committed Outcomes/i)).toBeInTheDocument()
  })
})