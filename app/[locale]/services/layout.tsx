import { createPageMetadataGenerator } from '@/lib/metadata/generators';

export const generateMetadata = createPageMetadataGenerator('/services', 'services');

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
