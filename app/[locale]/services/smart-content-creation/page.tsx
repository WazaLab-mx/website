import { ServiceDetailPage } from "../components/ServiceDetailPage";
import { createServiceMetadataGenerator } from "@/lib/metadata/generators";

export const generateMetadata = createServiceMetadataGenerator('smart-content-creation', 'smartContent');

export default function SmartContentCreationPage() {
  return <ServiceDetailPage serviceKey="smartContent" />;
}
