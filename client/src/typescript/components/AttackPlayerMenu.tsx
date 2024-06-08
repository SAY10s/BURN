import attackInterface from "../../shared/interfaces/attackInterface.ts";
import socket from "../helpers/socket.ts";
import { useSelector } from "react-redux";
import React from "react";

interface Props {
  obronca: string;
}

const AttackPlayerMenu: React.FC<Props> = ({ obronca }) => {
  const currentCharacter: string = useSelector(
    (state: any) => state.character.currentCharacter,
  );
  const attack = (attackData: attackInterface) => {
    console.log(`${currentCharacter} atakuje ${attackData.atakujacy}`);
    socket.emit("attack", attackData);
  };
  const ataki = useSelector(
    (state: any) => state.character.currentCharacterAttacks,
  );
  return (
    <div className="attackPlayerMenuWrapper">
      {currentCharacter &&
        ataki.map((atak: any, index: number) => {
          return (
            <button
              key={index}
              onClick={() => {
                attack({
                  nazwaAtaku: atak.nazwa,
                  atakujacy: currentCharacter,
                  obronca: obronca,
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
export default AttackPlayerMenu;
