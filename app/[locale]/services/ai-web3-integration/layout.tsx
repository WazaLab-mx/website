import { createServiceMetadataGenerator } from '@/lib/metadata/generators';

export const generateMetadata = createServiceMetadataGenerator('ai-web3-integration', 'aiWeb3Integration');

export default function AIWeb3IntegrationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
