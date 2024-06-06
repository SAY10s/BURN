import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import socket from "../helpers/socket.ts";

interface Attack {
  nazwa: string;
  kosztPW: number;
  kosztWigor: number;
  ileD6: number;
  zaklecie: boolean;
  mozliweSposobyUniku: string[];
  srebrnyAtak: boolean;
  procentSzansNaPodpalenie: number;
}

interface CharacterState {
  currentCharacter: string | null;
  currentCharacterAttacks: Attack[] | null;
}

const initialState: CharacterState = {
  currentCharacter: null,
  currentCharacterAttacks: [],
};

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    chooseCharacter: (state, action: PayloadAction<string>) => {
      state.currentCharacter = action.payload;
      localStorage.setItem("currentCharacter", JSON.stringify(action.payload));
      console.log("Wybrano postać:", action.payload);
      socket.emit("chooseCharacter", action.payload);
    },
    setCurrentCharacterAttacks: (state, action: PayloadAction<Attack[]>) => {
      state.currentCharacterAttacks = action.payload;
    },
  },
});

export const { chooseCharacter, setCurrentCharacterAttacks } =
  characterSlice.actions;

export default characterSlice.reducer;
