import { data } from "autoprefixer";
import Playlist from "./Playlist";
import axios from "axios";
import { Buffer } from "buffer";
import { useEffect, useState } from "react";
import { getCategories } from "../api/api";
import { useNavigate } from "react-router-dom";

const playlists = [
  {
    classes: "",
    title: "Playlist title 1",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    coverUrl: "https://fakeimg.pl/600/7f1d1d/fff?text=Cover&font=lobster",
  },
  {
    classes: "hidden sm:block",
    title: "Playlist title 2",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    coverUrl: "https://fakeimg.pl/600/365314/fff?text=Cover&font=lobster",
  },
  {
    classes: "hidden lg:block",
    title: "Playlist title 3",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    coverUrl: "https://fakeimg.pl/600/164e63/fff?text=Cover&font=lobster",
  },
  {
    classes: "hidden xl:block",
    title: "Playlist title 4",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    coverUrl: "https://fakeimg.pl/600/1e3a8a/fff?text=Cover&font=lobster",
  },
  {
    classes: "hidden 2xl:block",
    title: "Playlist title 5",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    coverUrl: "https://fakeimg.pl/600/365314/fff?text=Cover&font=lobster",
  },
  {
    classes: "hidden 3xl:block",
    title: "Playlist title 6",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    coverUrl: "https://fakeimg.pl/600/164e63/fff?text=Cover&font=lobster",
  },
  {
    classes: "hidden 4xl:block",
    title: "Playlist title 7",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    coverUrl: "https://fakeimg.pl/600/1e3a8a/fff?text=Cover&font=lobster",
  },
  {
    classes: "hidden 5xl:block",
    title: "Playlist title 8",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    coverUrl: "https://fakeimg.pl/600/365314/fff?text=Cover&font=lobster",
  },
  {
    classes: "hidden 6xl:block",
    title: "Playlist title 9",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    coverUrl: "/* https://fakeimg.pl/600/164e63/fff?text=Cover&font=lobster */",
  },
];

function TheMain() {
  const playlist_id = "3cEYpjA9oz9GiPac4AsH4n";
  //console.log("cats", catigories);
  let [cats, setCats] = useState([]);
  let [playlists, setPlaylists] = useState(null);
  let navigate = useNavigate();

  const baseURL = "localhost:3000";

  const fetchData = async () => {
    try {
      let response = await getCategories();
      //console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      let data = await fetchData();
      console.log(data);
      setCats(data.data.categories.items);
    };
    getData();
  }, []);

  useEffect(() => {
    console.log("dgpgflp", cats, cats.length);
  }, [cats]);

  return (
    <main className="text-white relative">
      <div className="h-[275px] text-center  bg-gradient-to-b from-[#1f1f1f] to-[#121212] absolute w-full">
        <h1 className="text-6xl font-black mt-4">Катeгории</h1>
      </div>
      <div className="relative pt-[24px] pb-[48px] px-[32px] space-y-9 max-w-screen-5xl">
        <div className="flex flex-row overflow-auto items-center mt-[50px]">
          {cats.length > 0 &&
            cats.map((item) => (
              <div className="flex flex-col w-4/12 h-2/12">
                <div>
                  <h2 className="text-2xl font-semibold hover:underline capitalize">
                    <div onClick={() => navigate(item.href.split("/v1/")[1])}>
                      {item.name}
                    </div>
                  </h2>
                  <img src={item.icons[0].url} />
                </div>
              </div>
            ))}
          <div className="grid sm:grid-cols-playlists-mobile md:grid-cols-playlists-tablet lg:grid-cols-playlists-desktop gap-5">
            {/*             {playlists.map((playlist) => ({
               <Playlist key={playlist.title}></Playlist>
            }))} */}
          </div>
        </div>
      </div>
    </main>
  );
}

export default TheMain;
