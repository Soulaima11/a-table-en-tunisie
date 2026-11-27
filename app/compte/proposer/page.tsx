"use client";

import { useState, type FormEvent } from "react";
import { useSessionUser } from "../../components/session";
import { getSupabase } from "../../lib/supabase";

export default function ProposerPage() {
  const user = useSessionUser();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [envoye, setEnvoye] = useState(false);

  async function envoyer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = getSupabase();
    if (!user?.email || !supabase || pending) return;

    const form = event.currentTarget;
    const fields = new FormData(form);
    const [nom, titre, region, ingredients, preparation] = ["nom", "titre", "region", "ingredients", "preparation"]
      .map((champ) => String(fields.get(champ) ?? "").trim());
    if (!nom || !titre || !ingredients || !preparation) {
      setMessage("Renseigne le nom, le titre, les ingrédients et la préparation.");
      return;
    }
    const contenu = [
      `[Recette de famille] ${titre}`,
      ...(region ? [`Région : ${region}`] : []),
      `Ingrédients\n${ingredients}`,
      `Préparation\n${preparation}`,
    ].join("\n\n");
    setPending(true);
    setMessage("");
    try {
      const { error } = await supabase.from("messages_contact").insert({ nom, email: user.email, message: contenu });
      if (error) throw error;
      form.reset();
      setEnvoye(true);
    } catch {
      setMessage("Ta proposition n’a pas pu être enregistrée. Réessaie dans un instant.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="proposition-recette">
      <h2>Proposer une recette de famille</h2>
      <p>Ta recette sera relue avant une éventuelle publication dans le carnet.</p>
      {envoye ? <p role="status">Merci, ta recette a été envoyée pour relecture.</p> : (
        <form className="formulaire" method="post" onSubmit={envoyer}>
          <label>Ton nom<input name="nom" autoComplete="name" maxLength={100} required /></label>
          <label>Nom du plat<input name="titre" maxLength={100} required /></label>
          <label>Région (facultatif)<input name="region" maxLength={80} /></label>
          <label>Ingrédients et quantités<textarea name="ingredients" rows={5} maxLength={900} required /></label>
          <label>Étapes de préparation<textarea name="preparation" rows={6} maxLength={1700} required /></label>
          <button type="submit" disabled={pending || !user?.email}>{pending ? "Envoi…" : "Envoyer pour relecture"}</button>
          <p role="status">{message}</p>
        </form>
      )}
    </section>
  );
}
