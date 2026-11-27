import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { escales } from "../data/tour-tunisie";

export const metadata: Metadata = {
  title: "Tour de Tunisie en recettes",
  description: "Découvre les spécialités tunisiennes de Kairouan, Djerba, Sfax et de nombreuses autres villes.",
};

export default function TourPage() {
  return (
    <main id="contenu" className="conteneur page-outil">
      <h1>Tour de Tunisie en recettes</h1>
      <p>{escales.length} escales culinaires, du makroudh de Kairouan au couscous au poulpe de Kerkennah.</p>
      <nav className="sommaire-fiche index-escales" aria-label="Choisir une escale">
        {escales.map(({ id, nom }) => <a href={`#${id}`} key={id}>{nom}</a>)}
      </nav>
      <div className="grille-regions">
        {escales.map(({ id, nom, specialites, photo, source, texte }) => (
          <section className="region-decouverte" id={id} key={id} aria-labelledby={`escale-${id}`}>
            <h2 id={`escale-${id}`}>{nom}</h2>
            {photo && (
              <Image className="photo-escale" src={photo.image} alt={photo.description} sizes="(max-width: 700px) 90vw, 33vw" />
            )}
            <ul className="specialites-escale">
              {specialites.map((specialite) => (
                <li key={specialite.nom}>
                  {specialite.recette ? (
                    <Link className="lien-editorial" href={`/recettes/${specialite.recette}`}>{specialite.nom}</Link>
                  ) : specialite.nom}
                </li>
              ))}
            </ul>
            {texte && <p className="texte-escale">{texte}</p>}
            {source && <a className="lien-editorial source-region" href={source.url}>{source.nom}</a>}
          </section>
        ))}
      </div>
    </main>
  );
}
