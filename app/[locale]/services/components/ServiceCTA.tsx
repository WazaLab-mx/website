'use client';

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

interface ServiceCTAProps {
  title: string;
  description: string;
  buttonText: string;
}

export function ServiceCTA({ title, description, buttonText }: ServiceCTAProps) {
  return (
    <section className="container py-16 md:py-24">
      <div className="rounded-xl bg-gradient-to-r from-black to-gray-800 p-8 md:p-12 text-center text-white">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
          {title}
        </h2>
        <p className="mx-auto mb-8 max-w-[600px] text-gray-300 md:text-xl">
          {description}
        </p>
        <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center">
          <Button asChild className="bg-white text-black hover:bg-gray-200 shadow-md">
            <Link href="/contact">{buttonText}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
