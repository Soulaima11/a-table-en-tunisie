"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { categories, formatDuree, type Recette } from "../data/recettes";

function normaliser(texte: string) {
  return texte.toLocaleLowerCase("fr").replaceAll("œ", "oe").normalize("NFD").replace(/\p{M}/gu, "");
}

export function Catalogue({ recettes }: { recettes: Recette[] }) {
  const [categorie, choisirCategorie] = useState<Recette["category"] | "Toutes">("Toutes");
  const [recherche, modifierRecherche] = useState("");
  const terme = normaliser(recherche.trim());
  const resultats = recettes.filter((recette) =>
    (categorie === "Toutes" || recette.category === categorie) &&
    normaliser([recette.title, recette.description, ...recette.ingredients].join(" ")).includes(terme)
  );

  return (
    <>
      <div className="outils-recettes">
        <div className="filtres" role="group" aria-label="Catégories de recettes">
          {(["Toutes", ...categories] as const).map((option) => (
            <button key={option} type="button" aria-pressed={option === categorie} onClick={() => choisirCategorie(option)}>
              {option}
            </button>
          ))}
        </div>
        <label className="recherche">
          <span>Rechercher une recette</span>
          <input type="search" placeholder="Ex. harissa, dattes…" value={recherche} onChange={(event) => modifierRecherche(event.target.value)} />
        </label>
      </div>
      <p className="nombre-recettes" role="status">{resultats.length} {resultats.length === 1 ? "recette" : "recettes"}</p>
      {resultats.length === 0 && <p>Essayez un autre ingrédient ou changez de catégorie.</p>}
      <div className="grille-recettes">
        {resultats.map((recette) => (
          <article className="carte" key={recette.slug} id={recette.slug}>
            <Link href={`/recettes/${recette.slug}`}>
              {recette.image && (
                <Image src={recette.image} alt="" sizes="(max-width: 560px) 92vw, (max-width: 900px) 45vw, 33vw" unoptimized />
              )}
              <div className="carte-texte">
                <p className="surtitre">{recette.category} <span>· ~{formatDuree(recette.minutes)}</span></p>
                <h3>{recette.title}</h3>
                <p>{recette.description}</p>
                <span className="carte-lien">Voir la recette <span aria-hidden="true">↗</span></span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
