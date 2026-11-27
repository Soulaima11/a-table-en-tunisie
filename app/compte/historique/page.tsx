"use client";

import Image from "next/image";
import Link from "next/link";
import { useHistoriqueRecettes } from "../../components/historique-recettes";
import { Texte } from "../../components/langue";
import { recettes } from "../../data/recettes";

const parSlug = new Map(recettes.map((recette) => [recette.slug, recette]));

export default function HistoriquePage() {
  const recentes = useHistoriqueRecettes().flatMap((slug) => parSlug.get(slug) ?? []);

  return (
    <section aria-labelledby="titre-historique">
      <h2 id="titre-historique"><Texte>Recettes récemment consultées</Texte></h2>
      {recentes.length ? (
        <ul className="historique-recettes">
          {recentes.map((recette) => (
            <li key={recette.slug}>
              <Link href={`/recettes/${recette.slug}`}>
                {recette.image && <Image src={recette.image} width={88} height={72} alt="" unoptimized />}
                <div>
                  <span className="surtitre"><Texte>{recette.category}</Texte></span>
                  <strong><Texte>{recette.title}</Texte></strong>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <p><Texte>Les recettes que tu ouvres en étant connecté apparaîtront ici.</Texte></p>
          <Link className="lien-editorial" href="/#recettes"><Texte>Voir les recettes</Texte></Link>
        </>
      )}
    </section>
  );
}
