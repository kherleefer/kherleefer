create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null,
  category text not null default 'Programming',
  level text not null,
  price integer not null check (price >= 0),
  currency text not null default 'NGN',
  material_path text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.courses add column if not exists category text not null default 'Programming';

alter table public.courses enable row level security;

create policy "Public can read courses"
  on public.courses for select
  using (true);

insert into storage.buckets (id, name, public)
values ('course-materials', 'course-materials', false)
on conflict (id) do nothing;

-- The service-role key used by the server bypasses RLS for admin writes and signed URLs.
-- Do not put SUPABASE_SERVICE_ROLE_KEY in a NEXT_PUBLIC_ variable.
