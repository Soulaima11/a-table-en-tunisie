"use client";

import { Texte, AttributsTraduits } from "@/app/components/langue";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useSessionUser } from "../components/session";

export default function CompteLayout({ children }: { children: ReactNode }) {
  const user = useSessionUser();
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (user === null) router.replace("/login");
  }, [router, user]);

  return (
    <main id="contenu" className="conteneur espace-compte">
      <h1><Texte>Mon compte</Texte></h1>
      {user ? (
        <>
          <AttributsTraduits><nav className="onglets-compte" aria-label="Navigation du compte">
            <Link href="/compte" aria-current={path === "/compte" ? "page" : undefined}><Texte>Aperçu</Texte></Link>
            <Link href="/compte/favoris" aria-current={path === "/compte/favoris" ? "page" : undefined}><Texte>Favoris</Texte></Link>
            <Link href="/compte/proposer" aria-current={path === "/compte/proposer" ? "page" : undefined}><Texte>Proposer une recette</Texte></Link>
          </nav></AttributsTraduits>
          {children}
        </>
      ) : (
        <p role="status"><Texte>{user === undefined ? "Chargement de ton compte…" : "Redirection vers la connexion…"}</Texte></p>
      )}
    </main>
  );
}
