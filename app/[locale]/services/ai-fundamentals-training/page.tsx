import { ServiceDetailPage } from "../components/ServiceDetailPage";
import { createServiceMetadataGenerator } from "@/lib/metadata/generators";

export const generateMetadata = createServiceMetadataGenerator('ai-fundamentals-training', 'aiFundamentals');

export default function AIFundamentalsTrainingPage() {
  return <ServiceDetailPage serviceKey="aiFundamentals" />;
}
