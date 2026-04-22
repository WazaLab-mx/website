import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI, Type } from "@google/genai";

const questionsSchema = {
  type: Type.OBJECT,
  properties: {
    questions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          rationale: {
            type: Type.STRING,
            description: "One-sentence explanation of why this question matters for AI ROI."
          },
          options: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                text: { type: Type.STRING },
                timeSaving: {
                  type: Type.NUMBER,
                  description: "Estimated hours saved per affected employee per week if AI is adopted for this scenario."
                },
                readinessScore: {
                  type: Type.NUMBER,
                  description: "1–10 score of AI readiness implied by choosing this option."
                },
                impactRatio: {
                  type: Type.NUMBER,
                  description: "Fraction of the workforce (0.0–1.0) this automation opportunity would affect."
                },
              },
              required: ['text', 'timeSaving', 'readinessScore', 'impactRatio'],
            },
          },
        },
        required: ['question', 'options'],
      },
    },
  },
  required: ['questions'],
};

const MATURITY_DESCRIPTIONS: Record<string, string> = {
  none: 'no AI tools in use today; evaluating the space for the first time',
  exploring: 'experimenting informally (individual ChatGPT use, no formal deployment)',
  piloting: 'running one or two AI pilots in specific teams, not yet standard',
  deployed: 'at least one AI workflow already in production and relied on by a team',
};

const GOAL_DESCRIPTIONS: Record<string, string> = {
  cost: 'reduce operating cost and reclaim employee time',
  speed: 'ship work faster and shorten cycle times',
  quality: 'raise output quality and reduce errors',
  growth: 'unlock new revenue, markets, or customer capabilities',
};

const LANGUAGE_BY_LOCALE: Record<string, string> = {
  en: 'English',
  es: 'Spanish (es-MX style — natural Latin American Spanish, not overly formal Castilian)',
  de: 'German (de-DE)',
};

export async function POST(request: NextRequest) {
  try {
    const {
      industry,
      country,
      employeeCount,
      weeklyHours,
      aiMaturity,
      primaryGoal,
      locale,
    } = await request.json();

    if (!industry) {
      return NextResponse.json({ error: 'Industry is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const maturity = MATURITY_DESCRIPTIONS[aiMaturity] ?? MATURITY_DESCRIPTIONS.none;
    const goal = GOAL_DESCRIPTIONS[primaryGoal] ?? GOAL_DESCRIPTIONS.cost;
    const language = LANGUAGE_BY_LOCALE[locale] ?? LANGUAGE_BY_LOCALE.en;
    const countryStr = country ?? 'unspecified';

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: `You are building a 10-question AI ROI assessment for a real business. Produce pragmatic, specific, quantitative questions — not generic AI trivia.

Company profile:
- Industry: ${industry}
- Country of operation: ${countryStr}
- Team size: ${employeeCount ?? 'unspecified'} employees
- Typical work week: ${weeklyHours ?? 40} hours per employee
- Current AI maturity: ${maturity}
- Primary goal of adopting AI: ${goal}

OUTPUT LANGUAGE: Write every 'question', 'rationale', and 'options[].text' field in ${language}. Do not mix languages. Keep the JSON field names in English.

Requirements for the 10 questions:
1. Tailor them to the ${industry} sector in ${countryStr}. Reference real workflows an operator would recognize locally — name tools and systems that are actually common in ${countryStr} (e.g. CFDI/SAT for invoicing in Mexico, HMRC/PAYE in the UK, GST in Canada, DATEV in Germany). If regulatory context matters (GDPR, HIPAA, LFPDPPP, etc.), reflect it.
2. Use local currency and units when referring to money or volume if the language and country match (for Mexico reference MXN; for Spain/Germany EUR; for the US/Canada USD). If uncertain, stay currency-agnostic.
3. Mix question types. Include questions about:
   - Concrete weekly hours spent on a specific recurring task
   - % of the team affected by a specific bottleneck
   - Which of a set of named tools/systems (specific to ${countryStr}) the company uses
   - Data readiness (is the data digital, clean, and accessible?)
   - Previous failed or successful automation attempts
   - How much of a specific decision is rules-based vs. judgement
   - Compliance / sensitivity constraints relevant to ${countryStr}
4. Make options quantitative where possible ("0–2 hours", "3–5 hours", "6–10 hours", "10+ hours") so the user's pick maps to a real estimate.
5. Calibrate each option's values honestly:
   - timeSaving = realistic hours per affected employee per week that AI could save for that scenario. Use 0 when the option describes a situation where AI cannot meaningfully help.
   - impactRatio = realistic fraction of the workforce (0.0–1.0) affected. Customer support questions might affect 0.2 of a team; data-entry questions might affect 0.6; universal tools like email might be 1.0.
   - readinessScore = 1–10, where 10 = company is already set up to adopt AI here, 1 = major blockers.
6. Include a short 'rationale' per question (one sentence, in ${language}) so the user understands why you're asking.
7. Progress from easy-to-answer quantitative questions to deeper readiness/strategy questions.

Return only the JSON object matching the schema. No prose, no markdown.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: questionsSchema,
      },
    });

    const jsonText = response.text?.trim() ?? '';
    const data = JSON.parse(jsonText);

    return NextResponse.json({ questions: data.questions });
  } catch (error) {
    console.error("Error generating quiz questions:", error);
    return NextResponse.json(
      { error: 'Failed to generate quiz questions' },
      { status: 500 }
    );
  }
}
