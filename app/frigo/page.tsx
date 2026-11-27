"use client";

import Link from "next/link";
import { useState } from "react";
import { recettes } from "../data/recettes";

const ingredientsCourants = ["Tomate", "Œuf", "Poulet", "Pois chiches", "Pomme de terre", "Thon", "Courgette", "Carotte", "Semoule", "Dattes"];

function normaliser(texte: string) {
  return texte.toLocaleLowerCase("fr").replaceAll("œ", "oe").normalize("NFD")
    .replace(/\p{M}/gu, "").replace(/[^a-z0-9 ]+/g, " ").trim()
    .split(/\s+/).map((mot) => mot.length > 3 ? mot.replace(/s$/, "") : mot).join(" ");
}

export default function FrigoPage() {
  const [selection, setSelection] = useState<string[]>([]);
  const [saisie, setSaisie] = useState("");
  const termes = [...new Set([...selection, ...saisie.split(",")].map(normaliser).filter(Boolean))];
  const suggestions = termes.length ? recettes.map((recette) => {
    function correspond(ligne: string, terme: string) {
      return ` ${normaliser(ligne)} `.includes(` ${terme} `);
    }
    const presents = termes.filter((terme) => recette.ingredients.some((ligne) => correspond(ligne, terme))).length;
    const aVerifier = [...new Set(recette.ingredients.flatMap((ligne) => ligne.split(/,\s+|\s+et\s+/i))
      .filter((element) => !termes.some((terme) => correspond(element, terme))))];
    return { recette, presents, aVerifier };
  }).filter(({ presents }) => presents > 0)
    .sort((a, b) => b.presents - a.presents || a.aVerifier.length - b.aVerifier.length)
    .slice(0, 8) : [];

  return (
    <main id="contenu" className="conteneur page-outil">
      <h1>Qu’est-ce que j’ai au frigo ?</h1>
      <p>Sélectionne ce que tu as déjà. Les recettes avec le plus d’ingrédients en commun s’affichent en premier.</p>
      <div className="outils-frigo">
        <div className="filtres" role="group" aria-label="Ingrédients courants">
          {ingredientsCourants.map((item) => (
            <button type="button" key={item} aria-pressed={selection.includes(item)} onClick={() => {
              setSelection((valeurs) => valeurs.includes(item) ? valeurs.filter((valeur) => valeur !== item) : [...valeurs, item]);
            }}>{item}</button>
          ))}
        </div>
        <label className="recherche">
          Autres ingrédients, séparés par des virgules
          <input type="text" value={saisie} onChange={(event) => setSaisie(event.target.value)} placeholder="Ex. ail, citron, pois chiches" />
        </label>
      </div>
      {termes.length > 0 && <p role="status">{suggestions.length ? `${suggestions.length} suggestion(s)` : "Aucune recette trouvée pour ces ingrédients."}</p>}
      <ul className="cartes-decouverte suggestions-frigo">
        {suggestions.map(({ recette, presents, aVerifier }) => (
          <li key={recette.slug} className="ingredients">
            <h2><Link className="lien-editorial" href={`/recettes/${recette.slug}`}>{recette.title}</Link></h2>
            <p>{presents} ingrédient(s) en commun</p>
            <details>
              <summary>Ingrédients et quantités à vérifier</summary>
              <ul>{aVerifier.map((ligne) => <li key={ligne}>{ligne}</li>)}</ul>
              <p>Vérifie aussi les quantités et les ingrédients associés sur la fiche.</p>
            </details>
          </li>
        ))}
      </ul>
    </main>
  );
}
