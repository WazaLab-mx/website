"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = resolvedTheme === "dark"

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={!mounted}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className="flex items-center gap-2 p-1 rounded-lg transition-all duration-300 hover:bg-muted/50 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Sun
        className={`h-4 w-4 transition-all duration-300 group-hover:scale-105 ${
          !isDark
            ? "text-foreground scale-110"
            : "text-muted-foreground scale-90 opacity-60 group-hover:opacity-80"
        }`}
        aria-hidden="true"
      />
      <span
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
          isDark ? "bg-primary" : "bg-input"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-background shadow-sm transition-transform ${
            isDark ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </span>
      <Moon
        className={`h-4 w-4 transition-all duration-300 group-hover:scale-105 ${
          isDark
            ? "text-foreground scale-110"
            : "text-muted-foreground scale-90 opacity-60 group-hover:opacity-80"
        }`}
        aria-hidden="true"
      />
    </button>
  )
}
