-- Calculator leads: stores every completed AI ROI assessment with the
-- inputs, computed metrics, Gemini-generated summary, and delivery status.
--
-- Run once in the Supabase SQL editor for the project that backs this site.

create extension if not exists "pgcrypto";

create table if not exists public.calculator_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  email text not null,
  locale text not null check (locale in ('en', 'es', 'de')),

  industry text not null,
  employee_count integer,
  average_salary integer,
  weekly_hours integer,
  ai_maturity text,
  primary_goal text,

  annual_hours_saved integer,
  annual_labor_savings integer,
  three_year_savings integer,
  implementation_cost_low integer,
  implementation_cost_high integer,
  payback_months integer,
  readiness_score integer,
  max_readiness_score integer,

  summary jsonb,

  email_delivered boolean not null default false,
  email_id text
);

create index if not exists calculator_leads_created_at_idx
  on public.calculator_leads (created_at desc);

create index if not exists calculator_leads_email_idx
  on public.calculator_leads (lower(email));

-- RLS: only service_role (the server) should ever read/write this table.
alter table public.calculator_leads enable row level security;

-- No anon policies defined on purpose — anon client cannot touch this.
