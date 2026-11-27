"use client";

import { useState, type FormEvent } from "react";
import { getSupabase } from "../lib/supabase";

export default function ContactPage() {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function envoyer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = getSupabase();
    if (!supabase) {
      setMessage("La configuration Supabase est manquante.");
      return;
    }

    const form = event.currentTarget;
    const fields = new FormData(form);
    const nom = String(fields.get("nom")).trim();
    const email = String(fields.get("email")).trim();
    const contenu = String(fields.get("message")).trim();
    if (!nom || !contenu) {
      setMessage("Indique ton nom et écris un message.");
      return;
    }

    setPending(true);
    setMessage("");
    try {
      const { error } = await supabase.from("messages_contact").insert({ nom, email, message: contenu });
      if (error) {
        setMessage("Le message n’a pas pu être enregistré. Réessaie dans un instant.");
        return;
      }
      form.reset();
      setMessage("Merci, ton message a été enregistré.");
    } catch {
      setMessage("Le message n’a pas pu être enregistré. Réessaie dans un instant.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main id="contenu" className="conteneur page-formulaire">
      <h1>Contact</h1>
      <form
        className="formulaire"
        method="post"
        onSubmit={envoyer}
      >
        <label>
          Votre nom
          <input name="nom" autoComplete="name" maxLength={100} required />
        </label>
        <label>
          Votre adresse e-mail
          <input name="email" type="email" autoComplete="email" maxLength={254} required />
        </label>
        <label>
          Votre message
          <textarea name="message" rows={6} maxLength={3000} required />
        </label>
        <button type="submit" disabled={pending}>{pending ? "Envoi…" : "Envoyer le message"}</button>
        <div role="status">{message}</div>
      </form>
    </main>
  );
}
