import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI, Type } from "@google/genai";

const summarySchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "A short, encouraging, and actionable summary (1-2 paragraphs) of their AI readiness and potential benefits."
    },
    bulletPoints: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING
      },
      description: "A list of 3-5 specific, actionable bullet points highlighting key areas for AI implementation and potential benefits."
    }
  },
  required: ['summary', 'bulletPoints']
};

export async function POST(request: NextRequest) {
  try {
    const { answers, industry, employeeCount, averageSalary } = await request.json();

    if (!answers || !industry || !employeeCount || !averageSalary) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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

    const answersText = answers.map((a: any) => `- ${a.question}\n  - Answer: ${a.text}`).join('\n');

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: `A business owner in the ${industry} industry has answered a quiz about their company's potential for AI adoption.
      Company profile:
      - Industry: ${industry}
      - Number of Employees: ${employeeCount}
      - Average Annual Salary: $${averageSalary.toLocaleString()}

      Here are their quiz answers:\n${answersText}\n\n
      Based on this information, provide a personalized analysis. Your response MUST be a JSON object adhering to the provided schema.
      1.  Write a 'summary' paragraph (2-3 sentences) that is encouraging and actionable, addressing them directly (e.g., "Your responses suggest...").
      2.  Create a 'bulletPoints' array with 3-5 specific, actionable points. These should highlight the key areas where this business could see the most immediate and impactful benefits from AI, tailored to the ${industry} sector.
      Keep the overall tone positive and focused on opportunities.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: summarySchema,
      },
    });

    const jsonText = response.text.trim();
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
