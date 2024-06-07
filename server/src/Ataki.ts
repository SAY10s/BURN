import Character from "./shared/classes/Character.js";
import DiceManager from "./DiceManager.js";
import {
  mozliweLokacjeTrafieniaOdmienionePrzezPrzypadki,
  mozliweLokacjeTrafieniaCamelCase,
} from "./consts.js";
import attackInterface from "./shared/interfaces/attackInterface.js";

const calculateDamage = (data: attackInterface) => {
  let lokacjaTrafienia = DiceManager.rollD10(false);
  let obrazeniaRoll = Array(data.ileD6)
    .fill(0)
    .reduce((acc) => acc + DiceManager.rollD6(), 0);

  if (!(data.obronca instanceof Character)) {
    throw new Error("obronca must be an instance of Character");
  }

  let wyparowanie =
    data.obronca.wyparowanie[
      mozliweLokacjeTrafieniaCamelCase[lokacjaTrafienia - 1]
    ].wyparowanie;
  let obrazenia =
    obrazeniaRoll > wyparowanie
      ? Math.floor(
          (obrazeniaRoll - wyparowanie) * getDamageMultiplier(lokacjaTrafienia),
        )
      : 0;

  if (wyparowanie) {
    data.obronca.wyparowanie[
      mozliweLokacjeTrafieniaCamelCase[lokacjaTrafienia - 1]
    ].wyparowanie--;
  }

  data.obronca.pz -= obrazenia;

  return { lokacjaTrafienia, obrazeniaRoll, obrazenia, wyparowanie }; // return wyparowanie as part of the result
};

const getDamageMultiplier = (lokacjaTrafienia: number) => {
  switch (mozliweLokacjeTrafieniaCamelCase[lokacjaTrafienia - 1]) {
    case "glowa":
      return 3;
    case "korpus":
      return 1;
    default:
      return 0.5;
  }
};

const atak = (data: attackInterface) => {
  if (
    !(data.atakujacy instanceof Character && data.obronca instanceof Character)
  ) {
    return "Błąd ataku";
  }

  let atakRoll = DiceManager.rollD10();
  let atakStatystyka =
    data.nazwaStatystyki === "atakZakleciem"
      ? data.atakujacy.szanse.atakZakleciem
      : data.atakujacy.szanse.atakMieczem;
  let atakSzansa = atakStatystyka + atakRoll;

  let obronaRoll = DiceManager.rollD10();
  let obronaSzansa = data.obronca.szanse.unik + obronaRoll;

  let message = `${data.atakujacy.imie} (${atakStatystyka} + ${atakRoll} = ${atakSzansa})
           zaatakował ${data.obronca.imie} (${data.obronca.szanse.unik} + ${obronaRoll} = ${obronaSzansa}) 
           użwając ${data.nazwaAtaku}!`;

  if (atakSzansa <= obronaSzansa) {
    return message + ` i nie trafił! (${atakSzansa} < ${obronaSzansa})`;
  }

  let { lokacjaTrafienia, obrazeniaRoll, obrazenia, wyparowanie } =
    calculateDamage(data);

  message += ` i trafił (${atakSzansa} > ${obronaSzansa}) w ${mozliweLokacjeTrafieniaOdmienionePrzezPrzypadki[lokacjaTrafienia - 1].toLowerCase()}(${lokacjaTrafienia})`;
  message += ` i zabrał mu ${obrazenia}((${obrazeniaRoll} - ${wyparowanie})*${getDamageMultiplier(lokacjaTrafienia)} = ${obrazenia}) punktów życia!`;

  if (data.procentSzansNaPodpalenie >= DiceManager.rollD100(false)) {
    message += ` ${data.obronca.imie} podpalił się!`;
  }

  return message;
};

export default atak;
