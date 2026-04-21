"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Brain, Code, Mail, MapPin, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Header } from "../components/ui/header";
import { Footer } from "../components/ui/footer";
import { ServiceCard } from "./components/ServiceCard";
import { TrainingCard } from "./components/TrainingCard";
import { CoursePopup } from "./components/CoursePopup";
import { usePopup } from "./components/usePopup";
import { SERVICES, TRAININGS } from "./services.config";

const CONTACT_SERVICE_OPTIONS = [0, 1, 2, 3, 4, 5, 6] as const;
const WHY_CHOOSE_ICONS = [Brain, Code, Shield] as const;

export default function ServicesPage() {
  const t = useTranslations("services");
  const { activePopup, openPopup, closePopup } = usePopup();

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      <Header />

      <main className="flex-1">
        {/* Operating Model Banner */}
        <div className="border-b border-gray-200/40 dark:border-gray-800/40 bg-gray-50/60 dark:bg-gray-900/60 backdrop-blur">
          <div className="container py-4 text-center">
            <p className="text-sm text-gray-800 dark:text-gray-200">
              {t("banner.text")}{" "}
              <Link
                href="/about#operating-model"
                className="underline underline-offset-4 text-black dark:text-white hover:text-gray-800 dark:hover:text-gray-200"
              >
                {t("banner.link")}
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Hero */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-white dark:bg-gray-950 z-0" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 grayscale z-0" />
          <div className="container relative z-10">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="inline-flex items-center rounded-lg border px-4 py-2 text-sm font-medium border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
                {t("hero.badge")}
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-black dark:text-white">
                {t("hero.title")}
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-800 dark:text-gray-200 md:text-xl leading-relaxed">
                {t("hero.description")}
              </p>
              <Button
                asChild
                className="bg-black hover:bg-gray-800 text-white shadow-md hover:shadow-lg rounded-md"
              >
                <Link href="#contact-form">{t("hero.cta")}</Link>
              </Button>
              <div className="mt-12 animate-bounce">
                <Link
                  href="#services"
                  className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                >
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
            {SERVICES.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </section>

        {/* Training & Courses */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/bg.png')] opacity-10 bg-cover bg-center" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-600/20 to-transparent" />
          <div className="container relative">
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
              {TRAININGS.map((training) => (
                <TrainingCard
                  key={training.popupId}
                  training={training}
                  onOpenPopup={openPopup}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
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
            {WHY_CHOOSE_ICONS.map((Icon, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6">
                <div className="mb-4 rounded-full bg-gray-800/10 p-4">
                  <Icon className="h-8 w-8 text-gray-700 dark:text-gray-300" />
                </div>
                <h3 className="mb-2 text-xl font-bold">
                  {t(`whyChoose.items.${i}.title`)}
                </h3>
                <p className="text-muted-foreground">
                  {t(`whyChoose.items.${i}.description`)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
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
                        <Input
                          id="email"
                          type="email"
                          placeholder={t("contact.form.emailPlaceholder")}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">{t("contact.form.company")}</Label>
                      <Input
                        id="company"
                        placeholder={t("contact.form.companyPlaceholder")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">{t("contact.form.service")}</Label>
                      <select
                        id="service"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      >
                        <option value="">{t("contact.form.servicePlaceholder")}</option>
                        {CONTACT_SERVICE_OPTIONS.map((i) => (
                          <option key={i} value={`option-${i}`}>
                            {t(`contact.form.serviceOptions.${i}`)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">{t("contact.form.message")}</Label>
                      <Textarea
                        id="message"
                        placeholder={t("contact.form.messagePlaceholder")}
                        className="min-h-[120px]"
                      />
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

        {/* CTA */}
        <section className="container py-16 md:py-24">
          <div className="rounded-xl bg-gradient-to-r from-black to-gray-800 p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              {t("cta.title")}
            </h2>
            <p className="mx-auto mb-8 max-w-[600px] text-gray-200 md:text-xl">
              {t("cta.description")}
            </p>
            <Button
              asChild
              className="bg-white text-black hover:bg-gray-100 shadow-md"
            >
              <Link href="#contact-form">{t("cta.button")}</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />

      <CoursePopup activePopup={activePopup} onClose={closePopup} />
    </div>
  );
}
