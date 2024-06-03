import Character from "./shared/classes/Character.js";
import DiceManager from "./DiceManager.js";
import { mozliweLokacjeTrafienia } from "./consts.js";

const atakMieczem = (atakujacy: Character, obronca: Character, ileD6 = 1) => {
  console.log(`${atakujacy.imie} atakuje mieczem ${obronca.imie}`);
  let atakRoll = DiceManager.rollD10();
  let atakSzansa = atakujacy.szanse.atakMieczem + atakRoll;
  let obrazenia = -1;
  let lokacjaTrafienia = -1;

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
    lokacjaTrafienia = DiceManager.rollD10(false);
    console.log(
      `Lokacja trafienia: ${mozliweLokacjeTrafienia[lokacjaTrafienia - 1]}(${lokacjaTrafienia})`,
    );
    obrazenia = 0;
    for (let i = 0; i < ileD6; i++) {
      obrazenia += DiceManager.rollD6();
    }
    console.log(`Obrażenia: ${obrazenia}`);
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
    obrazenia,
    rollTrafienie: lokacjaTrafienia,
    lokacjaTrafienia: mozliweLokacjeTrafienia[lokacjaTrafienia - 1],
  };
};

export default atakMieczem;
