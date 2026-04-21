import { ServiceDetailPage } from "../components/ServiceDetailPage";
import { createServiceMetadataGenerator } from "@/lib/metadata/generators";

export const generateMetadata = createServiceMetadataGenerator('business-growth-tools', 'businessGrowth');

export default function BusinessGrowthToolsPage() {
  return <ServiceDetailPage serviceKey="businessGrowth" />;
}
