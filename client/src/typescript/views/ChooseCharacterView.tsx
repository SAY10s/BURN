import { useEffect, useState } from "react";
import Character from "../../shared/classes/Character.ts";
import { useDispatch } from "react-redux";
import {
  chooseCharacter,
  setCurrentCharacterAttacks,
} from "../store/CharacterSlice.ts";
import socket from "../helpers/socket.ts";
import ChoiceCard from "../components/ChoiceCard.tsx";

const ChooseCharacterView = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const dispatch = useDispatch();

  const bohaterowie = characters.filter((char) => char.jestBohaterem);
  useEffect(() => {
    const character = JSON.parse(
      localStorage.getItem("currentCharacter") || "{}",
    );
    if (character) dispatch(chooseCharacter(character));

    socket.emit("reloadPlz");

    const handleInitCharacters = (characters: Character[]) =>
      setCharacters(characters);

    const handleChoosenCharacterAttacks = (attacks: []) =>
      dispatch(setCurrentCharacterAttacks(attacks));

    socket.on("initCharacters", handleInitCharacters);
    socket.on("choosenCharacterAttacks", handleChoosenCharacterAttacks);

    return () => {
      socket.off("initCharacters", handleInitCharacters);
      socket.off("choosenCharacterAttacks", handleChoosenCharacterAttacks);
    };
  }, [dispatch]);
  return (
    <div className="diceTableViewWrapper">
      <div className="characters">
        {bohaterowie.map((character, index) => (
          <ChoiceCard
            key={index}
            character={character}
            showAttackPlayerMenu={true}
            showChooseCharacterButton={true}
            showChances={false}
          />
        ))}
      </div>
    </div>
  );
};

export default ChooseCharacterView;
