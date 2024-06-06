class Character {
  static wszystkiePostacie: Character[] = [];

  jestBohaterem: boolean;
  imie: string;
  pz: number; // punkty zdrowia
  pzMax: number; // maksymalne punkty zdrowia
  pw: number; // punkty wytrzymałości
  pwMax: number; // maksymalne punkty wytrzymałości
  wigor: number;
  wyparowanie: {
    glowa: {
      wyparowanie: number;
      wyparowanieMax: number;
    };
    korpus: {
      wyparowanie: number;
      wyparowanieMax: number;
    };
    lewaReka: {
      wyparowanie: number;
      wyparowanieMax: number;
    };
    prawaReka: {
      wyparowanie: number;
      wyparowanieMax: number;
    };
    lewaNoga: {
      wyparowanie: number;
      wyparowanieMax: number;
    };
    prawaNoga: {
      wyparowanie: number;
      wyparowanieMax: number;
    };
  };
  szanse: {
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
  };
  ataki: {
    nazwa: string;
    kosztPW: number;
    kosztWigor: number;
    ileD6: number;
    dodatkowyDMG: number;
    zaklecie: boolean;
    mozliweSposobyUniku: string[];
    srebrnyAtak: boolean;
    procentSzansNaPodpalenie: number;
    procentSzansNaKrwawienie: number; //procent szans na krwawienie
  }[]; //FIXME: dodać interface (jest też shared, więc nie wiem jak.)

  constructor(
    jestBohaterem: boolean = false,
    imie: string = "Anonimowy",
    pz: number = 10,
    pzMax: number = 10,
    pw: number = 10,
    pwMax: number = 10,
    wigor: number = 1,
    wyparowanie: {
      glowa: {
        wyparowanie: number;
        wyparowanieMax: number;
      };
      korpus: {
        wyparowanie: number;
        wyparowanieMax: number;
      };
      lewaReka: {
        wyparowanie: number;
        wyparowanieMax: number;
      };
      prawaReka: {
        wyparowanie: number;
        wyparowanieMax: number;
      };
      lewaNoga: {
        wyparowanie: number;
        wyparowanieMax: number;
      };
      prawaNoga: {
        wyparowanie: number;
        wyparowanieMax: number;
      };
    } = {
      glowa: {
        wyparowanie: 0,
        wyparowanieMax: 0,
      },
      korpus: {
        wyparowanie: 0,
        wyparowanieMax: 0,
      },
      lewaReka: {
        wyparowanie: 0,
        wyparowanieMax: 0,
      },
      prawaReka: {
        wyparowanie: 0,
        wyparowanieMax: 0,
      },
      lewaNoga: {
        wyparowanie: 0,
        wyparowanieMax: 0,
      },
      prawaNoga: {
        wyparowanie: 0,
        wyparowanieMax: 0,
      },
    },
    szanse: {
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
    } = {
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
    },
    ataki: {
      nazwa: string;
      kosztPW: number;
      kosztWigor: number;
      ileD6: number;
      dodatkowyDMG: 0;
      zaklecie: boolean;
      mozliweSposobyUniku: string[];
      srebrnyAtak: boolean;
      procentSzansNaPodpalenie: number;
      procentSzansNaKrwawienie: number; //procent szans na krwawienie
    }[] = [
      {
        nazwa: "Miecz treningowy",
        kosztPW: 1,
        kosztWigor: 0,
        ileD6: 1,
        dodatkowyDMG: 0,
        zaklecie: false,
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
        zaklecie: true,
        mozliweSposobyUniku: ["unik"],
        srebrnyAtak: false,
        procentSzansNaPodpalenie: 50,
        procentSzansNaKrwawienie: 0,
      },
    ],
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

interface Character {
  jestBohaterem: boolean;
  imie: string;
  pz: number;
  pzMax: number;
  pw: number;
  pwMax: number;
  wigor: number;
  wyparowanie: {
    glowa: WyparowaniePart;
    korpus: WyparowaniePart;
    lewaReka: WyparowaniePart;
    prawaReka: WyparowaniePart;
    lewaNoga: WyparowaniePart;
    prawaNoga: WyparowaniePart;
  };
  szanse: Szanse;
  ataki: {
    nazwa: string;
    kosztPW: number;
    kosztWigor: number;
    ileD6: number;
    dodatkowyDMG: number;
    zaklecie: boolean;
    mozliweSposobyUniku: string[];
    srebrnyAtak: boolean;
    procentSzansNaPodpalenie: number;
    procentSzansNaKrwawienie: number;
  }[];
}

export default Character;
