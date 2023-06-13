import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { playlistService } from "../../service/playlist";
import { AxiosError } from "axios";

/* interface PlaylistState {
  allPlaylists: Array<PlayList>,
  tracks: Array<{track: {uri: string}}>
} */

const initialState = {
  allPlaylists: [],
  tracks: [],
};

export const fetchPlaylists = createAsyncThunk(
  "playlist/fetchPlaylists",
  async (_, { rejectWithValue }) => {
    try {
      const result = await playlistService.list();
      return result;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    saveCurrentTracks: (state, action) => {
      state.tracks = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchPlaylists.fulfilled, (state, action) => {
        state.allPlaylists = action.payload.items;
      })
      .addCase(fetchPlaylists.rejected, (state, action) => {
        window.location.href = "http://localhost:3000/login";
      }),
});

export default playlistSlice.reducer;
export const { saveCurrentTracks } = playlistSlice.actions;
