import { createPageMetadataGenerator } from '@/lib/metadata/generators';

export const generateMetadata = createPageMetadataGenerator('/docs', 'docs');

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
