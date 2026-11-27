"use client";

import Image, { type ImageProps } from "next/image";
import { cloneElement, createContext, isValidElement, useContext, useEffect, useSyncExternalStore, type ComponentProps, type ReactNode } from "react";
import { estLangue, langues, nomsLangues, type Langue } from "../lib/langues";
import en from "../i18n/en.json";
import ar from "../i18n/ar.json";
import { useSessionUser } from "./session";

const dictionnaires: Record<Exclude<Langue, "fr">, Record<string, string>> = { en, ar };
const cle = "table-tunisie-langue";
const LangueContext = createContext<Langue>("fr");
const quantite = /\d+(?:[.,]\d+)?(?:\s?[¼½¾⅓⅔⅛⅜⅝⅞])?|[¼½¾⅓⅔⅛⅜⅝⅞]/g;
const avecQuantites = Object.fromEntries(Object.entries(dictionnaires).map(([langue, dictionnaire]) => [
  langue,
  new Map(Object.entries(dictionnaire)
    .filter(([source, cible]) => source.match(quantite)?.length === cible.match(quantite)?.length && source.match(quantite))
    .map(([source, cible]) => [source.replace(quantite, "#"), cible])),
]));

function lireLangue(): Langue | null {
  try {
    const valeur = localStorage.getItem(cle);
    return estLangue(valeur) ? valeur : null;
  } catch { return null; }
}

function ecouterLangue(callback: () => void) {
  window.addEventListener(cle, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(cle, callback);
    window.removeEventListener("storage", callback);
  };
}

export function choisirLangue(langue: Langue) {
  try {
    localStorage.setItem(cle, langue);
    window.dispatchEvent(new Event(cle));
  } catch { /* La préférence reste disponible via le profil. */ }
}

export function LangueProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(ecouterLangue, lireLangue, () => null);
  const preference = useSessionUser()?.user_metadata.langue_preferee;
  const langue = locale ?? (estLangue(preference) ? preference : "fr");
  useEffect(() => {
    document.documentElement.lang = langue;
    document.documentElement.dir = langue === "ar" ? "rtl" : "ltr";
  }, [langue]);
  return <LangueContext.Provider value={langue}>{children}</LangueContext.Provider>;
}

export function useLangue() {
  return useContext(LangueContext);
}

export function traduire(langue: Langue, valeur: string) {
  if (langue === "fr") return valeur;
  const source = valeur.trim();
  const dictionnaire = dictionnaires[langue];
  if (Object.hasOwn(dictionnaire, source)) return dictionnaire[source];
  const nombres = source.match(quantite);
  const modele = nombres && avecQuantites[langue].get(source.replace(quantite, "#"));
  let position = 0;
  return modele && nombres ? modele.replace(quantite, () => nombres[position++]) : valeur;
}

export function Duree({ minutes }: { minutes: number }) {
  const langue = useLangue();
  const formater = (valeur: number, unit: "hour" | "minute") =>
    new Intl.NumberFormat(langue, { style: "unit", unit, unitDisplay: "short" }).format(valeur);
  const heures = Math.floor(minutes / 60);
  const reste = minutes % 60;
  return [heures > 0 && formater(heures, "hour"), (reste > 0 || !heures) && formater(reste, "minute")]
    .filter(Boolean).join(" ");
}

export function Texte({ children }: { children: ReactNode }) {
  const langue = useLangue();
  return typeof children === "string" ? traduire(langue, children) : children;
}

const attributs = ["aria-label", "placeholder", "alt", "title"];

export function AttributsTraduits({ children }: { children: ReactNode }) {
  const langue = useLangue();
  if (langue === "fr" || !isValidElement<Record<string, unknown>>(children)) return children;
  const props = Object.fromEntries(attributs.flatMap((nom) => {
    const valeur = children.props[nom];
    return typeof valeur === "string" ? [[nom, traduire(langue, valeur)]] : [];
  }));
  return cloneElement(children, props);
}

export function NavigationTraduite({ "aria-label": label, ...props }: ComponentProps<"nav">) {
  const langue = useLangue();
  return <nav {...props} aria-label={label ? traduire(langue, label) : undefined} />;
}

export function ImageTraduite({ alt, ...props }: ImageProps) {
  const langue = useLangue();
  return <Image {...props} alt={traduire(langue, alt)} />;
}

export function SelecteurLangue() {
  const langue = useLangue();
  return (
    <label className="selecteur-langue">
      <select aria-label={traduire(langue, "Langue du site")} value={langue} onChange={(event) => {
        if (estLangue(event.target.value)) choisirLangue(event.target.value);
      }}>
        {langues.map((option) => <option key={option} value={option} lang={option}>{nomsLangues[option]}</option>)}
      </select>
    </label>
  );
}
