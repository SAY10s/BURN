import { useEffect, useState } from "react";
import socket from "../../helpers/socket.ts";
import NPCCard from "../../components/NPCCard.tsx";
import {
  chooseCharacter,
  setCurrentCharacterAttacks,
} from "../../store/CharacterSlice.ts";
import { useDispatch } from "react-redux";
import Character from "../../../shared/classes/Character.ts";
import CharacterCard from "../../components/CharacterCard.tsx";

const BattleView = ({ isGameMaster }: { isGameMaster: boolean }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const dispatch = useDispatch();

  const bohaterowie = characters.filter((char) => char.jestBohaterem);
  const npc = characters.filter((char) => !char.jestBohaterem);

  useEffect(() => {
    const character = JSON.parse(
      localStorage.getItem("currentCharacter") || "{}",
    );
    if (character) dispatch(chooseCharacter(character));

    socket.emit("reloadPlz");

    const handleInit = (message: string[]) => setMessages(message);
    const handleInitCharacters = (characters: Character[]) =>
      setCharacters(characters);
    const handleMessage = (message: string) =>
      setMessages((prevMessages) => [...prevMessages, message]);
    const handleAttackFeedback = (data: string) => setMessages([data]);
    const handleChoosenCharacterAttacks = (attacks: []) =>
      dispatch(setCurrentCharacterAttacks(attacks));

    socket.on("init", handleInit);
    socket.on("initCharacters", handleInitCharacters);
    socket.on("message", handleMessage);
    socket.on("attackFeedback", handleAttackFeedback);
    socket.on("choosenCharacterAttacks", handleChoosenCharacterAttacks);

    return () => {
      socket.off("init", handleInit);
      socket.off("initCharacters", handleInitCharacters);
      socket.off("message", handleMessage);
      socket.off("attackFeedback", handleAttackFeedback);
      socket.off("choosenCharacterAttacks", handleChoosenCharacterAttacks);
    };
  }, [isGameMaster, dispatch]);

  return (
    <div className="wrapper">
      <div className="logs">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <div className="characters">
        {bohaterowie.map((character, index) => (
          <CharacterCard
            key={index}
            character={character}
            showAttackPlayerMenu={true}
            showChooseCharacterButton={true}
            showChances={true}
          />
        ))}
      </div>
      <div className="npc characters">
        {isGameMaster
          ? npc.map((character, index) => (
              <CharacterCard
                key={index}
                character={character}
                showAttackPlayerMenu={true}
                showChooseCharacterButton={true}
                showChances={true}
              />
            ))
          : npc.map((character, index) => (
              <NPCCard key={index} character={character} />
            ))}
      </div>
    </div>
  );
};

export default BattleView;
