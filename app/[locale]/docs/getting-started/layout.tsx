import { createPageMetadataGenerator } from '@/lib/metadata/generators';

export const generateMetadata = createPageMetadataGenerator('/docs/getting-started', 'docs_gettingStarted');

export default function DocsGettingStartedLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
