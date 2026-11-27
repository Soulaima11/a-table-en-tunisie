import { Texte } from "@/app/components/langue";
import Image from "next/image";
import Link from "next/link";
import type { Recette } from "../data/recettes";

export function FicheDecouverte({ recette }: { recette: Recette }) {
  return (
    <Link className="fiche-decouverte" href={`/recettes/${recette.slug}`}>
      {recette.image && <Image src={recette.image} alt="" sizes="(max-width: 700px) 92vw, 33vw" unoptimized />}
      <span><Texte>{recette.title}</Texte> <span aria-hidden="true">↗</span></span>
    </Link>
  );
}
