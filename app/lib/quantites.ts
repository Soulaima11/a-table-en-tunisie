const fractions: Record<string, number> = { "¼": .25, "½": .5, "¾": .75, "⅓": 1 / 3, "⅔": 2 / 3 };
const nombre = /(?<![\p{L}\p{N}])(?:\d+\s*[¼½¾⅓⅔]|\d+(?:[,.]\d+)?|[¼½¾⅓⅔])(?![\p{L}\p{N}])/gu;
const format = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2, useGrouping: false });

export function portionsDe(reference: string) {
  const plage = reference.match(/(\d+)\s+à\s+(\d+)/);
  if (plage) return Math.round((Number(plage[1]) + Number(plage[2])) / 2);
  return Number(reference.match(/\d+/)?.[0]) || null;
}

export function libellePortions(reference: string, portions: number, initial: number) {
  if (portions === initial) return reference;
  return reference.replace(/\d+(?:\s+à\s+\d+)?/, String(portions))
    .replace(/\b(personne|pièce|beignet|losange|verrine|bol|pain|pot)s?$/, (_, unite: string) => (
      unite + (portions === 1 ? "" : "s")
    ));
}

export function ajusterQuantites(ingredients: string[], facteur: number) {
  if (facteur === 1) return ingredients;
  return ingredients.map((ingredient) => ingredient.replace(nombre, (texte) => {
    const fraction = fractions[texte.at(-1) ?? ""] ?? 0;
    const entier = Number((fraction ? texte.slice(0, -1) : texte).trim().replace(",", "."));
    return format.format((entier + fraction) * facteur);
  }));
}
