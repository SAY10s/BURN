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
    const { atakujacy, obronca, ...testData } = data;
    message += `TESTY! ${JSON.stringify(testData)}`;
    //------------------------------------

    console.log(`${data.atakujacy.imie} atakuje mieczem ${data.obronca.imie}`);

    let atakRoll = DiceManager.rollD10();
    let atakSzansa = data.atakujacy.szanse.atakMieczem + atakRoll;
    let lokacjaTrafienia = -1;
    let obrazeniaRoll = -1;
    let obrazenia = -1;
    let wyparowanie = -1;
    let mnoznikLokacji = 1;

    console.log(
      `Wynik ataku ${data.atakujacy.imie}: ${atakSzansa} (${data.atakujacy.szanse.atakMieczem} + ${atakRoll})`,
    );

    let obronaRoll = DiceManager.rollD10();
    let obronaSzansa = data.obronca.szanse.unik + obronaRoll;

    console.log(
      `Wynik obrony ${data.obronca.imie}: ${obronaSzansa} (${data.obronca.szanse.unik} + ${obronaRoll})`,
    );

    message += `${data.atakujacy.imie} (${data.atakujacy.szanse.atakMieczem} + ${atakRoll} = ${atakSzansa})
           zaatakował ${data.obronca.imie} (${data.obronca.szanse.unik} + ${obronaRoll} = ${obronaSzansa}) 
           użwając ${data.nazwaAtaku}!`;

    if (atakSzansa > obronaSzansa) {
      console.log("Atak trafił!");

      // Lokacja trafienia
      lokacjaTrafienia = DiceManager.rollD10(false);
      console.log(
        `Lokacja trafienia: ${mozliweLokacjeTrafieniaOdmienionePrzezPrzypadki[lokacjaTrafienia - 1]}(${lokacjaTrafienia})`,
      );

      // obrażenia roll
      for (let i = 0; i < data.ileD6; i++) {
        obrazeniaRoll += DiceManager.rollD6();
      }
      console.log(`Obrażenia wyrzucone przed wyparowaniem: ${obrazeniaRoll}`);

      //wyparowanie
      wyparowanie =
        data.obronca.wyparowanie[
          mozliweLokacjeTrafieniaCamelCase[lokacjaTrafienia - 1]
        ].wyparowanie;
      console.log("Wyparowanie: ", wyparowanie);
      if (obrazeniaRoll > wyparowanie) {
        obrazenia = obrazeniaRoll - wyparowanie;
        data.obronca.wyparowanie[
          mozliweLokacjeTrafieniaCamelCase[lokacjaTrafienia - 1]
        ].wyparowanie--;
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

      message += ` i trafił (${atakSzansa} > ${obronaSzansa}) w ${mozliweLokacjeTrafieniaOdmienionePrzezPrzypadki[lokacjaTrafienia - 1].toLowerCase()}(${lokacjaTrafienia})`;
      message += ` i zabrał mu ${obrazenia}((${obrazeniaRoll} - ${wyparowanie})*${mnoznikLokacji} = ${obrazenia}) punktów życia!`;
    } else {
      message += ` i nie trafił! (${atakSzansa} < ${obronaSzansa})`;
    }
    return message;
  } else {
    return "Błąd ataku";
  }
};

export default atak;
