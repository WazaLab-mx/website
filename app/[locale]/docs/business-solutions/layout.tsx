import { createPageMetadataGenerator } from '@/lib/metadata/generators';

export const generateMetadata = createPageMetadataGenerator('/docs/business-solutions', 'docs_businessSolutions');

export default function DocsBusinessSolutionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
