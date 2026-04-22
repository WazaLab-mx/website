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
          options: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                text: { type: Type.STRING },
                timeSaving: {
                  type: Type.NUMBER,
                  description: "Estimated hours saved per employee per month."
                },
                readinessScore: {
                  type: Type.NUMBER,
                  description: "Score from 1-10 indicating AI readiness for this option."
                },
              },
              required: ['text', 'timeSaving', 'readinessScore'],
            },
          },
        },
        required: ['question', 'options'],
      },
    },
  },
  required: ['questions'],
};

export async function POST(request: NextRequest) {
  try {
    const { industry } = await request.json();

    if (!industry) {
      return NextResponse.json(
        { error: 'Industry is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: `Generate 10 multiple-choice questions for an "AI Readiness and ROI Calculator" quiz for a small to medium-sized business in the '${industry}' industry. The goal is to estimate potential time and money savings.
      The questions should be tailored to the specifics of the ${industry} sector, covering topics like:
      - Repetitive administrative tasks (e.g., data entry, scheduling, email management)
      - Customer support volume and processes
      - Sales and marketing automation opportunities
      - Team size and roles most affected by repetitive work
      - Current software stack and integration capabilities
      - Data management and accessibility
      - Company culture towards technology adoption

      For each question, provide 4 options, each with an estimated 'timeSaving' in hours per employee per month, and a 'readinessScore' from 1 to 10. Ensure a logical progression of values in the options.
      Return the output as a single JSON object adhering to the provided schema. Do not include any other text, markdown formatting, or explanations in your response.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: questionsSchema,
      },
    });

    const jsonText = response.text.trim();
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
