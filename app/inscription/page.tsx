"use client";

import { Texte } from "@/app/components/langue";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useSessionUser } from "../components/session";
import { getSupabase } from "../lib/supabase";

const minimumMotDePasse = 8;

export default function InscriptionPage() {
  const router = useRouter();
  const user = useSessionUser();
  const [pending, setPending] = useState(false);
  const [erreur, setErreur] = useState("");
  const [resultat, setResultat] = useState<"compte-existant" | "verifier-email" | null>(null);
  const dialogue = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (user) router.replace("/compte");
  }, [router, user]);

  useEffect(() => {
    if (resultat && dialogue.current && !dialogue.current.open) {
      dialogue.current.showModal();
    }
  }, [resultat]);

  async function inscrire(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = getSupabase();
    if (!supabase) {
      setErreur("L’inscription est temporairement indisponible.");
      return;
    }

    const form = event.currentTarget;
    const fields = new FormData(form);
    const email = String(fields.get("email")).trim();
    const dateNaissance = String(fields.get("date_naissance") ?? "");
    const password = String(fields.get("password"));

    const date = new Date(`${dateNaissance}T00:00:00Z`);
    const maintenant = new Date();
    const aujourdhui = Date.UTC(maintenant.getFullYear(), maintenant.getMonth(), maintenant.getDate());
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(dateNaissance) ||
      !Number.isFinite(date.getTime()) ||
      date.toISOString().slice(0, 10) !== dateNaissance ||
      date.getUTCFullYear() < 1 ||
      date.getTime() > aujourdhui
    ) {
      setErreur("Indique une date de naissance valide qui n’est pas dans le futur.");
      return;
    }

    if (password !== fields.get("confirmation")) {
      setErreur("Les deux mots de passe doivent être identiques.");
      return;
    }

    setErreur("");
    setPending(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: new URL("/login", window.location.origin).href,
          data: { date_naissance: dateNaissance },
        },
      });
      if (error) {
        if (error.code === "user_already_exists" || error.code === "email_exists") {
          form.reset();
          setResultat("compte-existant");
        } else if (error.code === "weak_password") {
          setErreur("Choisis un mot de passe plus difficile à deviner.");
        } else if (error.code === "over_email_send_rate_limit" || error.status === 429) {
          setErreur("Patiente quelques minutes avant de réessayer.");
        } else {
          setErreur("L’inscription a échoué. Vérifie tes informations ou essaie de te connecter si tu as déjà un compte.");
        }
        return;
      }

      form.reset();
      if (!data.session) {
        // Supabase peut renvoyer un utilisateur masqué avec une liste d’identités vide.
        setResultat(data.user?.identities?.length === 0 ? "compte-existant" : "verifier-email");
      }
    } catch {
      setErreur("Le service est indisponible pour le moment. Réessaie dans un instant.");
    } finally {
      setPending(false);
    }
  }

  if (user !== null) {
    return (
      <main id="contenu" className="conteneur page-formulaire">
        <h1><Texte>Créer un compte</Texte></h1>
        <p role="status"><Texte>{user ? "Ouverture de ton compte…" : "Vérification de la session…"}</Texte></p>
      </main>
    );
  }

  return (
    <main id="contenu" className="conteneur page-formulaire">
      <h1><Texte>Créer un compte</Texte></h1>
      <form className="formulaire" method="post" onSubmit={inscrire}>
        <label><Texte>Adresse e-mail</Texte><input name="email" type="email" autoComplete="email" required />
        </label>
        <label><Texte>Date de naissance</Texte><input name="date_naissance" type="date" autoComplete="bday" required />
        </label>
        <label><Texte>Mot de passe</Texte><input name="password" type="password" autoComplete="new-password" minLength={minimumMotDePasse} aria-describedby="aide-mot-de-passe" required />
          <small id="aide-mot-de-passe"><Texte>Au moins</Texte>{" "}{minimumMotDePasse}{" "}<Texte>caractères.</Texte></small>
        </label>
        <label><Texte>Confirmer le mot de passe</Texte><input name="confirmation" type="password" autoComplete="new-password" minLength={minimumMotDePasse} required />
        </label>
        <button type="submit" disabled={pending}><Texte>{pending ? "Inscription…" : "Créer mon compte"}</Texte></button>
        <p role="status"><Texte>{erreur}</Texte></p>
        <p className="lien-compte"><Texte>Déjà un compte ?</Texte>{" "}<Link href="/login"><Texte>Se connecter</Texte></Link></p>
      </form>
      <dialog
        ref={dialogue}
        className="dialogue-compte"
        aria-labelledby="titre-dialogue-compte"
        aria-describedby="description-dialogue-compte"
        onClose={() => setResultat(null)}
      >
        <h2 id="titre-dialogue-compte">
          <Texte>{resultat === "compte-existant" ? "Tu as déjà un compte" : "Vérifie ta boîte e-mail"}</Texte>
        </h2>
        <p id="description-dialogue-compte">
          <Texte>{resultat === "compte-existant"
            ? "Cette adresse e-mail est déjà associée à un compte. Connecte-toi avec ton mot de passe."
            : "Si tu reçois un lien de confirmation, ouvre-le pour terminer l’inscription. Si tu as déjà un compte, tu peux te connecter directement."}</Texte>
        </p>
        <div className="actions-dialogue">
          <Link className="bouton" href="/login"><Texte>Se connecter</Texte></Link>
          <form method="dialog">
            <button type="submit" className="lien-connexion"><Texte>Fermer</Texte></button>
          </form>
        </div>
      </dialog>
    </main>
  );
}
