import { getSupabase } from "./supabase";

export function favoris() {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase indisponible");
  return supabase.from("recettes_favorites");
}

export async function modifierFavori(userId: string, slug: string, ajouter: boolean) {
  const { error } = ajouter
    ? await favoris().upsert({ user_id: userId, recette_slug: slug }, {
        onConflict: "user_id,recette_slug",
        ignoreDuplicates: true,
      })
    : await favoris().delete().eq("user_id", userId).eq("recette_slug", slug);
  if (error) throw error;
}
