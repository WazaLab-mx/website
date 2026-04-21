import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

interface AgentsServicesListProps {
  services: string[];
  title: string;
  viewAllText: string;
}

export function AgentsServicesList({ services, title, viewAllText }: AgentsServicesListProps) {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-black dark:text-white mb-6">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {services.map((service) => (
          <div
            key={service}
            className="p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm font-medium text-black dark:text-white"
          >
            {service}
          </div>
        ))}
      </div>
      <Link href="/services" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-black dark:hover:text-white mt-4 transition-colors">
        {viewAllText} <ArrowRight className="h-3 w-3" />
      </Link>
    </section>
  );
}
