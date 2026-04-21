'use client';

import { CheckCircle } from "lucide-react";

interface UseCase {
  title: string;
  description: string;
  features: string[];
}

interface ServiceUseCasesProps {
  title: string;
  cases: UseCase[];
}

export function ServiceUseCases({ title, cases }: ServiceUseCasesProps) {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tighter mb-12 text-center">{title}</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4">{c.title}</h3>
              <p className="text-muted-foreground mb-4">{c.description}</p>
              <ul className="space-y-2">
                {c.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-black dark:text-white" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
