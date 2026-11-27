"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { getSupabase } from "../lib/supabase";
import { useSessionUser } from "./session";

export function MenuCompte() {
  const user = useSessionUser();
  const router = useRouter();
  const menu = useRef<HTMLDetailsElement>(null);
  const [pending, setPending] = useState(false);
  const [erreur, setErreur] = useState("");

  async function deconnecter() {
    const supabase = getSupabase();
    if (!supabase) return;

    setPending(true);
    setErreur("");
    try {
      const { error } = await supabase.auth.signOut({ scope: "local" });
      if (error) throw error;
      router.replace("/");
    } catch {
      setErreur("La déconnexion a échoué. Réessaie dans un instant.");
    } finally {
      setPending(false);
    }
  }

  if (user === undefined) return <span className="menu-compte-attente" aria-hidden="true" />;

  if (!user) {
    return (
      <>
        <Link className="lien-connexion" href="/login">Connexion</Link>
        <Link className="lien-inscription" href="/inscription">Créer un compte</Link>
      </>
    );
  }

  return (
    <details
      className="menu-compte"
      ref={menu}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false;
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && event.currentTarget.open) {
          event.currentTarget.open = false;
          event.currentTarget.querySelector("summary")?.focus();
        }
      }}
    >
      <summary>
        <span className="avatar-compte" aria-hidden="true">{user.email?.charAt(0).toLocaleUpperCase("fr") || "?"}</span>
        Mon compte
        <span className="chevron-compte" aria-hidden="true" />
      </summary>
      <div className="menu-compte-panneau">
        <Link href="/compte" onClick={() => { if (menu.current) menu.current.open = false; }}>Voir mon compte</Link>
        <button type="button" onClick={deconnecter} disabled={pending}>
          {pending ? "Déconnexion…" : "Se déconnecter"}
        </button>
        {erreur && <p role="status">{erreur}</p>}
      </div>
    </details>
  );
}
