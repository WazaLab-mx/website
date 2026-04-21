import { ServiceDetailPage } from "../components/ServiceDetailPage";
import { createServiceMetadataGenerator } from "@/lib/metadata/generators";

export const generateMetadata = createServiceMetadataGenerator('ai-web3-integration-training', 'aiWeb3Training');

export default function AIWeb3IntegrationTrainingPage() {
  return <ServiceDetailPage serviceKey="aiWeb3Training" />;
}
