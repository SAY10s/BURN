import Character from "./shared/classes/Character.js";
import DiceManager from "./DiceManager.js";
import { mozliweLokacjeTrafieniaOdmienionePrzezPrzypadki, mozliweLokacjeTrafieniaCamelCase } from "./consts.js";

const atakMieczem = (atakujacy: Character, obronca: Character, ileD6 = 1) => {
  console.log(`${atakujacy.imie} atakuje mieczem ${obronca.imie}`);
  let atakRoll = DiceManager.rollD10();
  let atakSzansa = atakujacy.szanse.atakMieczem + atakRoll;
  let lokacjaTrafienia = -1;
  let obrazeniaRoll = -1;
  let obrazenia = -1;
  let wyparowanie = -1;
  let mnoznikLokacji = 1;

  console.log(
    `Wynik ataku ${atakujacy.imie}: ${atakSzansa} (${atakujacy.szanse.atakMieczem} + ${atakRoll})`,
  );

  let obronaRoll = DiceManager.rollD10();
  let obronaSzansa = obronca.szanse.unik + obronaRoll;

  console.log(
    `Wynik obrony ${obronca.imie}: ${obronaSzansa} (${obronca.szanse.unik} + ${obronaRoll})`,
  );

  if (atakSzansa > obronaSzansa) {
    console.log("Atak trafił!");

    // Lokacja trafienia
    lokacjaTrafienia = DiceManager.rollD10(false);
    console.log(
      `Lokacja trafienia: ${mozliweLokacjeTrafieniaOdmienionePrzezPrzypadki[lokacjaTrafienia - 1]}(${lokacjaTrafienia})`,
    );

    // obrażenia roll
    for (let i = 0; i < ileD6; i++) {
      obrazeniaRoll += DiceManager.rollD6();
    }
    console.log(`Obrażenia wyrzucone przed wyparowaniem: ${obrazeniaRoll}`);

    //wyparowanie
    wyparowanie = obronca.wyparowanie[mozliweLokacjeTrafieniaCamelCase[lokacjaTrafienia - 1]].wyparowanie
    console.log("Wyparowanie: ", wyparowanie)
    if (obrazeniaRoll > wyparowanie) {
      obrazenia = obrazeniaRoll - wyparowanie;
      obronca.wyparowanie[mozliweLokacjeTrafieniaCamelCase[lokacjaTrafienia - 1]].wyparowanie--
    } else {
      obrazenia = 0;
    }
    //ODEJMIJ REDUKCJĘ I PODATNOŚ

    //mnożnik lokacji trafienia
    const lokacjaTrafieniaCamelCase = mozliweLokacjeTrafieniaCamelCase[lokacjaTrafienia - 1];
    if (lokacjaTrafieniaCamelCase === "glowa") mnoznikLokacji = 3
    if (lokacjaTrafieniaCamelCase === "korpus") mnoznikLokacji = 1;
    else mnoznikLokacji = 0.5

    obrazenia = Math.floor(obrazenia * mnoznikLokacji);


    //finalne obrażenia
    obronca.pz -= obrazenia;
  } else {
    console.log("Atak nie trafił");
  }
  return {
    atakujacy: atakujacy.imie,
    atakRoll,
    atakMieczem: atakujacy.szanse.atakMieczem,
    atakSzansa,
    obronca: obronca.imie,
    unik: obronca.szanse.unik,
    obronaSzansa,
    obronaRoll,
    obrazeniaRoll,
    obrazenia,
    wyparowanie,
    rollTrafienie: lokacjaTrafienia,
    mnoznikLokacji,
    lokacjaTrafienia: mozliweLokacjeTrafieniaOdmienionePrzezPrzypadki[lokacjaTrafienia - 1],
  };
};

export default atakMieczem;
