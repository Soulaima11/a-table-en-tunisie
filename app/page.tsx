import { Texte, ImageTraduite, Duree } from "@/app/components/langue";
import Image from "next/image";
import Link from "next/link";
import drapeauTunisie from "../public/drapeau-tunisie.png";
import { Catalogue } from "./components/catalogue";
import { recettes } from "./data/recettes";

const menuTunisien = ["mechouia", "riz-djerbien", "makroud"];

export default function Home() {
  const featured = recettes.find((recette) => recette.slug === "couscous");
  const selection = menuTunisien.flatMap((slug) =>
    recettes.filter((recette) => recette.slug === slug)
  );

  return (
    <main id="contenu">
      <section className="hero conteneur" aria-labelledby="titre-accueil">
        <div className="hero-texte">
          <p className="surtitre hero-origine">
            <Image src={drapeauTunisie} alt="" width={42} height={28} unoptimized /><Texte>Recettes tunisiennes</Texte></p>
          <h1 id="titre-accueil"><Texte>À table en</Texte>{" "}<em><Texte>Tunisie</Texte></em></h1>
          <p><strong><Texte>Les plats tunisiens, ça te tente ?</Texte></strong>{" "}<Texte>Teste une recette à la maison, de la brik croustillante aux makrouds au miel.</Texte></p>
          <div className="liens-accueil">
            <Link className="bouton" href="#recettes"><Texte>Choisir une recette</Texte>{" "}<span aria-hidden="true">↓</span></Link>
            <Link className="lien-editorial" href="#menu-tunisien"><Texte>Voir le menu</Texte></Link>
          </div>
        </div>
        {featured?.image && (
          <Link className="hero-plat" href={`/recettes/${featured.slug}`}>
            <ImageTraduite src={featured.image} alt={featured.imageAlt ?? featured.title} sizes="(max-width: 760px) 92vw, 55vw" unoptimized preload />
            <span className="hero-legende"><Texte>{featured.title}</Texte> <span aria-hidden="true">↗</span></span>
          </Link>
        )}
      </section>

      <section className="menu-editorial" id="menu-tunisien" aria-labelledby="titre-menu">
        <div className="conteneur">
          <div className="introduction-menu">
            <h2 id="titre-menu"><Texte>Un menu tunisien à partager</Texte></h2>
            <p><Texte>Commence par une salade grillée, sers le riz djerbien et termine avec des makrouds au miel.</Texte></p>
          </div>
          <ul className="grille-menu">
            {selection.map((recette) => (
              <li key={recette.slug}>
                <Link href={`/recettes/${recette.slug}`}>
                  {recette.image && (
                    <Image src={recette.image} alt="" sizes="(max-width: 620px) 92vw, 34vw" unoptimized />
                  )}
                  <p className="surtitre"><Texte>{recette.category}</Texte> · <Duree minutes={recette.minutes} /></p>
                  <h3><Texte>{recette.title}</Texte> <span aria-hidden="true">↗</span></h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="collection" id="recettes" aria-labelledby="titre-recettes">
        <div className="conteneur">
          <h2 id="titre-recettes"><Texte>Le carnet de recettes</Texte></h2>
          <Catalogue recettes={recettes} />
        </div>
      </section>
    </main>
  );
}
