import { createPageMetadataGenerator } from '@/lib/metadata/generators';

export const generateMetadata = createPageMetadataGenerator('/contact', 'contact');

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
