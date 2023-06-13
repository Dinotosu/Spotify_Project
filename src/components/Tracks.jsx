import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { getPlaylist } from "../api/api";
import { Track } from "react-spotify-api";

export default function Tracks({ tracksList }) {
  console.log("startData", tracksList);

  let [tracksIDs, setTracksIDs] = useState([]);
  let [tracks, setTracks] = useState([]);
  let trks = tracksList;

  /*   const fetchData = async () => {
    try {
      let id = window.location.href.split("/");
      let response = await getPlaylist(id);
      console.log("TracksRes", response);
      return response.data.tracks.items;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      let data = await fetchData();
      setTracks(data);
    };
    getData();
  }, []); */
  const tracksID = async (array) => {
    let arr = [];
    for (let i of trks) {
      arr.push(i.track.id);
    }
    return arr;
  };

  useEffect(() => {
    setTracks(tracksList);
    tracksID();
    setTracksIDs(tracksID(trks));
    console.log("lox", tracksIDs);
    //console.log("tracks", tracks);

    //console.log(tracksID());
    //console.log(playlist.images[0].url);
  }, []);

  setTimeout(() => {
    console.log("loxi");
    console.log("load", tracksIDs);
  }, 1000);

  //setInterval(() => tracksID(), 3000);

  useEffect(() => {
    console.log("load", tracksIDs);
  }, [tracksIDs]);

  return (
    <div>
      Tracks
      {trks.map((item) => (
        <h1>{item.track.name}</h1>
      ))}
    </div>
  );
}
