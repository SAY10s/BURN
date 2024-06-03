import { useEffect, useState } from "react";
import socket from "../helpers/socket.js";
import CharacterCard from "../components/CharacterCard.js";
import Character from "../shared/classes/Character.js";
import NPCCard from "../components/NPCCard.js";
import attackFeedbackInterface  from "../shared/interfaces/attackFeedbackInterface.js";

const View = ({ isGameMaster }: { isGameMaster: boolean }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const bohaterowie = characters.filter((char) => char.jestBohaterem);
  const npc = characters.filter((char) => !char.jestBohaterem);
  useEffect(() => {
    socket.on("init", (message) => {
      setMessages(() => [...message]);
    });
    socket.on("initCharacters", (characters) => {
      setCharacters(() => [...characters]);
    });
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    socket.on(
      "attackFeedback",
      (data: attackFeedbackInterface) => {
        let message = ``;
        message += `${data.atakujacy} (${data.atakMieczem} + ${data.atakRoll} = ${data.atakSzansa})
           zaatakował ${data.obronca} (${data.unik} + ${data.obronaRoll} = ${data.obronaSzansa})`;
        if (data.atakSzansa < data.obronaSzansa) {
            message += ` i nie trafił! (${data.atakSzansa} < ${data.obronaSzansa})`;
        }
        else {
          message += ` i trafił (${data.atakSzansa} > ${data.obronaSzansa}) w ${data.lokacjaTrafienia.toLowerCase()}(${data.rollTrafienie})`;
          message += ` i zabrał mu ${data.obrazenia} punktów życia!`;
        }
        setMessages(() => [
          message
        ]);
      },
    );

    return () => {
      socket.off("message");
      socket.off("attackFeedback");
    };
  }, []);
  if (isGameMaster) {
    console.log("jestem GM");
  }

  return (
    <div className="wrapper">
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
