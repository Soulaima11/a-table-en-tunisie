"use client";

import { Texte, AttributsTraduits, Duree, traduire, useLangue } from "@/app/components/langue";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { categories, type Recette } from "../data/recettes";

function normaliser(texte: string) {
  return texte.toLocaleLowerCase("fr").replaceAll("œ", "oe").normalize("NFD").replace(/\p{M}/gu, "");
}

export function Catalogue({ recettes }: { recettes: Recette[] }) {
  const langue = useLangue();
  const [categorie, choisirCategorie] = useState<Recette["category"] | "Toutes">("Toutes");
  const [recherche, modifierRecherche] = useState("");
  const terme = normaliser(recherche.trim());
  const resultats = recettes.filter((recette) =>
    (categorie === "Toutes" || recette.category === categorie) &&
    normaliser([recette.title, recette.description, ...recette.ingredients]
      .flatMap((texte) => [texte, traduire(langue, texte)]).join(" ")).includes(terme)
  );

  return (
    <>
      <div className="outils-recettes">
        <AttributsTraduits><div className="filtres" role="group" aria-label="Catégories de recettes">
          {(["Toutes", ...categories] as const).map((option) => (
            <button key={option} type="button" aria-pressed={option === categorie} onClick={() => choisirCategorie(option)}>
              <Texte>{option}</Texte>
            </button>
          ))}
        </div></AttributsTraduits>
        <label className="recherche">
          <span><Texte>Rechercher une recette</Texte></span>
          <AttributsTraduits><input type="search" placeholder="Ex. harissa, dattes…" value={recherche} onChange={(event) => modifierRecherche(event.target.value)} /></AttributsTraduits>
        </label>
      </div>
      <p className="nombre-recettes" role="status">{resultats.length} <Texte>{resultats.length === 1 ? "recette" : "recettes"}</Texte></p>
      {resultats.length === 0 && <p><Texte>Essayez un autre ingrédient ou changez de catégorie.</Texte></p>}
      <div className="grille-recettes">
        {resultats.map((recette) => (
          <article className="carte" key={recette.slug} id={recette.slug}>
            <Link href={`/recettes/${recette.slug}`}>
              {recette.image && (
                <Image src={recette.image} alt="" sizes="(max-width: 560px) 92vw, (max-width: 900px) 45vw, 33vw" unoptimized />
              )}
              <div className="carte-texte">
                <p className="surtitre"><Texte>{recette.category}</Texte> <span>· ~<Duree minutes={recette.minutes} /></span></p>
                <h3><Texte>{recette.title}</Texte></h3>
                <p><Texte>{recette.description}</Texte></p>
                <span className="carte-lien"><Texte>Voir la recette</Texte>{" "}<span aria-hidden="true">↗</span></span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
