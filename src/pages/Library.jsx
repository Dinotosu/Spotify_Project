import React, { useEffect, useState } from "react";
import TheSidebar from "../components/TheSidebar";
import TheSidebarOverlay from "../components/TheSidebarOverlay";
import TheHeader from "../components/TheHeader";
import { useRef } from "react";
import BaseButton from "../components/BaseButton";
import { getSearchResult } from "../api/api";

export default function Library() {
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
        <h1> Бибилиотека </h1>
      </main>
    </div>
  );
}
