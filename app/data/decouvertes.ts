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
