begin;

create table public.messages_contact (
  id uuid primary key default gen_random_uuid(),
  nom text not null check (char_length(btrim(nom)) between 1 and 100),
  email text not null check (
    char_length(email) <= 254 and email ~ '^[^[:space:]@]+@[^[:space:]@]+$'
  ),
  message text not null check (char_length(btrim(message)) between 1 and 3000),
  created_at timestamptz not null default now()
);

alter table public.messages_contact enable row level security;

revoke all on public.messages_contact from public, anon, authenticated;
grant insert (nom, email, message) on public.messages_contact to anon, authenticated;

create policy "Accepter les messages du formulaire"
on public.messages_contact
for insert
to anon, authenticated
with check (true);

commit;
