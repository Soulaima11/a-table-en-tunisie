"use client";

import Image from "next/image";
import Link from "next/link";
import couscous from "../../public/recettes/couscous.png";
import { useSessionUser } from "../components/session";

export default function ComptePage() {
  const user = useSessionUser();
  if (!user) return null;

  return (
    <div className="carte-compte">
      <div className="carte-compte-contenu">
        <h2>À table !</h2>
        <p>Retrouve ton carnet de recettes tunisiennes et choisis ton prochain plat.</p>
        <Link href="/#recettes" className="bouton">Voir les recettes <span aria-hidden="true">↗</span></Link>
        <dl className="coordonnees-compte">
          <dt>Adresse e-mail</dt>
          <dd>{user.email || "Adresse indisponible"}</dd>
        </dl>
      </div>
      <Image src={couscous} alt="" sizes="(max-width: 760px) 92vw, 42vw" unoptimized />
    </div>
  );
}
