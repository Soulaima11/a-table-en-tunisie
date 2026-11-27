"use client";

import { Texte } from "@/app/components/langue";
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
      <h1><Texte>Contact</Texte></h1>
      <form
        className="formulaire"
        method="post"
        onSubmit={envoyer}
      >
        <label><Texte>Votre nom</Texte><input name="nom" autoComplete="name" maxLength={100} required />
        </label>
        <label><Texte>Votre adresse e-mail</Texte><input name="email" type="email" autoComplete="email" maxLength={254} required />
        </label>
        <label><Texte>Votre message</Texte><textarea name="message" rows={6} maxLength={3000} required />
        </label>
        <button type="submit" disabled={pending}><Texte>{pending ? "Envoi…" : "Envoyer le message"}</Texte></button>
        <div role="status"><Texte>{message}</Texte></div>
      </form>
    </main>
  );
}
