'use client';

import { CheckCircle } from "lucide-react";

interface Step {
  title: string;
  description: string;
}

interface Stat {
  value: string;
  label: string;
}

interface ServiceExampleProps {
  sectionTitle: string;
  subtitle: string;
  exampleTitle: string;
  scenarioTitle: string;
  scenarioDesc: string;
  solutionTitle: string;
  solutionDesc: string;
  stepsTitle: string;
  steps: Step[];
  resultsTitle: string;
  stats: Stat[];
}

export function ServiceExample({
  sectionTitle, subtitle, exampleTitle,
  scenarioTitle, scenarioDesc, solutionTitle, solutionDesc,
  stepsTitle, steps, resultsTitle, stats,
}: ServiceExampleProps) {
  return (
    <section className="container py-16 md:py-24 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-3xl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">{sectionTitle}</h2>
          <p className="text-muted-foreground text-lg">{subtitle}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold mb-4">{exampleTitle}</h3>

          <div className="grid gap-8 md:grid-cols-2 mb-8">
            <div>
              <h4 className="font-semibold mb-2">{scenarioTitle}</h4>
              <p className="text-muted-foreground mb-4">{scenarioDesc}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">{solutionTitle}</h4>
              <p className="text-muted-foreground mb-4">{solutionDesc}</p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h4 className="font-semibold">{stepsTitle}</h4>
            <ul className="grid gap-4 md:grid-cols-2">
              {steps.map((s, i) => (
                <li key={i} className="flex items-start gap-3 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-black dark:text-white flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold">{s.title}</span>
                    <p className="text-muted-foreground">{s.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
            <h4 className="font-semibold mb-4">{resultsTitle}</h4>
            <div className="grid gap-4 md:grid-cols-3">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-black dark:text-white mb-2">{s.value}</div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
