import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import DiceManager from "./DiceManager.js";
import Character from "./Character.js";

const mozliweLokacjeTrafienia = [
  "głowa",
  "korpus",
  "korpus",
  "korpus",
  "Ramię prawe",
  "Ramię lewe",
  "Noga prawa",
  "Noga prawa",
  "Noga lewa",
  "Noga lewa",
];

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"],
  },
});

const messages = ["Hello there!", "General kenobi!"];
Character.wszystkiePostacie = [
  new Character(
    "Książe Taco",
    50,
    50,
    50,
    50,
    5,
    {
      glowa: {
        wyparowanie: 12,
        wyparowanieMax: 14,
      },
      korpus: {
        wyparowanie: 5,
        wyparowanieMax: 8,
      },
      lewaReka: {
        wyparowanie: 6,
        wyparowanieMax: 8,
      },
      prawaReka: {
        wyparowanie: 6,
        wyparowanieMax: 8,
      },
      lewaNoga: {
        wyparowanie: 14,
        wyparowanieMax: 16,
      },
      prawaNoga: {
        wyparowanie: 14,
        wyparowanieMax: 16,
      },
    },
    {
      unik: 16,
      zejscieZLini: 1,
      atakMieczem: 10,
      atakPiescia: 16,
      atakDrzewcowa: 11,
      atakBitewna: 10,
      atakKrotka: 10,
      atakZakleciem: 16,
      strzalZLuku: 1,
      strzalZKuszy: 1,
    },
  ),
  new Character(
    "Mirek",
    30,
    30,
    30,
    30,
    1,
    {
      glowa: {
        wyparowanie: 5,
        wyparowanieMax: 5,
      },
      korpus: {
        wyparowanie: 5,
        wyparowanieMax: 5,
      },
      lewaReka: {
        wyparowanie: 5,
        wyparowanieMax: 5,
      },
      prawaReka: {
        wyparowanie: 5,
        wyparowanieMax: 5,
      },
      lewaNoga: {
        wyparowanie: 5,
        wyparowanieMax: 5,
      },
      prawaNoga: {
        wyparowanie: 5,
        wyparowanieMax: 5,
      },
    },
    {
      unik: 13,
      zejscieZLini: 1,
      atakMieczem: 55,
      atakPiescia: 16,
      atakDrzewcowa: 11,
      atakBitewna: 10,
      atakKrotka: 10,
      atakZakleciem: 16,
      strzalZLuku: 1,
      strzalZKuszy: 1,
    },
  ),
  new Character("Rizzo"),
];

io.on("connection", (socket) => {
  console.log("Client connected");

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
