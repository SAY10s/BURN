import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import Character from "./shared/classes/Character.js";
import atak from "./Ataki.js";
import attackInterface from "./shared/interfaces/attackInterface.js";
import DiceManager from "./DiceManager.js";

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

const diceTableLogs: any[] = [
  {
    type: "simpleAttack",
    name: "Geralt",
    attackName: "srebrny miecz",
    attackBasicChance: 15,
    attackRoll: 5,
    diceDMG: 16,
    basicAdditionalDmg: 2,
    isBleeding: true,
    isSetOnFire: false,
  },
  {
    type: "statRoll",
    name: "Geralt",
    rollName: "unik",
    rollBasicChance: 20,
    rollRoll: 17,
  },
  {
    type: "simpleRoll",
    name: "Geralt",
    roll: 9,
  },
  {
    type: "simpleAttack",
    name: "Strzyga",
    attackName: "Pazury",
    attackBasicChance: 20,
    attackRoll: 17,
    diceDMG: 32,
    basicAdditionalDmg: 0,
    isBleeding: true,
    isSetOnFire: true,
  },
];

io.on("connection", (socket) => {
  console.log("Client connected");

  // ------------- editCharacter ----------------
  socket.on("getCharacterToEdit", (characterName) => {
    const character = Character.wszystkiePostacie.find(
      (postac) => postac.imie === characterName,
    );
    socket.emit("getCharacterToEditFeedback", character);
  });
  // --------------------------------------------

  // -----------------DiceTable------------------
  socket.on("simpleAttack", (attackData: attackInterface) => {
    if (!attackData) {
      socket.emit("diceTableFeedback", diceTableLogs);
      return;
    }
    let postac = Character.wszystkiePostacie.find(
      (postac) => postac.imie === attackData.atakujacy,
    );
    let diceDMG = 0;
    for (let i = 0; i < attackData.ileD6; i++) {
      diceDMG += DiceManager.rollD6();
    }

    diceTableLogs.push({
      type: "simpleAttack",
      name: attackData.atakujacy,
      attackName: attackData.nazwaAtaku,
      attackBasicChance: postac.szanse[attackData.nazwaStatystyki],
      attackRoll: DiceManager.rollD10(),
      diceDMG: diceDMG,
      basicAdditionalDmg: attackData.dodatkowyDMG,
      isSetOnFire:
        attackData.procentSzansNaPodpalenie >= DiceManager.rollD100(false),
      isBleeding:
        attackData.procentSzansNaKrwawienie >= DiceManager.rollD100(false),
    });
    if (diceTableLogs.length > 5) diceTableLogs.shift();

    io.emit("diceTableFeedback", diceTableLogs);
  });

  socket.on("unik", (data) => {
    let postac = Character.wszystkiePostacie.find(
      (postac) => postac.imie === data.currentCharacter,
    );
    diceTableLogs.push({
      type: "statRoll",
      name: data.currentCharacter,
      rollName: "Unik",
      rollBasicChance: postac.szanse.unik,
      rollRoll: DiceManager.rollD10(),
    });
    if (diceTableLogs.length > 5) diceTableLogs.shift();

    io.emit("diceTableFeedback", diceTableLogs);
  });
  socket.on("d6", (data) => {
    diceTableLogs.push({
      type: "simpleRoll",
      name: data.currentCharacter,
      roll: DiceManager.rollD6(),
    });
    if (diceTableLogs.length > 5) diceTableLogs.shift();
    io.emit("diceTableFeedback", diceTableLogs);
  });
  socket.on("d10", (data) => {
    diceTableLogs.push({
      type: "simpleRoll",
      name: data.currentCharacter,
      roll: DiceManager.rollD10(),
    });
    if (diceTableLogs.length > 5) diceTableLogs.shift();
    io.emit("diceTableFeedback", diceTableLogs);
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
        nazwaStatystyki: data.nazwaStatystyki,
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
