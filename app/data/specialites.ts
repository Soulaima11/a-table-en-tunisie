import type { Recette } from "./recettes";
import fricasse from "../../public/recettes/fricasse.webp";
import ajloukCourgettes from "../../public/recettes/ajlouk-courgettes.webp";
import banatages from "../../public/recettes/banatages.webp";
import slataTounsia from "../../public/recettes/slata-tounsia.webp";
import nwasser from "../../public/recettes/nwasser.webp";
import chakchouka from "../../public/recettes/chakchouka.webp";
import borgholVapeur from "../../public/recettes/borghol-vapeur.webp";
import barkoukech from "../../public/recettes/barkoukech.webp";
import completPoisson from "../../public/recettes/complet-poisson.webp";
import samsa from "../../public/recettes/samsa.webp";
import mhalbia from "../../public/recettes/mhalbia.webp";
import dattesFarcies from "../../public/recettes/dattes-farcies.webp";
import painTabouna from "../../public/recettes/pain-tabouna.webp";
import harissaMaison from "../../public/recettes/harissa-maison.webp";

export const specialites: Recette[] = [
  {
    slug: "fricasse",
    image: fricasse,
    imageAlt: "Petits pains frits garnis de thon, d’œuf dur, de pommes de terre et d’olives",
    category: "Entrée",
    title: "Fricassés tunisiens",
    description: "Petits pains frits garnis de thon, d’œuf dur et de harissa.",
    servings: "10 pièces",
    minutes: 120,
    ingredients: [
      "350 g de farine, 5 g de levure boulangère sèche, 1 c. à café de sucre et ¾ c. à café de sel",
      "1 œuf, 150 ml d’eau tiède et 1 c. à soupe d’huile",
      "Huile de friture",
      "150 g de thon égoutté, 2 pommes de terre cuites et 2 œufs durs",
      "Harissa et 10 olives noires"
    ],
    steps: [
      "Pétrir farine, levure, sucre, sel, œuf, eau et huile jusqu’à obtenir une pâte souple. Couvrir et laisser doubler de volume.",
      "Façonner 10 petits pains ovales. Laisser lever 20 minutes et frire par fournées à 170 °C, en les retournant jusqu’à ce qu’ils soient dorés des deux côtés.",
      "Égoutter, fendre et garnir de harissa, de pommes de terre, de thon, d’œufs et d’olives."
    ],
    source: {
      name: "196 flavors",
      url: "https://www.196flavors.com/fr/tunisie-fricasse/"
    }
  },
  {
    slug: "ajlouk-courgettes",
    image: ajloukCourgettes,
    imageAlt: "Courgettes écrasées à l’huile d’olive, avec harissa et citron",
    category: "Entrée",
    title: "Ajlouk de courgettes",
    description: "Une salade de courgettes écrasées à l’ail et à la harissa.",
    servings: "4 personnes",
    minutes: 30,
    ingredients: [
      "650 g de courgettes",
      "2 gousses d’ail, 1 c. à café de harissa et ½ c. à café de carvi",
      "2 c. à soupe d’huile d’olive, 1 citron et sel"
    ],
    steps: [
      "Couper les courgettes et les cuire à la vapeur jusqu’à ce qu’elles soient tendres.",
      "Les laisser égoutter, puis les écraser avec l’ail râpé, la harissa et le carvi.",
      "Assaisonner d’huile, de jus de citron et de sel. Servir tiède ou frais."
    ],
    source: {
      name: "196 flavors",
      url: "https://www.196flavors.com/fr/tunisie-ajlouk-de-courgette/"
    }
  },
  {
    slug: "banatages",
    image: banatages,
    imageAlt: "Croquettes de pommes de terre dorées, dont une ouverte sur la farce au bœuf",
    category: "Entrée",
    title: "Banatages à la viande",
    description: "Croquettes de pommes de terre farcies de bœuf et de persil.",
    servings: "10 pièces",
    minutes: 65,
    ingredients: [
      "700 g de pommes de terre farineuses",
      "250 g de bœuf haché, 1 petit oignon et 3 c. à soupe de persil",
      "1 œuf, 60 g de farine et huile de friture",
      "Sel, poivre et ½ c. à café de tabel"
    ],
    steps: [
      "Cuire les pommes de terre à l’eau, les égoutter soigneusement et les écraser. Laisser tiédir.",
      "Faire revenir l’oignon et le bœuf jusqu’à ce que la viande soit cuite. Ajouter le tabel et le persil, puis laisser refroidir.",
      "Enfermer une cuillerée de viande dans chaque portion de purée. Passer les croquettes dans la farine, puis dans l’œuf battu.",
      "Frire en petites fournées jusqu’à coloration uniforme. Égoutter et servir avec du citron."
    ],
    source: {
      name: "196 flavors",
      url: "https://www.196flavors.com/fr/tunisie-banatages/"
    }
  },
  {
    slug: "slata-tounsia",
    image: slataTounsia,
    imageAlt: "Salade de tomates, de concombre et de poivron en dés, avec thon et olives",
    category: "Entrée",
    title: "Slata tounsia",
    description: "Salade fraîche de tomates, concombre et poivron, relevée de menthe.",
    servings: "4 personnes",
    minutes: 20,
    ingredients: [
      "3 tomates, 1 concombre et 1 poivron vert",
      "1 petit oignon rouge et 1 c. à café de menthe séchée",
      "3 c. à soupe d’huile d’olive, 1 citron et sel",
      "100 g de thon au naturel et une poignée d’olives"
    ],
    steps: [
      "Détailler les légumes en petits dés réguliers et les mélanger.",
      "Ajouter la menthe émiettée, le jus du citron, l’huile et le sel.",
      "Garnir de thon émietté et d’olives juste avant de servir."
    ]
  },
  {
    slug: "nwasser",
    image: nwasser,
    imageAlt: "Petites pâtes carrées en sauce rouge, servies avec du poulet et des pois chiches",
    category: "Plat",
    title: "Nwasser au poulet",
    description: "Petites pâtes carrées cuites à la vapeur, puis imprégnées d’une sauce rouge.",
    servings: "4 personnes",
    minutes: 80,
    ingredients: [
      "400 g de nwasser et 4 morceaux de poulet",
      "1 oignon, 2 pommes de terre et 150 g de pois chiches cuits",
      "2 c. à soupe de concentré de tomate, 1 c. à café de harissa et ¼ c. à café de cannelle",
      "1 L d’eau, 3 c. à soupe d’huile d’olive, 20 g de beurre et sel"
    ],
    steps: [
      "Faire dorer le poulet et l’oignon avec deux cuillerées d’huile. Ajouter le concentré et la harissa, puis verser l’eau salée.",
      "Enduire les pâtes du reste d’huile et les cuire dans le panier vapeur au-dessus de la sauce 20 à 25 minutes. Ajouter les pommes de terre en quartiers et les pois chiches à la sauce pour la fin de cuisson.",
      "Séparer les pâtes à la fourchette. Mélanger avec le beurre et la cannelle, mouiller de sauce et finir au four à 180 °C environ 15 minutes, jusqu’à ce que les pâtes soient tendres. Servir avec le poulet bien cuit et les légumes."
    ],
    source: {
      name: "Cuisine Tunisienne",
      url: "https://www.cuisinetunisienne.tn/nwasser-au-poulet/amp/"
    }
  },
  {
    slug: "chakchouka",
    image: chakchouka,
    imageAlt: "Poêlée de tomates et de poivrons surmontée de quatre œufs",
    category: "Plat",
    title: "Chakchouka tunisienne",
    description: "Poivrons et tomates fondants, surmontés d’œufs cuits à couvert.",
    servings: "4 personnes",
    minutes: 35,
    ingredients: [
      "4 œufs et 5 tomates mûres",
      "2 poivrons verts, 1 oignon et 2 gousses d’ail",
      "2 c. à soupe d’huile d’olive, ½ c. à café de tabel et ½ c. à café de paprika",
      "Sel, poivre et piment selon le goût"
    ],
    steps: [
      "Faire revenir l’oignon et les poivrons émincés dans l’huile jusqu’à ce qu’ils s’attendrissent.",
      "Ajouter l’ail, les épices et les tomates en dés. Laisser réduire à découvert, puis assaisonner.",
      "Creuser quatre espaces et y casser les œufs. Couvrir à feu doux jusqu’à ce que les blancs soient pris."
    ],
    source: {
      name: "Cuisine Tunisienne",
      url: "https://www.cuisinetunisienne.tn/chakchouka-tunisienne/amp/"
    }
  },
  {
    slug: "borghol-vapeur",
    image: borgholVapeur,
    imageAlt: "Boulgour aux carottes, aux courgettes, aux pois chiches et au persil",
    category: "Plat",
    title: "Borghol aux légumes à la vapeur",
    description: "Boulgour aux légumes, aux herbes fraîches et à la harissa.",
    servings: "4 personnes",
    minutes: 70,
    ingredients: [
      "300 g de boulgour gros et 180 g de pois chiches cuits",
      "2 carottes, 1 courgette, 1 oignon et 150 g d’épinards",
      "½ bouquet de persil, 2 c. à soupe de concentré de tomate et 1 c. à café de harissa",
      "3 c. à soupe d’huile d’olive, 1 c. à café de tabel et sel"
    ],
    steps: [
      "Rincer le boulgour et l’égoutter. Tailler les légumes en petits dés, puis hacher les épinards et le persil.",
      "Mélanger les légumes, les herbes et les pois chiches avec le boulgour, le concentré, la harissa, l’huile et le tabel.",
      "Cuire dans un panier vapeur à trous fins, à couvert, 45 à 55 minutes. Remuer à mi-cuisson et vérifier le niveau d’eau. Le boulgour doit être tendre."
    ],
    source: {
      name: "Cuisine Tunisienne",
      url: "https://www.cuisinetunisienne.tn/borghol-aux-legumes-a-la-vapeur/"
    }
  },
  {
    slug: "barkoukech",
    image: barkoukech,
    imageAlt: "Bol de grosses pâtes rondes au bouillon rouge, avec poulet et légumes",
    category: "Plat",
    title: "Barkoukech au poulet",
    description: "De grosses pâtes rondes mijotées dans un bouillon rouge avec des légumes.",
    servings: "4 personnes",
    minutes: 85,
    ingredients: [
      "300 g de barkoukech ou de grosses m’hamsa",
      "4 pilons de poulet",
      "1 oignon, 2 carottes, 1 navet et 150 g de pois chiches cuits",
      "2 c. à soupe de concentré de tomate, 1 c. à café de harissa et 1 c. à café de tabel",
      "1,5 L d’eau, 2 c. à soupe d’huile d’olive, sel et poivre"
    ],
    steps: [
      "Dorer le poulet et l’oignon dans l’huile. Remuer brièvement avec le concentré, la harissa et le tabel.",
      "Verser l’eau, saler et poivrer, puis ajouter les carottes et le navet coupés. Laisser mijoter 30 minutes.",
      "Ajouter les pois chiches et les pâtes. Poursuivre à feu doux jusqu’à ce que le poulet et les pâtes soient cuits, en remuant régulièrement et en ajoutant de l’eau chaude si nécessaire."
    ],
    source: {
      name: "Cuisine Tunisienne",
      url: "https://www.cuisinetunisienne.tn/barkoukech/"
    }
  },
  {
    slug: "complet-poisson",
    image: completPoisson,
    imageAlt: "Daurade poêlée, frites, tastira aux poivrons et œuf au plat",
    category: "Plat",
    title: "Complet poisson",
    description: "Daurade, tastira aux poivrons, frites et œuf au plat.",
    servings: "4 personnes",
    minutes: 70,
    ingredients: [
      "4 filets de daurade avec peau et 4 œufs",
      "4 poivrons verts, 4 tomates et 2 gousses d’ail",
      "700 g de pommes de terre",
      "1 c. à café de cumin, 1 citron, huile de friture, huile d’olive et sel"
    ],
    steps: [
      "Frire les pommes de terre coupées en bâtonnets, les égoutter et les saler.",
      "Faire frire les poivrons en morceaux et les tomates séparément. Les hacher grossièrement ensemble, puis ajouter l’ail et le cumin.",
      "Éponger et saler les filets, puis les saisir côté peau. Les retourner et poursuivre la cuisson jusqu’à ce que la chair soit opaque. Cuire les œufs au plat.",
      "Servir le poisson, la tastira, les frites et l’œuf avec du citron."
    ],
    source: {
      name: "196 flavors",
      url: "https://www.196flavors.com/fr/tunisie-complet-poisson/"
    }
  },
  {
    slug: "samsa",
    image: samsa,
    imageAlt: "Triangles de brick dorés au miel et au sésame, garnis d’amandes",
    category: "Dessert",
    title: "Samsa aux amandes et au miel",
    description: "Triangles croustillants aux amandes, parfumés à la fleur d’oranger.",
    servings: "16 pièces",
    minutes: 55,
    ingredients: [
      "8 feuilles de brick",
      "220 g d’amandes en poudre et 60 g de sucre",
      "2 à 3 c. à soupe d’eau de fleur d’oranger",
      "180 g de miel, huile de friture et graines de sésame"
    ],
    steps: [
      "Mélanger les amandes, le sucre et assez d’eau de fleur d’oranger pour obtenir une farce qui se tient.",
      "Couper les feuilles de brick en deux et replier chaque moitié en bande. Déposer la farce au bout et plier en triangle jusqu’au bout de la bande.",
      "Frire les triangles jusqu’à ce qu’ils soient dorés, puis les égoutter et les passer dans le miel tiédi. Ajouter du sésame."
    ]
  },
  {
    slug: "mhalbia",
    image: mhalbia,
    imageAlt: "Riz au lait tunisien garni de pistaches concassées",
    category: "Dessert",
    title: "Mhalbia à l’eau de géranium",
    description: "Riz au lait tunisien servi frais avec des amandes ou des pistaches.",
    servings: "4 bols",
    minutes: 150,
    ingredients: [
      "100 g de riz rond et 750 ml de lait entier",
      "60 g de sucre et 1 pincée de sel",
      "1 c. à soupe d’eau de géranium alimentaire, selon sa concentration",
      "30 g de pistaches ou d’amandes"
    ],
    steps: [
      "Porter le lait et le sel à frémissement. Ajouter le riz et cuire à feu doux 25 à 35 minutes, en remuant régulièrement.",
      "Quand les grains sont tendres, ajouter le sucre et cuire encore deux minutes. Parfumer hors du feu avec l’eau de géranium.",
      "Répartir dans des bols. Laisser tiédir, réfrigérer au moins deux heures et garnir de fruits secs."
    ],
    source: {
      name: "Cuisine Tunisienne",
      url: "https://www.cuisinetunisienne.tn/mhalbia-tunisienne/"
    }
  },
  {
    slug: "dattes-farcies",
    image: dattesFarcies,
    imageAlt: "Dattes Deglet Nour garnies de pâte d’amande et de pistaches",
    category: "Dessert",
    title: "Dattes farcies aux amandes",
    description: "Dattes ouvertes et garnies d’une pâte d’amande à la fleur d’oranger.",
    servings: "20 pièces",
    minutes: 30,
    ingredients: [
      "20 dattes Deglet Nour",
      "140 g de poudre d’amandes et 45 g de sucre glace",
      "1 à 2 c. à soupe d’eau de fleur d’oranger",
      "Pistaches concassées pour décorer"
    ],
    steps: [
      "Mélanger les amandes et le sucre glace, puis incorporer l’eau de fleur d’oranger petit à petit jusqu’à former une pâte souple.",
      "Fendre les dattes dans la longueur et retirer les noyaux. Façonner vingt petits rouleaux de pâte d’amande.",
      "Garnir les dattes et ajouter quelques éclats de pistache sur chaque portion."
    ]
  },
  {
    slug: "pain-tabouna",
    image: painTabouna,
    imageAlt: "Pain tabouna rond, avec une portion ouverte qui montre la mie",
    category: "Pain",
    title: "Pain tabouna au four",
    description: "Une adaptation au four domestique du pain rond tunisien à la semoule.",
    servings: "2 pains",
    minutes: 130,
    ingredients: [
      "400 g de semoule fine de blé dur et 100 g de farine",
      "7 g de levure boulangère sèche et 9 g de sel",
      "320 à 350 ml d’eau tiède et 2 c. à soupe d’huile d’olive"
    ],
    steps: [
      "Mélanger semoule, farine et levure. Ajouter l’eau progressivement, puis incorporer le sel et l’huile. Pétrir jusqu’à obtenir une pâte souple.",
      "Couvrir et laisser lever jusqu’à ce que la pâte ait presque doublé. Former deux disques épais et les laisser reposer 20 minutes.",
      "Préchauffer le four et une plaque à 230 °C. Glisser les pains sur la plaque chaude avec précaution, puis cuire environ 15 à 20 minutes, jusqu’à coloration."
    ]
  },
  {
    slug: "harissa-maison",
    image: harissaMaison,
    imageAlt: "Pâte de harissa rouge dans une coupelle, avec des piments séchés",
    category: "Condiment",
    title: "Harissa tunisienne maison",
    description: "Pâte de piments séchés, parfumée au carvi, à la coriandre et à l’ail.",
    servings: "1 petit pot",
    minutes: 40,
    ingredients: [
      "70 g de piments rouges séchés",
      "2 gousses d’ail et ½ c. à café de sel",
      "1 c. à café de graines de carvi et 1 c. à café de graines de coriandre",
      "2 c. à soupe d’huile d’olive"
    ],
    steps: [
      "Retirer les queues des piments et une partie des graines. Les couvrir d’eau chaude pendant 20 minutes, puis bien les égoutter.",
      "Torréfier brièvement le carvi et la coriandre à sec. Écraser les épices avec l’ail et le sel.",
      "Mixer les piments avec les épices et l’huile jusqu’à obtenir une pâte. Réfrigérer et utiliser dans les deux jours, ou congeler en petites portions."
    ]
  },
];
