export const langues = ["fr", "en", "ar"] as const;
export type Langue = (typeof langues)[number];
export const nomsLangues: Record<Langue, string> = { fr: "Français", en: "English", ar: "العربية" };

export function estLangue(value: unknown): value is Langue {
  return typeof value === "string" && langues.some((langue) => langue === value);
}
