"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { SelecteurAffichage } from "./affichage";
import { SelecteurLangue, Texte } from "./langue";

export function MenuEntete({ libelle, children, classe = "" }: {
  libelle: ReactNode;
  children: ReactNode;
  classe?: string;
}) {
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function fermerDehors(event: PointerEvent) {
      if (event.target instanceof Node && !menu.current?.contains(event.target) && menu.current) {
        menu.current.open = false;
      }
    }
    document.addEventListener("pointerdown", fermerDehors);
    return () => document.removeEventListener("pointerdown", fermerDehors);
  }, []);

  return (
    <details className={`menu-entete ${classe}`} ref={menu}
      onBlur={(event) => {
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false;
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && event.currentTarget.open) {
          event.currentTarget.open = false;
          event.currentTarget.querySelector("summary")?.focus();
        }
      }}>
      <summary>{libelle}<span className="chevron-compte" aria-hidden="true" /></summary>
      <div className="panneau-entete" onClick={(event) => {
        if (event.target instanceof Element && event.target.closest("a") && menu.current) menu.current.open = false;
      }}>{children}</div>
    </details>
  );
}

export function MenuOutils() {
  return <MenuEntete libelle={<Texte>Outils</Texte>}>
    <Link href="/frigo"><Texte>Mon frigo</Texte></Link>
    <Link href="/courses"><Texte>Mes courses</Texte></Link>
    <Link href="/ingredients"><Texte>Guide de l’étranger</Texte></Link>
    <Link href="/nutrition"><Texte>Nutrition</Texte></Link>
    <Link href="/contact"><Texte>Contact</Texte></Link>
  </MenuEntete>;
}

export function MenuReglages() {
  return <MenuEntete classe="menu-reglages" libelle={
    <><span className="icone-reglages" aria-hidden="true">⚙</span><span className="libelle-reglages"><Texte>Réglages</Texte></span></>
  }>
    <div><span><Texte>Langue du site</Texte></span><SelecteurLangue /></div>
    <div><span><Texte>Affichage</Texte></span><SelecteurAffichage /></div>
  </MenuEntete>;
}
