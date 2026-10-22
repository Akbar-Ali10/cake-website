-- 1) Create admin access table
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

create policy "Admins can view their own record"
on public.admin_users
for select
using (auth.uid() = user_id);

create policy "Admins can insert their own record"
on public.admin_users
for insert
with check (auth.uid() = user_id);

-- 2) Main cakes table
create table if not exists public.cakes (
  id text primary key,
  name text not null,
  description text not null,
  category text not null,
  image text,
  featured boolean not null default false,
  is_available boolean not null default true,
  sizes jsonb not null default '[]'::jsonb,
  flavours jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.cakes
  alter column id type text using id::text;

alter table public.cakes enable row level security;

create policy "Public can read active cakes"
on public.cakes
for select
using (is_available = true);

create policy "Admins can manage cakes"
on public.cakes
for all
using (public.is_admin())
with check (public.is_admin());

-- 3) Storage bucket for cake images
insert into storage.buckets (id, name, public)
values ('cake-images', 'cake-images', true)
on conflict (id) do nothing;

create policy "Public can view cake images"
on storage.objects
for select
using (bucket_id = 'cake-images');

create policy "Admins can upload cake images"
on storage.objects
for insert
with check (
  bucket_id = 'cake-images'
  and public.is_admin()
);

create policy "Admins can update cake images"
on storage.objects
for update
using (
  bucket_id = 'cake-images'
  and public.is_admin()
)
with check (
  bucket_id = 'cake-images'
  and public.is_admin()
);

create policy "Admins can delete cake images"
on storage.objects
for delete
using (
  bucket_id = 'cake-images'
  and public.is_admin()
);

-- 4) Helper trigger to update updated_at on every cake edit
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists cakes_updated_at on public.cakes;
create trigger cakes_updated_at
before update on public.cakes
for each row
execute function public.set_updated_at();

-- 5) Add an admin user by email after signing in once in Supabase Auth
-- Example:
-- insert into public.admin_users (user_id)
-- values ((select id from auth.users where email = 'admin@yourdomain.com'));
--
-- After that, the admin can sign in and manage cakes.
