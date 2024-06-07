import { useEffect, useState } from "react";
import socket from "../helpers/socket.js";
import CharacterCard from "../components/CharacterCard.js";
import Character from "../shared/classes/Character.js";
import NPCCard from "../components/NPCCard.js";
import {
  chooseCharacter,
  setCurrentCharacterAttacks,
} from "../store/CharacterSlice.ts";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DiceTable from "../components/DiceTable.tsx";

const View = ({ isGameMaster }: { isGameMaster: boolean }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);

  const bohaterowie = characters.filter((char) => char.jestBohaterem);
  const dispatch = useDispatch();

  const npc = characters.filter((char) => !char.jestBohaterem);
  useEffect(() => {
    let character = localStorage.getItem("currentCharacter");
    // console.log(character);
    if (character) character = JSON.parse(character);
    if (character) dispatch(chooseCharacter(character));

    socket.emit("reloadPlz");
    socket.on("init", (message) => {
      setMessages(() => [...message]);
      // console.log("init (messages)");
    });
    socket.on("initCharacters", (characters) => {
      setCharacters(() => [...characters]);
      // console.log("initCharacters");
    });
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      // console.log("message");
    });
    socket.on("attackFeedback", (data: string) => {
      setMessages(() => [data]);
      // console.log("attackFeedback");
    });
    socket.on("choosenCharacterAttacks", (attacks: []) => {
      dispatch(setCurrentCharacterAttacks(attacks));
      // console.table(attacks);
      // console.log("choosenCharacterAttacks");
    });

    return () => {
      socket.off("init");
      socket.off("initCharacters");
      socket.off("message");
      socket.off("attackFeedback");
      socket.off("choosenCharacterAttacks");
    };
  }, [isGameMaster]);

  return (
    <div className="wrapper">
      <DiceTable />
      <div>
        <h1>Links</h1>
        <Link to={"/gm"}>GM</Link>
        <br />
        <Link to={"/"}>player</Link>
      </div>
      <div className="logs">
        <div>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
      </div>
      <div className="characters">
        {bohaterowie.map((character: any, index: number) => (
          <CharacterCard key={index} character={character} />
        ))}
      </div>
      <div className="npc characters">
        {isGameMaster
          ? npc.map((character: any, index: number) => (
              <CharacterCard key={index} character={character} />
            ))
          : npc.map((character: any, index: number) => (
              <NPCCard key={index} character={character} />
            ))}
      </div>
    </div>
  );
};

export default View;
