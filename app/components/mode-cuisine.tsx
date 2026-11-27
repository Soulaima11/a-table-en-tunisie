"use client";

import { useEffect, useRef, useState } from "react";

export function ModeCuisine({ etapes }: { etapes: string[] }) {
  const dialogue = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [echeance, setEcheance] = useState<number | null>(null);
  const [restant, setRestant] = useState(0);
  const [termine, setTermine] = useState(false);

  useEffect(() => {
    if (echeance === null) return;
    const timer = window.setInterval(() => {
      const secondes = Math.max(0, Math.ceil((echeance - Date.now()) / 1000));
      setRestant(secondes);
      if (secondes === 0) {
        setEcheance(null);
        setTermine(true);
      }
    }, 250);
    return () => window.clearInterval(timer);
  }, [echeance]);

  return (
    <>
      <button className="bouton-favori" type="button" onClick={() => dialogue.current?.showModal()}>Ouvrir le mode cuisine</button>
      <dialog ref={dialogue} className="dialogue-compte mode-cuisine" aria-labelledby="titre-mode-cuisine" onClose={() => {
        setEcheance(null);
        setTermine(false);
      }}>
        <h2 id="titre-mode-cuisine">Mode cuisine</h2>
        <p className="surtitre">Étape {index + 1} sur {etapes.length}</p>
        <p className="etape-cuisine" aria-live="polite">{etapes[index]}</p>
        <div className="actions-dialogue">
          <button type="button" className="bouton-favori" disabled={index === 0} onClick={() => setIndex(index - 1)}>Précédente</button>
          <button type="button" className="bouton-favori" disabled={index === etapes.length - 1} onClick={() => setIndex(index + 1)}>Suivante</button>
        </div>
        <div className="minuteur-cuisine">
          <label>Minuteur
            <input type="number" min={1} max={180} step={1} value={minutes || ""} onChange={(event) => setMinutes(Number(event.target.value))} /> min
          </label>
          <button type="button" className="bouton-favori" disabled={!Number.isInteger(minutes) || minutes < 1 || minutes > 180} onClick={() => {
            setRestant(minutes * 60);
            setEcheance(Date.now() + minutes * 60000);
            setTermine(false);
          }}>{echeance ? "Relancer" : "Démarrer"}</button>
          {echeance && <button type="button" className="bouton-favori" onClick={() => { setEcheance(null); setRestant(0); }}>Arrêter</button>}
          {echeance !== null ? <span role="timer">{Math.floor(restant / 60)}:{String(restant % 60).padStart(2, "0")}</span> : null}
          <span role="status">{termine ? "Minuteur terminé." : ""}</span>
        </div>
        <form method="dialog" className="actions-dialogue"><button type="submit" className="lien-connexion">Fermer</button></form>
      </dialog>
    </>
  );
}
