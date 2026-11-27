"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useSessionUser } from "./session";

const evenement = "table-tunisie-historique";
const vide = "[]";

function lire(cle: string | null) {
  try {
    return cle ? localStorage.getItem(cle) ?? vide : vide;
  } catch {
    return vide;
  }
}

function slugs(valeur: string): string[] {
  try {
    const liste: unknown = JSON.parse(valeur);
    return Array.isArray(liste) ? liste.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function ecouter(callback: () => void) {
  window.addEventListener(evenement, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(evenement, callback);
    window.removeEventListener("storage", callback);
  };
}

function useCleHistorique() {
  const utilisateur = useSessionUser();
  return utilisateur ? `${evenement}:${utilisateur.id}` : null;
}

export function RecetteConsultee({ slug }: { slug: string }) {
  const cle = useCleHistorique();
  useEffect(() => {
    if (!cle) return;
    const anciennes = slugs(lire(cle));
    const recentes = [slug, ...anciennes.filter((valeur) => valeur !== slug)].slice(0, 12);
    try {
      localStorage.setItem(cle, JSON.stringify(recentes));
      window.dispatchEvent(new Event(evenement));
    } catch {
      return;
    }
  }, [cle, slug]);
  return null;
}

export function useHistoriqueRecettes() {
  const cle = useCleHistorique();
  return slugs(useSyncExternalStore(ecouter, () => lire(cle), () => vide));
}
