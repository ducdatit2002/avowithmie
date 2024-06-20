import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		user: null,
		getUserProgress: false,
		updateUserProgress: false,
		likePodcastProgress: false,
		error: false,
	},
	reducers: {
		getUserStart: (state) => {
			state.getUserProgress = true;
		},
		getUserSuccess: (state, action) => {
			state.user = action.payload;
			state.getUserProgress = false;
		},
		getUserFailure: (state) => {
			state.getUserProgress = false;
			state.error = true;
		},

		updateUserStart: (state) => {
			state.updateUserProgress = true;
		},
		updateUserSuccess: (state, action) => {
			state.user = action.payload;
			state.updateUserProgress = false;
		},
		updateUserFailure: (state) => {
			state.updateUserProgress = false;
			state.error = true;
		},

		likePodcastStart: (state) => {
			state.likePodcastProgress = true;
		},
		likePodcastSuccess: (state, action) => {
			const index = state.user.likedPodcasts.indexOf(action.payload);
			index === -1
				? state.user.likedPodcasts.push(action.payload)
				: state.user.likedPodcasts.splice(index, 1);
			state.likePodcastProgress = false;
		},
		likePodcastFailure: (state) => {
			state.likePodcastProgress = false;
			state.error = true;
		},
	},
});

export const {
	getUserStart,
	getUserSuccess,
	getUserFailure,
	updateUserStart,
	updateUserSuccess,
	updateUserFailure,
	likePodcastStart,
	likePodcastSuccess,
	likePodcastFailure,
} = userSlice.actions;

export default userSlice.reducer;
