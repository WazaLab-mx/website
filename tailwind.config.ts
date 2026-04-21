import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Professional Black & White Palette
        "soothing-white": "#FFFFFF",
        "soothing-light": "#F8F9FA", 
        "soothing-gray-50": "#F8F9FA",
        "soothing-gray-100": "#E9ECEF",
        "soothing-gray-200": "#DEE2E6",
        "soothing-gray-300": "#CED4DA",
        "soothing-gray-400": "#ADB5BD",
        "soothing-gray-500": "#6C757D",
        "soothing-gray-600": "#495057",
        "soothing-gray-700": "#343A40",
        "soothing-gray-800": "#212529",
        "soothing-gray-900": "#000000",
        
        // Monochrome Indigo Palette (mapped to grays)
        "soothing-indigo-50": "#F8F9FA",
        "soothing-indigo-100": "#E9ECEF",
        "soothing-indigo-200": "#DEE2E6",
        "soothing-indigo-300": "#CED4DA",
        "soothing-indigo-400": "#ADB5BD",
        "soothing-indigo-500": "#6C757D",
        "soothing-indigo-600": "#495057",
        "soothing-indigo-700": "#343A40",
        "soothing-indigo-800": "#212529",
        "soothing-indigo-900": "#000000",
        
        // Monochrome Green Palette (mapped to grays)
        "soothing-green-50": "#F8F9FA",
        "soothing-green-100": "#E9ECEF",
        "soothing-green-200": "#DEE2E6",
        "soothing-green-300": "#CED4DA",
        "soothing-green-400": "#ADB5BD",
        "soothing-green-500": "#6C757D",
        "soothing-green-600": "#495057",
        "soothing-green-700": "#343A40",
        "soothing-green-800": "#212529",
        "soothing-green-900": "#000000",
        
        // Monochrome Amber Palette (mapped to grays)
        "soothing-amber-50": "#F8F9FA",
        "soothing-amber-100": "#E9ECEF",
        "soothing-amber-200": "#DEE2E6",
        "soothing-amber-300": "#CED4DA",
        "soothing-amber-400": "#ADB5BD",
        "soothing-amber-500": "#6C757D",
        "soothing-amber-600": "#495057",
        "soothing-amber-700": "#343A40",
        "soothing-amber-800": "#212529",
        "soothing-amber-900": "#000000",
        
        // Monochrome Purple Palette (mapped to grays)
        "soothing-purple-50": "#F8F9FA",
        "soothing-purple-100": "#E9ECEF",
        "soothing-purple-200": "#DEE2E6",
        "soothing-purple-300": "#CED4DA",
        "soothing-purple-400": "#ADB5BD",
        "soothing-purple-500": "#6C757D",
        "soothing-purple-600": "#495057",
        "soothing-purple-700": "#343A40",
        "soothing-purple-800": "#212529",
        "soothing-purple-900": "#000000",
        
        // Professional Brand Colors
        "soothing-primary": "#000000",      // Pure black
        "soothing-secondary": "#6C757D",    // Medium gray
        "soothing-accent": "#343A40",       // Dark gray
        "soothing-background": "#FFFFFF",   // Pure white
        "soothing-surface": "#FFFFFF",      // Pure white
        
        // Legacy aliases for compatibility (mapped to monochrome)
        "waza-black": "#000000",
        "waza-black-soft": "#212529", 
        "waza-gray-900": "#000000",
        "waza-gray-800": "#212529",
        "waza-gray-700": "#343A40",
        "waza-gray-600": "#495057",
        "waza-purple-900": "#000000",
        "waza-purple-700": "#343A40", 
        "waza-purple-600": "#495057",
        "waza-purple-500": "#6C757D",
        "waza-purple-400": "#ADB5BD",
        "waza-yellow-500": "#6C757D",
        "waza-yellow-400": "#ADB5BD",
        "waza-yellow-300": "#CED4DA",
        "waza-yellow-600": "#495057",
        "waza-primary": "#000000",
        "waza-secondary": "#6C757D",
        "waza-accent": "#343A40",
        "waza-background": "#FFFFFF",
        "waza-surface": "#FFFFFF",
        
        // Vaporwave compatibility (mapped to monochrome)
        "vaporwave-black": "#000000",
        "vaporwave-navy": "#212529", 
        "vaporwave-dark": "#343A40",
        "vaporwave-darker": "#495057",
        "vaporwave-gray-900": "#000000",
        "vaporwave-gray-800": "#212529",
        "vaporwave-gray-700": "#343A40",
        "vaporwave-gray-600": "#495057",
        "vaporwave-pink-neon": "#6C757D",
        "vaporwave-cyan-500": "#ADB5BD",
        "vaporwave-purple-700": "#343A40",
        "vaporwave-primary": "#000000",
        "vaporwave-secondary": "#6C757D",
        "vaporwave-accent": "#343A40",
        "vaporwave-background": "#FFFFFF",
        "vaporwave-surface": "#FFFFFF"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)", 
        sm: "calc(var(--radius) - 4px)",
        "none": "0",
        "sm": "0.125rem",    // 2px - minimal rounding
        "DEFAULT": "0.25rem", // 4px - subtle rounding
        "md": "0.375rem",    // 6px - moderate rounding
        "lg": "0.5rem",      // 8px - larger rounding only when needed
        "xl": "0.75rem",     // 12px - for special elements
        "2xl": "1rem",       // 16px - rare use
        "3xl": "1.5rem",     // 24px - very rare
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "flicker": {
          "0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%": { opacity: "0.99", filter: "brightness(1)" },
          "20%, 21.999%, 63%, 63.999%, 65%, 69.999%": { opacity: "0.4", filter: "brightness(0.8)" }
        },
        "neon-flicker": {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": {
            opacity: "0.99",
            filter: "brightness(1) drop-shadow(0 0 5px rgba(212, 175, 55, 0.6)) drop-shadow(0 0 8px rgba(124, 45, 62, 0.4))"
          },
          "20%, 22%, 24%, 55%": {
            opacity: "0.2",
            filter: "brightness(0.6) drop-shadow(0 0 0px rgba(212, 175, 55, 0))"
          }
        },
        "vhs-r": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(2px)" }
        },
        "vhs-g": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-2px)" }
        },
        "vhs-b": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(1px)" }
        },
        "vhs-noise": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.6" }
        },
        "vhs-scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" }
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        "neon-glow": {
          "0%, 100%": { 
            filter: "drop-shadow(0 0 5px currentColor) drop-shadow(0 0 10px currentColor)",
            opacity: "1" 
          },
          "50%": { 
            filter: "drop-shadow(0 0 10px currentColor) drop-shadow(0 0 20px currentColor)",
            opacity: "0.8" 
          }
        },
        "synthwave-gradient": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" }
        },
        "cyber-scan": {
          "0%": { transform: "translateY(-100%) scaleY(0.1)" },
          "10%": { transform: "translateY(-100%) scaleY(1)" },
          "90%": { transform: "translateY(100vh) scaleY(1)" },
          "100%": { transform: "translateY(100vh) scaleY(0.1)" }
        },
        "grid-glow": {
          "0%, 100%": { 
            opacity: "0.3",
            filter: "brightness(1)" 
          },
          "50%": { 
            opacity: "0.6",
            filter: "brightness(1.2)" 
          }
        },
        "neon-border": {
          "0%, 100%": { 
            boxShadow: "0 0 5px currentColor, inset 0 0 5px currentColor" 
          },
          "50%": { 
            boxShadow: "0 0 20px currentColor, inset 0 0 10px currentColor" 
          }
        },
        "electric-pulse": {
          "0%": { 
            transform: "scale(1)",
            filter: "brightness(1) hue-rotate(0deg)"
          },
          "25%": {
            transform: "scale(1.02)",
            filter: "brightness(1.1) hue-rotate(5deg)"
          },
          "50%": {
            transform: "scale(1.05)",
            filter: "brightness(1.2) hue-rotate(10deg)"
          },
          "75%": {
            transform: "scale(1.02)",
            filter: "brightness(1.1) hue-rotate(5deg)"
          },
          "100%": {
            transform: "scale(1)",
            filter: "brightness(1) hue-rotate(0deg)"
          }
        },
        "retro-flicker": {
          "0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%": { 
            opacity: "1",
            filter: "brightness(1) contrast(1)"
          },
          "20%, 21.999%, 63%, 63.999%, 65%, 69.999%": { 
            opacity: "0.8",
            filter: "brightness(0.9) contrast(1.1)"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "flicker": "flicker 4s linear infinite",
        "neon-flicker": "neon-flicker 7s linear infinite",
        "vhs-r": "vhs-r 0.5s infinite",
        "vhs-g": "vhs-g 0.5s infinite",
        "vhs-b": "vhs-b 0.5s infinite",
        "vhs-noise": "vhs-noise 0.2s infinite",
        "vhs-scan": "vhs-scan 8s linear infinite",
        "float": "float 3s ease-in-out infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        "rotate-slow": "rotate-slow 8s linear infinite",
        "neon-glow": "neon-glow 2s ease-in-out infinite",
        "synthwave-gradient": "synthwave-gradient 8s ease infinite",
        "cyber-scan": "cyber-scan 12s linear infinite",
        "grid-glow": "grid-glow 4s ease-in-out infinite",
        "neon-border": "neon-border 3s ease-in-out infinite",
        "electric-pulse": "electric-pulse 2.5s ease-in-out infinite",
        "retro-flicker": "retro-flicker 0.15s infinite linear alternate"
      },
      backdropBlur: {
        xs: "2px",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'inherit',
            a: {
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: '500',
            },
            strong: {
              color: 'inherit',
            },
            code: {
              color: 'inherit',
            },
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'),
  ],
} satisfies Config

export default config
