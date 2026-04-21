"use client";

import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/app/[locale]/components/ui/header";
import { Footer } from "@/app/[locale]/components/ui/footer";

interface Props {
  pageTitle: string;
  supportButtonText: string;
  children: ReactNode;
}

export function DocsPageShell({ pageTitle, supportButtonText, children }: Props) {
  const tNav = useTranslations("docs.nav");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 pt-16">
        <div className="container max-w-4xl py-12">
          <div className="mb-6">
            <Link
              href="/docs"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {tNav("backToDocs")}
            </Link>
          </div>

          <h1 className="text-4xl font-bold mb-8">{pageTitle}</h1>

          <div className="prose dark:prose-invert max-w-none">
            {children}

            <div className="not-prose mt-8">
              <Button
                asChild
                className="bg-gradient-to-r from-[#7C2D3E] to-[#7C2D3E]/90"
              >
                <Link href="/contact">{supportButtonText}</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
