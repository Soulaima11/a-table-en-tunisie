"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Texte, traduire, useLangue } from "../components/langue";
import { useSessionUser } from "../components/session";
import { filtresNutrition, reperesNutrition } from "../data/nutrition";
import { recettes } from "../data/recettes";

const objectifs = ["Explorer les recettes", "Privilégier les protéines", "Privilégier les portions moins caloriques"] as const;
type Objectif = (typeof objectifs)[number];
type Filtre = (typeof filtresNutrition)[number];
type Preferences = { objectif: Objectif; filtres: Filtre[]; plafond: string };
const initial: Preferences = { objectif: objectifs[0], filtres: [], plafond: "" };
const evenement = "table-tunisie-nutrition";
const memoire = new Map<string, string>();
const recettesAvecReperes = recettes.flatMap((recette) => {
  const reperes = reperesNutrition[recette.slug];
  return reperes ? [{ recette, ...reperes }] : [];
});

function lirePreferences(valeur: string): Preferences {
  try {
    const donnees = JSON.parse(valeur) as Partial<Preferences>;
    return {
      objectif: objectifs.find((item) => item === donnees.objectif) ?? initial.objectif,
      filtres: filtresNutrition.filter((item) => Array.isArray(donnees.filtres) && donnees.filtres.includes(item)),
      plafond: typeof donnees.plafond === "string" && /^\d{0,4}$/.test(donnees.plafond) ? donnees.plafond : "",
    };
  } catch { return initial; }
}

function ecouter(callback: () => void) {
  window.addEventListener(evenement, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(evenement, callback);
    window.removeEventListener("storage", callback);
  };
}

export default function NutritionPage() {
  const langue = useLangue();
  const user = useSessionUser();
  const cle = `${evenement}:${user?.id ?? "visiteur"}`;
  const preferences = lirePreferences(useSyncExternalStore(ecouter, () => {
    try { return localStorage.getItem(cle) ?? memoire.get(cle) ?? ""; }
    catch { return memoire.get(cle) ?? ""; }
  }, () => ""));
  const { objectif, filtres, plafond } = preferences;
  const formater = new Intl.NumberFormat(langue);

  function actualiser(modifications: Partial<Preferences>) {
    const valeur = JSON.stringify({ ...preferences, ...modifications });
    memoire.set(cle, valeur);
    try { localStorage.setItem(cle, valeur); } catch { /* La préférence reste disponible en mémoire. */ }
    window.dispatchEvent(new Event(evenement));
  }

  const resultats = recettesAvecReperes.filter((item) => {
    const correspond = {
      "20 g de protéines ou plus": item.proteines >= 20,
      "Végétarien": item.vegetarien,
      "Sans gluten": item.sansGluten,
      "Sans lactose": item.sansLactose,
      "400 kcal maximum": item.kcal <= 400,
    };
    return (!Number(plafond) || item.kcal <= Number(plafond)) && filtres.every((filtre) => correspond[filtre]);
  });
  if (objectif === objectifs[1]) resultats.sort((a, b) => b.proteines - a.proteines);
  if (objectif === objectifs[2]) resultats.sort((a, b) => a.kcal - b.kcal);

  return (
    <main id="contenu" className="conteneur page-outil">
      <h1><Texte>Mon espace nutrition</Texte></h1>
      <p><Texte>Choisis un objectif et filtre les recettes selon tes préférences.</Texte></p>
      <div className="options-outil">
        <label><Texte>Mon objectif</Texte><select value={objectif} onChange={(event) => {
          const valeur = objectifs.find((item) => item === event.target.value);
          if (valeur) actualiser({ objectif: valeur });
        }}>{objectifs.map((item) => <option key={item} value={item}>{traduire(langue, item)}</option>)}</select></label>
        <label><Texte>Budget en kcal par portion</Texte><input inputMode="numeric" maxLength={4} value={plafond}
          onChange={(event) => actualiser({ plafond: event.target.value
            .replace(/[٠-٩]/g, (chiffre) => String(chiffre.charCodeAt(0) - 0x660))
            .replace(/[^0-9]/g, "") })} /></label>
      </div>
      <fieldset className="filtres-nutrition">
        <legend><Texte>Préférences et restrictions</Texte></legend>
        {filtresNutrition.map((filtre) => <label key={filtre}>
          <input type="checkbox" checked={filtres.includes(filtre)} onChange={(event) => actualiser({
            filtres: event.target.checked ? [...filtres, filtre] : filtres.filter((item) => item !== filtre),
          })} /><Texte>{filtre}</Texte>
        </label>)}
      </fieldset>
      <p className="note-outil"><Texte>Les valeurs sont indicatives et varient selon les ingrédients, la cuisson et la taille des portions. Les filtres concernent la recette telle qu’elle est écrite. En cas d’allergie, vérifie les étiquettes et les risques de contamination croisée.</Texte></p>
      <a className="lien-editorial" href="https://ciqual.anses.fr/"><Texte>Table de référence Ciqual (Anses)</Texte></a>
      <section className="section-outil" aria-labelledby="nutrition-resultats">
        <h2 id="nutrition-resultats"><Texte>Recettes avec repères nutritionnels</Texte></h2>
        {!resultats.length && <p role="status"><Texte>Aucune recette ne correspond à ces filtres.</Texte></p>}
        <div className="grille-recettes">
          {resultats.map((item) => <article className="carte carte-nutrition" key={item.recette.slug}>
            {item.recette.image && <Image src={item.recette.image} alt="" sizes="(max-width: 560px) 92vw, 33vw" unoptimized />}
            <div className="carte-texte">
              <h3><Link className="lien-editorial" href={`/recettes/${item.recette.slug}`}><Texte>{item.titre ?? item.recette.title}</Texte></Link></h3>
              <p className="energie-nutrition"><strong>{formater.format(item.kcal)}</strong> <Texte>kcal</Texte></p>
              <p><Texte>{item.exemple ? "Par portion · Exemple indicatif" : "Par portion · Estimation"}</Texte></p>
              <dl>{([["Protéines", item.proteines], ["Glucides", item.glucides], ["Lipides", item.lipides]] as const).map(([nom, valeur]) =>
                <div key={nom}><dt><Texte>{nom}</Texte></dt><dd>{formater.format(valeur)} <Texte>g</Texte></dd></div>
              )}</dl>
            </div>
          </article>)}
        </div>
      </section>
    </main>
  );
}
