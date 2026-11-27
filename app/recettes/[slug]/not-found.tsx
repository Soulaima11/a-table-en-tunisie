import Link from "next/link";

export default function RecetteIntrouvable() {
  return (
    <main id="contenu" className="conteneur page-formulaire">
      <h1>Recette introuvable</h1>
      <Link className="bouton" href="/#recettes">Revenir au carnet</Link>
    </main>
  );
}
