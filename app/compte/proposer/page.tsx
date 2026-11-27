"use client";

import { Texte } from "@/app/components/langue";
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
      <h2><Texte>Proposer une recette de famille</Texte></h2>
      <p><Texte>Ta recette sera relue avant une éventuelle publication dans le carnet.</Texte></p>
      {envoye ? <p role="status"><Texte>Merci, ta recette a été envoyée pour relecture.</Texte></p> : (
        <form className="formulaire" method="post" onSubmit={envoyer}>
          <label><Texte>Ton nom</Texte><input name="nom" autoComplete="name" maxLength={100} required /></label>
          <label><Texte>Nom du plat</Texte><input name="titre" maxLength={100} required /></label>
          <label><Texte>Région (facultatif)</Texte><input name="region" maxLength={80} /></label>
          <label><Texte>Ingrédients et quantités</Texte><textarea name="ingredients" rows={5} maxLength={900} required /></label>
          <label><Texte>Étapes de préparation</Texte><textarea name="preparation" rows={6} maxLength={1700} required /></label>
          <button type="submit" disabled={pending || !user?.email}><Texte>{pending ? "Envoi…" : "Envoyer pour relecture"}</Texte></button>
          <p role="status"><Texte>{message}</Texte></p>
        </form>
      )}
    </section>
  );
}
