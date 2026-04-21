'use client';

import { CheckCircle } from "lucide-react";

interface Feature {
  title: string;
  description: string;
}

interface ServiceFeaturesProps {
  sectionTitle: string;
  sectionDesc: string;
  features: Feature[];
  benefitsTitle: string;
  benefits: Feature[];
}

export function ServiceFeatures({ sectionTitle, sectionDesc, features, benefitsTitle, benefits }: ServiceFeaturesProps) {
  return (
    <section className="container py-16 md:py-24">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter mb-6">{sectionTitle}</h2>
          <p className="text-muted-foreground mb-6">{sectionDesc}</p>
          <div className="space-y-4">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="rounded-full bg-gray-800/10 p-2">
                  <CheckCircle className="h-4 w-4 text-black dark:text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="text-muted-foreground">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8">
          <h3 className="text-xl font-bold mb-4">{benefitsTitle}</h3>
          <ul className="space-y-4">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-black dark:text-white flex-shrink-0 mt-1" />
                <div>
                  <span className="font-semibold">{b.title}</span>
                  <p className="text-muted-foreground">{b.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
