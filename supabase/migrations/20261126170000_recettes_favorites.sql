begin;

create table public.recettes_favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  recette_slug text not null check (char_length(recette_slug) <= 100 and recette_slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  created_at timestamptz not null default now(),
  primary key (user_id, recette_slug)
);

alter table public.recettes_favorites enable row level security;
revoke all on public.recettes_favorites from public, anon, authenticated;
grant select, insert, delete on public.recettes_favorites to authenticated;

create policy "Lire ses favoris" on public.recettes_favorites
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Ajouter ses favoris" on public.recettes_favorites
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Retirer ses favoris" on public.recettes_favorites
  for delete to authenticated using ((select auth.uid()) = user_id);

commit;
