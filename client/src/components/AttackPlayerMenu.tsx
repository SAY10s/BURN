import attackInterface from "../shared/interfaces/attackInterface.ts";
import socket from "../helpers/socket.ts";
import { useSelector } from "react-redux";
import React from "react";

interface Atak {
  nazwa: string;
  kosztPW: number;
  kosztWigor: number;
  ileD6: number;
  zaklecie: boolean;
  mozliweSposobyUniku: string[];
  srebrnyAtak: boolean;
  procentSzansNaPodpalenie: number;
} //FIXME: dodać interface w shared

interface Props {
  ataki: Atak[];
  obronca: string;
}

const AttackPlayerMenu: React.FC<Props> = ({ ataki, obronca }) => {
  const currentCharacter: string = useSelector(
    (state: any) => state.character.currentCharacter,
  );
  const attack = (attackData: attackInterface) => {
    console.log(`${currentCharacter} atakuje ${attackData.atakujacy}`);
    socket.emit("attack", attackData);
  };
  console.log(ataki);
  return (
    <div>
      {ataki.map((atak, index) => {
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
