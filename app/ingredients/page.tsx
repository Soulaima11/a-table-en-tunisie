"use client";

import { useState } from "react";
import { Texte, traduire, useLangue } from "../components/langue";

const pays = ["France", "Belgique", "Canada"] as const;
type Pays = (typeof pays)[number];

const produits = [
  { nom: "Tabel karouia", anglais: "Coriander and caraway spice blend", arabe: "تابل وكروية",
    France: "Coriandre et carvi moulus", Belgique: "Graines de coriandre et de carvi à moudre", Canada: "Coriandre moulue et graines de carvi" },
  { nom: "Feuilles de malsouka", anglais: "Tunisian brick pastry sheets", arabe: "ورق الملسوقة",
    France: "Feuilles de brick", Belgique: "Feuilles de brick", Canada: "Feuilles de brick ou pâte phyllo pour une cuisson au four" },
  { nom: "Piment baklouti", anglais: "Baklouti chili pepper", arabe: "فلفل بقلوطي",
    France: "Piment rouge doux ou fort selon le plat", Belgique: "Piment rouge frais, selon sa force", Canada: "Piment de Fresno ou poivron rouge avec un peu de piment fort" },
  { nom: "Semoule tunisienne", anglais: "Durum wheat semolina", arabe: "سميد القمح الصلب",
    France: "Semoule de blé dur de même granulométrie", Belgique: "Semoule de blé dur fine ou moyenne selon la recette", Canada: "Semoule de blé dur, vendue aussi sous le nom « durum wheat semolina »" },
  { nom: "Harissa artisanale", anglais: "Artisanal harissa", arabe: "هريسة تقليدية",
    France: "Harissa du commerce", Belgique: "Harissa du commerce, en tube ou en pot", Canada: "Pâte de harissa, vendue aussi sous le nom « harissa paste »" },
];

const boutiques: { nom: string; zone: string; pays: readonly Pays[]; url: string }[] = [
  { nom: "Yara Market", zone: "Boutique en ligne", pays: ["France"], url: "https://yaramarket.fr/" },
  { nom: "DeliverTN", zone: "Boutique en ligne", pays: ["France", "Belgique"], url: "https://delivertn.com/fr/" },
  { nom: "Marché Zbaïda", zone: "Montréal", pays: ["Canada"], url: "https://www.marchezbaida.com/" },
  { nom: "Village Halal Groceries", zone: "Boutique en ligne à Montréal", pays: ["Canada"], url: "https://www.villagehalal.com/" },
];

export default function IngredientsPage() {
  const langue = useLangue();
  const [destination, setDestination] = useState<Pays>("France");
  const [recherche, setRecherche] = useState("");
  const normaliser = (valeur: string) => valeur.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
  const terme = normaliser(recherche.trim());
  const selection = produits.filter((produit) => [
    produit.nom, produit.anglais, produit.arabe, produit[destination], traduire(langue, produit.nom), traduire(langue, produit[destination]),
  ].some((texte) => normaliser(texte).includes(terme)));

  return (
    <main id="contenu" className="conteneur page-outil">
      <h1><Texte>Cuisiner tunisien à l’étranger</Texte></h1>
      <p><Texte>Identifie les ingrédients tunisiens, trouve un équivalent près de chez toi et découvre où faire tes courses.</Texte></p>
      <div className="options-outil">
        <label><Texte>Pays de résidence</Texte><select value={destination} onChange={(event) => {
          const valeur = pays.find((item) => item === event.target.value);
          if (valeur) setDestination(valeur);
        }}>{pays.map((item) => <option key={item} value={item}>{traduire(langue, item)}</option>)}</select></label>
        <label><Texte>Rechercher un ingrédient</Texte><input type="search" value={recherche} onChange={(event) => setRecherche(event.target.value)} /></label>
      </div>
      <section aria-labelledby="dictionnaire">
        <h2 id="dictionnaire"><Texte>Dictionnaire des ingrédients</Texte></h2>
        {selection.length > 0 ? <div className="table-ingredients">
          <table>
            <thead><tr><th scope="col"><Texte>Produit tunisien</Texte></th><th scope="col"><Texte>Noms en anglais et en arabe</Texte></th><th scope="col"><Texte>Alternative locale</Texte></th></tr></thead>
            <tbody>{selection.map((produit) => <tr key={produit.nom}>
              <th scope="row"><Texte>{produit.nom}</Texte></th>
              <td><span lang="en" dir="ltr">{produit.anglais}</span><br /><span lang="ar" dir="rtl">{produit.arabe}</span></td>
              <td><Texte>{produit[destination]}</Texte></td>
            </tr>)}</tbody>
          </table>
        </div> : <p role="status"><Texte>Aucun ingrédient trouvé.</Texte></p>}
      </section>
      <section aria-labelledby="epiceries" className="section-outil">
        <h2 id="epiceries"><Texte>Annuaire des épiceries tunisiennes</Texte></h2>
        <ul className="boutiques-guide">{boutiques.filter((boutique) => boutique.pays.includes(destination)).map((boutique) => <li key={boutique.nom}>
          <span><Texte>{boutique.zone}</Texte></span>
          <a className="lien-editorial" href={boutique.url}>{boutique.nom} <span aria-hidden="true">↗</span></a>
        </li>)}</ul>
      </section>
    </main>
  );
}
