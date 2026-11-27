"use client";

import Link from "next/link";
import { useState } from "react";
import { modifierCourses, useCourses } from "../lib/courses";

export default function CoursesPage() {
  const groupes = useCourses();
  const [erreur, setErreur] = useState("");

  function enregistrer(modifier: Parameters<typeof modifierCourses>[0]) {
    try { modifierCourses(modifier); setErreur(""); }
    catch { setErreur("La liste n’a pas pu être enregistrée."); }
  }

  return (
    <main id="contenu" className="conteneur page-outil">
      <h1>Ma liste de courses</h1>
      <p>Ta liste est enregistrée sur ce navigateur.</p>
      <p role="status">{erreur}</p>
      {groupes.length === 0 && <p><Link className="lien-editorial" href="/#recettes">Choisis une recette</Link> pour ajouter ses ingrédients.</p>}
      <div className="groupes-courses">
        {groupes.map((groupe) => (
          <section key={groupe.slug} className="ingredients">
            <h2><Link href={`/recettes/${groupe.slug}`}>{groupe.titre}</Link></h2>
            <ul>{groupe.lignes.map(({ texte, coche }, index) => (
              <li key={texte}><label>
                <input type="checkbox" checked={coche} onChange={(event) => {
                  const checked = event.target.checked;
                  enregistrer((liste) => liste.map((item) => item.slug === groupe.slug
                    ? { ...item, lignes: item.lignes.map((ligne, position) => position === index ? { ...ligne, coche: checked } : ligne) }
                    : item));
                }} />
                {texte}
              </label></li>
            ))}</ul>
            <button type="button" className="bouton-favori" onClick={() => enregistrer((liste) => liste.filter((item) => item.slug !== groupe.slug))}>
              Retirer cette recette de la liste
            </button>
          </section>
        ))}
      </div>
    </main>
  );
}
