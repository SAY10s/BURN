import DiceTable from "../components/DiceTable.tsx";
import { useEffect, useState } from "react";
import Character from "../shared/classes/Character.ts";
import { useDispatch } from "react-redux";
import {
  chooseCharacter,
  setCurrentCharacterAttacks,
} from "../store/CharacterSlice.ts";
import socket from "../helpers/socket.ts";
import CharacterCardDiceTable from "../components/CharacterCardDiceTable.tsx";

const DiceTableView = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const bohaterowie = characters.filter((char) => char.jestBohaterem);

  const dispatch = useDispatch();

  useEffect(() => {
    let character = localStorage.getItem("currentCharacter");
    // console.log(character);
    if (character) character = JSON.parse(character);
    if (character) dispatch(chooseCharacter(character));

    socket.emit("reloadPlz");
    socket.on("initCharacters", (characters) => {
      setCharacters(() => [...characters]);
    });

    socket.on("choosenCharacterAttacks", (attacks: []) => {
      dispatch(setCurrentCharacterAttacks(attacks));
    });

    return () => {
      socket.off("init");
      socket.off("initCharacters");
      socket.off("message");
      socket.off("attackFeedback");
      socket.off("choosenCharacterAttacks");
    };
  }, []);
  return (
    <div className="diceTableViewWrapper">
      <div className="characters">
        {bohaterowie.map((character: any, index: number) => (
          <CharacterCardDiceTable key={index} character={character} />
        ))}
      </div>
      <DiceTable />
    </div>
  );
};

export default DiceTableView;