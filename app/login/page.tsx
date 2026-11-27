"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { useSessionUser } from "../components/session";
import { getSupabase } from "../lib/supabase";

export default function LoginPage() {
  const [message, setMessage] = useState("");
  const user = useSessionUser();
  const router = useRouter();
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (user) router.replace("/compte");
  }, [router, user]);

  async function connect(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = getSupabase();
    if (!supabase) {
      setMessage("La configuration Supabase est manquante.");
      return;
    }

    const form = event.currentTarget;
    const fields = new FormData(form);
    setPending(true);
    setMessage("");
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: String(fields.get("email")).trim(),
        password: String(fields.get("password")),
      });

      if (error) {
        setMessage(error.code === "email_not_confirmed"
          ? "Confirme ton adresse e-mail avant de te connecter."
          : error.code === "invalid_credentials"
            ? "L’adresse e-mail ou le mot de passe est incorrect. Vérifie ta saisie ou réinitialise ton mot de passe."
            : "La connexion a échoué. Réessaie dans un instant.");
        return;
      }

      form.reset();
    } catch {
      setMessage("La connexion a échoué. Réessaie dans un instant.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main id="contenu" className="conteneur page-formulaire">
      <h1>Connexion</h1>
      {user !== null ? (
        <p role="status">{user ? "Ouverture de ton compte…" : "Vérification de la session…"}</p>
      ) : (
        <form className="formulaire" method="post" onSubmit={connect}>
          {message && <p className="erreur-formulaire" role="alert">{message}</p>}
          <label>
            Votre adresse e-mail
            <input name="email" type="email" autoComplete="username" required />
          </label>
          <label>
            Votre mot de passe
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
          <p className="lien-compte"><Link href="/mot-de-passe-oublie">Mot de passe oublié ?</Link></p>
          <button type="submit" disabled={pending}>{pending ? "Connexion…" : "Se connecter"}</button>
          <p className="lien-compte">Première visite ? <Link href="/inscription">Créer un compte</Link></p>
        </form>
      )}
    </main>
  );
}
