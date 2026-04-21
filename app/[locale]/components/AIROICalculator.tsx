'use client';

import { Calculator, TrendingUp, Clock, DollarSign, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function AIROICalculator() {
  const t = useTranslations("calculator.roi");

  return (
    <section
      id="ai-roi-calculator"
      className="w-full py-20 md:py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden"
      role="region"
      aria-labelledby="calculator-heading"
    >
      <div className="absolute inset-0 bg-[url('/bg.png')] opacity-10 bg-cover bg-center"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-gray-600/20 to-gray-700/20 rounded-full blur-3xl animate-pulse-soft"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-gray-500/20 to-gray-600/20 rounded-full blur-3xl animate-pulse-soft" style={{animationDelay: '1s'}}></div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="flex flex-col space-y-8 fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 w-fit">
              <Calculator className="h-4 w-4 text-gray-300" />
              <span className="text-sm font-medium text-gray-200">{t("badge")}</span>
            </div>

            <h2 id="calculator-heading" className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
              <span className="inline-block">{t("titlePart1")}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-white to-gray-300 inline-block">
                {t("titleHighlight")}
              </span>
              <span className="inline-block">{t("titlePart2")}</span>
            </h2>

            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-[600px]">
              {t("description1")}{" "}
              {t("description2")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <StatCard icon={<Clock className="h-5 w-5 text-gray-300" />} value={t("timeSavedPercent")} label={t("timeSaved")} />
              <StatCard icon={<DollarSign className="h-5 w-5 text-gray-300" />} value={t("savingsAmount")} label={t("annualSavings")} />
              <StatCard icon={<TrendingUp className="h-5 w-5 text-gray-300" />} value={t("roiAmount")} label={t("roiYear1")} />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                className="btn-premium group relative overflow-hidden bg-white hover:bg-gray-100 text-black shadow-lg hover:shadow-xl rounded-md px-8 py-6 text-lg font-semibold transition-all duration-300 min-h-[48px]"
              >
                <Link href="/calculator" className="flex items-center justify-center space-x-2">
                  <Calculator className="h-5 w-5" />
                  <span>{t("calculateSavings")}</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>{t("noCreditCard")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>{t("twoMinutes")}</span>
              </div>
            </div>
          </div>

          <CalculatorPreview t={t} />
        </div>

        <SocialProof t={t} />
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-32 bg-gradient-to-t from-white via-gray-100/50 to-transparent dark:from-gray-950 dark:via-gray-900/50"></div>
      </div>
    </section>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-start gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
      <div className="rounded-full bg-gray-700/30 p-2">{icon}</div>
      <div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-xs text-gray-400">{label}</div>
      </div>
    </div>
  );
}

function CalculatorPreview({ t }: { t: (key: string) => string }) {
  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-r from-gray-600/20 via-gray-500/20 to-gray-600/20 rounded-2xl blur-2xl opacity-60"></div>
      <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-2xl">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 mb-4">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">{t("calculatorTitle")}</h3>
            <p className="text-gray-300 text-sm">{t("discoverPotential")}</p>
          </div>

          <div className="space-y-4">
            <PreviewItem label={t("numEmployees")} />
            <PreviewItem label={t("hoursRepetitive")} />
            <PreviewItem label={t("avgHourlyRate")} />
          </div>

          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-6 border border-white/20 mt-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-400">{t("estimatedSavings")}</p>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white">
                $??,???
              </div>
              <p className="text-xs text-gray-500">{t("revealPotential")}</p>
            </div>
          </div>

          <Button
            asChild
            className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-6"
          >
            <Link href="/calculator">
              {t("startQuizNow")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function PreviewItem({ label }: { label: string }) {
  return (
    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-300">{label}</span>
        <span className="text-lg font-bold text-white">?</span>
      </div>
      <div className="w-full h-2 bg-white/10 rounded-full">
        <div className="w-0 h-full bg-gradient-to-r from-gray-600 to-gray-500 rounded-full"></div>
      </div>
    </div>
  );
}

function SocialProof({ t }: { t: (key: string) => string }) {
  return (
    <div className="mt-16 pt-12 border-t border-white/10">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 border-2 border-black flex items-center justify-center text-xs text-white font-semibold">
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <div>
            <p className="text-sm text-gray-300 font-medium">{t("join500")}</p>
            <p className="text-xs text-gray-500">{t("whoDiscovered")}</p>
          </div>
        </div>

        <div className="h-12 w-px bg-white/20 hidden md:block"></div>

        <div className="text-center">
          <p className="text-2xl font-bold text-white">{t("totalSavingsAmount")}</p>
          <p className="text-xs text-gray-500">{t("totalSavings")}</p>
        </div>

        <div className="h-12 w-px bg-white/20 hidden md:block"></div>

        <div className="text-center">
          <p className="text-2xl font-bold text-white">{t("consultationPercent")}</p>
          <p className="text-xs text-gray-500">{t("proceedConsultation")}</p>
        </div>
      </div>
    </div>
  );
}
