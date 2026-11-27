import type { Metadata } from "next";
import { AjoutCourses } from "../components/ajout-courses";
import { FicheDecouverte } from "../components/fiche-decouverte";
import { menus, recettesPour } from "../data/decouvertes";

export const metadata: Metadata = { title: "Menus tunisiens" };

export default function MenusPage() {
  return (
    <main id="contenu" className="conteneur page-outil">
      <h1>Menus pour toutes les occasions</h1>
      <p>Choisis un menu complet et ajoute ses ingrédients à ta liste de courses.</p>
      <nav className="sommaire-fiche" aria-label="Les menus">
        {menus.map((menu) => <a href={`#${menu.id}`} key={menu.id}>{menu.titre}</a>)}
      </nav>
      {menus.map((menu) => {
        const recettes = recettesPour(menu.recettes);
        return (
          <section className="bloc-decouverte" id={menu.id} key={menu.id}>
            <h2>{menu.titre}</h2>
            <p>{menu.description}</p>
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
