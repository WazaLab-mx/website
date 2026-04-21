"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { useState, useEffect } from "react";

export function Header() {
  const t = useTranslations("common.nav");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 100) {
        setIsVisible(true);
      } else if (e.clientY > 160) {
        setIsVisible(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    const initialHideTimer = setTimeout(() => setIsVisible(false), 2500);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      clearTimeout(initialHideTimer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) setIsVisible(true);
  }, [isMobileMenuOpen]);

  const navItems = [
    { href: "/services", label: t("services") },
    { href: "/projects", label: t("projects") },
    { href: "/calculator", label: t("calculator") },
    { href: "/about", label: t("about") },
  ];

  return (
    <header
      className={`
        fixed top-0 z-50 w-full transition-all duration-500 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}
        ${isScrolled
          ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-lg'
          : 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-transparent'
        }
        border-b border-gray-200/30 dark:border-gray-800/30 supports-[backdrop-filter]:bg-white/85 dark:supports-[backdrop-filter]:bg-gray-950/85
      `}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-300/30 dark:via-gray-700/30 to-transparent" />

      <div className="container flex h-20 md:h-24 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link
            href="/"
            className="group flex items-center space-x-2 premium-focus"
            aria-label={t("home")}
          >
            <span className="inline-block font-bold text-2xl text-black dark:text-white transition-all duration-300">
              WAZA
            </span>
            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="
                  relative px-3 py-2 text-sm font-medium
                  transition-all duration-300 ease-out
                  text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white premium-focus
                  before:absolute before:inset-0 before:rounded-lg
                  before:bg-gray-100/50 dark:before:bg-gray-800/50
                  before:opacity-0 before:transition-opacity before:duration-300
                  hover:before:opacity-100
                  after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0
                  after:bg-gradient-to-r after:from-red-600 after:to-red-400
                  after:transition-all after:duration-300 after:ease-out
                  hover:after:w-full hover:after:left-0
                "
              >
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}

            <div className="ml-4 flex items-center space-x-2">
              <LanguageSwitcher />
              <ThemeToggle />
              <Button
                asChild
                className="
                  btn-premium relative overflow-hidden
                  bg-red-600 hover:bg-red-700
                  text-white shadow-md hover:shadow-lg
                  transition-all duration-300 ease-out
                  border-0 group rounded-md
                "
              >
                <Link
                  href="/#cta"
                  className="flex items-center space-x-1 relative z-10"
                >
                  <span>{t("getStarted")}</span>
                </Link>
              </Button>
            </div>
          </nav>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="
                  md:hidden relative overflow-hidden
                  bg-white/90 dark:bg-gray-950/90 border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white
                  transition-all duration-300 ease-out
                  premium-focus rounded-md
                  text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white
                "
              >
                <Menu className="h-5 w-5 transition-transform duration-300 ease-out" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="
                w-[320px] sm:w-[400px] bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl
                border-l border-gray-200/40 dark:border-gray-800/40
              "
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 dark:from-gray-900/50 via-transparent to-gray-100/30 dark:to-gray-800/30" />

              <nav className="relative z-10 flex flex-col gap-2 mt-8">
                {navItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      stagger-fade-in stagger-${index + 1}
                      text-lg font-medium p-3 rounded-md
                      transition-all duration-300 ease-out
                      text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white premium-focus
                      hover:bg-gray-50/50 dark:hover:bg-gray-800/50 hover:backdrop-blur-sm
                      ${isMobileMenuOpen ? 'visible' : ''}
                    `}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="mt-6 space-y-4">
                  <div className="flex justify-center gap-4">
                    <LanguageSwitcher />
                    <ThemeToggle />
                  </div>
                  <Button
                    asChild
                    className="
                      w-full btn-premium
                      bg-red-600 hover:bg-red-700
                      text-white shadow-md group rounded-md
                    "
                  >
                    <Link
                      href="/#cta"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center space-x-2"
                    >
                      <span>{t("getStarted")}</span>
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {isScrolled && (
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-300/40 dark:via-gray-700/40 to-transparent" />
      )}
    </header>
  );
}
