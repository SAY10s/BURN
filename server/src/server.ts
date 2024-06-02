import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import DiceManager from "./DiceManager.js";
import Character from "./Character.js";
import { mozliweLokacjeTrafienia } from "./consts.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"],
  },
});

const socketToCharacterMap = new Map();

const messages = ["Hello there!", "General kenobi!"];

io.on("connection", (socket) => {
  console.log("Client connected");

  //---------------------------------------------
  socket.on("chooseCharacter", (characterName) => {
    socketToCharacterMap.set(socket.id, characterName);
  });

  socket.on("getMyCharacter", () => {
    socket.emit("myCharacter", socketToCharacterMap.get(socket.id));
  });
  //---------------------------------------------

  // emit messages ONLY TO CONNECTED PLAYER
  socket.emit("init", messages);
  socket.emit("initCharacters", Character.wszystkiePostacie);

  socket.on("message", (message) => {
    console.log("Message received:", message);
    messages.push(message);
    io.emit("message", message);
  });
  socket.on("mirekAtakujeTacoMieczem", () => {
    io.emit(
      "mirekZaatakowałTaco",
      atakMieczem(
        Character.wszystkiePostacie[1],
        Character.wszystkiePostacie[0],
        4,
      ),
    );
    socket.emit("initCharacters", Character.wszystkiePostacie);
  });
  socket.on("tacoAtakujeMirkaZakleciem", () => {
    io.emit(
      "tacoZaatakowałMirka",
      atakZakleciem(
        Character.wszystkiePostacie[0],
        Character.wszystkiePostacie[1],
        4,
      ),
    );
    socket.emit("initCharacters", Character.wszystkiePostacie);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

httpServer.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

const atakMieczem = (atakujacy: Character, obronca: Character, ileD6 = 1) => {
  console.log(`${atakujacy.imie} atakuje mieczem ${obronca.imie}`);
  let atakRoll = DiceManager.rollD10();
  let atakSzansa = atakujacy.szanse.atakMieczem + atakRoll;
  let obrazenia = 0;

  console.log(
    `Wynik ataku ${atakujacy.imie}: ${atakSzansa} (${atakujacy.szanse.atakMieczem} + ${atakRoll})`,
  );

  let obronaRoll = DiceManager.rollD10();
  let obronaSzansa = obronca.szanse.unik + obronaRoll;

  console.log(
    `Wynik obrony ${obronca.imie}: ${obronaSzansa} (${obronca.szanse.unik} + ${obronaRoll})`,
  );

  if (atakSzansa > obronaSzansa) {
    console.log("Atak trafił!");
    const lokacjaTrafienia = DiceManager.rollD10(false);
    console.log(
      `Lokacja trafienia: ${mozliweLokacjeTrafienia[lokacjaTrafienia - 1]}(${lokacjaTrafienia})`,
    );
    obrazenia = 0;
    for (let i = 0; i < ileD6; i++) {
      obrazenia += DiceManager.rollD6();
    }
    console.log(`Obrażenia: ${obrazenia}`);
    obronca.pz -= obrazenia;
  } else {
    console.log("Atak nie trafił");
  }
  return {
    atakujacy: atakujacy.imie,
    atakRoll,
    atakMieczem: atakujacy.szanse.atakMieczem,
    atakSzansa,
    obronca: obronca.imie,
    unik: obronca.szanse.unik,
    obronaSzansa,
    obronaRoll,
    obrazenia,
  };
};
const atakZakleciem = (atakujacy: Character, obronca: Character, ileD6 = 1) => {
  console.log(`${atakujacy.imie} atakuje zaklęciem ${obronca.imie}`);
  let atakRoll = DiceManager.rollD10();
  let atakSzansa = atakujacy.szanse.atakZakleciem + atakRoll;
  let obrazenia = 0;

  console.log(
    `Wynik ataku ${atakujacy.imie}: ${atakSzansa} (${atakujacy.szanse.atakZakleciem} + ${atakRoll})`,
  );

  let obronaRoll = DiceManager.rollD10();
  let obronaSzansa = obronca.szanse.unik + obronaRoll;

  console.log(
    `Wynik obrony ${obronca.imie}: ${obronaSzansa} (${obronca.szanse.unik} + ${obronaRoll})`,
  );

  if (atakSzansa > obronaSzansa) {
    console.log("Atak trafił!");
    const lokacjaTrafienia = DiceManager.rollD10(false);
    console.log(
      `Lokacja trafienia: ${mozliweLokacjeTrafienia[lokacjaTrafienia - 1]}(${lokacjaTrafienia})`,
    );
    obrazenia = 0;
    for (let i = 0; i < ileD6; i++) {
      obrazenia += DiceManager.rollD6();
    }
    console.log(`Obrażenia: ${obrazenia}`);
    obronca.pz -= obrazenia;
  } else {
    console.log("Atak nie trafił");
  }
  return {
    atakujacy: atakujacy.imie,
    atakRoll,
    atakMieczem: atakujacy.szanse.atakMieczem,
    atakSzansa,
    obronca: obronca.imie,
    unik: obronca.szanse.unik,
    obronaSzansa,
    obronaRoll,
    obrazenia,
  };
};
