import { Texte, AttributsTraduits, Duree } from "@/app/components/langue";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BoutonFavori } from "../../components/bouton-favori";
import { IngredientsRecette } from "../../components/ingredients-recette";
import { ModeCuisine } from "../../components/mode-cuisine";
import { recettes } from "../../data/recettes";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return recettes.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recette = recettes.find((item) => item.slug === slug);
  if (!recette) notFound();
  return { title: recette.title, description: recette.description };
}

export default async function RecettePage({ params }: Props) {
  const { slug } = await params;
  const recette = recettes.find((item) => item.slug === slug);
  if (!recette) notFound();

  return (
    <main id="contenu" className="conteneur fiche">
      <Link className="retour" href="/#recettes"><Texte>← Toutes les recettes</Texte></Link>
      <article>
        <header className={recette.image ? "fiche-entete" : "fiche-entete fiche-entete-texte"}>
          <div>
            <p className="surtitre"><Texte>{recette.category}</Texte></p>
            <h1><Texte>{recette.title}</Texte></h1>
            <p><Texte>{recette.description}</Texte></p>
            <dl className="infos">
              <div><dt><Texte>Durée estimée</Texte></dt><dd><Duree minutes={recette.minutes} /></dd></div>
              <div><dt><Texte>Quantité</Texte></dt><dd><Texte>{recette.servings}</Texte></dd></div>
            </dl>
            <BoutonFavori slug={recette.slug} />
          </div>
          {recette.image && (
            <AttributsTraduits><Image src={recette.image} alt={recette.imageAlt ?? recette.title} sizes="(max-width: 760px) 92vw, 50vw" unoptimized /></AttributsTraduits>
          )}
        </header>
        <AttributsTraduits><nav className="sommaire-fiche" aria-label="Dans cette recette">
          <a href="#titre-ingredients"><Texte>Ingrédients</Texte></a>
          <a href="#titre-preparation"><Texte>Préparation</Texte></a>
          {recette.tip && <a href="#conseil-recette"><Texte>Conseil</Texte></a>}
          <ModeCuisine etapes={recette.steps} />
        </nav></AttributsTraduits>
        <div className="fiche-corps">
          <IngredientsRecette recette={recette} />
          <section aria-labelledby="titre-preparation">
            <h2 id="titre-preparation"><Texte>Préparation</Texte></h2>
            <ol className="etapes">
              {recette.steps.map((etape) => <li key={etape}><Texte>{etape}</Texte></li>)}
            </ol>
            {recette.tip && (
              <aside className="conseil-recette">
                <h3 id="conseil-recette"><Texte>Conseil de préparation</Texte></h3>
                <p><Texte>{recette.tip}</Texte></p>
              </aside>
            )}
            {recette.source && (
              <p className="source-recette"><Texte>Recette adaptée d’après</Texte>{" "}<a href={recette.source.url}>{recette.source.name}</a>.
              </p>
            )}
          </section>
        </div>
      </article>
    </main>
  );
}
