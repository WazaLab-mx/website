import { createPageMetadataGenerator } from '@/lib/metadata/generators';

export const generateMetadata = createPageMetadataGenerator('/docs/api', 'docs_api');

export default function DocsApiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
