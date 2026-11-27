import type { StaticImageData } from "next/image";
import { specialites } from "./specialites";
import brik from "../../public/recettes/brik.png";
import couscous from "../../public/recettes/couscous.png";
import makroud from "../../public/recettes/makroud.png";
import mechouia from "../../public/recettes/mechouia.webp";
import omekHouria from "../../public/recettes/omek-houria.webp";
import ojja from "../../public/recettes/ojja.webp";
import lablabi from "../../public/recettes/lablabi.webp";
import bambalouni from "../../public/recettes/bambalouni.webp";
import kaakWarka from "../../public/recettes/kaak-warka.webp";
import makrounaBelLham from "../../public/recettes/makrouna-bel-lham.webp";
import mar9etJelbena from "../../public/recettes/mar9et-jelbena.webp";
import kosksiPoisson from "../../public/recettes/kosksi-poisson.webp";
import ba9lewa from "../../public/recettes/ba9lewa.webp";
import mloukhiya from "../../public/recettes/mloukhiya.webp";
import tajinTounsi from "../../public/recettes/tajin-tounsi.webp";
import chorbaFrik from "../../public/recettes/chorba-frik.webp";
import kafteji from "../../public/recettes/kafteji.webp";
import rizDjerbien from "../../public/recettes/riz-djerbien.webp";
import assidaZgougou from "../../public/recettes/assida-zgougou.webp";

export const categories = ["Entrée", "Plat", "Dessert", "Pain", "Condiment"] as const;

export function formatDuree(minutes: number) {
  if (minutes < 60) return `${minutes} min`;

  const heures = Math.floor(minutes / 60);
  const reste = minutes % 60;
  return reste ? `${heures} h ${reste} min` : `${heures} h`;
}

export type Recette = {
  slug: string;
  category: (typeof categories)[number];
  title: string;
  description: string;
  servings: string;
  minutes: number;
  image?: StaticImageData;
  imageAlt?: string;
  ingredients: string[];
  steps: string[];
  tip?: string;
  source?: { name: string; url: string };
};

