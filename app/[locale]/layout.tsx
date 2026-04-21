import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "@/components/theme-provider";
import ScrollAnimations from "./components/ui/scroll-animations";
import { GalaxyBackground } from "@/components/GalaxyBackground";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadataGenerator } from "@/lib/metadata/generators";
import { getOrganizationSchema, getWebsiteSchema } from "@/lib/metadata/schemas";
import { routing } from "@/i18n/routing";
import { Locale } from "@/i18n/config";

const inter = Inter({ subsets: ["latin"] });

export const generateMetadata = createPageMetadataGenerator('/', 'home');

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <JsonLd data={getOrganizationSchema()} />
        <JsonLd data={getWebsiteSchema(locale)} />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            storageKey="waza-theme"
          >
            <GalaxyBackground
              intensity="subtle"
              starCount={120}
              enableParallax={true}
            />
            {children}
          </ThemeProvider>
          <ScrollAnimations />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
