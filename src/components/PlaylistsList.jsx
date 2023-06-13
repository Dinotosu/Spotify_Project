import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";
import { Playlist } from "react-spotify-api";
import { Link } from "react-router-dom";

export default function PlaylistsList() {
  let [playlists, setPlaylists] = useState([]);

  const getPlaylistTrack = async () => {
    try {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/me/playlists`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );

      setPlaylists((playlists = data.items));
      console.log(playlists);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlaylistTrack();
  }, []);

  return (
    <div className="flex gap-2 flex-col m-5">
      {playlists.map((item) => (
        <li key={item.id} className="list-none w-full justufy-center text-left">
          <Link to={`playlists/${item.id}`}>{item.name}</Link>
        </li>
      ))}
    </div>
  );
}
