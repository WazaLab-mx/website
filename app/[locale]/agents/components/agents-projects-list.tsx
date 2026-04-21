import { Link } from "@/i18n/navigation";
import { ExternalLink, ArrowRight } from "lucide-react";

interface Project {
  name: string;
  url: string;
  desc: string;
}

interface AgentsProjectsListProps {
  projects: Project[];
  title: string;
  viewAllText: string;
}

export function AgentsProjectsList({ projects, title, viewAllText }: AgentsProjectsListProps) {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-black dark:text-white mb-6">{title}</h2>
      <div className="space-y-3">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-black dark:hover:border-white transition-colors group"
          >
            <div>
              <span className="font-semibold text-black dark:text-white">{project.name}</span>
              <span className="text-gray-500 dark:text-gray-400 ml-2 text-sm">{project.desc}</span>
            </div>
            <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors flex-shrink-0" />
          </a>
        ))}
      </div>
      <Link href="/projects" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-black dark:hover:text-white mt-4 transition-colors">
        {viewAllText} <ArrowRight className="h-3 w-3" />
      </Link>
    </section>
  );
}
