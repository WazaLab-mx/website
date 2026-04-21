# AI ROI Calculator

A powerful lead generation tool that helps businesses calculate their potential ROI from AI automation.

## Features

- **Industry-Specific Questions**: Dynamically generated quiz questions tailored to different industries using Google Gemini AI
- **Real-Time ROI Calculation**: Calculates time and money savings based on employee count and salary data
- **AI Readiness Score**: Provides a comprehensive score indicating the business's readiness for AI adoption
- **Personalized Analysis**: AI-generated insights and recommendations specific to each business
- **Email Capture**: Collects leads before showing results
- **SEO Optimized**: Full metadata and schema markup for search engine visibility

## File Structure

```
app/calculator/
├── page.tsx                    # Main calculator page component
├── types.ts                    # TypeScript type definitions
├── metadata.ts                 # SEO metadata configuration
├── README.md                   # This file
├── components/
│   ├── ProgressBar.tsx        # Quiz progress indicator
│   ├── QuizQuestion.tsx       # Individual question display
│   ├── EmailForm.tsx          # Email capture form
│   └── ResultsDisplay.tsx     # Results page with CTAs
└── services/
    └── geminiService.ts       # Google Gemini AI integration
```

## Setup

### 1. Get a Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Copy the API key

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Install Dependencies

Dependencies are already installed via the main project, but if needed:

```bash
npm install @google/genai
```

## Usage

The calculator is accessible at `/calculator` route and integrates with:

- **Homepage**: Teaser section with preview and CTA buttons
- **Contact**: Results page includes CTAs to contact and services pages
- **Services**: Results recommend exploring specific WAZA services

## Industries Supported

- Retail / E-commerce
- Healthcare
- Manufacturing
- Finance & Insurance
- Professional Services
- Technology

## How It Works

1. **User Input**: User selects industry, employee count, and average salary
2. **Quiz Generation**: Gemini AI generates 10 industry-specific questions
3. **Answer Collection**: User answers multiple-choice questions
4. **Email Capture**: User provides email to see results
5. **Results Calculation**:
   - Time saved per employee × number of employees
   - Money saved = time saved × hourly rate
   - AI readiness score (0-100%)
6. **Personalized Report**: AI-generated summary with actionable insights

## SEO Strategy

### Keywords Targeted

- AI ROI calculator
- AI automation savings
- Business process automation
- AI implementation ROI
- AI readiness assessment
- Automation cost savings

### Metadata

- Complete Open Graph tags
- Twitter Card support
- Structured data ready
- Canonical URLs
- Optimized meta descriptions

## Integration Points

### Homepage Teaser

Located in `app/components/AIROICalculator.tsx`:
- Shows preview stats
- Placeholder calculator UI
- Links to full calculator page

### Results Page CTAs

- "Schedule a Consultation" → /contact
- "Explore Our Services" → /services
- "Take Quiz Again" → restart

## Customization

### Modify Industries

Edit the `INDUSTRIES` array in `page.tsx`:

```typescript
const INDUSTRIES = [
  'Your Industry',
  'Another Industry',
  // ...
];
```

### Adjust Calculations

Modify the calculation logic in `handleEmailSubmit`:

```typescript
const hourlyRate = annualSalary / 2080; // Adjust work hours
const moneySaved = totalCompanyTimeSaving * hourlyRate;
```

### Customize AI Prompts

Edit prompts in `services/geminiService.ts`:
- `generateQuizQuestions`: Customize question generation
- `generateResultsSummary`: Customize analysis output

## Analytics & Tracking

To track calculator performance, add analytics events:

```typescript
// In page.tsx
const trackEvent = (eventName: string, data: any) => {
  // Add your analytics tracking here
  // e.g., Google Analytics, Mixpanel, etc.
};
```

## Security Considerations

- API key is server-side only (no NEXT_PUBLIC_ prefix) — never exposed to the browser
- Gemini calls happen exclusively through `/api/calculator/*` routes
- Consider rate limiting on production
- Validate all user inputs
- Sanitize email inputs before storage

## Future Enhancements

- [ ] Add multi-language support
- [ ] Email automation (send results via email)
- [ ] Save results to database
- [ ] A/B testing different question sets
- [ ] Export results as PDF
- [ ] Integration with CRM (HubSpot, Salesforce)
- [ ] Social sharing of results
- [ ] Comparison with industry benchmarks

## Support

For issues or questions, contact the WAZA development team.
