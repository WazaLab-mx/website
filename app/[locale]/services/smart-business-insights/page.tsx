import { ServiceDetailPage } from "../components/ServiceDetailPage";
import { createServiceMetadataGenerator } from "@/lib/metadata/generators";

export const generateMetadata = createServiceMetadataGenerator('smart-business-insights', 'smartInsights');

export default function SmartBusinessInsightsPage() {
  return <ServiceDetailPage serviceKey="smartInsights" />;
}
