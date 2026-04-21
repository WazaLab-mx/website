"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChevronLeft, Code, Brain, Sparkles, Users, Shield, Zap, Rocket, ArrowRight, Star, CheckCircle, MessageSquare, Mail, Phone, MapPin, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "../components/ui/header";

export default function ServicesPage() {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const router = useRouter();
  const t = useTranslations("services");

  const openPopup = (service: string) => {
    setActivePopup(service);
    // Prevent scrolling when popup is open
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    setActivePopup(null);
    // Restore scrolling when popup is closed
    document.body.style.overflow = 'auto';
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  const navigateToService = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        {/* Operating Model Banner */}
        <div className="border-b border-gray-200/40 dark:border-gray-800/40 bg-gray-50/60 dark:bg-gray-900/60 backdrop-blur supports-[backdrop-filter]:bg-gray-50/50 dark:supports-[backdrop-filter]:bg-gray-900/50">
          <div className="container py-4 text-center">
            <p className="text-sm text-gray-800 dark:text-gray-200">
              {t("banner.text")}{" "}
              <Link href="/about#operating-model" className="underline underline-offset-4 text-black dark:text-white hover:text-gray-800 dark:hover:text-gray-200">{t("banner.link")}</Link>.
            </p>
          </div>
        </div>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-white dark:bg-gray-950 z-0"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 grayscale z-0"></div>
          <div className="container relative z-10">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="inline-flex items-center rounded-lg border px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
                {t("hero.badge")}
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-black dark:text-white">
                {t("hero.title")}
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-800 dark:text-gray-200 md:text-xl leading-relaxed">
                {t("hero.description")}
              </p>
              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Button asChild className="bg-black hover:bg-gray-800 text-white shadow-md hover:shadow-lg rounded-md">
                  <Link href="#contact-form">{t("hero.cta")}</Link>
                </Button>
              </div>
              <div className="mt-12 animate-bounce">
                <Link href="#services" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
                  <ArrowRight className="h-8 w-8 rotate-90" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section id="services" className="container py-16 md:py-24">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-black dark:text-white">
              {t("grid.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-[700px] text-gray-800 dark:text-gray-200 md:text-xl">
              {t("grid.description")}
            </p>
          </div>
          <div className="grid gap-12 md:grid-cols-1 lg:grid-cols-2">
            {/* Smart Business Solutions */}
            <div
              onClick={() => navigateToService('/services/smart-business-solutions')}
              className="group relative overflow-hidden rounded-lg border-0 bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-800 opacity-0 transition-opacity duration-300 group-hover:opacity-5"></div>
              <div className="p-8">
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-4 text-black dark:text-white">
                    <Code className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold dark:text-white">{t("grid.items.0.title")}</h3>
                </div>
                <p className="mb-6 text-muted-foreground">
                  {t("grid.items.0.description")}
                </p>
                <div className="mb-6 space-y-4">
                  <h4 className="font-semibold dark:text-white">{t("grid.whatYouGet")}</h4>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.0.features.0")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.0.features.1")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.0.features.2")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.0.features.3")}</span>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-end">
                  <Button
                    asChild
                    className="bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border border-black dark:border-white"
                  >
                    <Link href="/services/smart-business-solutions" target="_blank" rel="noopener noreferrer">
                      {t("grid.learnMore")}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Personal AI Assistants */}
            <div
              onClick={() => navigateToService('/services/personal-ai-assistants')}
              className="group relative overflow-hidden rounded-lg border-0 bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-600 opacity-0 transition-opacity duration-300 group-hover:opacity-5"></div>
              <div className="p-8">
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-4 text-gray-800 dark:text-gray-200">
                    <Brain className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold dark:text-white">{t("grid.items.1.title")}</h3>
                </div>
                <p className="mb-6 text-muted-foreground">
                  {t("grid.items.1.description")}
                </p>
                <div className="mb-6 space-y-4">
                  <h4 className="font-semibold dark:text-white">{t("grid.whatYouGet")}</h4>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.1.features.0")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.1.features.1")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.1.features.2")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.1.features.3")}</span>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-end">
                  <Button
                    asChild
                    className="bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border border-black dark:border-white"
                  >
                    <Link href="/services/personal-ai-assistants" target="_blank" rel="noopener noreferrer">
                      {t("grid.learnMore")}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Smart Content Creation */}
            <div
              onClick={() => navigateToService('/services/smart-content-creation')}
              className="group relative overflow-hidden rounded-xl border-0 bg-white shadow-xl transition-all duration-300 hover:shadow-2xl dark:bg-gray-900 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
              <div className="p-8">
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-4 text-gray-800 dark:text-gray-200">
                    <Sparkles className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold dark:text-white">{t("grid.items.2.title")}</h3>
                </div>
                <p className="mb-6 text-muted-foreground">
                  {t("grid.items.2.description")}
                </p>
                <div className="mb-6 space-y-4">
                  <h4 className="font-semibold dark:text-white">{t("grid.whatYouGet")}</h4>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.2.features.0")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.2.features.1")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.2.features.2")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.2.features.3")}</span>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-end">
                  <Button
                    asChild
                    className="bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border border-black dark:border-white"
                  >
                    <Link href="/services/smart-content-creation" target="_blank" rel="noopener noreferrer">
                      {t("grid.learnMore")}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Customer Experience Enhancement */}
            <div
              onClick={() => navigateToService('/services/customer-experience')}
              className="group relative overflow-hidden rounded-xl border-0 bg-white shadow-xl transition-all duration-300 hover:shadow-2xl dark:bg-gray-900 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
              <div className="p-8">
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-4 text-black dark:text-white">
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold dark:text-white">{t("grid.items.3.title")}</h3>
                </div>
                <p className="mb-6 text-muted-foreground">
                  {t("grid.items.3.description")}
                </p>
                <div className="mb-6 space-y-4">
                  <h4 className="font-semibold dark:text-white">{t("grid.whatYouGet")}</h4>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.3.features.0")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.3.features.1")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.3.features.2")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.3.features.3")}</span>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-end">
                  <Button
                    asChild
                    className="bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border border-black dark:border-white"
                  >
                    <Link href="/services/customer-experience" target="_blank" rel="noopener noreferrer">
                      {t("grid.learnMore")}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Business Growth Tools */}
            <div
              onClick={() => navigateToService('/services/business-growth-tools')}
              className="group relative overflow-hidden rounded-xl border-0 bg-white shadow-xl transition-all duration-300 hover:shadow-2xl dark:bg-gray-900 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
              <div className="p-8">
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-4 text-gray-800 dark:text-gray-200">
                    <Shield className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold dark:text-white">{t("grid.items.4.title")}</h3>
                </div>
                <p className="mb-6 text-muted-foreground">
                  {t("grid.items.4.description")}
                </p>
                <div className="mb-6 space-y-4">
                  <h4 className="font-semibold dark:text-white">{t("grid.whatYouGet")}</h4>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.4.features.0")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.4.features.1")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.4.features.2")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.4.features.3")}</span>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-end">
                  <Button
                    asChild
                    className="bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border border-black dark:border-white"
                  >
                    <Link href="/services/business-growth-tools" target="_blank" rel="noopener noreferrer">
                      {t("grid.learnMore")}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Smart Business Insights */}
            <div
              onClick={() => navigateToService('/services/smart-business-insights')}
              className="group relative overflow-hidden rounded-xl border-0 bg-white shadow-xl transition-all duration-300 hover:shadow-2xl dark:bg-gray-900 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
              <div className="p-8">
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-4 text-gray-800 dark:text-gray-200">
                    <Zap className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold dark:text-white">{t("grid.items.5.title")}</h3>
                </div>
                <p className="mb-6 text-muted-foreground">
                  {t("grid.items.5.description")}
                </p>
                <div className="mb-6 space-y-4">
                  <h4 className="font-semibold dark:text-white">{t("grid.whatYouGet")}</h4>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.5.features.0")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.5.features.1")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.5.features.2")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.5.features.3")}</span>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-end">
                  <Button
                    asChild
                    className="bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border border-black dark:border-white"
                  >
                    <Link href="/services/smart-business-insights" target="_blank" rel="noopener noreferrer">
                      {t("grid.learnMore")}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Smart Work Automation */}
            <div
              onClick={() => navigateToService('/services/smart-work-automation')}
              className="group relative overflow-hidden rounded-xl border-0 bg-white shadow-xl transition-all duration-300 hover:shadow-2xl dark:bg-gray-900 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
              <div className="p-8">
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-4 text-black dark:text-white">
                    <Rocket className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold dark:text-white">{t("grid.items.6.title")}</h3>
                </div>
                <p className="mb-6 text-muted-foreground">
                  {t("grid.items.6.description")}
                </p>
                <div className="mb-6 space-y-4">
                  <h4 className="font-semibold dark:text-white">{t("grid.whatYouGet")}</h4>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.6.features.0")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.6.features.1")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.6.features.2")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.6.features.3")}</span>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-end">
                  <Button
                    asChild
                    className="bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border border-black dark:border-white"
                  >
                    <Link href="/services/smart-work-automation" target="_blank" rel="noopener noreferrer">
                      {t("grid.learnMore")}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* AI Agents Development and Customization */}
            <div
              onClick={() => navigateToService('/services/ai-agents-development')}
              className="group relative overflow-hidden rounded-xl border-0 bg-white shadow-xl transition-all duration-300 hover:shadow-2xl dark:bg-gray-900 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
              <div className="p-8">
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-4 text-black dark:text-white">
                    <Brain className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold dark:text-white">{t("grid.items.7.title")}</h3>
                </div>
                <p className="mb-6 text-muted-foreground">
                  {t("grid.items.7.description")}
                </p>
                <div className="mb-6 space-y-4">
                  <h4 className="font-semibold dark:text-white">{t("grid.whatYouGet")}</h4>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.7.features.0")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.7.features.1")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.7.features.2")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.7.features.3")}</span>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-end">
                  <Button
                    asChild
                    className="bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border border-black dark:border-white"
                  >
                    <Link href="/services/ai-agents-development" target="_blank" rel="noopener noreferrer">
                      {t("grid.learnMore")}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Web3 Development */}
            <div
              onClick={() => navigateToService('/services/web3-development')}
              className="group relative overflow-hidden rounded-xl border-0 bg-white shadow-xl transition-all duration-300 hover:shadow-2xl dark:bg-gray-900 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
              <div className="p-8">
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-4 text-gray-800 dark:text-gray-200">
                    <Code className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold dark:text-white">{t("grid.items.8.title")}</h3>
                </div>
                <p className="mb-6 text-muted-foreground">
                  {t("grid.items.8.description")}
                </p>
                <div className="mb-6 space-y-4">
                  <h4 className="font-semibold dark:text-white">{t("grid.whatYouGet")}</h4>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.8.features.0")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.8.features.1")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.8.features.2")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.8.features.3")}</span>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-end">
                  <Button
                    asChild
                    className="bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border border-black dark:border-white"
                  >
                    <Link href="/services/web3-development" target="_blank" rel="noopener noreferrer">
                      {t("grid.learnMore")}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* AI-Web3 Integration */}
            <div
              onClick={() => navigateToService('/services/ai-web3-integration')}
              className="group relative overflow-hidden rounded-xl border-0 bg-white shadow-xl transition-all duration-300 hover:shadow-2xl dark:bg-gray-900 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
              <div className="p-8">
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-4 text-gray-800 dark:text-gray-200">
                    <Sparkles className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold dark:text-white">{t("grid.items.9.title")}</h3>
                </div>
                <p className="mb-6 text-muted-foreground">
                  {t("grid.items.9.description")}
                </p>
                <div className="mb-6 space-y-4">
                  <h4 className="font-semibold dark:text-white">{t("grid.whatYouGet")}</h4>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.9.features.0")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.9.features.1")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.9.features.2")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("grid.items.9.features.3")}</span>
                    </li>
                  </ul>
                </div>
                <Button
                  onClick={() => openPopup('ai-web3-integration')}
                  className="w-full bg-black hover:bg-gray-800 text-white"
                >
                  {t("grid.learnMore")}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Training & Courses Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/bg.png')] opacity-10 bg-cover bg-center"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-600/20 to-transparent"></div>
          <div className="container">
            <div className="mb-12 text-center">
              <div className="inline-flex items-center rounded-full border border-gray-600/20 bg-gray-800/10 px-3 py-1 text-sm text-gray-300 mb-6">
                {t("training.badge")}
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                {t("training.title")}
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-gray-200 md:text-xl">
                {t("training.description")}
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* AI Fundamentals Course */}
              <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-gray-600/30 hover:bg-white/10">
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-full bg-gray-100 p-4 text-black">
                    <Brain className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold">{t("training.items.0.title")}</h3>
                </div>
                <p className="mb-6 text-gray-200">
                  {t("training.items.0.description")}
                </p>
                <ul className="mb-8 space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                    <span>{t("training.items.0.features.0")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                    <span>{t("training.items.0.features.1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                    <span>{t("training.items.0.features.2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                    <span>{t("training.items.0.features.3")}</span>
                  </li>
                </ul>
                <Button
                  onClick={() => openPopup('ai-fundamentals')}
                  className="w-full bg-black hover:bg-gray-800 text-white"
                >
                  {t("training.learnMore")}
                </Button>
              </div>

              {/* Web3 Development */}
              <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-gray-600/30 hover:bg-white/10">
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-full bg-gray-100 p-4 text-gray-800">
                    <Code className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold">{t("training.items.1.title")}</h3>
                </div>
                <p className="mb-6 text-gray-200">
                  {t("training.items.1.description")}
                </p>
                <ul className="mb-8 space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                    <span>{t("training.items.1.features.0")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                    <span>{t("training.items.1.features.1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                    <span>{t("training.items.1.features.2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                    <span>{t("training.items.1.features.3")}</span>
                  </li>
                </ul>
                <Button
                  onClick={() => openPopup('web3-dev')}
                  className="w-full bg-black hover:bg-gray-800 text-white"
                >
                  {t("training.learnMore")}
                </Button>
              </div>

              {/* AI-Web3 Integration */}
              <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-gray-600/30 hover:bg-white/10">
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-full bg-gray-100 p-4 text-gray-800">
                    <Sparkles className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold">{t("training.items.2.title")}</h3>
                </div>
                <p className="mb-6 text-gray-200">
                  {t("training.items.2.description")}
                </p>
                <div className="mb-6 space-y-4">
                  <h4 className="font-semibold dark:text-white">{t("training.items.2.whatYouGet")}</h4>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("training.items.2.features.0")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("training.items.2.features.1")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("training.items.2.features.2")}</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                      <span>{t("training.items.2.features.3")}</span>
                    </li>
                  </ul>
                </div>
                <Button
                  onClick={() => openPopup('ai-web3-integration')}
                  className="w-full bg-black hover:bg-gray-800 text-white"
                >
                  {t("training.learnMore")}
                </Button>
              </div>

              {/* AI for Creatives */}
              <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-gray-600/30 hover:bg-white/10">
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-full bg-gray-100 p-4 text-black">
                    <Sparkles className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold">{t("training.items.3.title")}</h3>
                </div>
                <p className="mb-6 text-gray-200">
                  {t("training.items.3.description")}
                </p>
                <ul className="mb-8 space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                    <span>{t("training.items.3.features.0")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                    <span>{t("training.items.3.features.1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                    <span>{t("training.items.3.features.2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black dark:text-white" />
                    <span>{t("training.items.3.features.3")}</span>
                  </li>
                </ul>
                <Button
                  onClick={() => openPopup('ai-creatives')}
                  className="w-full bg-black hover:bg-gray-800 text-white"
                >
                  {t("training.learnMore")}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        {/* Temporarily hidden
        <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                What Our Clients Say
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-gray-700 md:text-xl dark:text-gray-300">
                Hear from organizations that have transformed their operations with WAZA's AI-native technology.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-gray-700 text-gray-700" />
                    ))}
                  </div>
                  <p className="mb-4 text-muted-foreground italic">
                    "WAZA's AI-native development approach has completely transformed our digital infrastructure. The system continuously learns and improves, delivering increasing value without requiring constant redevelopment."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gray-800/10 flex items-center justify-center">
                      <span className="text-gray-700 font-bold">JD</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">John Doe</h4>
                      <p className="text-sm text-muted-foreground">CTO, Financial Services</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-gray-600 text-gray-600" />
                    ))}
                  </div>
                  <p className="mb-4 text-muted-foreground italic">
                    "The custom AI agents we implemented have revolutionized our creative workflow. They function as true collaborators, learning from our interactions and anticipating our needs. The results have been transformative."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gray-800/10 flex items-center justify-center">
                      <span className="text-gray-600 font-bold">AS</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Alex Smith</h4>
                      <p className="text-sm text-muted-foreground">Creative Director, Design Agency</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-gray-600 text-gray-600" />
                    ))}
                  </div>
                  <p className="mb-4 text-muted-foreground italic">
                    "Our predictive analytics solution has given us unprecedented insights into our supply chain. The system continuously learns and improves, helping us anticipate disruptions before they occur. The ROI has been exceptional."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gray-800/10 flex items-center justify-center">
                      <span className="text-gray-600 font-bold">MJ</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Maria Johnson</h4>
                      <p className="text-sm text-muted-foreground">Operations Director, Logistics</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        */}

        {/* Why Choose Us Section */}
        <section className="container py-16 md:py-24">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-black dark:text-white">
              {t("whyChoose.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              {t("whyChoose.description")}
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6">
              <div className="mb-4 rounded-full bg-gray-800/10 p-4">
                <Brain className="h-8 w-8 text-gray-700 dark:text-gray-300" />
              </div>
              <h3 className="mb-2 text-xl font-bold">{t("whyChoose.items.0.title")}</h3>
              <p className="text-muted-foreground">
                {t("whyChoose.items.0.description")}
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="mb-4 rounded-full bg-gray-800/10 p-4">
                <Code className="h-8 w-8 text-gray-700 dark:text-gray-300" />
              </div>
              <h3 className="mb-2 text-xl font-bold">{t("whyChoose.items.1.title")}</h3>
              <p className="text-muted-foreground">
                {t("whyChoose.items.1.description")}
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="mb-4 rounded-full bg-gray-800/10 p-4">
                <Shield className="h-8 w-8 text-gray-700 dark:text-gray-300" />
              </div>
              <h3 className="mb-2 text-xl font-bold">{t("whyChoose.items.2.title")}</h3>
              <p className="text-muted-foreground">
                {t("whyChoose.items.2.description")}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact-form" className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                  {t("contact.title")}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t("contact.description")}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                    <span>{t("contact.email")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                    <span>{t("contact.location")}</span>
                  </div>
                </div>
              </div>
              <Card className="border-0 shadow-xl">
                <CardContent className="p-6">
                  <form className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t("contact.form.name")}</Label>
                        <Input id="name" placeholder={t("contact.form.namePlaceholder")} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t("contact.form.emailLabel")}</Label>
                        <Input id="email" type="email" placeholder={t("contact.form.emailPlaceholder")} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">{t("contact.form.company")}</Label>
                      <Input id="company" placeholder={t("contact.form.companyPlaceholder")} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">{t("contact.form.service")}</Label>
                      <select id="service" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                        <option value="">{t("contact.form.servicePlaceholder")}</option>
                        <option value="ai-native-development">{t("contact.form.serviceOptions.0")}</option>
                        <option value="custom-ai-agents">{t("contact.form.serviceOptions.1")}</option>
                        <option value="generative-ai-solutions">{t("contact.form.serviceOptions.2")}</option>
                        <option value="digital-experience-design">{t("contact.form.serviceOptions.3")}</option>
                        <option value="self-recursive-systems">{t("contact.form.serviceOptions.4")}</option>
                        <option value="predictive-analytics">{t("contact.form.serviceOptions.5")}</option>
                        <option value="ai-powered-automation">{t("contact.form.serviceOptions.6")}</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">{t("contact.form.message")}</Label>
                      <Textarea id="message" placeholder={t("contact.form.messagePlaceholder")} className="min-h-[120px]" />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white shadow-md">
                      {t("contact.form.submit")}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-16 md:py-24">
          <div className="rounded-xl bg-gradient-to-r from-black to-gray-800 p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              {t("cta.title")}
            </h2>
            <p className="mx-auto mb-8 max-w-[600px] text-gray-200 md:text-xl">
              {t("cta.description")}
            </p>
            <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center">
              <Button asChild className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white shadow-md">
                <Link href="#contact-form">{t("cta.button")}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              {t("footer.builtBy")}{" "}
              <a
                href="https://waza.ai"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                WAZA
              </a>
              . {t("footer.sourceCode")}{" "}
              <a
                href="https://github.com/waza-agency"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </footer>

      {/* Popup Modals */}
      {activePopup && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
          onClick={handleBackdropClick}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePopup}
              className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              <X className="h-6 w-6" />
            </button>

            {activePopup === 'ai-fundamentals' && (
              <>
                <h3 className="mb-4 text-2xl font-bold text-black dark:text-white">{t("popups.aiFundamentals.title")}</h3>
                <div className="mb-6">
                  <h4 className="mb-2 font-semibold">{t("popups.aiFundamentals.courseDetails")}</h4>
                  <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                    <p className="mb-4 text-muted-foreground">
                      <strong>{t("popups.aiFundamentals.programTitle")}</strong><br />
                      {t("popups.aiFundamentals.programDescription")}
                    </p>
                    <p className="text-muted-foreground">
                      {t("popups.aiFundamentals.programNote")}
                    </p>
                    <p className="mt-4 text-muted-foreground">
                      <strong>{t("popups.aiFundamentals.modulesTitle")}</strong>
                      <ul className="mt-2 space-y-1">
                        <li>{t("popups.aiFundamentals.modules.0")}</li>
                        <li>{t("popups.aiFundamentals.modules.1")}</li>
                        <li>{t("popups.aiFundamentals.modules.2")}</li>
                        <li>{t("popups.aiFundamentals.modules.3")}</li>
                        <li>{t("popups.aiFundamentals.modules.4")}</li>
                      </ul>
                    </p>
                    <p className="mt-4 text-muted-foreground">
                      <strong>{t("popups.aiFundamentals.duration")}</strong> {t("popups.aiFundamentals.durationValue")}<br />
                      <strong>{t("popups.aiFundamentals.format")}</strong> {t("popups.aiFundamentals.formatValue")}<br />
                      <strong>{t("popups.aiFundamentals.prerequisites")}</strong> {t("popups.aiFundamentals.prerequisitesValue")}
                    </p>
                  </div>
                </div>
              </>
            )}

            {activePopup === 'web3-dev' && (
              <>
                <h3 className="mb-4 text-2xl font-bold text-black dark:text-white">{t("popups.web3Dev.title")}</h3>
                <div className="mb-6">
                  <h4 className="mb-2 font-semibold">{t("popups.web3Dev.courseDetails")}</h4>
                  <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                    <p className="mb-4 text-muted-foreground">
                      <strong>{t("popups.web3Dev.programTitle")}</strong><br />
                      {t("popups.web3Dev.programDescription")}
                    </p>
                    <p className="text-muted-foreground">
                      {t("popups.web3Dev.programNote")}
                    </p>
                    <p className="mt-4 text-muted-foreground">
                      <strong>{t("popups.web3Dev.modulesTitle")}</strong>
                      <ul className="mt-2 space-y-1">
                        <li>{t("popups.web3Dev.modules.0")}</li>
                        <li>{t("popups.web3Dev.modules.1")}</li>
                        <li>{t("popups.web3Dev.modules.2")}</li>
                        <li>{t("popups.web3Dev.modules.3")}</li>
                        <li>{t("popups.web3Dev.modules.4")}</li>
                      </ul>
                    </p>
                    <p className="mt-4 text-muted-foreground">
                      <strong>{t("popups.web3Dev.duration")}</strong> {t("popups.web3Dev.durationValue")}<br />
                      <strong>{t("popups.web3Dev.format")}</strong> {t("popups.web3Dev.formatValue")}<br />
                      <strong>{t("popups.web3Dev.prerequisites")}</strong> {t("popups.web3Dev.prerequisitesValue")}
                    </p>
                  </div>
                </div>
              </>
            )}

            {activePopup === 'ai-web3-integration' && (
              <>
                <h3 className="mb-4 text-2xl font-bold text-black dark:text-white">{t("popups.aiWeb3Integration.title")}</h3>
                <div className="mb-6">
                  <h4 className="mb-2 font-semibold">{t("popups.aiWeb3Integration.courseDetails")}</h4>
                  <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                    <p className="mb-4 text-muted-foreground">
                      <strong>{t("popups.aiWeb3Integration.programTitle")}</strong><br />
                      {t("popups.aiWeb3Integration.programDescription")}
                    </p>
                    <p className="text-muted-foreground">
                      {t("popups.aiWeb3Integration.programNote")}
                    </p>
                    <p className="mt-4 text-muted-foreground">
                      <strong>{t("popups.aiWeb3Integration.modulesTitle")}</strong>
                      <ul className="mt-2 space-y-1">
                        <li>{t("popups.aiWeb3Integration.modules.0")}</li>
                        <li>{t("popups.aiWeb3Integration.modules.1")}</li>
                        <li>{t("popups.aiWeb3Integration.modules.2")}</li>
                        <li>{t("popups.aiWeb3Integration.modules.3")}</li>
                        <li>{t("popups.aiWeb3Integration.modules.4")}</li>
                      </ul>
                    </p>
                    <p className="mt-4 text-muted-foreground">
                      <strong>{t("popups.aiWeb3Integration.duration")}</strong> {t("popups.aiWeb3Integration.durationValue")}<br />
                      <strong>{t("popups.aiWeb3Integration.format")}</strong> {t("popups.aiWeb3Integration.formatValue")}<br />
                      <strong>{t("popups.aiWeb3Integration.prerequisites")}</strong> {t("popups.aiWeb3Integration.prerequisitesValue")}
                    </p>
                  </div>
                </div>
              </>
            )}

            {activePopup === 'ai-creatives' && (
              <>
                <h3 className="mb-4 text-2xl font-bold text-black dark:text-white">{t("popups.aiCreatives.title")}</h3>
                <div className="mb-6">
                  <h4 className="mb-2 font-semibold">{t("popups.aiCreatives.courseDetails")}</h4>
                  <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                    <p className="mb-4 text-muted-foreground">
                      <strong>{t("popups.aiCreatives.programTitle")}</strong><br />
                      {t("popups.aiCreatives.programDescription")}
                    </p>
                    <p className="text-muted-foreground">
                      {t("popups.aiCreatives.programNote")}
                    </p>
                    <p className="mt-4 text-muted-foreground">
                      <strong>{t("popups.aiCreatives.modulesTitle")}</strong>
                      <ul className="mt-2 space-y-1">
                        <li>{t("popups.aiCreatives.modules.0")}</li>
                        <li>{t("popups.aiCreatives.modules.1")}</li>
                        <li>{t("popups.aiCreatives.modules.2")}</li>
                        <li>{t("popups.aiCreatives.modules.3")}</li>
                        <li>{t("popups.aiCreatives.modules.4")}</li>
                      </ul>
                    </p>
                    <p className="mt-4 text-muted-foreground">
                      <strong>{t("popups.aiCreatives.duration")}</strong> {t("popups.aiCreatives.durationValue")}<br />
                      <strong>{t("popups.aiCreatives.format")}</strong> {t("popups.aiCreatives.formatValue")}<br />
                      <strong>{t("popups.aiCreatives.prerequisites")}</strong> {t("popups.aiCreatives.prerequisitesValue")}
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Other existing popups */}
            {activePopup === 'ai-native' && (
              <>
                <h3 className="mb-4 text-2xl font-bold text-black dark:text-white">{t("popups.aiNative.title")}</h3>
                <div className="mb-6">
                  <h4 className="mb-2 font-semibold">{t("popups.aiNative.howItWorks")}</h4>
                  <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                    <p className="mb-4 text-muted-foreground">
                      <strong>{t("popups.aiNative.exampleTitle")}</strong><br />
                      {t("popups.aiNative.exampleDescription")}
                    </p>
                    <p className="text-muted-foreground">
                      {t("popups.aiNative.exampleNote")}
                    </p>
                    <p className="mt-4 text-muted-foreground">
                      <strong>{t("popups.aiNative.benefitsTitle")}</strong>
                      <ul className="mt-2 space-y-1">
                        <li>{t("popups.aiNative.benefits.0")}</li>
                        <li>{t("popups.aiNative.benefits.1")}</li>
                        <li>{t("popups.aiNative.benefits.2")}</li>
                        <li>{t("popups.aiNative.benefits.3")}</li>
                      </ul>
                    </p>
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-end">
              <Button onClick={closePopup} className="bg-black text-white hover:bg-gray-800">
                {t("popups.close")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}