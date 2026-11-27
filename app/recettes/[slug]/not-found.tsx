import { Texte } from "@/app/components/langue";
import Link from "next/link";

export default function RecetteIntrouvable() {
  return (
    <main id="contenu" className="conteneur page-formulaire">
      <h1><Texte>Recette introuvable</Texte></h1>
      <Link className="bouton" href="/#recettes"><Texte>Revenir au carnet</Texte></Link>
    </main>
  );
}
