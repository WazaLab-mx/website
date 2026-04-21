import '@testing-library/jest-dom'

// Silence Next.js Image warnings in tests
Object.defineProperty(globalThis, 'IntersectionObserver', {
  writable: true,
  value: class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  },
})

// Mock next/navigation for useRouter in app router components
vi.mock('next/navigation', async () => {
  return {
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      refresh: vi.fn(),
      back: vi.fn(),
      prefetch: vi.fn(),
    }),
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
  }
})

// Mock HTMLMediaElement methods not implemented by jsdom
Object.defineProperty(window.HTMLMediaElement.prototype, 'play', {
  configurable: true,
  // @ts-expect-error: jsdom environment
  value: vi.fn(() => Promise.resolve()),
})

Object.defineProperty(window.HTMLMediaElement.prototype, 'pause', {
  configurable: true,
  // @ts-expect-error: jsdom environment
  value: vi.fn(() => {}),
})