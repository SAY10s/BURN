import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import Character from "./shared/classes/Character.js";
import atak from "./Ataki.js";
import attackInterface from "./shared/interfaces/attackInterface.js";

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

const diceTableLogs = [
  {
    type: "simpleAttack",
    name: "Geralt",
    attackName: "srebrny miecz",
    attackBasicChance: "15",
    attackRoll: "5",
    diceDMG: "16",
    basicAdditionalDmg: "2",
    isBleeding: false,
    isSetOnFire: false,
  },
  {
    type: "statRoll",
    name: "Geralt",
    rollName: "unik",
    rollBasicChance: "20",
    rollRoll: "17",
  },
  {
    type: "simpleRoll",
    name: "Geralt",
    roll: "17",
  },
  {
    type: "simpleAttack",
    name: "Strzyga",
    attackName: "Pazury",
    attackBasicChance: "20",
    attackRoll: "17",
    diceDMG: "32",
    basicAdditionalDmg: "0",
    isBleeding: true,
    isSetOnFire: false,
  },
];

io.on("connection", (socket) => {
  console.log("Client connected");

  // -----------------DiceTable------------------
  socket.on("simpleAttack", (attackData) => {
    socket.emit("simpleAttackFeedback", diceTableLogs);
  });
  //---------------------------------------------

  //---------------------------------------------
  socket.on("chooseCharacter", (characterName) => {
    socketToCharacterMap.set(socket.id, characterName);
    // console.log(`Character choosen by ${socket.id}: ${characterName}`);
    // console.table(socketToCharacterMap);
    socket.emit(
      "choosenCharacterAttacks",
      Character.wszystkiePostacie.find(
        (postac) => postac.imie === characterName,
      ).ataki,
    );
  });

  socket.on("getMyCharacter", () => {
    socket.emit("myCharacter", socketToCharacterMap.get(socket.id));
  });
  //---------------------------------------------

  socket.on("reloadPlz", () => {
    socket.emit("init", messages);
    socket.emit("initCharacters", Character.wszystkiePostacie);
  });

  // emit messages TO ALL CONNECTED PLAYER
  socket.emit("init", messages);
  io.emit("initCharacters", Character.wszystkiePostacie);

  socket.on("message", (message) => {
    console.log("Message received:", message);
    messages.push(message);
    io.emit("message", message);
  });
  socket.on("attack", (data: attackInterface) => {
    console.log("--------- Attack received ---------");
    console.table(data);
    const atakujacyIndex = Character.wszystkiePostacie.findIndex(
      (postac) => postac.imie === data.atakujacy,
    );
    const obroncaIndex = Character.wszystkiePostacie.findIndex(
      (postac) => postac.imie === data.obronca,
    );

    io.emit(
      "attackFeedback",
      atak({
        atakujacy: Character.wszystkiePostacie[atakujacyIndex],
        obronca: Character.wszystkiePostacie[obroncaIndex],
        ileD6: data.ileD6,
        dodatkowyDMG: data.dodatkowyDMG,
        nazwaAtaku: data.nazwaAtaku,
        kosztPW: data.kosztPW,
        zaklecie: data.zaklecie,
        mozliweSposobyUniku: data.mozliweSposobyUniku,
        srebrnyAtak: data.srebrnyAtak,
        procentSzansNaPodpalenie: data.procentSzansNaPodpalenie,
        procentSzansNaKrwawienie: data.procentSzansNaKrwawienie,
      }),
    );
    io.emit("initCharacters", Character.wszystkiePostacie);
  });
  socket.on("disconnect", () => {
    socketToCharacterMap.delete(socket.id);
    console.log("A user disconnected");
  });
});

httpServer.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
