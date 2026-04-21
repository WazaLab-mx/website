import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'url'

const projectRoot = fileURLToPath(new URL('./', import.meta.url))

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/__tests__/**/*.{ts,tsx}'],
  },
  resolve: {
    alias: [
      { find: /^@\//, replacement: projectRoot },
    ],
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react',
  },
})