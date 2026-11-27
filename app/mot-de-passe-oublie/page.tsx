"use client";

import { Texte } from "@/app/components/langue";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRecuperationMotDePasse, useSessionUser } from "../components/session";
import { getSupabase } from "../lib/supabase";

const minimumMotDePasse = 8;

export default function MotDePasseOubliePage() {
  const { active, terminer } = useRecuperationMotDePasse();
  const user = useSessionUser();
  const [pending, setPending] = useState(false);
  const [erreur, setErreur] = useState("");
  const [resultat, setResultat] = useState<"envoye" | "modifie" | null>(null);

  async function envoyer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = getSupabase();
    if (!supabase) {
      setErreur("La réinitialisation est temporairement indisponible.");
      return;
    }

    const form = event.currentTarget;
    const email = String(new FormData(form).get("email")).trim();
    setPending(true);
    setErreur("");
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: new URL("/", window.location.origin).href,
      });
      if (error && error.code !== "user_not_found") {
        setErreur(error.status === 429
          ? "Patiente quelques minutes avant de demander un nouveau lien."
          : "La demande a échoué. Réessaie dans un instant.");
        return;
      }

      form.reset();
      setResultat("envoye");
    } catch {
      setErreur("Le service est indisponible pour le moment.");
    } finally {
      setPending(false);
    }
  }

  async function modifier(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = getSupabase();
    if (!active || !supabase) return;

    const form = event.currentTarget;
    const fields = new FormData(form);
    const password = String(fields.get("password"));
    if (password !== fields.get("confirmation")) {
      setErreur("Les deux mots de passe doivent être identiques.");
      return;
    }

    setPending(true);
    setErreur("");
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setErreur(
          error.code === "same_password" ? "Choisis un mot de passe différent de l’ancien."
            : error.code === "weak_password" ? "Choisis un mot de passe plus difficile à deviner."
            : "Le mot de passe n’a pas pu être modifié. Réessaie ou demande un nouveau lien."
        );
        return;
      }

      form.reset();
      setResultat("modifie");
      terminer();
    } catch {
      setErreur("Le service est indisponible pour le moment.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main id="contenu" className="conteneur page-formulaire">
      <h1><Texte>{active ? "Nouveau mot de passe" : "Mot de passe oublié ?"}</Texte></h1>
      {active ? (
        <form className="formulaire" method="post" onSubmit={modifier}>
          <label><Texte>Nouveau mot de passe</Texte><input name="password" type="password" autoComplete="new-password" minLength={minimumMotDePasse} required />
            <small><Texte>Au moins</Texte>{" "}{minimumMotDePasse}{" "}<Texte>caractères.</Texte></small>
          </label>
          <label><Texte>Confirmer le nouveau mot de passe</Texte><input name="confirmation" type="password" autoComplete="new-password" minLength={minimumMotDePasse} required />
          </label>
          <button type="submit" disabled={pending}><Texte>{pending ? "Enregistrement…" : "Enregistrer mon mot de passe"}</Texte></button>
          <p role="status"><Texte>{erreur}</Texte></p>
        </form>
      ) : resultat ? (
        <section className="formulaire">
          <p role="status"><Texte>{resultat === "modifie"
            ? "Ton mot de passe a été modifié."
            : "Si cette adresse est associée à un compte, tu recevras un lien de réinitialisation. Vérifie aussi tes courriers indésirables."}</Texte></p>
          <p className="lien-compte">
            {resultat === "modifie" && user
              ? <Link href="/compte"><Texte>Aller à mon compte</Texte></Link>
              : <Link href="/login"><Texte>Retour à la connexion</Texte></Link>}
          </p>
          {resultat === "envoye" && <button type="button" onClick={() => setResultat(null)}><Texte>Saisir une autre adresse</Texte></button>}
        </section>
      ) : (
        <form className="formulaire" method="post" onSubmit={envoyer}>
          <p><Texte>Indique ton adresse e-mail pour recevoir un lien de réinitialisation.</Texte></p>
          <label><Texte>Adresse e-mail</Texte><input name="email" type="email" autoComplete="email" required />
          </label>
          <button type="submit" disabled={pending}><Texte>{pending ? "Envoi…" : "Envoyer le lien"}</Texte></button>
          <p role="status"><Texte>{erreur}</Texte></p>
          <p className="lien-compte"><Link href="/login"><Texte>Retour à la connexion</Texte></Link></p>
        </form>
      )}
    </main>
  );
}
