import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CharacterState {
  currentCharacter: string | null;
}

const initialState: CharacterState = {
  currentCharacter: null,
};

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    chooseCharacter: (state, action: PayloadAction<string>) => {
      state.currentCharacter = action.payload;
      console.log("Wybrano postać:", action.payload);
    },
  },
});

export const { chooseCharacter } = characterSlice.actions;

export default characterSlice.reducer;
