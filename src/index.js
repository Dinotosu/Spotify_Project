import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { SpotifyApiContext, SpotifyApiAxiosContext } from "react-spotify-api";
import { myLocalAxios } from "./api/api";

const token = localStorage.getItem("access_token");

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  //<SpotifyApiAxiosContext.Provider value={myLocalAxios}>
  <SpotifyApiContext.Provider value={token}>
    <App />
  </SpotifyApiContext.Provider>,
  //</SpotifyApiAxiosContext.Provider>,
);
