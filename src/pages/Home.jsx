import { useRef } from "react";
import useEvent from "../hooks/useEvent";
import BasePopover from "../components/BasePopover";
import BaseToast from "../components/BaseToast";
import TheSidebar from "../components/TheSidebar";
import TheSidebarOverlay from "../components/TheSidebarOverlay";
import TheHeader from "../components/TheHeader";
import TheMain from "../components/TheMain";
import TheRegistration from "../components/TheRegistration";
import { getCategories } from "../api/api";

import { useEffect, useState } from "react";
import { getAuthToken, generateSpotifyURL, refreshToken } from "../api/api";

function Home() {
  const [token, setToken] = useState("");
  let [categories, setCategories] = useState([]);

  const contentWrapperRef = useRef();
  const popoverRef = useRef();
  const toastRef = useRef();

  const fetchDataCategorie = async () => {
    try {
      let response = await getCategories();
      //console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getDataCat = async () => {
    let data = await fetchDataCategorie();
    setCategories(data.categories.items);
  };

  useEffect(() => {
    generateSpotifyURL();
    getAuthToken();
    //refreshToken();

    getDataCat();

    //localhost:3000/#access_token=BQCJPmcpFSFEg0igNhcoJEkcSDMKE_uQOdZnkDLE34YJPxLL1RkIqql2Q1fUPonqk32AXq74bF8YqOLAKIl6mg1DJnEDJlQQhHnNulZ9S8cb1aUXhhsF8_jGSOn1fqoHU8QMh_M5rJ8AjNNKlHo9x4gbeBc71QyfWmoRjZRrdXKiN1HriiDHul68ohDcPVPnMF5Bsp9fc6e-sY-c-vWYKpHyXRN7POBdS7HGOFDX33NyuvBTCJM-g9U_vJYmnmTTfsKlm6vTFnQhtaVpoRe3BfR9ZhkWyoImUaM2pnnCGbJpeeUBUoHt9q3kEwSboQCcXEqXaMtpmZ-7Z8mqSg&token_type=Bearer&expires_in=3600

    http: console.log("categories", categories);
    //setToken(refreshToken()
    //
  }, []);

  let isScrollingEnabled = true;

  useEvent("wheel", handleScrolling, true, () => contentWrapperRef.current);

  function showPopover(name, description, target, offset) {
    popoverRef.current.show(name, description, target, offset);
  }
  //

  function showToast(message) {
    toastRef.current.show(message);
  }

  /*   function toggleScrolling(isEnabled) {
    isScrollingEnabled = isEnabled;
  } */

  function handleScrolling(event) {
    if (isScrollingEnabled) return;

    event.preventDefault();
    event.stopPropagation();
  }

  //

  return (
    <>
      <div className="flex grow overflow-auto">
        <TheSidebar showPopover={showPopover} />

        <div className="flex-1 overflow-auto" ref={contentWrapperRef}>
          <TheHeader />
          <TheMain />
        </div>
      </div>
      <TheRegistration />
      <BaseToast ref={toastRef} />
      <BasePopover ref={popoverRef} />
    </>
  );
}

export default Home;
