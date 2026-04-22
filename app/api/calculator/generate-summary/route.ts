import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI, Type } from "@google/genai";

const summarySchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "A 2-3 sentence executive summary addressing the owner directly, grounded in their specific answers."
    },
    bulletPoints: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3-5 specific, actionable areas where this business should focus its AI investment."
    },
    quickWins: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "2-3 shippable-in-30-days automations tailored to the answers. Each entry is one concrete workflow, not a category."
    }
  },
  required: ['summary', 'bulletPoints', 'quickWins']
};

const LANGUAGE_BY_LOCALE: Record<string, string> = {
  en: 'English',
  es: 'Spanish (es-MX style — natural Latin American Spanish, not overly formal Castilian)',
  de: 'German (de-DE)',
};

export async function POST(request: NextRequest) {
  try {
    const {
      answers,
      industry,
      country,
      employeeCount,
      averageSalary,
      weeklyHours,
      aiMaturity,
      primaryGoal,
      annualLaborSavings,
      annualHoursSaved,
      locale,
    } = await request.json();

    if (!answers || !industry || !employeeCount || !averageSalary) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const language = LANGUAGE_BY_LOCALE[locale] ?? LANGUAGE_BY_LOCALE.en;
    const countryStr = country ?? 'unspecified';

    const answersText = answers
      .map((a: { question: string; text: string }) => `- ${a.question}\n  Answer: ${a.text}`)
      .join('\n');

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: `You are an AI consultant writing a personalized readiness report. Ground every recommendation in the user's actual answers — do not invent context.

Company profile:
- Industry: ${industry}
- Country: ${countryStr}
- Employees: ${employeeCount}
- Average annual salary: $${Number(averageSalary).toLocaleString()}
- Typical work week: ${weeklyHours ?? 40} hours
- Current AI maturity: ${aiMaturity ?? 'unspecified'}
- Primary goal: ${primaryGoal ?? 'unspecified'}

Computed ROI (already shown to the user, use for calibration only):
- Annual labor hours recoverable: ${annualHoursSaved?.toLocaleString?.() ?? 'n/a'}
- Annual savings estimate: $${annualLaborSavings?.toLocaleString?.() ?? 'n/a'}

Quiz answers:
${answersText}

OUTPUT LANGUAGE: Write the 'summary', each item in 'bulletPoints', and each item in 'quickWins' entirely in ${language}. Do not translate field names. When naming tools, systems, or regulations, reference ones that are actually common in ${countryStr} (e.g. CFDI/SAT in Mexico, DATEV in Germany, HMRC in the UK, Stripe/QuickBooks in the US).

Write the report:
1. 'summary' — 2-3 sentences, second-person, grounded in the strongest signals from the answers. Avoid generic phrasing like "AI has great potential".
2. 'bulletPoints' — 3-5 items. Each names a specific area to invest in, calibrated to this ${industry} business operating in ${countryStr} at their maturity level. Include one caution/risk bullet if the answers reveal a blocker.
3. 'quickWins' — 2-3 automations this company could ship in the next 30 days given the answers and their ${countryStr} context. Be concrete (e.g., "Auto-tag inbound support email by intent using Zendesk's API" rather than "use AI for customer support").

Return only the JSON object matching the schema.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: summarySchema,
      },
    });

    const jsonText = response.text?.trim() ?? '';
    const data = JSON.parse(jsonText);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error generating results summary:", error);
    return NextResponse.json(
      { error: 'Failed to generate results summary' },
      { status: 500 }
    );
  }
}
