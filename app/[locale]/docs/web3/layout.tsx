import { createPageMetadataGenerator } from '@/lib/metadata/generators';

export const generateMetadata = createPageMetadataGenerator('/docs/web3', 'docs_web3');

export default function DocsWeb3Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
