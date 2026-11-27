import type { StaticImageData } from "next/image";
import bambalouni from "../../public/tour/bambalouni.webp";
import borzgane from "../../public/tour/borzgane.webp";
import bsissaJendouba from "../../public/tour/bsissa-jendouba.webp";
import chrihaKarmous from "../../public/tour/chriha-karmous.webp";
import couscousCharkawMonastir from "../../public/tour/couscous-charkaw-monastir.webp";
import couscousMedenine from "../../public/tour/couscous-medenine.webp";
import couscousPoulpe from "../../public/tour/couscous-poulpe.webp";
import couscousPoissonSfax from "../../public/tour/couscous-poisson-sfax.webp";
import fruitsDeMerSousse from "../../public/tour/fruits-de-mer-sousse.webp";
import ftetBeja from "../../public/tour/ftet-beja.webp";
import garnGhzel from "../../public/tour/garn-ghzel.webp";
import harissaNabeul from "../../public/tour/harissa-nabeul.webp";
import kaakWarka from "../../public/tour/kaak-warka.webp";
import kaftejiKairouan from "../../public/tour/kafteji-kairouan.webp";
import madmouja from "../../public/tour/madmouja.webp";
import mdamesTozeur from "../../public/tour/mdames-tozeur.webp";
import mlabesSfax from "../../public/tour/mlabes-sfax.webp";
import makroudhKairouan from "../../public/tour/makroudh-kairouan.webp";
import mtabga from "../../public/tour/mtabga.webp";
import painSableKebili from "../../public/tour/pain-sable-kebili.webp";
import rouzJerbi from "../../public/tour/rouz-jerbi.webp";
import sandwichLablabi from "../../public/tour/sandwich-lablabi.webp";

type Escale = {
  id: string;
  nom: string;
  specialites: string[];
  texte?: string;
  photos?: { image: StaticImageData; description: string; legende?: string }[];
};

const poisson = "Couscous au poisson";
const lablabi = "Lablabi";
const mtabgaSpecialite = "Mtabga";
const couscousAgneau = "Couscous à l’agneau";

