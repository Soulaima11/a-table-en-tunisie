import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BoutonFavori } from "../../components/bouton-favori";
import { formatDuree, recettes } from "../../data/recettes";

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
      <Link className="retour" href="/#recettes">← Toutes les recettes</Link>
      <article>
        <header className={recette.image ? "fiche-entete" : "fiche-entete fiche-entete-texte"}>
          <div>
            <p className="surtitre">{recette.category}</p>
            <h1>{recette.title}</h1>
            <p>{recette.description}</p>
            <dl className="infos">
              <div><dt>Durée estimée</dt><dd>{formatDuree(recette.minutes)}</dd></div>
              <div><dt>Quantité</dt><dd>{recette.servings}</dd></div>
            </dl>
            <BoutonFavori slug={recette.slug} />
          </div>
          {recette.image && (
            <Image src={recette.image} alt={recette.imageAlt ?? recette.title} sizes="(max-width: 760px) 92vw, 50vw" unoptimized />
          )}
        </header>
        <div className="fiche-corps">
          <section className="ingredients" aria-labelledby="titre-ingredients">
            <h2 id="titre-ingredients">Ingrédients</h2>
            <ul>
              {recette.ingredients.map((ingredient) => (
                <li key={ingredient}><label><input type="checkbox" />{ingredient}</label></li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="titre-preparation">
            <h2 id="titre-preparation">Préparation</h2>
            <ol className="etapes">
              {recette.steps.map((etape) => <li key={etape}>{etape}</li>)}
            </ol>
            {recette.tip && (
              <aside className="conseil-recette">
                <h3>Conseil de préparation</h3>
                <p>{recette.tip}</p>
              </aside>
            )}
            {recette.source && (
              <p className="source-recette">
                Recette adaptée d’après <a href={recette.source.url}>{recette.source.name}</a>.
              </p>
            )}
          </section>
        </div>
      </article>
    </main>
  );
}
