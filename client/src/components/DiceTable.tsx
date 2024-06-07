import simpleAttackInterface from "../shared/interfaces/simpleAttackInterface.ts";
import socket from "../helpers/socket.ts";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const DiceTable = () => {
  const currentCharacter: string = useSelector(
    (state: any) => state.character.currentCharacter,
  );
  // const [diceTableMessages, setDiceTableMessages] = useState([
  //   "Geralt atakuje srebrnym mieczem (22) zadając 16 DMG!",
  //   "Geralt atakuje pazurami (36) zadając 27 DMG!",
  //   "Geralt rzuca igni (22) zadając 5 DMG!",
  //   "Strzyga gryzie (17) zadająć 17 DMG!",
  //   "Geralt atakuje silnie mieczem (12) zadając 35 DMG!",
  //   "Strzyga szarżuje (16) zadająć 3 DMG!",
  // ]);
  const [diceTableMessages, setDiceTableMessages] = useState([
    {
      type: "simpleAttack",
      name: "Geralt",
      attackName: "srebrny miecz",
      attackBasicChance: "15",
      attackRoll: "5",
      diceDMG: "16",
      basicAdditionalDmg: "2",
      isBleeding: false,
      isSetOnFire: false,
    },
    {
      type: "statRoll",
      name: "Geralt",
      rollName: "Unik",
      rollBasicChance: "20",
      rollRoll: "17",
    },
  ]);
  const attack = (attackData: simpleAttackInterface) => {
    socket.emit("simpleAttack", attackData);
  };
  const ataki = useSelector(
    (state: any) => state.character.currentCharacterAttacks,
  );

  console.table(diceTableMessages);

  useEffect(() => {
    socket.on("simpleAttackFeedback", (feedback) => {
      // console.table(feedback);
      // let message = `${feedback[0].name} używa ${feedback.attackName}`;
      setDiceTableMessages(() => {
        return [...feedback];
      });
    });
    socket.emit("simpleAttack");
  }, []);
  return (
    <details open={true} className="diceTable">
      <summary>
        <h1>Rzuty Kośćmi</h1>
      </summary>
      <div className="diceTableLogs">
        {diceTableMessages.map((message, index) => {
          if (message.type === "simpleAttack") {
            return (
              <div key={index}>
                {message.name} użył "{message.attackName}" (wynik rzutu:{" "}
                {message.attackRoll}) i zadał {message.diceDMG} obrażeń!
              </div>
            );
          } else if (message.type === "statRoll") {
            return (
              <div key={index}>
                {message.name} rzucił {message.rollRoll} na {message.rollName}!
              </div>
            );
          } else if (message.type === "simpleRoll") {
            return (
              <div key={index}>
                {/*// @ts-ignore*/}
                {message.name} rzucił {message.roll}!
              </div>
            );
          }
        })}
      </div>
      <div className="attacksWrapper simpleAttacksWrapper">
        {currentCharacter &&
          ataki.map((atak: any, index: number) => {
            return (
              <button
                key={index}
                onClick={() => {
                  attack({
                    nazwaAtaku: atak.nazwa,
                    atakujacy: currentCharacter,
                    ...atak,
                  });
                }}
              >
                {atak.nazwa}
              </button>
            );
          })}
      </div>
    </details>
  );
};
export default DiceTable;
