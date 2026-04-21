import { createPageMetadataGenerator } from '@/lib/metadata/generators';

export const generateMetadata = createPageMetadataGenerator('/projects', 'projects');

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
