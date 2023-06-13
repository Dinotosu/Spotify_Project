import axios from "../api";

export const playlistService = {
  list: async () => {
    const { data } = (await axios) < ListResponse > "me/playlists?limit=50";
    return data;
  },
};
