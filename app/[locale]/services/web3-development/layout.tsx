import { createServiceMetadataGenerator } from '@/lib/metadata/generators';

export const generateMetadata = createServiceMetadataGenerator('web3-development', 'web3');

export default function Web3DevelopmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
