import { ServiceDetailPage } from "../components/ServiceDetailPage";
import { createServiceMetadataGenerator } from "@/lib/metadata/generators";

export const generateMetadata = createServiceMetadataGenerator('customer-experience', 'customerExperience');

export default function CustomerExperiencePage() {
  return <ServiceDetailPage serviceKey="customerExperience" />;
}
