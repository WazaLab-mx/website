import { createPageMetadataGenerator } from '@/lib/metadata/generators';

export const generateMetadata = createPageMetadataGenerator('/chat', 'chat');

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
