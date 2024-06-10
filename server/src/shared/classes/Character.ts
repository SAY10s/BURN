interface WyparowaniePart {
  wyparowanie: number;
  wyparowanieMax: number;
}

interface Szanse {
  unik: number;
  zejscieZLini: number;
  atakMieczem: number;
  atakPiescia: number;
  atakDrzewcowa: number;
  atakBitewna: number;
  atakKrotka: number;
  atakZakleciem: number;
  strzalZLuku: number;
  strzalZKuszy: number;
}

interface Atak {
  nazwa: string;
  kosztPW: number;
  kosztWigor: number;
  ileD6: number;
  dodatkowyDMG: number;
  nazwaStatystyki: string;
  mozliweSposobyUniku: string[];
  srebrnyAtak: boolean;
  procentSzansNaPodpalenie: number;
  procentSzansNaKrwawienie: number;
}

const defaultWyparowanie: { [key: string]: WyparowaniePart } = {
  glowa: { wyparowanie: 0, wyparowanieMax: 0 },
  korpus: { wyparowanie: 0, wyparowanieMax: 0 },
  lewaReka: { wyparowanie: 0, wyparowanieMax: 0 },
  prawaReka: { wyparowanie: 0, wyparowanieMax: 0 },
  lewaNoga: { wyparowanie: 0, wyparowanieMax: 0 },
  prawaNoga: { wyparowanie: 0, wyparowanieMax: 0 },
};

const defaultSzanse: Szanse = {
  unik: 1,
  zejscieZLini: 1,
  atakMieczem: 1,
  atakPiescia: 1,
  atakDrzewcowa: 1,
  atakBitewna: 1,
  atakKrotka: 1,
  atakZakleciem: 1,
  strzalZLuku: 1,
  strzalZKuszy: 1,
};

const defaultAtaki: Atak[] = [
  {
    nazwa: "Miecz treningowy",
    kosztPW: 1,
    kosztWigor: 0,
    ileD6: 1,
    dodatkowyDMG: 0,
    nazwaStatystyki: "atakMieczem",
    mozliweSposobyUniku: ["unik"],
    srebrnyAtak: false,
    procentSzansNaPodpalenie: 0,
    procentSzansNaKrwawienie: 0,
  },
  {
    nazwa: "Abra Kadabra",
    kosztPW: 5,
    kosztWigor: 0,
    ileD6: 4,
    dodatkowyDMG: 0,
    nazwaStatystyki: "atakZakleciem",
    mozliweSposobyUniku: ["unik"],
    srebrnyAtak: false,
    procentSzansNaPodpalenie: 50,
    procentSzansNaKrwawienie: 0,
  },
];

class Character {
  static wszystkiePostacie: Character[] = [];

  jestBohaterem: boolean;
  imie: string;
  pz: number;
  pzMax: number;
  pw: number;
  pwMax: number;
  wigor: number;
  wyparowanie: { [key: string]: WyparowaniePart };
  szanse: Szanse;
  ataki: Atak[];

  constructor(
    jestBohaterem: boolean = false,
    imie: string = "Anonimowy",
    pz: number = 10,
    pzMax: number = 10,
    pw: number = 10,
    pwMax: number = 10,
    wigor: number = 1,
    wyparowanie: { [key: string]: WyparowaniePart } = defaultWyparowanie,
    szanse: Szanse = defaultSzanse,
    ataki: Atak[] = defaultAtaki
  ) {
    this.jestBohaterem = jestBohaterem;
    this.imie = imie;
    this.pz = pz;
    this.pzMax = pzMax;
    this.pw = pw;
    this.pwMax = pwMax;
    this.wigor = wigor;
    this.wyparowanie = wyparowanie;
    this.szanse = szanse;
    this.ataki = ataki;
  }
}

export default Character;
