import { useEffect, useState } from "react";
import socket from "./helpers/socket.js";
import CharacterCard from "./components/CharacterCard.js";
import Character from "./shared/classes/Character.js";

const App = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [characters, setCharacters] = useState<Character[]>([]);

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
      (data: {
        atakujacy: string;
        atakRoll: number;
        atakMieczem: number;
        atakSzansa: number;
        obronca: string;
        unik: number;
        obronaSzansa: number;
        obronaRoll: number;
        obrazenia: number;
      }) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          `${data.atakujacy} zaatakował ${data.obronca} i zabrał mu ${data.obrazenia} punktów życia!`,
        ]);
      },
    );

    return () => {
      socket.off("message");
      socket.off("attackFeedback");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("message", input);
    setInput("");
  };

  return (
    <div className="wrapper">
      <div className="logs">
        <div>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div className="characters">
        {characters.map((character: any, index: number) => (
          <CharacterCard key={index} character={character} />
        ))}
      </div>
    </div>
  );
};

export default App;
