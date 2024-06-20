import { createSlice } from "@reduxjs/toolkit";

export const playListSlice = createSlice({
	name: "playlists",
	initialState: {
		playlists: [],
		createPlayListProgress: false,
		getPlayListProgress: false,
		addPodcastProgress: false,
		removePodcastProgress: false,
		deletePlayListProgress: false,
		error: false,
	},
	reducers: {
		createPlayListStart: (state) => {
			state.createPlayListProgress = true;
		},
		createPlayListSuccess: (state, action) => {
			state.playlists.push(action.payload);
			state.createPlayListProgress = false;
		},
		createPlayListFailure: (state) => {
			state.error = true;
			state.createPlayListProgress = false;
		},

		getPlayListStart: (state) => {
			state.getPlayListProgress = true;
		},
		getPlayListSuccess: (state, action) => {
			state.playlists = action.payload;
			state.getPlayListProgress = false;
		},
		getPlayListFailure: (state) => {
			state.error = true;
			state.getPlayListProgress = false;
		},

		addPodcastStart: (state) => {
			state.addPodcastProgress = true;
		},
		addPodcastSuccess: (state, action) => {
			const index = state.playlists.indexOf(action.payload._id);
			state.playlists[index] = action.payload;
			state.addPodcastProgress = false;
		},
		addPodcastFailure: (state) => {
			state.error = true;
			state.addPodcastProgress = false;
		},

		removePodcastStart: (state) => {
			state.removePodcastProgress = true;
		},
		removePodcastSuccess: (state, action) => {
			const index = state.playlists.indexOf(action.payload._id);
			state.playlists[index] = action.payload;
			state.removePodcastProgress = false;
		},
		removePodcastFailure: (state) => {
			state.error = true;
			state.removePodcastProgress = false;
		},

		deletePlayListStart: (state) => {
			state.deletePlayListProgress = true;
		},
		deletePlayListSuccess: (state, action) => {
			state.playlists = state.playlists.filter(
				(playlist) => playlist._id !== action.payload
			);
			state.deletePlayListProgress = false;
		},
		deletePlayListFailure: (state) => {
			state.error = true;
			state.deletePlayListProgress = false;
		},
	},
});

export const {
	createPlayListStart,
	createPlayListSuccess,
	createPlayListFailure,
	getPlayListStart,
	getPlayListSuccess,
	getPlayListFailure,
	addPodcastStart,
	addPodcastSuccess,
	addPodcastFailure,
	removePodcastStart,
	removePodcastSuccess,
	removePodcastFailure,
	deletePlayListStart,
	deletePlayListSuccess,
	deletePlayListFailure,
} = playListSlice.actions;

export default playListSlice.reducer;
