-- Additive migration for an existing calculator_leads table: adds the
-- country column introduced when regionalizing the quiz. Safe to re-run.

alter table public.calculator_leads
  add column if not exists country text;
