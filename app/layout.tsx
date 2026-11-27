import type { Metadata } from "next";
import Link from "next/link";
import { MenuCompte } from "./components/menu-compte";
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
          <a className="lien-evitement" href="#contenu">Aller au contenu</a>
          <header className="barre-site">
            <div className="conteneur barre-interieure">
              <Link href="/" className="marque">À table <em>en Tunisie</em></Link>
              <nav aria-label="Navigation principale">
                <Link href="/#recettes">Recettes</Link>
                <Link href="/menus">Menus</Link>
                <Link href="/tour-de-tunisie">Tour de Tunisie</Link>
                <Link href="/frigo">Mon frigo</Link>
                <Link href="/courses">Mes courses</Link>
                <Link href="/contact">Contact</Link>
                <MenuCompte />
              </nav>
            </div>
          </header>
          {children}
          <footer className="pied-site">
            <div className="conteneur barre-interieure">
              <Link href="/" className="marque">À table <em>en Tunisie</em></Link>
              <Link href="/#recettes">Toutes les recettes</Link>
            </div>
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}
