import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import Character from "./shared/classes/Character.js";
import atakMieczem from "./Ataki.js";

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
  socket.on("attack", (data: { attacker: string; defender: string }) => {
    console.log("--------- Attack received ---------");
    const atakujacyIndex = Character.wszystkiePostacie.findIndex(
      (postac) => postac.imie === data.attacker,
    );
    const obroncaIndex = Character.wszystkiePostacie.findIndex(
      (postac) => postac.imie === data.defender,
    );

    io.emit(
      "attackFeedback",
      atakMieczem(
        Character.wszystkiePostacie[atakujacyIndex],
        Character.wszystkiePostacie[obroncaIndex],
        4,
      ),
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
