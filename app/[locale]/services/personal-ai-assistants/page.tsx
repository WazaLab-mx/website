import { ServiceDetailPage } from "../components/ServiceDetailPage";
import { createServiceMetadataGenerator } from "@/lib/metadata/generators";

export const generateMetadata = createServiceMetadataGenerator('personal-ai-assistants', 'personalAI');

export default function PersonalAIAssistantsPage() {
  return <ServiceDetailPage serviceKey="personalAI" />;
}
