"use client";

import { useTranslations } from "next-intl";
import { VoiceAssistant } from "@/components/ui/voice-assistant";

export default function ChatPage() {
  const t = useTranslations("chat");

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>
      <VoiceAssistant
        agentId="GfXMoiwcXmugXPYFnFi3"
        height="700px"
      />
    </div>
  );
}
