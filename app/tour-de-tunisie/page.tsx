import { Texte, AttributsTraduits } from "@/app/components/langue";
import type { Metadata } from "next";
import Image from "next/image";
import { escales } from "../data/tour-tunisie";

export const metadata: Metadata = {
  title: "Tour de Tunisie en recettes",
  description: "Découvre les spécialités tunisiennes de Kairouan, Djerba, Sfax et de nombreuses autres villes.",
};

export default function TourPage() {
  return (
    <main id="contenu" className="conteneur page-outil">
      <h1><Texte>Tour de Tunisie en recettes</Texte></h1>
      <p>{escales.length}{" "}<Texte>escales culinaires, du makroudh de Kairouan au couscous au poulpe de Kerkennah.</Texte></p>
      <div className="grille-regions">
        {escales.map(({ id, nom, specialites, photos, texte }) => (
          <section className="region-decouverte" id={id} key={id} aria-labelledby={`escale-${id}`}>
            <h2 id={`escale-${id}`}><Texte>{nom}</Texte></h2>
            {photos && (
              <div className="photos-escale">
                {photos.map(({ image, description, legende }) => (
                  <figure key={image.src}>
                    <AttributsTraduits><Image className="photo-escale" src={image} alt={description} sizes={photos.length > 1 ? "(max-width: 700px) 45vw, 17vw" : "(max-width: 700px) 90vw, 33vw"} /></AttributsTraduits>
                    {legende && <figcaption><Texte>{legende}</Texte></figcaption>}
                  </figure>
                ))}
              </div>
            )}
            <ul className="specialites-escale">
              {specialites.map((specialite) => <li key={specialite}><Texte>{specialite}</Texte></li>)}
            </ul>
            {texte && <p className="texte-escale"><Texte>{texte}</Texte></p>}
          </section>
        ))}
      </div>
    </main>
  );
}
