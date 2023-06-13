import { useEffect, useState } from "react";
import { getPlaylist } from "../api/api";
import TheSidebar from "../components/TheSidebar";
import TheHeader from "../components/TheHeader";
import TheSidebarOverlay from "../components/TheSidebarOverlay";
import Playlist from "../components/Playlist";
import { useRef } from "react";
import PlaylistCover from "../components/PlaylistCover";
import Tracks from "../components/Tracks";
import SpotifyPlayer from "react-spotify-web-playback";
import Track from "../components/Track";
import trackProps from "../helpers/trackProps";

export default function PlaylistPage() {
  let [playlist, setPlaylist] = useState({});
  let [tracks, setTracks] = useState([]);
  let [tracksIDs, setTracksIDs] = useState([]);
  const contentWrapperRef = useRef();
  const popoverRef = useRef();
  const toastRef = useRef();

  const [selectedTracks, setSelectedTracks] = useState([]);

  const handleTrackClick = (uri) => {
    setSelectedTracks([...selectedTracks, uri]);
  };

  let id = window.location.href.split("/");

  function showPopover(name, description, target, offset) {
    popoverRef.current.show(name, description, target, offset);
  }

  const fetchData = async () => {
    try {
      let response = await getPlaylist(id[id.length - 1]);
      //console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const tracksID = async () => {
    return await playlist.tracks.items.reduce((acc, item) => {
      console.log("item", item);
      acc.push(item.track.id);
      return acc;
    }, []);
  };

  useEffect(() => {
    const getData = async () => {
      let data = await fetchData();
      let DATA = {
        ...data,
        handleTrackClick: handleTrackClick,
      };
      setPlaylist(DATA);
      setTracks(data.tracks.items);
    };
    getData(selectedTracks);
    //tracksID();
    setTracksIDs(setTracksIDs());
  }, []);

  useEffect(() => {
    console.log("playlist", playlist);
    console.log("tracks", tracks);
    console.log("tracksIDs", tracksIDs);
    //console.log(playlist.images[0].url);
  }, []);

  //console.log("tracks", playlist.tracks);

  //overflow-auto

  return (
    <div className="flex h-full w-full gap-5 relative">
      <div className="flex w-full flex-row">
        <TheSidebar showPopover={showPopover} />
        <TheSidebarOverlay />
        <div className="overflow-auto flex-1 w-full h-full justify-center items-center">
          <TheHeader className="w-full" />
          <Playlist className="" {...playlist} />
          <div className="flex gap-5 flex-col ">
            {tracks.map((track, index) => (
              <Track
                handleTrackClick={handleTrackClick}
                key={index}
                {...track.track}
              />
            ))}
          </div>
          {/* <Tracks tracksList={tracks} /> */}
          <div className="mt-auto sticky bottom-0 left-0">
            <SpotifyPlayer
              styles={{
                activeColor: "#fff",
                bgColor: "#333",
                color: "#fff",
                loaderColor: "#fff",
                sliderColor: "#1cb954",
                trackArtistColor: "#ccc",
                trackNameColor: "#fff",
              }}
              token={localStorage.getItem("access_token")}
              uris={[...selectedTracks, `${playlist.uri}`]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
