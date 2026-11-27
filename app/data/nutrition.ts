export const filtresNutrition = ["20 g de protéines ou plus", "Végétarien", "Sans gluten", "Sans lactose", "400 kcal maximum"] as const;

type Reperes = {
  titre?: string;
  kcal: number;
  proteines: number;
  glucides: number;
  lipides: number;
  vegetarien?: boolean;
  sansGluten?: boolean;
  sansLactose?: boolean;
  exemple?: boolean;
};

// Repères éditoriaux arrondis pour une portion, hors accompagnements et garnitures facultatives.
export const reperesNutrition: Record<string, Reperes> = {
  mechouia: { titre: "Salade méchouia au thon", kcal: 280, proteines: 22, glucides: 12, lipides: 16, sansGluten: true, sansLactose: true, exemple: true },
  "omek-houria": { kcal: 160, proteines: 4, glucides: 14, lipides: 10, vegetarien: true, sansGluten: true, sansLactose: true },
  lablabi: { kcal: 440, proteines: 18, glucides: 69, lipides: 11, vegetarien: true, sansLactose: true },
  ojja: { kcal: 420, proteines: 22, glucides: 9, lipides: 33 },
  "mar9et-jelbena": { kcal: 490, proteines: 31, glucides: 28, lipides: 28, sansGluten: true, sansLactose: true },
  "tajin-tounsi": { kcal: 345, proteines: 27, glucides: 16, lipides: 19, sansGluten: true },
};
