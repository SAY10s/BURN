import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import Character from "./shared/classes/Character";
import atak from "./Ataki";
import DiceManager from "./DiceManager";

//db
import { AppDataSource, getAllCharacters } from "./db/data-source";
import { Character as CharacterDB } from "./db/entity/Character";
import { mozliweLokacjeTrafieniaNieodmienionePrzezPrzypadki } from "./consts";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"],
  },
});

//------------------ DataBase ------------------

AppDataSource.initialize()
  .then(async () => {
    let characters = await getAllCharacters();
    console.table(characters);

    console.table(Character.wszystkiePostacie);

    //@ts-ignore TODO: fix this (i mean, it works ig?)
    Character.wszystkiePostacie = characters;
    console.table(Character.wszystkiePostacie);

    const socketToCharacterMap = new Map();
    const messages = ["Hello there!", "General kenobi!"];
    const diceTableLogs = [];

    initializeServer();

    function initializeServer() {
      io.on("connection", handleConnection);
      httpServer.listen(3000, () => {
        console.log("Server is listening on port 3000");
      });
    }

    function handleConnection(socket: Socket) {
      console.log("Client connected");
      handleEditCharacter(socket);
      handleAddCharacter(socket);
      handleDiceTable(socket);
      handleCharacter(socket);
      handleMessages(socket);
      handleAttack(socket);
      handleDisconnect(socket);
    }

    //chooseCharacter and getMyCharacter
    function handleCharacter(socket: Socket) {
      socket.on("chooseCharacter", (characterName) => {
        socketToCharacterMap.set(socket.id, characterName);
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

      socket.on("reloadPlz", () => {
        socket.emit("init", messages);
        socket.emit("initCharacters", Character.wszystkiePostacie);
      });

      socket.emit("init", messages);
      io.emit("initCharacters", Character.wszystkiePostacie);
    }

    //editCharacter and getCharacterToEdit
    function handleEditCharacter(socket: Socket) {
      socket.on("getCharacterToEdit", (characterName: string) => {
        const character = Character.wszystkiePostacie.find(
          (postac) => postac.imie === characterName,
        );
        socket.emit("getCharacterToEditFeedback", character);
      });

      socket.on("editCharacter", async (data: Character) => {
        const character = Character.wszystkiePostacie.find(
          (postac) => postac.imie === data.imie,
        );

        if (!character) {
          console.log(`Character ${data.imie} not found.`);
          return;
        }

        Object.assign(character, data);

        socket.emit("editCharacterFeedback", character);
        io.emit("initCharacters", Character.wszystkiePostacie);
      });
    }

    function handleAddCharacter(socket: Socket) {
      socket.on("addCharacter", async (data: Character) => {
        let characters = await AppDataSource.manager.find(CharacterDB);
        console.table(characters);

        const character = new CharacterDB();
        Object.assign(character, data);

        await AppDataSource.manager.save(character);

        socket.emit("addCharacterFeedback", character);
        io.emit("initCharacters", Character.wszystkiePostacie);
      });
    }

    function handleDiceTable(socket: Socket) {
      socket.on("simpleAttack", (attackData) => {
        if (!attackData) {
          socket.emit("diceTableFeedback", diceTableLogs);
          return;
        }

        const postac = Character.wszystkiePostacie.find(
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
          bodyPart:
            mozliweLokacjeTrafieniaNieodmienionePrzezPrzypadki[
              Math.floor(Math.random() * 10)
            ],
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
        console.table(Character.wszystkiePostacie);

        const postac = Character.wszystkiePostacie.find(
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
    }

    function handleMessages(socket: Socket) {
      socket.on("message", (message) => {
        console.log("Message received:", message);
        messages.push(message);
        io.emit("message", message);
      });
    }

    function handleAttack(socket: Socket) {
      socket.on("attack", (data) => {
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
    }

    function handleDisconnect(socket: Socket) {
      socket.on("disconnect", () => {
        socketToCharacterMap.delete(socket.id);
        console.log("A user disconnected");
      });
    }
  })
  .catch((error) => console.log(error));
