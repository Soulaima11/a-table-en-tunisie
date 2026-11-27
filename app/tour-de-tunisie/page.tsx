import type { Metadata } from "next";
import { FicheDecouverte } from "../components/fiche-decouverte";
import { recettesPour, regions } from "../data/decouvertes";

export const metadata: Metadata = { title: "Tour de Tunisie en recettes" };

export default function TourPage() {
  return (
    <main id="contenu" className="conteneur page-outil">
      <h1>Tour de Tunisie en recettes</h1>
      <p>Trois escales pour découvrir le riz djerbien, le kaâk warka de Zaghouan et le makroudh de Kairouan.</p>
      <nav className="sommaire-fiche" aria-label="Les escales">
        {regions.map((region) => <a href={`#${region.id}`} key={region.id}>{region.nom}</a>)}
      </nav>
      <div className="grille-regions">
        {regions.map((region) => (
          <section className="region-decouverte" id={region.id} key={region.id}>
            <p className="surtitre">{region.nom}</p>
            <h2>{region.titre}</h2>
            <p>{region.texte}</p>
            {recettesPour(region.recettes).map((recette) => <FicheDecouverte key={recette.slug} recette={recette} />)}
            <a className="lien-editorial source-region" href={region.source}>Source sur cette spécialité</a>
          </section>
        ))}
      </div>
    </main>
  );
}
