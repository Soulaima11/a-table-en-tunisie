import type { StaticImageData } from "next/image";
import bambalouni from "../../public/tour/bambalouni.webp";
import borzgane from "../../public/tour/borzgane.webp";
import charmoula from "../../public/tour/charmoula.webp";
import couscousPoulpe from "../../public/tour/couscous-poulpe.webp";
import garnGhzel from "../../public/tour/garn-ghzel.webp";
import kaakWarka from "../../public/tour/kaak-warka.webp";
import mtabga from "../../public/tour/mtabga.webp";
import rouzJerbi from "../../public/tour/rouz-jerbi.webp";
import sandwichLablabi from "../../public/tour/sandwich-lablabi.webp";

type Specialite = { nom: string; recette?: string };
type Escale = {
  id: string;
  nom: string;
  specialites: Specialite[];
  texte?: string;
  photo?: { image: StaticImageData; description: string };
  source?: { nom: string; url: string };
};

const poisson: Specialite = { nom: "Couscous au poisson", recette: "kosksi-poisson" };
const lablabi: Specialite = { nom: "Lablabi", recette: "lablabi" };
const mtabgaSpecialite: Specialite = { nom: "Mtabga" };
const borzganeSpecialite: Specialite = { nom: "Borzgane" };
const couscousAgneau: Specialite = { nom: "Couscous à l’agneau" };

export const escales: Escale[] = [
  { id: "kairouan", nom: "Kairouan", specialites: [
    { nom: "Makroudh de Kairouan", recette: "makroud" },
    { nom: "Kafteji", recette: "kafteji" },
  ], texte: "À Kairouan, le makroudh est une spécialité des pâtissiers. Ces losanges de semoule cachent un cœur de dattes.",
  source: { nom: "La Presse de Tunisie", url: "https://www.lapresse.tn/2026/11/09/kairouan-des-specialites-culinaires-tres-appreciees-a-lechelle-regionale-et-nationale/" } },
  { id: "tunis", nom: "Tunis", specialites: [
    lablabi, { nom: "Fricassé", recette: "fricasse" }, { nom: "Tajine tunisien", recette: "tajin-tounsi" }, { nom: "Madmouja" },
  ] },
  { id: "sidi-bou-said", nom: "Sidi Bou Saïd", specialites: [
    { nom: "Bambalouni", recette: "bambalouni" },
  ], photo: { image: bambalouni, description: "Deux bambalounis saupoudrés de sucre dans du papier." } },
  { id: "sfax", nom: "Sfax", specialites: [
    { nom: "Charmoula sfaxienne" }, poisson, { nom: "Mlabes" },
  ], photo: { image: charmoula, description: "Charmoula sfaxienne dans une assiette, avec du pain et de la cannelle." },
  source: { nom: "Discover Tunisia", url: "https://discovertunisia.com/en/discover/around-sfax-and-kerkennah" } },
  { id: "sousse", nom: "Sousse", specialites: [poisson, { nom: "Plats de fruits de mer" }] },
  { id: "monastir", nom: "Monastir", specialites: [{ nom: "Couscous au charkaw" }, { nom: "Poissons grillés" }] },
  { id: "mahdia", nom: "Mahdia", specialites: [poisson, { nom: "Poissons et fruits de mer" }] },
  { id: "bizerte", nom: "Bizerte", specialites: [lablabi, { nom: "Sandwich lablabi" }],
    photo: { image: sandwichLablabi, description: "Sandwich lablabi garni de pois chiches et de sardines." } },
  { id: "nabeul", nom: "Nabeul", specialites: [
    { nom: "Ojja", recette: "ojja" }, { nom: "Harissa traditionnelle", recette: "harissa-maison" },
  ] },
  { id: "hammamet", nom: "Hammamet", specialites: [
    { nom: "Plats de poisson" }, { nom: "Pâtisseries à la fleur d’oranger" },
  ] },
  { id: "zaghouan", nom: "Zaghouan", specialites: [
    { nom: "Kaâk warka", recette: "kaak-warka" },
  ], photo: { image: kaakWarka, description: "Kaâk warka en anneaux blancs sur un plateau." },
  texte: "De petits anneaux à la pâte fine et claire, avec une farce aux amandes. La version du carnet est parfumée à l’eau de rose.",
  source: { nom: "Pâtisserie Rekik", url: "https://patisserie-rekik.com/produit/kaak-warka/" } },
  { id: "beja", nom: "Béja", specialites: [{ nom: "Ftet" }, { nom: "Fromage" }, borzganeSpecialite] },
  { id: "le-kef", nom: "Le Kef", specialites: [
    { ...borzganeSpecialite, nom: "Borzgane, couscous sucré-salé à l’agneau" },
  ], photo: { image: borzgane, description: "Borzgane à l’agneau, servi avec des dattes et des fruits secs." } },
  { id: "jendouba", nom: "Jendouba", specialites: [{ nom: "Bsissa" }, { nom: "Plats traditionnels à base de céréales" }] },
  { id: "siliana", nom: "Siliana", specialites: [couscousAgneau, { nom: "Plats à base de céréales" }] },
  { id: "kasserine", nom: "Kasserine", specialites: [couscousAgneau, { nom: "Plats à base de semoule" }] },
  { id: "sidi-bouzid", nom: "Sidi Bouzid", specialites: [{ nom: "Méchoui d’agneau" }, { nom: "Couscous traditionnel" }] },
  { id: "gafsa", nom: "Gafsa", specialites: [
    mtabgaSpecialite, { nom: "Barkoukech", recette: "barkoukech" },
  ], photo: { image: mtabga, description: "Galettes farcies de type mtabga, repliées et dorées à la poêle." } },
  { id: "tozeur", nom: "Tozeur", specialites: [{ nom: "Saffa" }, { nom: "Mdamess" }, { nom: "Dattes Deglet Nour" }] },
  { id: "nefta", nom: "Nefta", specialites: [{ nom: "Chakhchoukha" }] },
  { id: "kebili", nom: "Kébili", specialites: [{ nom: "Dattes" }, { nom: "Pain cuit dans le sable" }] },
  { id: "gabes", nom: "Gabès", specialites: [poisson] },
  { id: "medenine", nom: "Médenine", specialites: [mtabgaSpecialite, { nom: "Couscous traditionnel" }] },
  { id: "djerba", nom: "Djerba", specialites: [
    { nom: "Rouz jerbi (riz djerbien)", recette: "riz-djerbien" }, { nom: "Viande à la gargoulette" },
  ], photo: { image: rouzJerbi, description: "Riz djerbien aux pois chiches et aux herbes, surmonté d’un piment rouge." },
  texte: "Le rouz jerbi cuit à la vapeur avec les légumes et les herbes. Notre version est au poulet.",
  source: { nom: "Cuisine Tunisienne", url: "https://www.cuisinetunisienne.tn/riz-djerbien/" } },
  { id: "tataouine", nom: "Tataouine", specialites: [
    { nom: "Garn ghzel" }, mtabgaSpecialite,
  ], photo: { image: garnGhzel, description: "Garn ghzel au sirop, garnis d’amandes." },
  source: { nom: "Tunisie.co", url: "https://tunisie.co/article/7553/gastronomie/cuisine/garn-ghzel-de-tataouine-043415" } },
  { id: "kerkennah", nom: "Kerkennah", specialites: [
    { nom: "Couscous au poulpe" },
  ], photo: { image: couscousPoulpe, description: "Couscous au poulpe avec des carottes, des pommes de terre et des pois chiches." } },
];
