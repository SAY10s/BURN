import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import DiceManager from "./DiceManager.js";
import Character from "./Character.js";

//for loop 10 times
for (let i = 0; i < 50; i++) {
  console.log(DiceManager.rollD20());
}

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"],
  },
});

const messages = ["Hello there!", "General kenobi!"];
const characters = [new Character("Taco"), new Character("Mirek")];

io.on("connection", (socket) => {
  console.log("Client connected");

  // emit messages ONLY TO CONNECTED PLAYER
  socket.emit("init", messages);
  // emit messages ONLY TO CONNECTED PLAYER
  socket.emit("initCharacters", characters);

  socket.on("message", (message) => {
    console.log("Message received:", message);
    messages.push(message);
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

httpServer.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
