import Character from "./shared/classes/Character.js";

const mozliweLokacjeTrafieniaOdmienionePrzezPrzypadki = [
  "głowę",
  "korpus",
  "korpus",
  "korpus",
  "prawe ramię",
  "lewe ramię",
  "prawą nogę",
  "prawą nogę",
  "lewą nogę",
  "lewą nogę",
];
const mozliweLokacjeTrafieniaCamelCase = [
  "glowa",
  "korpus",
  "korpus",
  "korpus",
  "prawaReka",
  "lewaReka",
  "prawaNoga",
  "prawaNoga",
  "lewaNoga",
  "lewaNoga",
];

Character.wszystkiePostacie = [
  new Character(
    true,
    "Prince Taco",
    43,
    50,
    50,
    50,
    5,
    {
      glowa: {
        wyparowanie: 12,
        wyparowanieMax: 14,
      },
      korpus: {
        wyparowanie: 5,
        wyparowanieMax: 8,
      },
      lewaReka: {
        wyparowanie: 6,
        wyparowanieMax: 8,
      },
      prawaReka: {
        wyparowanie: 6,
        wyparowanieMax: 8,
      },
      lewaNoga: {
        wyparowanie: 14,
        wyparowanieMax: 16,
      },
      prawaNoga: {
        wyparowanie: 14,
        wyparowanieMax: 16,
      },
    },
    {
      unik: 16,
      zejscieZLini: 1,
      atakMieczem: 10,
      atakPiescia: 16,
      atakDrzewcowa: 11,
      atakBitewna: 10,
      atakKrotka: 10,
      atakZakleciem: 16,
      strzalZLuku: 1,
      strzalZKuszy: 1,
    },
    [
      {
        nazwa: "Aenye",
        kosztPW: 5,
        kosztWigor: 0,
        ileD6: 4,
        dodatkowyDMG: 0,
        nazwaStatystyki: "atakZakleciem",
        mozliweSposobyUniku: ["blok", "unik"],
        srebrnyAtak: false,
        procentSzansNaPodpalenie: 75,
        procentSzansNaKrwawienie: 0,
      },
      {
        nazwa: "Tanto Ilchar",
        kosztPW: 3,
        kosztWigor: 0,
        ileD6: 0,
        dodatkowyDMG: 0,
        nazwaStatystyki: "atakZakleciem",
        mozliweSposobyUniku: ["unik"],
        srebrnyAtak: false,
        procentSzansNaPodpalenie: 100,
        procentSzansNaKrwawienie: 0,
      },
      {
        nazwa: "Pięść",
        kosztPW: 1,
        kosztWigor: 0,
        ileD6: 2,
        dodatkowyDMG: 0,
        nazwaStatystyki: "atakPiescia",
        mozliweSposobyUniku: ["unik"],
        srebrnyAtak: false,
        procentSzansNaPodpalenie: 0,
        procentSzansNaKrwawienie: 0,
      },
    ],
  ),
  new Character(
    true,
    "Azrael",
    30,
    30,
    17,
    30,
    1,
    {
      glowa: {
        wyparowanie: 5,
        wyparowanieMax: 5,
      },
      korpus: {
        wyparowanie: 5,
        wyparowanieMax: 5,
      },
      lewaReka: {
        wyparowanie: 5,
        wyparowanieMax: 5,
      },
      prawaReka: {
        wyparowanie: 5,
        wyparowanieMax: 5,
      },
      lewaNoga: {
        wyparowanie: 5,
        wyparowanieMax: 5,
      },
      prawaNoga: {
        wyparowanie: 5,
        wyparowanieMax: 5,
      },
    },
    {
      unik: 13,
      zejscieZLini: 1,
      atakMieczem: 55,
      atakPiescia: 16,
      atakDrzewcowa: 11,
      atakBitewna: 10,
      atakKrotka: 10,
      atakZakleciem: 16,
      strzalZLuku: 1,
      strzalZKuszy: 1,
    },
    [
      {
        nazwa: "Miecz srebrny",
        kosztPW: 0,
        kosztWigor: 0,
        ileD6: 4,
        dodatkowyDMG: 2,
        nazwaStatystyki: "atakMieczem",
        mozliweSposobyUniku: ["blok", "unik"],
        srebrnyAtak: true,
        procentSzansNaPodpalenie: 0,
        procentSzansNaKrwawienie: 25,
      },
    ],
  ),
  new Character(
    true,
    "Rizzo",
    30,
    30,
    17,
    30,
    1,
    {
      glowa: {
        wyparowanie: 5,
        wyparowanieMax: 5,
      },
      korpus: {
        wyparowanie: 5,
        wyparowanieMax: 5,
      },
      lewaReka: {
        wyparowanie: 5,
        wyparowanieMax: 5,
      },
      prawaReka: {
        wyparowanie: 5,
        wyparowanieMax: 5,
      },
      lewaNoga: {
        wyparowanie: 5,
        wyparowanieMax: 5,
      },
      prawaNoga: {
        wyparowanie: 5,
        wyparowanieMax: 5,
      },
    },
    {
      unik: 13,
      zejscieZLini: 1,
      atakMieczem: 55,
      atakPiescia: 16,
      atakDrzewcowa: 11,
      atakBitewna: 10,
      atakKrotka: 10,
      atakZakleciem: 16,
      strzalZLuku: 1,
      strzalZKuszy: 1,
    },
    [
      {
        nazwa: "Różdżka",
        kosztPW: 0,
        kosztWigor: 0,
        ileD6: 4,
        dodatkowyDMG: 2,
        nazwaStatystyki: "atakMieczem",
        mozliweSposobyUniku: ["blok", "unik"],
        srebrnyAtak: true,
        procentSzansNaPodpalenie: 0,
        procentSzansNaKrwawienie: 0,
      },
    ],
  ),
  new Character(
    true,
    "Fernar",
    30,
    30,
    17,
    30,
    1,
    {
      glowa: {
        wyparowanie: 5,
        wyparowanieMax: 5,
      },
      korpus: {
        wyparowanie: 5,
        wyparowanieMax: 5,
      },
      lewaReka: {
        wyparowanie: 5,
        wyparowanieMax: 5,
      },
      prawaReka: {
        wyparowanie: 5,
        wyparowanieMax: 5,
      },
      lewaNoga: {
        wyparowanie: 5,
        wyparowanieMax: 5,
      },
      prawaNoga: {
        wyparowanie: 5,
        wyparowanieMax: 5,
      },
    },
    {
      unik: 13,
      zejscieZLini: 1,
      atakMieczem: 55,
      atakPiescia: 16,
      atakDrzewcowa: 11,
      atakBitewna: 10,
      atakKrotka: 10,
      atakZakleciem: 16,
      strzalZLuku: 1,
      strzalZKuszy: 1,
    },
    [
      {
        nazwa: "Kusza",
        kosztPW: 0,
        kosztWigor: 0,
        ileD6: 4,
        dodatkowyDMG: 2,
        nazwaStatystyki: "atakMieczem",
        mozliweSposobyUniku: ["blok", "unik"],
        srebrnyAtak: true,
        procentSzansNaPodpalenie: 0,
        procentSzansNaKrwawienie: 25,
      },
    ],
  ),
  new Character(false, "Mirek", 60, 60),
  new Character(false, "Kapitan Milicji", 120, 120),
  new Character(false, "Wieśniak #1", 30, 30),
  new Character(false, "Wieśniak #2", 30, 30),
  new Character(false, "Wieśniak #3", 30, 30),
  new Character(false, "Wieśniak #4", 30, 30),
  new Character(false, "Wieśniak #5", 30, 30),
  new Character(false, "Wieśniak #6", 30, 30),
  new Character(false, "Wieśniak #7", 30, 30),
  new Character(false, "Wieśniak #8", 30, 30),
  new Character(false, "Wieśniak #9", 30, 30),
  new Character(false, "Wieśniak #10", 30, 30),
  new Character(false, "Wieśniak #11", 30, 30),
  new Character(false, "Wieśniak #12", 30, 30),
  new Character(false, "Wieśniak #13", 30, 30),
  new Character(false, "Wieśniak #14", 30, 30),
  new Character(false, "Wieśniak #15", 30, 30),
  new Character(false, "Wieśniak #16", 30, 30),
];

export {
  mozliweLokacjeTrafieniaOdmienionePrzezPrzypadki,
  mozliweLokacjeTrafieniaCamelCase,
};
