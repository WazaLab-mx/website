import { ServiceDetailPage } from "../components/ServiceDetailPage";
import { createServiceMetadataGenerator } from "@/lib/metadata/generators";

export const generateMetadata = createServiceMetadataGenerator('smart-business-solutions', 'smartBusiness');

export default function SmartBusinessSolutionsPage() {
  return <ServiceDetailPage serviceKey="smartBusiness" />;
}
