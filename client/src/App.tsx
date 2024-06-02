import { useEffect, useState } from "react";
import socket from "./helpers/socket.js";
import CharacterCard from "./components/CharacterCard.js";
import Character from "./helpers/Character.js";

const App = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [characters, setCharacters] = useState<Character[]>([]);

  // ---------------------------------------------
  // const chooseCharacter = (characterName: string) => {
  //   // Wysłanie zdarzenia 'chooseCharacter' do serwera z wybranym identyfikatorem postaci
  //   socket.emit("chooseCharacter", characterName);
  // };
  //
  // // Funkcja do pobrania informacji o wybranej postaci
  // const getMyCharacter = () => {
  //   // Wysłanie zdarzenia 'getMyCharacter' do serwera
  //   socket.emit("getMyCharacter");
  // };

  // Nasłuchiwanie na zdarzenie 'myCharacter'
  socket.on("myCharacter", (characterName: string) => {
    // Wyświetlanie informacji o wybranej postaci
    console.log("Moja postać to:", characterName);
  });

  // Przykładowe użycie funkcji chooseCharacter i getMyCharacter
  // chooseCharacter("characterId");
  // getMyCharacter();
  // ---------------------------------------------

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
      "mirekZaatakowałTaco",
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
    socket.on(
      "tacoZaatakowałMirka",
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
      socket.off("tacoZaatakowałMirka");
      socket.off("mirekZaatakowałTaco");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("message", input);
    setInput("");
  };
  const mirekAtakujeTacoMieczem = () => {
    socket.emit("mirekAtakujeTacoMieczem");
  };
  const tacoAtakujeMirkaZakleciem = () => {
    socket.emit("tacoAtakujeMirkaZakleciem");
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
      <div>
        <button
          onClick={() => {
            mirekAtakujeTacoMieczem();
          }}
        >
          Mirek atakuje taco mieczem
        </button>
        <button
          onClick={() => {
            tacoAtakujeMirkaZakleciem();
          }}
        >
          Taci atakuje Mirka zaklęciem
        </button>
      </div>
    </div>
  );
};

export default App;
