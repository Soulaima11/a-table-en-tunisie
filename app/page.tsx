import Image from "next/image";
import Link from "next/link";
import drapeauTunisie from "../public/drapeau-tunisie.png";
import { Catalogue } from "./components/catalogue";
import { formatDuree, recettes } from "./data/recettes";

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
            <Image src={drapeauTunisie} alt="" width={42} height={28} unoptimized />
            Recettes tunisiennes
          </p>
          <h1 id="titre-accueil">À table en <em>Tunisie</em></h1>
          <p><strong>Les plats tunisiens, ça te tente&nbsp;?</strong> Teste une recette à la maison, de la brik croustillante aux makrouds au miel.</p>
          <div className="liens-accueil">
            <Link className="bouton" href="#recettes">Choisir une recette <span aria-hidden="true">↓</span></Link>
            <Link className="lien-editorial" href="#menu-tunisien">Voir le menu</Link>
          </div>
        </div>
        {featured?.image && (
          <Link className="hero-plat" href={`/recettes/${featured.slug}`}>
            <Image src={featured.image} alt={featured.imageAlt ?? featured.title} sizes="(max-width: 760px) 92vw, 55vw" unoptimized preload />
            <span className="hero-legende">{featured.title} <span aria-hidden="true">↗</span></span>
          </Link>
        )}
      </section>

      <section className="menu-editorial" id="menu-tunisien" aria-labelledby="titre-menu">
        <div className="conteneur">
          <div className="introduction-menu">
            <h2 id="titre-menu">Un menu tunisien à partager</h2>
            <p>Commence par une salade grillée, sers le riz djerbien et termine avec des makrouds au miel.</p>
          </div>
          <ul className="grille-menu">
            {selection.map((recette) => (
              <li key={recette.slug}>
                <Link href={`/recettes/${recette.slug}`}>
                  {recette.image && (
                    <Image src={recette.image} alt="" sizes="(max-width: 620px) 92vw, 34vw" unoptimized />
                  )}
                  <p className="surtitre">{recette.category} · {formatDuree(recette.minutes)}</p>
                  <h3>{recette.title} <span aria-hidden="true">↗</span></h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="collection" id="recettes" aria-labelledby="titre-recettes">
        <div className="conteneur">
          <h2 id="titre-recettes">Le carnet de recettes</h2>
          <Catalogue recettes={recettes} />
        </div>
      </section>
    </main>
  );
}
