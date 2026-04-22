import { google, sheets_v4 } from 'googleapis';

type JwtClient = InstanceType<typeof google.auth.JWT>;

let cached: sheets_v4.Sheets | null = null;

function getClient(): sheets_v4.Sheets | null {
  if (cached) return cached;

  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  if (!clientEmail || !privateKey) return null;

  // Env vars can't store real newlines, so we accept `\n` escapes too.
  const normalizedKey = privateKey.replace(/\\n/g, '\n');

  const auth: JwtClient = new google.auth.JWT({
    email: clientEmail,
    key: normalizedKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  cached = google.sheets({ version: 'v4', auth });
  return cached;
}

const HEADER = [
  'created_at',
  'email',
  'locale',
  'industry',
  'country',
  'employee_count',
  'average_salary',
  'weekly_hours',
  'ai_maturity',
  'primary_goal',
  'annual_hours_saved',
  'annual_labor_savings',
  'three_year_savings',
  'implementation_cost_low',
  'implementation_cost_high',
  'payback_months',
  'readiness_score',
  'max_readiness_score',
  'summary',
  'bullet_points',
  'quick_wins',
  'email_delivered',
  'email_id',
] as const;

export interface LeadRow {
  email: string;
  locale: string;
  industry: string;
  country: string;
  employeeCount: number;
  averageSalary: number;
  weeklyHours: number;
  aiMaturity: string;
  primaryGoal: string;
  annualHoursSaved: number;
  annualLaborSavings: number;
  threeYearSavings: number;
  implementationCostLow: number;
  implementationCostHigh: number;
  paybackMonths: number | null;
  readinessScore: number;
  maxReadinessScore: number;
  summaryText: string;
  bulletPoints: string[];
  quickWins: string[];
  emailDelivered: boolean;
  emailId: string | null;
}

async function ensureHeader(sheets: sheets_v4.Sheets, spreadsheetId: string, sheetName: string) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A1:A1`,
  });
  const firstCell = res.data.values?.[0]?.[0];
  if (!firstCell) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: 'RAW',
      requestBody: { values: [HEADER as unknown as string[]] },
    });
  }
}

export async function appendLead(row: LeadRow): Promise<{ stored: boolean; range?: string; error?: string }> {
  const sheets = getClient();
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const sheetName = process.env.GOOGLE_SHEETS_TAB_NAME || 'Leads';

  if (!sheets || !spreadsheetId) {
    return { stored: false, error: 'sheets_not_configured' };
  }

  try {
    await ensureHeader(sheets, spreadsheetId, sheetName);

    const values = [[
      new Date().toISOString(),
      row.email,
      row.locale,
      row.industry,
      row.country,
      row.employeeCount,
      row.averageSalary,
      row.weeklyHours,
      row.aiMaturity,
      row.primaryGoal,
      row.annualHoursSaved,
      row.annualLaborSavings,
      row.threeYearSavings,
      row.implementationCostLow,
      row.implementationCostHigh,
      row.paybackMonths ?? '',
      row.readinessScore,
      row.maxReadinessScore,
      row.summaryText,
      row.bulletPoints.join(' | '),
      row.quickWins.join(' | '),
      row.emailDelivered,
      row.emailId ?? '',
    ]];

    const res = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:W`,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values },
    });

    return { stored: true, range: res.data.updates?.updatedRange };
  } catch (err) {
    console.error('[google-sheets] append failed:', err);
    return { stored: false, error: err instanceof Error ? err.message : 'unknown' };
  }
}

export async function markDelivered(emailId: string | null, leadRange: string | undefined) {
  // For Google Sheets we'd need to track the row index to update a cell.
  // To keep this simple, we write the `email_delivered` and `email_id`
  // values directly in the initial row by calling appendLead AFTER the
  // email is sent (see send-report route). This stub exists for API
  // symmetry only and is a no-op.
  void emailId;
  void leadRange;
}
