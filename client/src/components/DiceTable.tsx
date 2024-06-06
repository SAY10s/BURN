import simpleAttackInterface from "../shared/interfaces/simpleAttackInterface.ts";
import socket from "../helpers/socket.ts";
import { useSelector } from "react-redux";

const DiceTable = () => {
  const currentCharacter: string = useSelector(
    (state: any) => state.character.currentCharacter,
  );
  const attack = (attackData: simpleAttackInterface) => {
    console.log(`${currentCharacter} atakuje ${attackData.atakujacy}`);
    socket.emit("attack", attackData);
  };
  const ataki = useSelector(
    (state: any) => state.character.currentCharacterAttacks,
  );
  return (
    <div className="attacksWrapper">
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
  );
};
export default DiceTable;
