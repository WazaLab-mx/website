"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, MapPin, Phone } from "lucide-react";
import { Header } from "@/app/[locale]/components/ui/header";
import { Footer } from "@/app/[locale]/components/ui/footer";

export default function ContactPage() {
  const t = useTranslations("contact");
  const tNav = useTranslations("common.nav");

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] to-[#000000] z-0"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 z-0"></div>
          <div className="container relative z-10">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 border-transparent bg-[#212529]/10 text-[#212529] hover:bg-[#212529]/20">
                {t("hero.badge")}
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white">
                {t("hero.title")}
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                {t("hero.description")}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="container py-12 md:py-24">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#212529]/10 dark:bg-gray-800 text-[#212529] dark:text-gray-200">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">{t("info.email.title")}</h3>
              <p className="text-muted-foreground mb-4">
                {t("info.email.description")}
              </p>
              <a
                href={`mailto:${t("info.email.address")}`}
                className="text-[#212529] dark:text-gray-200 font-medium hover:underline"
              >
                {t("info.email.address")}
              </a>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">{t("info.phone.title")}</h3>
              <p className="text-muted-foreground mb-4">
                {t("info.phone.description")}
              </p>
              <a
                href="tel:+12345678901"
                className="text-[#D4AF37] font-medium hover:underline"
              >
                {t("info.phone.number")}
              </a>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#9B3A4C]/10 text-[#9B3A4C]">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">{t("info.location.title")}</h3>
              <p className="text-muted-foreground mb-4">
                {t("info.location.description")}
              </p>
              <p className="text-[#9B3A4C] font-medium">
                {t("info.location.address")}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="w-full py-20 md:py-32 bg-gradient-to-br from-[#000000] via-[#000000] to-[#0D0D0D] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/bg.png')] opacity-10 bg-cover bg-center"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#212529]/20 to-transparent"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="flex flex-col space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t("form.title")}{" "}
                  <span className="text-white">
                    {t("form.titleHighlight")}
                  </span>
                </h2>
                <p className="text-[#F9F7F7]/80 text-lg">
                  {t("form.description")}
                </p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="rounded-full bg-[#212529]/20 p-1">
                      <CheckCircle className="h-5 w-5 text-[#212529]" />
                    </div>
                    <span className="text-sm text-[#F9F7F7]/80">{t("form.freeConsultation")}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="rounded-full bg-[#D4AF37]/20 p-1">
                      <CheckCircle className="h-5 w-5 text-[#D4AF37]" />
                    </div>
                    <span className="text-sm text-[#F9F7F7]/80">{t("form.noCommitment")}</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#212529] to-[#9B3A4C] rounded-2xl opacity-70 blur-xl"></div>
                <div className="relative bg-[#0D0D0D]/80 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                  <form
                    action="https://docs.google.com/forms/u/0/d/e/1FAIpQLScJ0iIot46HUgSFv-4Uax_T18xFt2C7-xjGYGyvTBLifmEzMQ/formResponse"
                    method="POST"
                    target="_blank"
                    className="flex flex-col space-y-4"
                  >
                    <div>
                      <label htmlFor="name" className="text-sm font-medium text-[#F9F7F7]/80 mb-1 block">
                        {t("form.nameLabel")}
                      </label>
                      <input
                        id="name"
                        name="entry.967207055"
                        type="text"
                        placeholder={t("form.namePlaceholder")}
                        className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-[#F9F7F7]/50 focus:border-[#212529] focus:outline-none focus:ring-1 focus:ring-[#212529]"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-sm font-medium text-[#F9F7F7]/80 mb-1 block">
                        {t("form.emailLabel")}
                      </label>
                      <input
                        id="email"
                        name="entry.1990956720"
                        type="email"
                        placeholder={t("form.emailPlaceholder")}
                        className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-[#F9F7F7]/50 focus:border-[#212529] focus:outline-none focus:ring-1 focus:ring-[#212529]"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="text-sm font-medium text-[#F9F7F7]/80 mb-1 block">
                        {t("form.companyLabel")}
                      </label>
                      <input
                        id="company"
                        name="entry.356065313"
                        type="text"
                        placeholder={t("form.companyPlaceholder")}
                        className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-[#F9F7F7]/50 focus:border-[#212529] focus:outline-none focus:ring-1 focus:ring-[#212529]"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="text-sm font-medium text-[#F9F7F7]/80 mb-1 block">
                        {t("form.messageLabel")}
                      </label>
                      <textarea
                        id="message"
                        name="entry.839337160"
                        placeholder={t("form.messagePlaceholder")}
                        rows={4}
                        className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-[#F9F7F7]/50 focus:border-[#212529] focus:outline-none focus:ring-1 focus:ring-[#212529]"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#212529] to-[#212529]/80 hover:from-[#212529]/90 hover:to-[#212529]/70 text-white shadow-md py-6 text-base font-medium"
                    >
                      {t("form.submit")}
                    </Button>
                    <p className="text-xs text-[#F9F7F7]/70 text-center">
                      {t("form.terms")}{" "}
                      <Link
                        href="#"
                        className="underline underline-offset-2 text-[#F9F7F7] hover:text-[#212529] transition-colors"
                      >
                        {t("form.termsLink")}
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="container py-16 md:py-24">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6 dark:text-white">
              {t("social.title")}
            </h2>
            <p className="text-muted-foreground mb-8">
              {t("social.description")}
            </p>
            <div className="flex justify-center space-x-6">
              <a
                href="https://x.com/Waza_Baby"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-card shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/wazababy/"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-card shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a
                href="https://github.com/waza-agency"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-card shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
