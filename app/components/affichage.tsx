"use client";

import { useEffect, useState } from "react";
import { Texte, traduire, useLangue } from "./langue";

const modes = ["systeme", "clair", "sombre"] as const;
type Mode = (typeof modes)[number];
const libelles = { systeme: "Système", clair: "Clair", sombre: "Sombre" };
const cle = "table-tunisie-affichage";

export function SelecteurAffichage() {
  const langue = useLangue();
  const [mode, setMode] = useState<Mode>("systeme");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(cle);
      const valeur = modes.find((item) => item === saved);
      if (valeur) {
        document.documentElement.dataset.theme = valeur;
        // La préférence du navigateur est disponible après l’hydratation.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMode(valeur);
      }
    } catch { /* Le thème système reste actif. */ }
  }, []);

  return <label className="selecteur-langue selecteur-affichage">
    <select aria-label={traduire(langue, "Affichage")} value={mode} onChange={(event) => {
      const valeur = modes.find((item) => item === event.target.value);
      if (!valeur) return;
      setMode(valeur);
      document.documentElement.dataset.theme = valeur;
      try { localStorage.setItem(cle, valeur); } catch { /* Le thème reste actif sur cette page. */ }
    }}>
      {modes.map((item) => <option key={item} value={item}><Texte>{libelles[item]}</Texte></option>)}
    </select>
  </label>;
}
