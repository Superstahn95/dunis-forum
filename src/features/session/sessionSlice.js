import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSessionExpired: false,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSessionExpired: (state, action) => {
      state.isSessionExpired = action.payload;
    },
  },
});

export const { setSessionExpired } = sessionSlice.actions;

export default sessionSlice.reducer;
