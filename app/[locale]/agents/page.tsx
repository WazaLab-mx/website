"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Header } from "@/app/[locale]/components/ui/header";
import { Footer } from "@/app/[locale]/components/ui/footer";
import { FileText, ExternalLink, Mail, MapPin, ArrowRight, Terminal, Copy, Check } from "lucide-react";
import { useState } from "react";
import { AgentsProjectsList } from "./components/agents-projects-list";
import { AgentsServicesList } from "./components/agents-services-list";
import { AgentsPricingList } from "./components/agents-pricing-list";

const PROJECT_URLS = [
  { name: "RobotMind", url: "https://robotmind.io" },
  { name: "Sobrecitos.net", url: "https://sobrecitos.net" },
  { name: "Claude Code Subagent Generator", url: "https://claude-subagent-generator.netlify.app/" },
  { name: "Brief Boy", url: "https://brief-boy.com" },
  { name: "AdScout", url: "https://adscout-winning-ad-finder-109634618982.us-west1.run.app/" },
];

const PRICING_POPULAR_INDEX = 1;

const INSTALL_CMD = 'mkdir -p ~/.openclaw/skills/waza-info && curl -sSL https://waza.baby/openclaw-skills/waza-info/SKILL.md -o ~/.openclaw/skills/waza-info/SKILL.md';

export default function AgentsPage() {
  const t = useTranslations("agents");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(INSTALL_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const projects = PROJECT_URLS.map((p, i) => ({
    ...p,
    desc: t(`projects.items.${i}.desc`),
  }));

  const services = t.raw("services.items") as string[];

  const plans = Array.from({ length: 5 }, (_, i) => ({
    name: t(`pricing.items.${i}.name`),
    duration: t(`pricing.items.${i}.duration`),
    popular: i === PRICING_POPULAR_INDEX,
  }));

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      <Header />
      <main className="flex-1 pt-24">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto py-12">
          {/* Hero */}
          <section className="mb-16">
            <div className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-sm font-mono text-green-600 dark:text-green-400 mb-6">
              {t("hero.badge")}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-black dark:text-white mb-4">
              {t("hero.title")}{" "}
              <span className="text-gray-500">{t("hero.titleHighlight")}</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              {t("hero.description")}
            </p>
          </section>

          {/* Machine-Readable Files */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-2">
              <FileText className="h-5 w-5" /> {t("files.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="/llms.txt"
                target="_blank"
                rel="noopener noreferrer"
                id="agents-llms-txt-001"
                className="block p-6 border-2 border-gray-200 dark:border-gray-800 rounded-xl hover:border-black dark:hover:border-white transition-colors group"
              >
                <div className="flex items-center justify-between mb-2">
                  <code className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">llms.txt</code>
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                </div>
                <p className="font-semibold text-black dark:text-white">{t("files.llmsTxt")}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t("files.llmsTxtDesc")}</p>
              </a>
              <a
                href="/llms-full.txt"
                target="_blank"
                rel="noopener noreferrer"
                id="agents-llms-full-002"
                className="block p-6 border-2 border-gray-200 dark:border-gray-800 rounded-xl hover:border-black dark:hover:border-white transition-colors group"
              >
                <div className="flex items-center justify-between mb-2">
                  <code className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">llms-full.txt</code>
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                </div>
                <p className="font-semibold text-black dark:text-white">{t("files.llmsFullTxt")}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t("files.llmsFullTxtDesc")}</p>
              </a>
            </div>
          </section>

          {/* About */}
          <section className="mb-16 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-3">{t("about.title")}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{t("about.description")}</p>
            <div className="flex flex-wrap gap-6 text-sm">
              <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Mail className="h-4 w-4" /> info@waza.baby
              </span>
              <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4" /> {t("about.locationValue")}
              </span>
            </div>
          </section>

          {/* Projects */}
          <AgentsProjectsList projects={projects} title={t("projects.title")} viewAllText={t("projects.viewAll")} />

          {/* Services */}
          <AgentsServicesList services={services} title={t("services.title")} viewAllText={t("services.viewAll")} />

          {/* Pricing */}
          <AgentsPricingList plans={plans} title={t("pricing.title")} viewAllText={t("pricing.viewAll")} popularBadge={t("pricing.popularBadge")} />

          {/* OpenClaw Skill */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-2">
              <Terminal className="h-5 w-5" /> {t("openclaw.title")}
            </h2>
            <div className="border-2 border-green-500/30 rounded-xl overflow-hidden">
              <div className="bg-[#0a0a0f] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-mono text-green-400">
                    {t("openclaw.badge")}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-6">
                  {t("openclaw.description")}
                </p>

                {/* Install command */}
                <div className="relative group">
                  <div className="bg-black border border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <span className="text-green-500">$</span>{" "}
                    <span className="text-gray-300 break-all">{INSTALL_CMD}</span>
                  </div>
                  <button
                    onClick={handleCopy}
                    id="agents-openclaw-copy-004"
                    className="absolute top-3 right-3 p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
                    aria-label={t("openclaw.copy")}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-400" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>

                {/* What's included */}
                <div className="mt-6">
                  <p className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-3">
                    {t("openclaw.whatIncludes")}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {(t.raw("openclaw.includes") as string[]).map((item: string, i: number) => (
                      <span key={i} className="text-sm text-gray-400 flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-green-500 shrink-0" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* View SKILL.md link */}
                <div className="mt-6 pt-4 border-t border-gray-800">
                  <a
                    href="/openclaw-skills/waza-info/SKILL.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="agents-openclaw-view-005"
                    className="inline-flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors font-mono"
                  >
                    {t("openclaw.viewSkill")} <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="mb-16 p-8 bg-black rounded-xl text-white text-center">
            <h2 className="text-2xl font-bold mb-3">{t("cta.title")}</h2>
            <p className="text-gray-300 mb-6 max-w-lg mx-auto">{t("cta.description")}</p>
            <Link
              href="/contact"
              id="agents-contact-cta-003"
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {t("cta.contact")} <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
