import attackInterface from "../../shared/interfaces/attackInterface.ts";
import socket from "../helpers/socket.ts";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const DiceTable = () => {
  function replacePolishChars(str: string) {
    const polishChars = {
      ą: "a",
      ć: "c",
      ę: "e",
      ł: "l",
      ń: "n",
      ó: "o",
      ś: "s",
      ź: "z",
      ż: "z",
      Ą: "A",
      Ć: "C",
      Ę: "E",
      Ł: "L",
      Ń: "N",
      Ó: "O",
      Ś: "S",
      Ź: "Z",
      Ż: "Z",
    };
    //@ts-ignore
    return str.replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, (match) => polishChars[match]);
  }

  const currentCharacter: string = useSelector(
    (state: any) => state.character.currentCharacter,
  );
  const [diceTableMessages, setDiceTableMessages] = useState([
    {
      type: "simpleAttack",
      name: "Geralt",
      attackName: "srebrny miecz",
      attackBasicChance: 15,
      attackRoll: 5,
      diceDMG: 16,
      basicAdditionalDmg: 2,
      bodyPart: "korpus",
      isBleeding: false,
      isSetOnFire: false,
    },
    {
      type: "statRoll",
      name: "Geralt",
      rollName: "Unik",
      rollBasicChance: 20,
      rollRoll: 17,
    },
  ]);
  const attack = (attackData: attackInterface) => {
    socket.emit("simpleAttack", attackData);
  };
  const ataki = useSelector(
    (state: any) => state.character.currentCharacterAttacks,
  );

  useEffect(() => {
    socket.on("diceTableFeedback", (feedback) => {
      setDiceTableMessages(() => {
        return [...feedback];
      });
    });
    socket.emit("simpleAttack");
  }, []);
  return (
    // <details open={true} className="diceTable">
    //   <summary>
    //     <h1>Rzuty Kośćmi</h1>
    //   </summary>

    //   TEMP:
    <div className="diceTable">
      <div className="diceTableLogs">
        {diceTableMessages.map((message, index) => {
          if (message.type === "simpleAttack") {
            return (
              <div key={index}>
                <span className="name">{replacePolishChars(message.name)}</span>{" "}
                użył{" "}
                <span className="name">
                  {/*@ts-ignore*/}
                  {replacePolishChars(message.attackName)}
                </span>{" "}
                {/*// @ts-ignore*/}
                {message.attackBasicChance + message.attackRoll}
                <span className="smallNums">
                  {message.attackBasicChance} + {message.attackRoll}
                </span>{" "}
                {/*// @ts-ignore*/}
                {message.diceDMG > 0 && (
                  <>
                    i zadał {/*// @ts-ignore*/}
                    {message.diceDMG + message.basicAdditionalDmg}
                    <span className="smallNums">
                      {message.diceDMG} + {message.basicAdditionalDmg}
                    </span>{" "}
                    obrażeń! ({message.bodyPart})
                  </>
                )}
                <span className="bleeding">
                  {" "}
                  {message.isBleeding && " Nakłada krawienie!"}
                </span>
                <span className="onFire">
                  {" "}
                  {message.isSetOnFire && " Podpala cel!"}
                </span>
              </div>
            );
          } else if (message.type === "statRoll") {
            return (
              <div key={index}>
                <span className="name">{message.name}</span> rzucił{" "}
                {/*// @ts-ignore*/}
                {message.rollRoll + message.rollBasicChance}
                <span className="smallNums">
                  {message.rollBasicChance} + {message.rollRoll}
                </span>{" "}
                na {message.rollName}!
              </div>
            );
          } else if (message.type === "simpleRoll") {
            return (
              <div key={index}>
                <span className="name">{message.name}</span> rzucił{" "}
                {/*// @ts-ignore*/}
                {message.roll}!
              </div>
            );
          }
        })}
      </div>
      <div className="diceTableRolls">
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
        <div className="separator">|</div>
        <button onClick={() => socket.emit("unik", { currentCharacter })}>
          Unik
        </button>
        <div className="separator">|</div>
        <button onClick={() => socket.emit("d6", { currentCharacter })}>
          D6
        </button>
        <button onClick={() => socket.emit("d10", { currentCharacter })}>
          D10
        </button>
      </div>
    </div>
    // </details>
  );
};
export default DiceTable;
