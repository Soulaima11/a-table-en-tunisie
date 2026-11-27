import Image from "next/image";
import Link from "next/link";
import drapeauTunisie from "../public/drapeau-tunisie.png";
import { Catalogue } from "./components/catalogue";
import { recettes } from "./data/recettes";

export default function Home() {
  const featured = recettes.find((recette) => recette.slug === "couscous");

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
          <Link className="bouton" href="#recettes">Choisir une recette <span aria-hidden="true">↓</span></Link>
        </div>
        {featured?.image && (
          <Link className="hero-plat" href={`/recettes/${featured.slug}`}>
            <Image src={featured.image} alt={featured.imageAlt ?? featured.title} sizes="(max-width: 760px) 92vw, 55vw" unoptimized preload />
            <span className="hero-legende">{featured.title} <span aria-hidden="true">↗</span></span>
          </Link>
        )}
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
