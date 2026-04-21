import { createPageMetadataGenerator } from '@/lib/metadata/generators';

export const generateMetadata = createPageMetadataGenerator('/about', 'about');

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
