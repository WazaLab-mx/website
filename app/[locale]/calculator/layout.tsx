import { createPageMetadataGenerator } from '@/lib/metadata/generators';

export const generateMetadata = createPageMetadataGenerator('/calculator', 'calculator');

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
