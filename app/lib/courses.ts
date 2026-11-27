"use client";

import { useSyncExternalStore } from "react";

export type GroupeCourses = { slug: string; titre: string; lignes: { texte: string; coche: boolean }[] };
const cle = "table-tunisie-courses-v1";

function lire() {
  try { return localStorage.getItem(cle) ?? "[]"; } catch { return "[]"; }
}

function charger(raw: string): GroupeCourses[] {
  try { return JSON.parse(raw); } catch { return []; }
}

function ecouter(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(cle, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(cle, callback);
  };
}

export function useCourses() {
  return charger(useSyncExternalStore(ecouter, lire, () => "[]"));
}

export function modifierCourses(modifier: (liste: GroupeCourses[]) => GroupeCourses[]) {
  localStorage.setItem(cle, JSON.stringify(modifier(charger(lire()))));
  window.dispatchEvent(new Event(cle));
}

export function ajouterCourses(recettes: { slug: string; title: string; ingredients: string[] }[]) {
  modifierCourses((liste) => {
    const groupes = new Map(liste.map((groupe) => [groupe.slug, groupe]));
    for (const recette of recettes) {
      const coches = new Map(groupes.get(recette.slug)?.lignes.map(({ texte, coche }) => [texte, coche]));
      groupes.set(recette.slug, {
        slug: recette.slug,
        titre: recette.title,
        lignes: recette.ingredients.map((texte) => ({ texte, coche: coches.get(texte) ?? false })),
      });
    }
    return [...groupes.values()];
  });
}
