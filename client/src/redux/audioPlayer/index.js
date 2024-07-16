import { createSlice } from "@reduxjs/toolkit";

export const audioPlayer = createSlice({
	name: "audioPlayer",
	initialState: {
		currentPodcast: null,
	},
	reducers: {
		setCurrentPodcast: (state, action) => {
			state.currentPodcast = action.payload;
		},
	},
});

export const { setCurrentPodcast } = audioPlayer.actions;

export default audioPlayer.reducer;