export const recettes: Recette[] = [
  {
    slug: "brik",
    tip: "Garnissez chaque feuille juste avant la friture. Une feuille qui attend avec l’œuf dedans ramollit et se déchire plus facilement.",
    category: "Entrée",
    title: "Brik à l’œuf et au thon",
    description: "Une feuille de malsouka dorée à la poêle, garnie d’œuf, de thon et de persil.",
    servings: "4 personnes",
    minutes: 25,
    image: brik,
    imageAlt: "Brik dorée avec du citron",
    ingredients: [
      "4 feuilles de malsouka ou de brick",
      "4 œufs",
      "1 boîte de thon au naturel (140 g égoutté)",
      "2 c. à soupe de persil haché",
      "1 citron, huile de friture, sel et poivre"
    ],
    steps: [
      "Égoutter le thon, puis le mélanger avec le persil, le sel et le poivre.",
      "Poser une feuille sur une assiette. Déposer un quart du thon sur une moitié, former un creux, y casser un œuf et replier la feuille.",
      "Faire dorer la brik dans un fond d’huile chaude, environ 2 minutes par face. Répéter avec les autres feuilles et servir avec le citron."
    ]
  },
  {
    slug: "couscous",
    tip: "Arrosez la semoule de sauce en plusieurs fois et laissez-la absorber entre chaque ajout. Servez le reste du bouillon à part.",
    category: "Plat",
    title: "Couscous tunisien au poulet",
    description: "Une semoule parfumée servie avec du poulet, des légumes et une sauce tomate à la harissa.",
    servings: "4 personnes",
    minutes: 60,
    image: couscous,
    imageAlt: "Couscous au poulet et aux légumes",
    ingredients: [
      "300 g de semoule de couscous",
      "4 cuisses de poulet",
      "1 oignon, 2 carottes et 2 pommes de terre",
      "1 courgette et 200 g de pois chiches cuits",
      "2 c. à soupe de concentré de tomate",
      "1 c. à café de harissa et 1 c. à café de paprika",
      "2 c. à soupe d’huile d’olive, sel et poivre"
    ],
    steps: [
      "Faire revenir l’oignon émincé et le poulet dans l’huile. Ajouter le concentré de tomate, la harissa et le paprika.",
      "Verser 750 ml d’eau. Ajouter les carottes et les pommes de terre en gros morceaux. Saler, poivrer et laisser mijoter 25 minutes à couvert.",
      "Ajouter la courgette coupée et les pois chiches. Poursuivre la cuisson environ 15 minutes, jusqu’à ce que le poulet soit bien cuit et les légumes tendres.",
      "Préparer la semoule selon le paquet, l’égrainer à la fourchette et l’arroser de sauce. Servir avec le poulet et les légumes."
    ]
  },
  {
    slug: "makroud",
    category: "Dessert",
    title: "Makrouds aux dattes",
    description: "Des losanges de semoule fourrés aux dattes et enrobés de miel à la fleur d’oranger.",
    servings: "environ 16 pièces",
    minutes: 60,
    image: makroud,
    imageAlt: "Makrouds dorés fourrés aux dattes",
    ingredients: [
      "300 g de semoule moyenne et 1 pincée de sel",
      "90 g de beurre fondu",
      "Environ 100 ml d’eau",
      "180 g de pâte de dattes et ½ c. à café de cannelle",
      "150 g de miel et 1 c. à soupe d’eau de fleur d’oranger",
      "Huile de friture"
    ],
    steps: [
      "Mélanger la semoule et le sel avec le beurre fondu. Laisser reposer 15 minutes, puis verser l’eau peu à peu jusqu’à obtenir une pâte souple.",
      "Mélanger les dattes et la cannelle. Former deux boudins de semoule, creuser un sillon dans chacun et le garnir de pâte de dattes. Refermer, aplatir légèrement et couper en losanges.",
      "Faire frire les losanges par petites portions jusqu’à ce qu’ils soient dorés. Les égoutter, les passer dans le miel tiède parfumé à la fleur d’oranger, puis laisser refroidir."
    ]
  },
  {
    slug: "mechouia",
    category: "Entrée",
    title: "Salade méchouia",
    description: "Des poivrons et des tomates grillés, relevés au carvi et servis frais avec du thon et des olives.",
    servings: "4 personnes",
    minutes: 45,
    image: mechouia,
    imageAlt: "Poivrons et tomates grillés garnis de thon, d’œuf dur et d’olives noires",
    ingredients: [
      "4 poivrons verts",
      "3 tomates mûres",
      "2 gousses d’ail et 1 petit piment (facultatif)",
      "3 c. à soupe d’huile d’olive et 1 c. à soupe de jus de citron",
      "½ c. à café de carvi moulu et sel",
      "100 g de thon égoutté, 2 œufs durs et une poignée d’olives noires"
    ],
    steps: [
      "Passer les poivrons, les tomates, l’ail en chemise et le piment sous le gril. Retourner les légumes jusqu’à ce que leur peau soit cloquée. Retirer l’ail et les tomates dès qu’ils sont tendres.",
      "Couvrir les poivrons 10 minutes, puis retirer la peau et les graines. Peler les tomates et l’ail, puis hacher les légumes au couteau.",
      "Assaisonner avec l’huile, le citron, le carvi et le sel. Servir tiède ou frais, garni de thon, de quartiers d’œuf dur et d’olives."
    ]
  },
  {
    slug: "omek-houria",
    category: "Entrée",
    title: "Omek Houria",
    description: "Une salade de carottes écrasées à la fourchette, assaisonnée de harissa et de carvi.",
    servings: "4 personnes",
    minutes: 35,
    image: omekHouria,
    imageAlt: "Salade de carottes écrasées garnie d’œuf dur et d’olives",
    ingredients: [
      "600 g de carottes",
      "2 gousses d’ail",
      "1 c. à café de harissa",
      "½ c. à café de carvi moulu",
      "2 c. à soupe d’huile d’olive et 1 c. à soupe de vinaigre de vin",
      "Sel, 2 œufs durs et une poignée d’olives noires"
    ],
    steps: [
      "Peler les carottes et les couper en rondelles. Les cuire dans l’eau salée pendant 15 à 20 minutes, jusqu’à ce qu’elles s’écrasent facilement.",
      "Égoutter soigneusement, puis écraser les carottes à la fourchette en gardant quelques morceaux. Mélanger avec l’ail râpé, la harissa, le carvi, l’huile et le vinaigre.",
      "Goûter et rectifier le sel. Garnir d’olives et de quartiers d’œuf dur, puis servir avec du pain."
    ]
  },
  {
    slug: "ojja",
    category: "Plat",
    title: "Ojja aux merguez",
    description: "Des merguez et des œufs cuits dans une sauce tomate épicée, à servir avec du pain.",
    servings: "4 personnes",
    minutes: 40,
    image: ojja,
    imageAlt: "Poêle de sauce tomate aux merguez et aux œufs",
    ingredients: [
      "6 merguez",
      "4 œufs",
      "1 poivron vert et 3 gousses d’ail",
      "400 g de tomates concassées et 1 c. à soupe de concentré de tomate",
      "1 c. à café de harissa et ½ c. à café de carvi moulu",
      "2 c. à soupe d’huile d’olive et sel"
    ],
    steps: [
      "Faire dorer les merguez dans la moitié de l’huile, puis les réserver. Dans la même poêle, faire revenir le poivron émincé 5 minutes avec le reste de l’huile.",
      "Ajouter l’ail haché, le concentré, la harissa et le carvi. Remuer une minute, puis verser les tomates et un petit verre d’eau.",
      "Couper les merguez en tronçons et les remettre dans la poêle. Laisser mijoter 15 minutes environ, jusqu’à ce que la sauce épaississe et que les merguez soient cuites à cœur.",
      "Former quatre creux et y casser les œufs. Couvrir et cuire à feu doux jusqu’à ce que les blancs soient pris. Servir chaud avec du pain."
    ]
  },
  {
    slug: "lablabi",
    category: "Plat",
    title: "Lablabi aux pois chiches",
    description: "Un bouillon à l’ail et au cumin, versé sur du pain et relevé de harissa au moment de servir.",
    servings: "4 personnes",
    minutes: 30,
    image: lablabi,
    imageAlt: "Bol de bouillon aux pois chiches avec pain, harissa et citron",
    ingredients: [
      "600 g de pois chiches cuits et égouttés",
      "1 L d’eau ou de bouillon de légumes peu salé",
      "3 gousses d’ail et 2 c. à café de cumin moulu",
      "250 g de pain de la veille",
      "1 citron, 2 c. à soupe d’huile d’olive et harissa selon le goût",
      "Sel et 4 œufs durs (facultatif)"
    ],
    steps: [
      "Mettre les pois chiches, l’eau et l’ail écrasé dans une casserole. Porter à frémissement et cuire 20 minutes. Écraser quelques pois chiches dans le bouillon pour lui donner du corps.",
      "Répartir le pain déchiré dans quatre bols. Assaisonner le bouillon avec le cumin et le sel, puis verser les pois chiches et le bouillon chaud sur le pain.",
      "Ajouter un trait d’huile d’olive, du citron et de la harissa au goût. Garnir d’œuf dur si souhaité et servir aussitôt."
    ]
  },
  {
    slug: "bambalouni",
    category: "Dessert",
    title: "Bambalouni au sucre",
    description: "Des beignets tunisiens en anneau, dorés à la friture et roulés dans le sucre.",
    servings: "8 beignets",
    minutes: 100,
    image: bambalouni,
    imageAlt: "Beignets tunisiens en anneau saupoudrés de sucre",
    ingredients: [
      "400 g de farine de blé",
      "310 ml d’eau tiède",
      "5 g de levure boulangère sèche instantanée",
      "1 c. à café de sucre et ½ c. à café de sel pour la pâte",
      "Huile neutre pour la friture",
      "Sucre en poudre pour l’enrobage"
    ],
    steps: [
      "Mélanger la farine, la levure et le sucre, puis incorporer l’eau et le sel. Travailler la pâte 5 minutes à la cuillère ou au batteur. Elle doit rester très souple et collante.",
      "Couvrir et laisser lever 60 à 75 minutes dans un endroit tiède, jusqu’à ce que la pâte soit gonflée et présente des bulles.",
      "Chauffer l’huile à 175 °C. Avec les mains légèrement huilées, prélever une portion, percer le centre et écarter doucement pour former un anneau. Déposer délicatement dans l’huile.",
      "Frire par petites fournées jusqu’à ce que les deux faces soient dorées. Égoutter et rouler dans le sucre pendant que les beignets sont encore tièdes."
    ]
  },
  {
    slug: "kaak-warka",
    category: "Dessert",
    title: "Kaâk warka aux amandes",
    description: "De fins anneaux de pâte pâle, garnis d’amandes parfumées à l’eau de rose.",
    servings: "environ 18 pièces",
    minutes: 95,
    image: kaakWarka,
    imageAlt: "Anneaux de kaâk warka dont un est coupé pour montrer la farce aux amandes",
    ingredients: [
      "250 g de farine de blé et 1 pincée de sel",
      "75 g de beurre doux fondu et refroidi",
      "Environ 80 ml d’eau pour la pâte",
      "200 g de poudre d’amandes",
      "80 g de sucre glace",
      "2 à 3 c. à soupe d’eau de rose alimentaire"
    ],
    steps: [
      "Mélanger la farine et le sel avec le beurre, puis ajouter l’eau progressivement jusqu’à obtenir une pâte souple. Couvrir et laisser reposer 30 minutes.",
      "Mélanger la poudre d’amandes et le sucre glace. Verser juste assez d’eau de rose pour former une pâte malléable, puis façonner 18 petits boudins.",
      "Étaler la pâte très finement, découper des bandes et enrouler chaque boudin d’amande dans une bande. Courber en anneau et souder les extrémités avec un peu d’eau.",
      "Déposer sur une plaque chemisée et cuire 15 à 20 minutes à 150 °C. Les anneaux doivent rester pâles. Laisser refroidir avant de les manipuler."
    ]
  },
  {
    slug: "makrouna-bel-lham",
    category: "Plat",
    title: "Makrouna bel l7am alouch",
    description: "Des pâtes tunisiennes à l’agneau, enrobées d’une sauce tomate à la harissa et au tabel.",
    servings: "4 personnes",
    minutes: 100,
    image: makrounaBelLham,
    imageAlt: "Macaronis en sauce rouge servis avec de l’agneau mijoté",
    ingredients: [
      "400 g de macaronis ou de penne",
      "600 g d’épaule d’agneau désossée en morceaux",
      "1 oignon et 3 gousses d’ail",
      "2 c. à soupe de concentré de tomate et 1 c. à café de harissa",
      "150 g de pois chiches cuits",
      "3 c. à soupe d’huile d’olive, 1 c. à café de tabel et 1 feuille de laurier",
      "700 ml d’eau, sel et poivre"
    ],
    steps: [
      "Faire dorer l’agneau dans l’huile. Ajouter l’oignon haché et le faire fondre, puis remuer l’ail, le concentré, la harissa et le tabel dans la marmite pendant une minute.",
      "Mouiller avec l’eau, ajouter le laurier, saler et poivrer. Couvrir partiellement et laisser mijoter 60 à 75 minutes, jusqu’à ce que la viande soit tendre. Ajouter les pois chiches 10 minutes avant la fin.",
      "Cuire les pâtes dans l’eau salée une minute de moins que le temps indiqué. Les égoutter, retirer le laurier et terminer leur cuisson dans la sauce. Servir avec les morceaux d’agneau."
    ]
  },
  {
    slug: "mar9et-jelbena",
    category: "Plat",
    title: "Mar9et jelbena à l’agneau",
    description: "Un ragoût de petits pois et de pommes de terre dans une sauce tomate parfumée à la coriandre et au carvi.",
    servings: "4 personnes",
    minutes: 95,
    image: mar9etJelbena,
    imageAlt: "Ragoût tunisien de petits pois, pommes de terre et agneau",
    ingredients: [
      "550 g d’épaule d’agneau désossée en cubes",
      "450 g de petits pois frais écossés ou surgelés",
      "2 pommes de terre et 1 oignon",
      "2 gousses d’ail et 2 c. à soupe de concentré de tomate",
      "½ c. à café de coriandre moulue et ½ c. à café de carvi moulu",
      "2 c. à soupe d’huile d’olive et 600 ml d’eau",
      "Sel, poivre et 1 piment vert (facultatif)"
    ],
    steps: [
      "Dorer l’agneau dans l’huile, puis ajouter l’oignon haché et laisser fondre. Incorporer l’ail, le concentré de tomate et les épices. Remuer une minute.",
      "Verser l’eau, saler, poivrer et couvrir partiellement. Laisser mijoter 50 à 60 minutes, jusqu’à ce que l’agneau soit presque tendre.",
      "Ajouter les pommes de terre en gros dés. Après 10 minutes, incorporer les petits pois et le piment entier si désiré. Poursuivre la cuisson 10 à 15 minutes, jusqu’à ce que les légumes soient tendres et la sauce légèrement réduite."
    ]
  },
  {
    slug: "kosksi-poisson",
    category: "Plat",
    title: "Kosksi au poisson",
    description: "Un couscous tunisien à la daurade, avec des légumes et des pois chiches dans une sauce rouge.",
    servings: "4 personnes",
    minutes: 70,
    image: kosksiPoisson,
    imageAlt: "Couscous tunisien avec daurade, carottes, pommes de terre et pois chiches",
    ingredients: [
      "400 g de semoule moyenne à couscous",
      "4 filets épais de daurade ou de mulet",
      "1 oignon, 3 gousses d’ail, 2 carottes et 2 pommes de terre",
      "1 courgette et 150 g de pois chiches cuits",
      "2 c. à soupe de concentré de tomate et 1 c. à café de harissa",
      "1 c. à café de cumin, 1 c. à café de tabel et 3 c. à soupe d’huile d’olive",
      "850 ml d’eau pour le bouillon, 1 citron, sel et poivre"
    ],
    steps: [
      "Assaisonner le poisson avec le cumin, une gousse d’ail râpée, du sel et un peu de jus de citron. Réserver au frais pendant la préparation de la sauce.",
      "Faire revenir l’oignon dans l’huile, ajouter le reste de l’ail, le concentré, la harissa et le tabel. Verser l’eau, puis ajouter les carottes et les pommes de terre en gros morceaux. Laisser frémir 20 minutes.",
      "Ajouter la courgette et les pois chiches. Après 8 à 10 minutes, poser le poisson dans la sauce et le laisser pocher à feu doux 6 à 10 minutes selon son épaisseur, jusqu’à ce que la chair soit opaque et se détache facilement.",
      "Préparer la semoule selon les indications du paquet pendant la cuisson des légumes. L’égrainer, l’arroser progressivement de sauce et disposer les légumes et le poisson dessus. Servir le reste du citron à table."
    ]
  },
  {
    slug: "ba9lewa",
    tip: "Découpez les losanges avant la cuisson. Les couches de filo se brisent plus facilement après leur passage au four.",
    category: "Dessert",
    title: "Ba9lewa tunisienne aux amandes",
    description: "Des losanges de pâte fine aux amandes, dorés au four puis imbibés d’un sirop à la fleur d’oranger.",
    servings: "environ 24 losanges",
    minutes: 320,
    image: ba9lewa,
    imageAlt: "Losanges de baklawa tunisienne aux amandes",
    ingredients: [
      "16 feuilles de pâte filo",
      "400 g d’amandes mondées et grossièrement moulues",
      "80 g de sucre pour la farce",
      "150 g de beurre doux fondu",
      "250 g de sucre et 180 ml d’eau pour le sirop",
      "1 c. à café de jus de citron et 2 c. à soupe d’eau de fleur d’oranger"
    ],
    steps: [
      "Faire frémir l’eau, le sucre du sirop et le citron 8 à 10 minutes. Retirer du feu, ajouter une cuillerée d’eau de fleur d’oranger, puis laisser refroidir.",
      "Mélanger les amandes avec le sucre de la farce et le reste d’eau de fleur d’oranger. Déposer huit feuilles de filo dans un plat beurré d’environ 22 × 30 cm en badigeonnant chaque feuille de beurre. Répartir les amandes, puis couvrir avec les huit feuilles restantes, beurrées une à une.",
      "Découper les losanges avant cuisson. Enfourner à 170 °C pendant 35 à 45 minutes, jusqu’à ce que la pâte soit bien dorée.",
      "Verser progressivement le sirop refroidi sur la ba9lewa dès la sortie du four. Laisser reposer au moins 4 heures pour que le sirop soit absorbé, puis détacher les losanges."
    ]
  },
  {
    slug: "mloukhiya",
    tip: "Gardez un frémissement léger et remuez jusqu’au fond de la cocotte, surtout quand la sauce épaissit.",
    category: "Plat",
    title: "Mloukhiya tunisienne au bœuf",
    description: "Du bœuf longuement mijoté dans une sauce sombre à la corète en poudre, à saucer avec du pain.",
    servings: "6 personnes",
    minutes: 390,
    image: mloukhiya,
    imageAlt: "Mloukhiya tunisienne au bœuf servie avec du pain",
    ingredients: [
      "100 g de corète potagère séchée en poudre (mloukhiya)",
      "750 g de paleron de bœuf en gros morceaux",
      "180 ml d’huile d’olive et 2 L d’eau chaude",
      "5 gousses d’ail et 2 feuilles de laurier",
      "1 c. à café de tabel et 1 c. à café de harissa",
      "Sel, poivre et pain pour servir"
    ],
    steps: [
      "Fouetter la poudre de corète avec l’huile dans une cocotte à fond épais, hors du feu, jusqu’à obtenir une pâte lisse. Chauffer doucement en remuant, puis incorporer l’eau chaude progressivement pour éviter les grumeaux.",
      "Ajouter le laurier et laisser frémir à feu très doux, couvercle entrouvert, pendant environ 2 heures. Remuer régulièrement en raclant le fond.",
      "Mélanger le bœuf avec l’ail écrasé, le tabel, la harissa, du sel et du poivre. Ajouter la viande à la sauce et poursuivre la cuisson à feu doux 3 à 4 heures, jusqu’à ce que le bœuf soit fondant. Ajouter un peu d’eau chaude si la sauce épaissit trop tôt.",
      "Découvrir en fin de cuisson si la sauce est encore liquide. Elle doit napper le dos d’une cuillère et laisser perler un peu d’huile en surface. Retirer le laurier, rectifier le sel et servir avec du pain."
    ]
  },
  {
    slug: "tajin-tounsi",
    category: "Plat",
    title: "Tajin tounsi au poulet",
    description: "Un tajine tunisien aux œufs, au poulet, aux pommes de terre et au persil, cuit au four et servi en carrés.",
    servings: "4 à 6 personnes",
    minutes: 65,
    image: tajinTounsi,
    imageAlt: "Carrés dorés de tajine tunisien au poulet et au persil",
    ingredients: [
      "350 g de poulet désossé en petits dés",
      "350 g de pommes de terre en dés et 1 oignon",
      "7 œufs",
      "80 g de fromage râpé et ½ bouquet de persil",
      "½ c. à café de curcuma et ½ c. à café de tabel",
      "3 c. à soupe d’huile d’olive, sel et poivre"
    ],
    steps: [
      "Mélanger les pommes de terre avec la moitié de l’huile et les rôtir 20 à 25 minutes à 200 °C jusqu’à ce qu’elles soient tendres.",
      "Faire revenir l’oignon haché dans le reste d’huile. Ajouter le poulet, le curcuma, le tabel, du sel et du poivre. Cuire jusqu’à ce que le poulet soit cuit à cœur, puis laisser tiédir.",
      "Battre les œufs avec le fromage et le persil haché. Ajouter le poulet et les pommes de terre, puis verser dans un plat huilé d’environ 20 cm de côté.",
      "Cuire à 180 °C pendant 25 à 35 minutes, jusqu’à ce que le centre soit pris. Laisser reposer 5 minutes avant de couper en carrés."
    ]
  },
  {
    slug: "chorba-frik",
    category: "Entrée",
    title: "Chorba frik à l’agneau",
    description: "Une soupe rouge au blé vert concassé, aux pois chiches et à la coriandre.",
    servings: "4 personnes",
    minutes: 85,
    image: chorbaFrik,
    imageAlt: "Bol de chorba frik à l’agneau avec citron et coriandre",
    ingredients: [
      "350 g d’épaule d’agneau en petits dés",
      "85 g de frik (blé vert grillé concassé)",
      "160 g de pois chiches cuits",
      "1 oignon et 1 branche de céleri",
      "2 c. à soupe de concentré de tomate et 1 c. à café de harissa",
      "1,4 L d’eau, 2 c. à soupe d’huile d’olive, sel et poivre",
      "½ bouquet de coriandre et 1 citron"
    ],
    steps: [
      "Faire revenir l’oignon haché et l’agneau dans l’huile. Ajouter le céleri émincé, le concentré et la harissa, puis remuer une minute.",
      "Verser l’eau, assaisonner et laisser frémir à couvert environ 45 minutes, jusqu’à ce que l’agneau commence à s’attendrir.",
      "Rincer le frik et le verser dans le bouillon avec les pois chiches. Cuire 20 à 25 minutes à feu doux en remuant régulièrement.",
      "Ajouter la coriandre ciselée hors du feu et servir avec le citron."
    ],
    tip: "Le frik continue d’absorber le bouillon après cuisson. Ajoutez un peu d’eau quand vous réchauffez la soupe.",
    source: {
      name: "Carrefour Tunisie",
      url: "https://www.carrefour.tn/chorba-frick-10000002.html"
    }
  },
  {
    slug: "kafteji",
    category: "Plat",
    title: "Kafteji aux légumes et aux œufs",
    description: "Des poivrons, du potiron et des œufs hachés ensemble, servis avec des pommes de terre dorées.",
    servings: "4 personnes",
    minutes: 45,
    image: kafteji,
    imageAlt: "Kafteji de légumes hachés avec des frites et du persil",
    ingredients: [
      "400 g de potiron épluché",
      "2 poivrons verts et 2 tomates",
      "350 g de pommes de terre",
      "3 œufs",
      "1 c. à café de tabel-karouia",
      "Huile de friture, sel et 2 c. à soupe de persil haché"
    ],
    steps: [
      "Tailler les pommes de terre en bâtonnets, le potiron en dés, les poivrons épépinés en morceaux et les tomates en quartiers.",
      "Frire les pommes de terre, le potiron et les poivrons en fournées séparées. Égoutter sur du papier absorbant. Faire revenir les tomates à part pour évaporer leur jus.",
      "Cuire les œufs à la poêle. Hacher grossièrement les légumes et les œufs ensemble, en gardant quelques frites pour le dessus. Assaisonner avec le tabel-karouia et le sel.",
      "Servir avec les frites réservées et le persil."
    ],
    tip: "Hachez au couteau sur une planche pour garder des morceaux irréguliers.",
    source: {
      name: "Cuisine Tunisienne",
      url: "https://www.cuisinetunisienne.tn/kafteji/"
    }
  },
  {
    slug: "riz-djerbien",
    category: "Plat",
    title: "Riz djerbien au poulet",
    description: "Du riz cuit à la vapeur avec du poulet, des épinards, des pois chiches et des herbes fraîches.",
    servings: "4 personnes",
    minutes: 85,
    image: rizDjerbien,
    imageAlt: "Riz djerbien aux herbes, au poulet et aux pois chiches",
    ingredients: [
      "350 g de riz long",
      "400 g de hauts de cuisse de poulet désossés",
      "180 g de pois chiches cuits",
      "200 g d’épinards, 1 carotte et 1 oignon",
      "½ bouquet de persil et ½ bouquet d’aneth",
      "2 c. à soupe de concentré de tomate et 1 c. à café de harissa",
      "1 c. à café de tabel, ½ c. à café de curcuma, 3 c. à soupe d’huile d’olive et sel"
    ],
    steps: [
      "Rincer le riz et le laisser tremper 15 minutes avant de l’égoutter. Couper le poulet et la carotte en petits dés, puis hacher l’oignon et les herbes.",
      "Délayer le concentré, la harissa et les épices dans l’huile. Mélanger avec le riz, le poulet, les épinards coupés, les autres légumes, les herbes et les pois chiches.",
      "Faire bouillir l’eau au fond du couscoussier. Répartir le mélange sans le tasser dans le panier et cuire à couvert 50 à 60 minutes. Surveiller le niveau de l’eau.",
      "Vérifier que le riz est tendre et le poulet cuit à cœur. Aérer les grains à la fourchette avant de servir."
    ],
    tip: "Creusez un petit puits au milieu du riz dans le panier pour aider la vapeur à circuler.",
    source: {
      name: "Cuisine Tunisienne",
      url: "https://www.cuisinetunisienne.tn/riz-djerbien/"
    }
  },
  {
    slug: "assida-zgougou",
    category: "Dessert",
    title: "Assida zgougou",
    description: "Une crème aux graines de pin d’Alep, coiffée de crème pâtissière et de fruits secs, préparée pour le Mouled.",
    servings: "6 verrines",
    minutes: 170,
    image: assidaZgougou,
    imageAlt: "Assida zgougou en verrine décorée de pistaches et d’amandes",
    ingredients: [
      "250 g de pâte de zgougou nature (graines de pin d’Alep moulues)",
      "750 ml d’eau, 150 g de farine et 80 g de sucre pour la base",
      "350 ml de lait entier et 2 jaunes d’œufs pour la crème",
      "35 g de sucre, 25 g de fécule de maïs et 1 c. à café d’eau de fleur d’oranger pour la crème",
      "60 g de pistaches, d’amandes et de pignons pour le décor"
    ],
    steps: [
      "Délayer la pâte de zgougou avec la moitié de l’eau. Filtrer à travers un linge fin en pressant la pulpe. Recommencer avec le reste de l’eau et réunir les deux filtrats.",
      "Fouetter la farine dans le filtrat froid et cuire à feu doux en remuant. Après épaississement, ajouter le sucre et laisser frémir 2 à 3 minutes. Verser dans les verrines.",
      "Pour la crème pâtissière, fouetter les jaunes, le sucre et la fécule. Verser petit à petit le lait chaud, remettre dans la casserole et cuire au fouet jusqu’à épaississement. Ajouter la fleur d’oranger hors du feu.",
      "Verser la crème pâtissière sur l’assida quand sa surface a pris. Réfrigérer au moins 2 heures avant de décorer de fruits secs."
    ],
    tip: "Fouettez la farine dans le filtrat encore froid pour dissoudre les grumeaux avant la cuisson.",
    source: {
      name: "Destination Tunis",
      url: "https://destination-tunis.fr/gastronomie/assida-zgougou/"
    }
  },
  ...specialites,
];
