import { Brain, Code, Rocket, Shield, Sparkles, Users, Zap, type LucideIcon } from "lucide-react";

export interface ServiceDef {
  slug: string;
  icon: LucideIcon;
  titleKey: string;
}

export interface TrainingDef {
  popupId: string;
  icon: LucideIcon;
  titleKey: string;
}

export const SERVICES: readonly ServiceDef[] = [
  { slug: "smart-business-solutions", icon: Code, titleKey: "0" },
  { slug: "personal-ai-assistants", icon: Brain, titleKey: "1" },
  { slug: "smart-content-creation", icon: Sparkles, titleKey: "2" },
  { slug: "customer-experience", icon: Users, titleKey: "3" },
  { slug: "business-growth-tools", icon: Shield, titleKey: "4" },
  { slug: "smart-business-insights", icon: Zap, titleKey: "5" },
  { slug: "smart-work-automation", icon: Rocket, titleKey: "6" },
  { slug: "ai-agents-development", icon: Brain, titleKey: "7" },
  { slug: "web3-development", icon: Code, titleKey: "8" },
  { slug: "ai-web3-integration", icon: Sparkles, titleKey: "9" },
] as const;

export const TRAININGS: readonly TrainingDef[] = [
  { popupId: "ai-fundamentals", icon: Brain, titleKey: "0" },
  { popupId: "web3-dev", icon: Code, titleKey: "1" },
  { popupId: "ai-web3-integration", icon: Sparkles, titleKey: "2" },
  { popupId: "ai-creatives", icon: Sparkles, titleKey: "3" },
] as const;

export const POPUP_KEY_MAP: Record<string, string> = {
  "ai-fundamentals": "aiFundamentals",
  "web3-dev": "web3Dev",
  "ai-web3-integration": "aiWeb3Integration",
  "ai-creatives": "aiCreatives",
};
