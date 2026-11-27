"use client";

import { Texte } from "@/app/components/langue";
import { useState } from "react";
import Link from "next/link";
import { ajouterCourses } from "../lib/courses";

export function AjoutCourses({ recettes, label = "Ajouter à ma liste de courses" }: {
  recettes: { slug: string; title: string; ingredients: string[] }[];
  label?: string;
}) {
  const [etat, setEtat] = useState<"ajoute" | "erreur" | null>(null);
  return (
    <div className="ajout-courses">
      <button type="button" className="bouton-favori" onClick={() => {
        try { ajouterCourses(recettes); setEtat("ajoute"); }
        catch { setEtat("erreur"); }
      }}><Texte>{label}</Texte></button>
      <span className="statut-favori" role="status">
        {etat === "ajoute" && <><Texte>Liste mise à jour.</Texte>{" "}<Link href="/courses"><Texte>Voir mes courses</Texte></Link></>}
        <Texte>{etat === "erreur" && "Le navigateur n’a pas pu enregistrer la liste."}</Texte>
      </span>
    </div>
  );
}
