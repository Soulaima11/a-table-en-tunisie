import { Texte, AttributsTraduits } from "@/app/components/langue";
import type { Metadata } from "next";
import { AjoutCourses } from "../components/ajout-courses";
import { FicheDecouverte } from "../components/fiche-decouverte";
import { menus, recettesPour } from "../data/decouvertes";

export const metadata: Metadata = { title: "Menus tunisiens" };

export default function MenusPage() {
  return (
    <main id="contenu" className="conteneur page-outil">
      <h1><Texte>Menus pour toutes les occasions</Texte></h1>
      <p><Texte>Choisis un menu complet et ajoute ses ingrédients à ta liste de courses.</Texte></p>
      <AttributsTraduits><nav className="sommaire-fiche" aria-label="Les menus">
        {menus.map((menu) => <a href={`#${menu.id}`} key={menu.id}><Texte>{menu.titre}</Texte></a>)}
      </nav></AttributsTraduits>
      {menus.map((menu) => {
        const recettes = recettesPour(menu.recettes);
        return (
          <section className="bloc-decouverte" id={menu.id} key={menu.id}>
            <h2><Texte>{menu.titre}</Texte></h2>
            <p><Texte>{menu.description}</Texte></p>
            <ul className="cartes-decouverte">
              {recettes.map((recette) => <li key={recette.slug}><FicheDecouverte recette={recette} /></li>)}
            </ul>
            <AjoutCourses recettes={recettes.map(({ slug, title, ingredients }) => ({ slug, title, ingredients }))} label="Ajouter le menu à mes courses" />
          </section>
        );
      })}
    </main>
  );
}
