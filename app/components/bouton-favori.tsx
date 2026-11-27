"use client";

import { Texte } from "@/app/components/langue";
import Link from "next/link";
import { useEffect, useState } from "react";
import { favoris, modifierFavori } from "../lib/favoris";
import { useSessionUser } from "./session";

export function BoutonFavori({ slug }: { slug: string }) {
  const user = useSessionUser();
  if (!user) return user === null ? <Link className="bouton-favori" href="/login"><Texte>♡ Se connecter pour ajouter aux favoris</Texte></Link> : null;
  return <FavoriConnecte key={user.id + ":" + slug} userId={user.id} slug={slug} />;
}

function FavoriConnecte({ userId, slug }: { userId: string; slug: string }) {
  const [enregistre, setEnregistre] = useState<boolean | null>(null);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let actif = true;
    async function charger() {
      try {
        const { data, error } = await favoris().select("recette_slug").eq("user_id", userId).eq("recette_slug", slug).maybeSingle();
        if (error) throw error;
        if (actif) setEnregistre(Boolean(data));
      } catch {
        if (actif) setMessage("Impossible de charger le favori.");
      }
    }
    void charger();
    return () => { actif = false; };
  }, [userId, slug]);

  async function basculer() {
    if (enregistre === null || pending) return;
    setPending(true);
    setMessage("");
    try {
      await modifierFavori(userId, slug, !enregistre);
      setEnregistre(!enregistre);
      setMessage(enregistre ? "Recette retirée des favoris." : "Recette ajoutée aux favoris.");
    } catch {
      setMessage("La modification a échoué. Réessaie dans un instant.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="action-favori">
      <button type="button" className="bouton-favori" onClick={basculer} aria-pressed={enregistre ?? false} disabled={pending || enregistre === null}>
        <span aria-hidden="true">{enregistre ? "♥" : "♡"}</span>
        <Texte>{enregistre ? "Retirer des favoris" : "Ajouter aux favoris"}</Texte>
      </button>
      <span className="statut-favori" role="status"><Texte>{message}</Texte></span>
    </div>
  );
}