export const escales: Escale[] = [
  { id: "kairouan", nom: "Kairouan", specialites: [
    "Makroudh aux dattes",
    "Kafteji de Kairouan",
  ], photos: [
    { image: makroudhKairouan, description: "Makroudh aux dattes sur un plateau.", legende: "Makroudh aux dattes" },
    { image: kaftejiKairouan, description: "Sandwich au kafteji servi avec des frites.", legende: "Kafteji de Kairouan" },
  ] },
  { id: "tunis", nom: "Tunis", specialites: ["Madmouja"],
    photos: [{ image: madmouja, description: "Madmouja décorée de dattes et de pistaches." }] },
  { id: "sidi-bou-said", nom: "Sidi Bou Saïd", specialites: [
    "Bambalouni",
  ], photos: [{ image: bambalouni, description: "Deux bambalounis saupoudrés de sucre dans du papier." }] },
  { id: "sfax", nom: "Sfax", specialites: ["Mlabes", poisson], photos: [
    { image: mlabesSfax, description: "Mlabes roses et blancs sur un plateau.", legende: "Mlabes" },
    { image: couscousPoissonSfax, description: "Couscous au poisson avec des pois chiches et des piments verts.", legende: poisson },
  ] },
  { id: "sousse", nom: "Sousse", specialites: ["Plat de fruits de mer"],
    photos: [{ image: fruitsDeMerSousse, description: "Assiette de moules, de crevettes et de poulpe grillé." }] },
  { id: "monastir", nom: "Monastir", specialites: ["Couscous au charkaw"],
    photos: [{ image: couscousCharkawMonastir, description: "Couscous au charkaw garni de légumes dans un plat en terre cuite." }] },
  { id: "mahdia", nom: "Mahdia", specialites: [poisson, "Poissons et fruits de mer"] },
  { id: "bizerte", nom: "Bizerte", specialites: [lablabi, "Sandwich lablabi"],
    photos: [{ image: sandwichLablabi, description: "Sandwich lablabi garni de pois chiches et de sardines." }] },
  { id: "nabeul", nom: "Nabeul", specialites: ["Harissa traditionnelle"],
    photos: [{ image: harissaNabeul, description: "Harissa rouge dans un bol et un bocal, avec des piments rouges." }] },
  { id: "hammamet", nom: "Hammamet", specialites: [
    "Plats de poisson", "Pâtisseries à la fleur d’oranger",
  ] },
  { id: "zaghouan", nom: "Zaghouan", specialites: [
    "Kaâk warka",
  ], photos: [{ image: kaakWarka, description: "Kaâk warka en anneaux blancs sur un plateau." }],
  texte: "De petits anneaux à la pâte fine et claire, avec une farce aux amandes. La version du carnet est parfumée à l’eau de rose." },
  { id: "beja", nom: "Béja", specialites: ["Ftet"],
    photos: [{ image: ftetBeja, description: "Ftet servi avec de la viande et une sauce rouge." }] },
  { id: "le-kef", nom: "Le Kef", specialites: [
    "Borzgane, couscous sucré-salé à l’agneau",
  ], photos: [{ image: borzgane, description: "Borzgane à l’agneau, servi avec des dattes et des fruits secs." }] },
  { id: "jendouba", nom: "Jendouba", specialites: ["Bsissa"],
    photos: [{ image: bsissaJendouba, description: "Bol de bsissa garni d’amandes, de noix et de pistaches." }] },
  { id: "siliana", nom: "Siliana", specialites: [couscousAgneau, "Plats à base de céréales"] },
  { id: "kasserine", nom: "Kasserine", specialites: [couscousAgneau, "Plats à base de semoule"] },
  { id: "sidi-bouzid", nom: "Sidi Bouzid", specialites: ["Méchoui d’agneau", "Couscous traditionnel"] },
  { id: "gafsa", nom: "Gafsa", specialites: [
    mtabgaSpecialite, "Barkoukech",
  ], photos: [{ image: mtabga, description: "Galettes farcies de type mtabga, repliées et dorées à la poêle." }] },
  { id: "tozeur", nom: "Tozeur", specialites: ["Mdames"],
    photos: [{ image: mdamesTozeur, description: "Assiette de fèves avec du pain." }] },
  { id: "nefta", nom: "Nefta", specialites: ["Chakhchoukha"] },
  { id: "kebili", nom: "Kébili", specialites: ["Pain cuit dans le sable"],
    photos: [{ image: painSableKebili, description: "Pain rond en train de cuire dans le sable près des braises." }] },
  { id: "gabes", nom: "Gabès", specialites: ["Chriha karmous"],
    photos: [{ image: chrihaKarmous, description: "Figues séchées servies dans un plat en bois." }] },
  { id: "medenine", nom: "Médenine", specialites: ["Couscous traditionnel"],
    photos: [{ image: couscousMedenine, description: "Couscous traditionnel aux légumes et aux pois chiches." }] },
  { id: "djerba", nom: "Djerba", specialites: [
    "Rouz jerbi (riz djerbien)", "Viande à la gargoulette",
  ], photos: [{ image: rouzJerbi, description: "Riz djerbien aux pois chiches et aux herbes, surmonté d’un piment rouge." }],
  texte: "Le rouz jerbi cuit à la vapeur avec les légumes et les herbes. Notre version est au poulet." },
  { id: "tataouine", nom: "Tataouine", specialites: [
    "Garn ghzel", mtabgaSpecialite,
  ], photos: [
    { image: garnGhzel, description: "Garn ghzel au sirop, garnis d’amandes.", legende: "Garn ghzel" },
    { image: mtabga, description: "Galettes farcies dorées à la poêle.", legende: "Mtabga" },
  ] },
  { id: "kerkennah", nom: "Kerkennah", specialites: [
    "Couscous au poulpe",
  ], photos: [{ image: couscousPoulpe, description: "Couscous au poulpe avec des carottes, des pommes de terre et des pois chiches." }] },
];
