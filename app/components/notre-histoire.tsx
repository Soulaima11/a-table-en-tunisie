"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Texte } from "./langue";

const cle = "table-tunisie-histoire-affichee";

export function NotreHistoire() {
  const pathname = usePathname();
  const dialogue = useRef<HTMLDialogElement>(null);
  const affiche = useRef(false);

  useEffect(() => {
    const fenetre = dialogue.current;
    if (pathname !== "/" || affiche.current || !fenetre || window.location.hash) return;
    try {
      if (localStorage.getItem(cle)) return;
    } catch { /* La fenêtre peut toujours s’afficher une fois pendant la visite. */ }

    if (!fenetre.open) fenetre.showModal();
    affiche.current = true;
    try { localStorage.setItem(cle, "1"); } catch { /* La visite en cours reste mémorisée. */ }
  }, [pathname]);

  return (
    <>
      <button type="button" className="lien-pied-histoire" onClick={() => dialogue.current?.showModal()}>
        <Texte>Notre histoire</Texte>
      </button>
      <dialog className="dialogue-histoire" ref={dialogue} aria-labelledby="titre-notre-histoire">
        <div className="histoire-interieur">
          <header>
            <h2 id="titre-notre-histoire"><Texte>Notre histoire</Texte></h2>
            <form method="dialog">
              <button type="submit" autoFocus><Texte>Fermer</Texte></button>
            </form>
          </header>
          <p className="histoire-accroche"><Texte>Bien plus que des recettes, un héritage à transmettre.</Texte></p>
          <p><Texte>{"A table en tunisie est née d'une envie simple : partager les saveurs de la Tunisie et faire vivre un patrimoine culinaire qui se transmet de génération en génération."}</Texte></p>
          <p><Texte>{"Derrière chaque plat tunisien se cache une histoire, un souvenir d'enfance, une tradition familiale ou une spécialité régionale."}</Texte></p>
          <p><Texte>{"À travers cette plateforme, nous souhaitons réunir les amoureux de la cuisine tunisienne, qu'ils vivent en Tunisie ou ailleurs dans le monde, autour d'une passion commune."}</Texte></p>
          <p><Texte>Notre ambition est de rendre la richesse de notre gastronomie accessible à tous, tout en préservant son authenticité.</Texte></p>
        </div>
      </dialog>
    </>
  );
}
