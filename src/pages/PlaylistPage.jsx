import { useEffect, useState } from "react";
import { getPlaylist, getCategories } from "../api/api";
import TheSidebar from "../components/TheSidebar";
import TheHeader from "../components/TheHeader";
import TheSidebarOverlay from "../components/TheSidebarOverlay";
import Playlist from "../components/Playlist";
import { useRef } from "react";
import PlaylistCover from "../components/PlaylistCover";
import SpotifyPlayer from "react-spotify-web-playback";
import Track from "../components/Track";
import PlaylistTitle from "../components/PlaylistTitle";
import PlaylistDescription from "../components/PlaylistDescription";

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

  const fetchDataCategorie = async () => {
    try {
      let response = await getCategories();
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

    getData();
    //tracksID();
    setTracksIDs(setTracksIDs());
  }, []);

  useEffect(() => {
    console.log("playlist", playlist);
    console.log("tracks", tracks);
    console.log("tracksIDs", tracksIDs);

    //console.log(playlist.images[0].url);
  }, []);

  const imagesUrl = (i) => {
    if (!!i) {
      return i[0];
    } else {
      return "./";
    }
  };

  const i = imagesUrl(playlist.images);

  //console.lo("tracks", playlist.tracks);

  //overflow-auto

  return (
    <div className="flex h-full w-full gap-5 relative">
      <div className="flex w-full flex-row">
        <TheSidebar showPopover={showPopover} />
        <TheSidebarOverlay />
        <div className="overflow-auto flex-1 w-full h-full justify-center items-center">
          <TheHeader className="w-full" />
          <div className="flex flex-row m-20 text-gray-200">
            <PlaylistCover className="w-60" url={i} />
            <div className="">
              <h1 className="text-8xl font-black mb-10">{playlist.name}</h1>
              <PlaylistDescription description={playlist.description} />
              <div className="flex flex-row h-6 text-xs gap-1 items-between">
                {/*                 {tracks[0].track.artists.map((artist, index) => (
                  <p key={index} className="">
                    {index !== tracks[0].track.artists.length - 1
                      ? artist.name + ", "
                      : artist.name}
                  </p>
                ))} */}
              </div>
            </div>
          </div>

          {/* <Playlist className="" {...playlist} /> */}
          <div className="flex flex-col ">
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
