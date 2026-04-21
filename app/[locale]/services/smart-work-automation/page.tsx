import { ServiceDetailPage } from "../components/ServiceDetailPage";
import { createServiceMetadataGenerator } from "@/lib/metadata/generators";

export const generateMetadata = createServiceMetadataGenerator('smart-work-automation', 'smartAutomation');

export default function SmartWorkAutomationPage() {
  return <ServiceDetailPage serviceKey="smartAutomation" />;
}
