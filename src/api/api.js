import axios from "axios";

const clientID = "eb4e8986eaf34b038da358419e0a81f1";
const redirectURI = "http://localhost:3000/";
const spotifyURL = "https://accounts.spotify.com/authorize";
const client_secret = "9e06cb4b1b5745f2a7164d59ed3f2093";

export const generateSpotifyURL = () => {
  const scopes = [
    "user-read-email",
    "user-read-private",
    "user-library-modify",
    "user-library-read",
    "user-read-playback-position",
    "user-top-read",
    "user-read-recently-played",
    "user-follow-modify",
    "user-follow-read",
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-private",
    "playlist-modify-public",
    "app-remote-control",
    "streaming",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "ugc-image-upload",
  ];
  return `${spotifyURL}?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scopes.join(
    " ",
  )}&response_type=token&show_dialog=true`;
};

export const getAuthToken = () => {
  if (window.location.hash.includes("access_token")) {
    const token = window.location.hash.split("=")[1].split("&")[0];
    localStorage.setItem("access_token", token);
    console.log(token);
  } else {
    console.log("Вы зареганы, используй приложение");
  }
};

export const refreshToken = async () => {
  const refresh_token = localStorage.getItem("refresh_token");
  const client_id = "CLIENT_ID";
  const url = "https://accounts.spotify.com/api/token";

  const response = await axios.post(
    url,
    `grant_type=refresh_token&refresh_token=${refresh_token}`,
    {
      headers: {
        Authorization: `Basic ${btoa(`${clientID}:${client_secret}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  const { access_token, refresh_token: new_refresh_token } = response.data;

  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", new_refresh_token);

  return access_token;
};

const myLocalAxios = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

/* myLocalAxios.interceptors.request.use(async (config) => {
  let access_token = localStorage.getItem("access_token");

  if (!access_token) {
    access_token = await refreshToken();
  }

  config.headers.Authorization = `Bearer ${access_token}`;

  return config;
}); */

export const getPlaylist = async (id) => {
  const data = axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  return data;
};

/* export const getTracks = async (id) => {
  const data = axios.get(
    `https://api.spotify.com/v1/playlists/${id}` /* https://api.spotify.com/v1/tracks/{id} ,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    },
  );
  return data;
}; */
