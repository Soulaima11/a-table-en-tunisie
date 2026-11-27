"use client";

import { Texte, AttributsTraduits } from "@/app/components/langue";
import { useState } from "react";
import { ajusterQuantites, libellePortions, portionsDe } from "../lib/quantites";
import { AjoutCourses } from "./ajout-courses";

export function IngredientsRecette({ recette }: { recette: { slug: string; title: string; servings: string; ingredients: string[] } }) {
  const reference = portionsDe(recette.servings);
  const [portions, setPortions] = useState(reference);
  const ingredients = ajusterQuantites(recette.ingredients, reference && portions ? portions / reference : 1);

  return (
    <section className="ingredients" aria-labelledby="titre-ingredients">
      <h2 id="titre-ingredients"><Texte>Ingrédients</Texte></h2>
      {reference && portions !== null && (
        <AttributsTraduits><div className="portions" role="group" aria-label="Ajuster les quantités">
          <AttributsTraduits><button className="bouton-favori" type="button" disabled={portions <= 1} aria-label="Diminuer la quantité" onClick={() => setPortions(portions - 1)}>−</button></AttributsTraduits>
          <output><Texte>{libellePortions(recette.servings, portions, reference)}</Texte></output>
          <AttributsTraduits><button className="bouton-favori" type="button" disabled={portions >= 40} aria-label="Augmenter la quantité" onClick={() => setPortions(portions + 1)}>+</button></AttributsTraduits>
        </div></AttributsTraduits>
      )}
      {reference && portions !== reference && <p className="statut-favori"><Texte>Quantités estimées. Ajuste l’assaisonnement et la cuisson au besoin.</Texte></p>}
      <ul>
        {ingredients.map((texte, index) => (
          <li key={recette.ingredients[index]}><label><input type="checkbox" /><Texte>{texte}</Texte></label></li>
        ))}
      </ul>
      <AjoutCourses recettes={[{ ...recette, ingredients }]} />
    </section>
  );
}
