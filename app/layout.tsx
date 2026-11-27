import { Texte, NavigationTraduite, LangueProvider } from "@/app/components/langue";
import type { Metadata } from "next";
import Link from "next/link";
import { MenuCompte } from "./components/menu-compte";
import { MenuOutils, MenuReglages } from "./components/menus-entete";
import { NotreHistoire } from "./components/notre-histoire";
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
          <header id="haut" className="barre-site">
            <div className="conteneur barre-interieure">
              <Link href="/" className="marque"><Texte>À table</Texte>{" "}<em><Texte>en Tunisie</Texte></em></Link>
              <NavigationTraduite aria-label="Navigation principale">
                <Link href="/#recettes"><Texte>Recettes</Texte></Link>
                <Link href="/menus"><Texte>Menus</Texte></Link>
                <Link href="/tour-de-tunisie"><Texte>Tour de Tunisie</Texte></Link>
                <MenuOutils />
              </NavigationTraduite>
              <div className="preferences-site"><MenuCompte /><MenuReglages /></div>
            </div>
          </header>
          {children}
          <footer className="pied-site">
            <div className="conteneur pied-interieur">
              <div className="pied-marque">
                <Link href="/" className="marque"><Texte>À table</Texte>{" "}<em><Texte>en Tunisie</Texte></em></Link>
                <p><Texte>Des recettes tunisiennes à préparer chez toi, de Tunis à Djerba.</Texte></p>
                <a href="#haut" className="pied-haut"><span aria-hidden="true">↑</span> <Texte>Retour en haut</Texte></a>
              </div>
              <NavigationTraduite aria-label="Navigation de pied de page">
                <div>
                  <h2><Texte>Découvrir</Texte></h2>
                  <ul>
                    <li><Link href="/#recettes"><Texte>Toutes les recettes</Texte></Link></li>
                    <li><Link href="/menus"><Texte>Menus</Texte></Link></li>
                    <li><Link href="/tour-de-tunisie"><Texte>Tour de Tunisie</Texte></Link></li>
                  </ul>
                </div>
                <div>
                  <h2><Texte>En cuisine</Texte></h2>
                  <ul>
                    <li><Link href="/frigo"><Texte>Mon frigo</Texte></Link></li>
                    <li><Link href="/courses"><Texte>Mes courses</Texte></Link></li>
                    <li><Link href="/ingredients"><Texte>Guide de l’étranger</Texte></Link></li>
                    <li><Link href="/nutrition"><Texte>Nutrition</Texte></Link></li>
                  </ul>
                </div>
                <div>
                  <h2><Texte>Participer</Texte></h2>
                  <ul>
                    <li><NotreHistoire /></li>
                    <li><Link href="/contact"><Texte>Contact</Texte></Link></li>
                    <li><Link href="/compte/proposer"><Texte>Proposer une recette</Texte></Link></li>
                  </ul>
                </div>
              </NavigationTraduite>
            </div>
          </footer>
          </LangueProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
