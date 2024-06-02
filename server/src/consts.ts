import Character from "./shared/classes/Character.js";

const mozliweLokacjeTrafienia = [
  "głowa",
  "korpus",
  "korpus",
  "korpus",
  "Ramię prawe",
  "Ramię lewe",
  "Noga prawa",
  "Noga prawa",
  "Noga lewa",
  "Noga lewa",
];

Character.wszystkiePostacie = [
  new Character(
    true,
    "Książe Taco",
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
  ),
  new Character(true, "Rizzo"),
  new Character(true, "Fernar "),
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

export { mozliweLokacjeTrafienia };
