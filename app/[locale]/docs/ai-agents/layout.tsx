import { createPageMetadataGenerator } from '@/lib/metadata/generators';

export const generateMetadata = createPageMetadataGenerator('/docs/ai-agents', 'docs_aiAgents');

export default function DocsAIAgentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
