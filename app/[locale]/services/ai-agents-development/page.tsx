import { ServiceDetailPage } from "../components/ServiceDetailPage";
import { createServiceMetadataGenerator } from "@/lib/metadata/generators";

export const generateMetadata = createServiceMetadataGenerator('ai-agents-development', 'aiAgents');

export default function AIAgentsDevelopmentPage() {
  return <ServiceDetailPage serviceKey="aiAgents" />;
}
