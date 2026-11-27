import { Texte, NavigationTraduite, LangueProvider, SelecteurLangue } from "@/app/components/langue";
import type { Metadata } from "next";
import Link from "next/link";
import { MenuCompte } from "./components/menu-compte";
import { SelecteurAffichage } from "./components/affichage";
import { SessionProvider } from "./components/session";
import "./globals.css";
import "./recettes.css";

export const metadata: Metadata = {
  title: { default: "À table en Tunisie", template: "%s | À table en Tunisie" },
  description: "Des recettes tunisiennes à préparer à la maison, avec leurs ingrédients et étapes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr">
      <body>
        <SessionProvider>
          <LangueProvider>
          <a className="lien-evitement" href="#contenu"><Texte>Aller au contenu</Texte></a>
          <header className="barre-site">
            <div className="conteneur barre-interieure">
              <Link href="/" className="marque"><Texte>À table</Texte>{" "}<em><Texte>en Tunisie</Texte></em></Link>
              <NavigationTraduite aria-label="Navigation principale">
                <Link href="/#recettes"><Texte>Recettes</Texte></Link>
                <Link href="/menus"><Texte>Menus</Texte></Link>
                <Link href="/tour-de-tunisie"><Texte>Tour de Tunisie</Texte></Link>
                <Link href="/frigo"><Texte>Mon frigo</Texte></Link>
                <Link href="/courses"><Texte>Mes courses</Texte></Link>
                <Link href="/ingredients"><Texte>Guide de l’étranger</Texte></Link>
                <Link href="/nutrition"><Texte>Nutrition</Texte></Link>
                <Link href="/contact"><Texte>Contact</Texte></Link>
                <MenuCompte />
              </NavigationTraduite>
              <div className="preferences-site"><SelecteurLangue /><SelecteurAffichage /></div>
            </div>
          </header>
          {children}
          <footer className="pied-site">
            <div className="conteneur barre-interieure">
              <Link href="/" className="marque"><Texte>À table</Texte>{" "}<em><Texte>en Tunisie</Texte></em></Link>
              <Link href="/#recettes"><Texte>Toutes les recettes</Texte></Link>
            </div>
          </footer>
          </LangueProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
