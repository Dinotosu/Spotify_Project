import React, { useEffect, useState } from "react";
import TheSidebar from "../components/TheSidebar";
import TheSidebarOverlay from "../components/TheSidebarOverlay";
import TheHeader from "../components/TheHeader";
import { useRef } from "react";
import BaseButton from "../components/BaseButton";
import { getSearchResult } from "../api/api";

export default function Search() {
  const [values, setValue] = useState("");
  const [response, setResponse] = useState({});
  const [selectedOption, setSelectedOption] = useState("album");
  const [showItems, setShowItems] = useState(false);

  const contentWrapperRef = useRef();
  const popoverRef = useRef();
  const toastRef = useRef();

  const fetchData = async () => {
    try {
      let response = await getSearchResult(values, selectedOption);
      //console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const search = () => {
    const getData = async () => {
      setResponse({}); // сбросить состояние response
      let data = await fetchData();
      setResponse(data);
      setShowItems(true);
    };

    getData();
  };

  useEffect(() => {
    console.log(values);
  }, [values]);

  useEffect(() => {
    console.log(response);
  }, [response]);

  function showToast(message) {
    toastRef.current.show(message);
  }

  function showPopover(name, description, target, offset) {
    popoverRef.current.show(name, description, target, offset);
  }

  return (
    <div className="relative flex h-full text-stone-300">
      <TheSidebar showPopover={showPopover} />
      <TheSidebarOverlay />

      <main className="w-full">
        <TheHeader />
        <div className="flex flex-row justify-center gap-2 text-3xl font-xl">
          <input
            className="rounded-2xl w-6/12 bg-stone-900 my-6 h-[60px]"
            type="text"
            onChange={(e) => setValue(e.target.value)}
          />
          <select
            className="rounded-2xl w-2/12 bg-stone-900 my-6"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="album">album</option>
            <option value="artist">artist</option>
            <option value="track">track</option>
          </select>
        </div>
        <div className="w-full flex flex-col items-center text-center ">
          <BaseButton onClick={() => search()} primary>
            Search
          </BaseButton>
          {showItems && (
            <div className="flex flex-col g-6 mt-6">
              {response[selectedOption + "s"]?.items.map((item) => (
                <span>{item?.name}</span>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
