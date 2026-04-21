"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = resolvedTheme === "dark"

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <div
      className="flex items-center space-x-2 p-1 rounded-lg transition-all duration-300 hover:bg-muted/50 group cursor-pointer"
      role="group"
      aria-label="Theme toggle"
    >
      <Sun 
        className={`h-4 w-4 transition-all duration-300 group-hover:scale-105 ${
          !isDark 
            ? "text-foreground scale-110" 
            : "text-muted-foreground scale-90 opacity-60 group-hover:opacity-80"
        }`} 
        aria-hidden="true"
      />
      <Switch
        checked={isDark}
        onCheckedChange={handleToggle}
        disabled={!mounted}
        className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input transition-all duration-300 hover:scale-105 hover:shadow-sm"
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      />
      <Moon 
        className={`h-4 w-4 transition-all duration-300 group-hover:scale-105 ${
          isDark 
            ? "text-foreground scale-110" 
            : "text-muted-foreground scale-90 opacity-60 group-hover:opacity-80"
        }`} 
        aria-hidden="true"
      />
    </div>
  )
} 