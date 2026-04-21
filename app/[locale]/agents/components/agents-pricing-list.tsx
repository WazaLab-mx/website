import { ArrowRight } from "lucide-react";

interface Plan {
  name: string;
  duration: string;
  popular?: boolean;
}

interface AgentsPricingListProps {
  plans: Plan[];
  title: string;
  viewAllText: string;
  popularBadge: string;
}

export function AgentsPricingList({ plans, title, viewAllText, popularBadge }: AgentsPricingListProps) {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-black dark:text-white mb-6">{title}</h2>
      <div className="space-y-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <span className="font-semibold text-black dark:text-white">{plan.name}</span>
              {plan.popular && (
                <span className="text-xs bg-black dark:bg-white text-white dark:text-black px-2 py-0.5 rounded-full font-medium">
                  {popularBadge}
                </span>
              )}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{plan.duration}</span>
          </div>
        ))}
      </div>
      <a href="/#pricing" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-black dark:hover:text-white mt-4 transition-colors">
        {viewAllText} <ArrowRight className="h-3 w-3" />
      </a>
    </section>
  );
}
