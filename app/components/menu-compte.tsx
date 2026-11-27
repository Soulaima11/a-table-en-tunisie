"use client";

import { Texte } from "@/app/components/langue";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { getSupabase } from "../lib/supabase";
import { avatarValide } from "../lib/avatar";
import { useSessionUser } from "./session";
import { MenuEntete } from "./menus-entete";

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
      <MenuEntete classe="menu-invite" libelle={<Texte>Mon compte</Texte>}>
        <Link href="/login"><Texte>Connexion</Texte></Link>
        <Link href="/inscription"><Texte>Créer un compte</Texte></Link>
      </MenuEntete>
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
        <span className="avatar-compte" aria-hidden="true">
          {avatarValide(user.user_metadata.avatar_profil) ?
            <Image src={user.user_metadata.avatar_profil} alt="" width={32} height={32} unoptimized /> :
            user.email?.charAt(0).toLocaleUpperCase("fr") || "?"}
        </span><span className="libelle-compte"><Texte>Mon compte</Texte></span><span className="chevron-compte" aria-hidden="true" />
      </summary>
      <div className="menu-compte-panneau">
        <Link href="/compte" onClick={() => { if (menu.current) menu.current.open = false; }}><Texte>Voir mon compte</Texte></Link>
        <Link href="/compte/profil" onClick={() => { if (menu.current) menu.current.open = false; }}><Texte>Profil personnel</Texte></Link>
        <button type="button" onClick={deconnecter} disabled={pending}>
          <Texte>{pending ? "Déconnexion…" : "Se déconnecter"}</Texte>
        </button>
        {erreur && <p role="status"><Texte>{erreur}</Texte></p>}
      </div>
    </details>
  );
}
