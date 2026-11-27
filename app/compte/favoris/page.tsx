"use client";

import { Texte, AttributsTraduits } from "@/app/components/langue";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AjoutCourses } from "../../components/ajout-courses";
import { useSessionUser } from "../../components/session";
import { recettes } from "../../data/recettes";
import { favoris, modifierFavori } from "../../lib/favoris";

export default function FavorisPage() {
  const user = useSessionUser();
  return user ? <ListeFavoris key={user.id} userId={user.id} /> : null;
}

function ListeFavoris({ userId }: { userId: string }) {
  const [slugs, setSlugs] = useState<string[] | null>(null);
  const [retrait, setRetrait] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let actif = true;
    async function charger() {
      try {
        const { data, error } = await favoris().select("recette_slug").eq("user_id", userId).order("created_at", { ascending: false });
        if (error) throw error;
        if (actif) setSlugs(data.map((item) => item.recette_slug));
      } catch {
        if (actif) setMessage("Impossible de charger tes favoris.");
      }
    }
    void charger();
    return () => { actif = false; };
  }, [userId]);

  async function retirer(slug: string) {
    if (retrait) return;
    setRetrait(slug);
    setMessage("");
    try {
      await modifierFavori(userId, slug, false);
      setSlugs((actuels) => actuels?.filter((item) => item !== slug) ?? null);
      setMessage("Recette retirée des favoris.");
    } catch {
      setMessage("La recette n’a pas pu être retirée. Réessaie dans un instant.");
    } finally {
      setRetrait(null);
    }
  }

  const liste = slugs?.flatMap((slug) => {
    const recette = recettes.find((item) => item.slug === slug);
    return recette ? [recette] : [];
  });

  return (
    <section className="liste-favoris">
      <h2><Texte>Mes recettes favorites</Texte></h2>
      <p role="status"><Texte>{message || (slugs === null ? "Chargement de tes favoris…" : "")}</Texte></p>
      {liste?.length === 0 && (
        <div className="carte-compte-contenu favoris-vides">
          <p><Texte>Tu n’as encore enregistré aucune recette.</Texte></p>
          <Link className="bouton" href="/#recettes"><Texte>Explorer les recettes</Texte></Link>
        </div>
      )}
      {liste && liste.length > 0 && (
        <>
        <AjoutCourses recettes={liste} label="Ajouter ces favoris à mes courses" />
        <ul className="grille-favoris">
          {liste.map((recette) => (
            <li key={recette.slug} className="favori-enregistre">
              <Link href={`/recettes/${recette.slug}`}>
                {recette.image && <Image src={recette.image} alt="" width={96} height={72} unoptimized />}
                <span><Texte>{recette.title}</Texte></span>
              </Link>
              <AttributsTraduits><button type="button" className="bouton-favori" disabled={retrait !== null} onClick={() => retirer(recette.slug)} aria-label={`Retirer ${recette.title} des favoris`}>
                <Texte>{retrait === recette.slug ? "Retrait…" : "Retirer"}</Texte>
              </button></AttributsTraduits>
            </li>
          ))}
        </ul>
        </>
      )}
    </section>
  );
}
