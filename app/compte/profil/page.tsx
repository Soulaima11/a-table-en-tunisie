"use client";

import type { User } from "@supabase/supabase-js";
import Image from "next/image";
import { useState, type FormEvent } from "react";
import { choisirLangue, Texte, useLangue } from "../../components/langue";
import { useSessionUser } from "../../components/session";
import { avatarValide, preparerAvatar } from "../../lib/avatar";
import { estLangue, langues, nomsLangues, type Langue } from "../../lib/langues";
import { getSupabase } from "../../lib/supabase";

function FormulaireProfil({ user }: { user: User }) {
  const langueSite = useLangue();
  const donnees = user.user_metadata;
  const [avatar, setAvatar] = useState(avatarValide(donnees.avatar_profil) ? donnees.avatar_profil : null);
  const [bio, setBio] = useState(typeof donnees.biographie === "string" ? donnees.biographie.slice(0, 300) : "");
  const [langue, setLangue] = useState<Langue>(estLangue(donnees.langue_preferee) ? donnees.langue_preferee : langueSite);
  const [action, setAction] = useState<"photo" | "sauvegarde" | null>(null);
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");

  async function changerPhoto(fichier: File) {
    setAction("photo");
    setMessage("");
    setErreur("");
    try {
      setAvatar(await preparerAvatar(fichier));
    } catch {
      setErreur("Choisis une photo JPG, PNG ou WebP de 8 Mo maximum.");
    } finally {
      setAction(null);
    }
  }

  async function enregistrer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (action) return;
    const supabase = getSupabase();
    setAction("sauvegarde");
    setMessage("");
    setErreur("");
    try {
      if (!supabase) throw new Error("Supabase indisponible.");
      const { error } = await supabase.auth.updateUser({
        data: { avatar_profil: avatar, biographie: bio.trim(), langue_preferee: langue },
      });
      if (error) throw error;
      choisirLangue(langue);
      setMessage("Ton profil a été enregistré.");
    } catch {
      setErreur("Impossible d’enregistrer ton profil. Réessaie dans un instant.");
    } finally {
      setAction(null);
    }
  }

  return (
    <section aria-labelledby="titre-profil">
      <h2 id="titre-profil"><Texte>Profil personnel</Texte></h2>
      <form className="formulaire-profil" onSubmit={enregistrer}>
        <fieldset disabled={action !== null}>
          <legend><Texte>Photo de profil</Texte></legend>
          <div className="photo-profil">
            <span className="avatar-compte" aria-hidden="true">
              {avatar ? <Image src={avatar} alt="" width={96} height={96} unoptimized /> :
                user.email?.charAt(0).toUpperCase() || "?"}
            </span>
            <div>
              <label className="bouton-photo">
                <Texte>Choisir une photo</Texte>
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => {
                  const fichier = event.currentTarget.files?.[0];
                  event.currentTarget.value = "";
                  if (fichier) void changerPhoto(fichier);
                }} />
              </label>
              {avatar && <button type="button" onClick={() => { setAvatar(null); setMessage(""); }}><Texte>Retirer la photo</Texte></button>}
            </div>
          </div>
        </fieldset>
        <label>
          <Texte>Biographie</Texte>
          <textarea value={bio} onChange={(event) => { setBio(event.target.value); setMessage(""); }} rows={4}
            maxLength={300} disabled={action !== null} aria-describedby="limite-bio" />
          <small id="limite-bio">{bio.length} / 300</small>
        </label>
        <label>
          <Texte>Langue préférée</Texte>
          <select value={langue} disabled={action !== null} onChange={(event) => {
            if (estLangue(event.target.value)) setLangue(event.target.value);
            setMessage("");
          }}>
            {langues.map((code) => <option key={code} value={code} lang={code}>{nomsLangues[code]}</option>)}
          </select>
        </label>
        <button className="bouton" type="submit" disabled={action !== null}>
          <Texte>{action === "sauvegarde" ? "Enregistrement…" : "Enregistrer le profil"}</Texte>
        </button>
        {action === "photo" && <p role="status"><Texte>Préparation de la photo…</Texte></p>}
        {message && <p role="status"><Texte>{message}</Texte></p>}
        {erreur && <p role="alert"><Texte>{erreur}</Texte></p>}
      </form>
    </section>
  );
}

export default function ProfilPage() {
  const user = useSessionUser();
  return user ? <FormulaireProfil key={user.id} user={user} /> : null;
}
