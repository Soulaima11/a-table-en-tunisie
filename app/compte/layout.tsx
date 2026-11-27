"use client";

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
      <h1>Mon compte</h1>
      {user ? (
        <>
          <nav className="onglets-compte" aria-label="Navigation du compte">
            <Link href="/compte" aria-current={path === "/compte" ? "page" : undefined}>Aperçu</Link>
            <Link href="/compte/favoris" aria-current={path === "/compte/favoris" ? "page" : undefined}>Favoris</Link>
            <Link href="/compte/proposer" aria-current={path === "/compte/proposer" ? "page" : undefined}>Proposer une recette</Link>
          </nav>
          {children}
        </>
      ) : (
        <p role="status">{user === undefined ? "Chargement de ton compte…" : "Redirection vers la connexion…"}</p>
      )}
    </main>
  );
}
