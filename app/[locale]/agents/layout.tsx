import { createPageMetadataGenerator } from '@/lib/metadata/generators';

export const generateMetadata = createPageMetadataGenerator('/agents', 'agents');

export default function AgentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
