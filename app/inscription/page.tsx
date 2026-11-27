"use client";

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
    const password = String(fields.get("password"));

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
        options: { emailRedirectTo: new URL("/login", window.location.origin).href },
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
        <h1>Créer un compte</h1>
        <p role="status">{user ? "Ouverture de ton compte…" : "Vérification de la session…"}</p>
      </main>
    );
  }

  return (
    <main id="contenu" className="conteneur page-formulaire">
      <h1>Créer un compte</h1>
      <form className="formulaire" method="post" onSubmit={inscrire}>
        <label>
          Adresse e-mail
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          Mot de passe
          <input name="password" type="password" autoComplete="new-password" minLength={minimumMotDePasse} aria-describedby="aide-mot-de-passe" required />
          <small id="aide-mot-de-passe">Au moins {minimumMotDePasse} caractères.</small>
        </label>
        <label>
          Confirmer le mot de passe
          <input name="confirmation" type="password" autoComplete="new-password" minLength={minimumMotDePasse} required />
        </label>
        <button type="submit" disabled={pending}>{pending ? "Inscription…" : "Créer mon compte"}</button>
        <p role="status">{erreur}</p>
        <p className="lien-compte">Déjà un compte ? <Link href="/login">Se connecter</Link></p>
      </form>
      <dialog
        ref={dialogue}
        className="dialogue-compte"
        aria-labelledby="titre-dialogue-compte"
        aria-describedby="description-dialogue-compte"
        onClose={() => setResultat(null)}
      >
        <h2 id="titre-dialogue-compte">
          {resultat === "compte-existant" ? "Tu as déjà un compte" : "Vérifie ta boîte e-mail"}
        </h2>
        <p id="description-dialogue-compte">
          {resultat === "compte-existant"
            ? "Cette adresse e-mail est déjà associée à un compte. Connecte-toi avec ton mot de passe."
            : "Si tu reçois un lien de confirmation, ouvre-le pour terminer l’inscription. Si tu as déjà un compte, tu peux te connecter directement."}
        </p>
        <div className="actions-dialogue">
          <Link className="bouton" href="/login">Se connecter</Link>
          <form method="dialog">
            <button type="submit" className="lien-connexion">Fermer</button>
          </form>
        </div>
      </dialog>
    </main>
  );
}
