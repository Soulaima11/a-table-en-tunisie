import { recettes } from "./recettes";

export function recettesPour(slugs: string[]) {
  return slugs.flatMap((slug) => {
    const recette = recettes.find((item) => item.slug === slug);
    return recette ? [recette] : [];
  });
}

export const menus = [
  { id: "iftar", titre: "Iftar en famille", description: "Une soupe chaude, un tajine à découper et des dattes farcies pour terminer.", recettes: ["chorba-frik", "tajin-tounsi", "dattes-farcies"] },
  { id: "dimanche", titre: "Déjeuner du dimanche", description: "Une salade grillée, un couscous à servir au milieu de la table et des makrouds à partager.", recettes: ["mechouia", "couscous", "makroud"] },
  { id: "petit-budget", titre: "À petit budget", description: "Des carottes à la harissa, des pois chiches avec du pain de la veille et un riz au lait parfumé.", recettes: ["omek-houria", "lablabi", "mhalbia"] },
];

export const regions = [
  { id: "djerba", nom: "Djerba", titre: "Riz djerbien", texte: "Sur l’île de Djerba, le rouz jerbi cuit à la vapeur avec les légumes et les herbes. Notre version est au poulet.", recettes: ["riz-djerbien"], source: "https://www.cuisinetunisienne.tn/riz-djerbien/" },
  { id: "zaghouan", nom: "Zaghouan", titre: "Kaâk warka", texte: "De petits anneaux à la pâte fine et claire, avec une farce fondante aux amandes. La version du carnet est parfumée à l’eau de rose.", recettes: ["kaak-warka"], source: "https://patisserie-rekik.com/produit/kaak-warka/" },
  { id: "kairouan", nom: "Kairouan", titre: "Makroudh de Kairouan", texte: "À Kairouan, le makroudh est une spécialité des pâtissiers. Ces losanges de semoule cachent un cœur de dattes.", recettes: ["makroud"], source: "https://www.lapresse.tn/2026/11/09/kairouan-des-specialites-culinaires-tres-appreciees-a-lechelle-regionale-et-nationale/" },
];
