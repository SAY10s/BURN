import Character from "./shared/classes/Character.js";
import DiceManager from "./DiceManager.js";
import {
  mozliweLokacjeTrafieniaOdmienionePrzezPrzypadki,
  mozliweLokacjeTrafieniaCamelCase,
} from "./consts.js";
import attackInterface from "./shared/interfaces/attackInterface.js";

const atak = (data: attackInterface) => {
  if (
    data.atakujacy instanceof Character &&
    data.obronca instanceof Character
  ) {
    let message = ``;
    //-----------------TESTS--------------
    // const { atakujacy, obronca, ...testData } = data;
    // message += `TESTY! ${JSON.stringify(testData)}`;
    //------------------------------------

    let atakRoll = DiceManager.rollD10();
    //TEMPORARY
    let atakStatystyka = 2137;
    let atakSzansa = -1;
    if (data.nazwaStatystyki === "atakZakleciem") {
      atakStatystyka = data.atakujacy.szanse.atakZakleciem;
      atakSzansa = data.atakujacy.szanse.atakZakleciem + atakRoll;
    } else {
      atakStatystyka = data.atakujacy.szanse.atakMieczem;
      atakSzansa = data.atakujacy.szanse.atakMieczem + atakRoll;
    }
    //--------
    let lokacjaTrafienia = -1;
    let obrazeniaRoll = -1;
    let obrazenia = -1;
    let wyparowanie = -1;
    let mnoznikLokacji = 1;

    let obronaRoll = DiceManager.rollD10();
    let obronaSzansa = data.obronca.szanse.unik + obronaRoll;

    message += `${data.atakujacy.imie} (${atakStatystyka} + ${atakRoll} = ${atakSzansa})
           zaatakował ${data.obronca.imie} (${data.obronca.szanse.unik} + ${obronaRoll} = ${obronaSzansa}) 
           użwając ${data.nazwaAtaku}!`;

    if (atakSzansa > obronaSzansa) {
      // Lokacja trafienia
      lokacjaTrafienia = DiceManager.rollD10(false);

      // obrażenia roll
      for (let i = 0; i < data.ileD6; i++) {
        obrazeniaRoll += DiceManager.rollD6();
      }
      //wyparowanie
      wyparowanie =
        data.obronca.wyparowanie[
          mozliweLokacjeTrafieniaCamelCase[lokacjaTrafienia - 1]
        ].wyparowanie;

      if (obrazeniaRoll > wyparowanie) {
        obrazenia = obrazeniaRoll - wyparowanie;
        if (wyparowanie) {
          data.obronca.wyparowanie[
            mozliweLokacjeTrafieniaCamelCase[lokacjaTrafienia - 1]
          ].wyparowanie--;
        }
      } else {
        obrazenia = 0;
      }
      //ODEJMIJ REDUKCJĘ I PODATNOŚ

      //mnożnik lokacji trafienia
      const lokacjaTrafieniaCamelCase =
        mozliweLokacjeTrafieniaCamelCase[lokacjaTrafienia - 1];
      if (lokacjaTrafieniaCamelCase === "glowa") mnoznikLokacji = 3;
      if (lokacjaTrafieniaCamelCase === "korpus") mnoznikLokacji = 1;
      else mnoznikLokacji = 0.5;

      obrazenia = Math.floor(obrazenia * mnoznikLokacji);

      //finalne obrażenia
      data.obronca.pz -= obrazenia;

      if (data.ileD6) {
        message += ` i trafił (${atakSzansa} > ${obronaSzansa}) w ${mozliweLokacjeTrafieniaOdmienionePrzezPrzypadki[lokacjaTrafienia - 1].toLowerCase()}(${lokacjaTrafienia})`;
        message += ` i zabrał mu ${obrazenia}((${obrazeniaRoll} - ${wyparowanie})*${mnoznikLokacji} = ${obrazenia}) punktów życia!`;
      }

      //efekty trafienia:
      //podpalenie
      if (data.procentSzansNaPodpalenie >= DiceManager.rollD100(false)) {
        message += ` ${data.obronca.imie} podpalił się!`;
      }
    } else {
      message += ` i nie trafił! (${atakSzansa} < ${obronaSzansa})`;
    }
    return message;
  } else {
    return "Błąd ataku";
  }
};

export default atak;
