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

io.on("connection", (socket) => {
  console.log("Client connected");

  //---------------------------------------------
  socket.on("chooseCharacter", (characterName) => {
    socketToCharacterMap.set(socket.id, characterName);
    console.log(`Character choosen by ${socket.id}: ${characterName}`);
    console.table(socketToCharacterMap);
  });

  socket.on("getMyCharacter", () => {
    socket.emit("myCharacter", socketToCharacterMap.get(socket.id));
  });
  //---------------------------------------------

  // emit messages ONLY TO CONNECTED PLAYER
  socket.emit("init", messages);
  io.emit("initCharacters", Character.wszystkiePostacie);

  socket.on("message", (message) => {
    console.log("Message received:", message);
    messages.push(message);
    io.emit("message", message);
  });
  socket.on("attack", (data: attackInterface) => {
    console.log("--------- Attack received ---------");
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
        nazwaAtaku: data.nazwaAtaku,
        kosztPW: data.kosztPW,
        zaklecie: data.zaklecie,
        mozliweSposobyUniku: data.mozliweSposobyUniku,
        srebrnyAtak: data.srebrnyAtak,
      }),
    );
    io.emit("initCharacters", Character.wszystkiePostacie);
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

httpServer.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
