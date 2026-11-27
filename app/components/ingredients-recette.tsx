"use client";

import { useState } from "react";
import { ajusterQuantites, libellePortions, portionsDe } from "../lib/quantites";
import { AjoutCourses } from "./ajout-courses";

export function IngredientsRecette({ recette }: { recette: { slug: string; title: string; servings: string; ingredients: string[] } }) {
  const reference = portionsDe(recette.servings);
  const [portions, setPortions] = useState(reference);
  const ingredients = ajusterQuantites(recette.ingredients, reference && portions ? portions / reference : 1);

  return (
    <section className="ingredients" aria-labelledby="titre-ingredients">
      <h2 id="titre-ingredients">Ingrédients</h2>
      {reference && portions !== null && (
        <div className="portions" role="group" aria-label="Ajuster les quantités">
          <button className="bouton-favori" type="button" disabled={portions <= 1} aria-label="Diminuer la quantité" onClick={() => setPortions(portions - 1)}>−</button>
          <output>{libellePortions(recette.servings, portions, reference)}</output>
          <button className="bouton-favori" type="button" disabled={portions >= 40} aria-label="Augmenter la quantité" onClick={() => setPortions(portions + 1)}>+</button>
        </div>
      )}
      {reference && portions !== reference && <p className="statut-favori">Quantités estimées. Ajuste l’assaisonnement et la cuisson au besoin.</p>}
      <ul>
        {ingredients.map((texte, index) => (
          <li key={recette.ingredients[index]}><label><input type="checkbox" />{texte}</label></li>
        ))}
      </ul>
      <AjoutCourses recettes={[{ ...recette, ingredients }]} />
    </section>
  );
}
