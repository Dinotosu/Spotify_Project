import { useState, useLayoutEffect } from "react";
import useEvent from "../hooks/useEvent";
import useMenu from "../hooks/useContextMenu";
import useModal from "../hooks/useModal";
import PlaylistCover from "./PlaylistCover";
import PlaylistButtonPlay from "./PlaylistButtonPlay";
import PlaylistTitle from "./PlaylistTitle";
import PlaylistDescription from "./PlaylistDescription";
import PlaylistContextMenu from "./PlaylistContextMenu";
import TheModalEmbedPlaylist from "./TheModalEmbedPlaylist";
import TheModalRecommendations from "./TheModalRecommendations";

function Playlist({ images, name, description }) {
  function generateMenuItems(isAlternate = false) {
    console.log("name", name);

    return [
      {
        label: "Add to Your Library",
        action: () => {
          menu.close();
          document.querySelector("nav a:nth-child(4)").click();
        },
      },
      {
        label: "Share",
        submenuItems: [
          {
            label: isAlternate ? "Copy Spotify URI" : "Copy link to playlist",
            classes: "min-w-[150px]",
            action: () => {
              navigator.clipboard.writeText(name).then(() => {
                menu.close();
                /*                 showToast("Link copied to clipboard"); */
              });
            },
          },
          {
            label: "Embed playlist",
            action: () => {
              menu.close();
              embedPlaylistModal.open();
            },
          },
        ],
      },
      {
        label: "About recommendations",
        action: () => {
          menu.close();
          recommendationsModal.open();
        },
      },
      {
        label: "Open in Desktop app",
      },
    ];
  }

  const [menuItems, setMenuItems] = useState(generateMenuItems);
  const menu = useMenu(menuItems);
  const embedPlaylistModal = useModal();
  const recommendationsModal = useModal();

  //useLayoutEffect(() => toggleScrolling(!menu.isOpen));

  useEvent("keydown", handleAltKeydown, menu.isOpen);
  useEvent("keyup", handleAltKeyup, menu.isOpen);

  function handleAltKeydown({ key }) {
    if (key === "Alt") setMenuItems(generateMenuItems(true));
  }

  function handleAltKeyup({ key }) {
    if (key === "Alt") setMenuItems(generateMenuItems());
  }

  const bgClasses = menu.isOpen
    ? "bg-[#272727]"
    : "bg-[#181818] hover:bg-[#272727]";

  //console.log("images", images);

  const imagesUrl = (i) => {
    if (!!i) {
      return i[0];
    } else {
      return "./";
    }
  };

  const i = imagesUrl(images);

  return (
    <a
      href="/"
      className={`relative flex p-4 rounded-md w-68 
     flex-col text-white duration-200 group  ${bgClasses}`}
      onClick={(event) => event.preventDefault()}
      onContextMenu={menu.open}
    >
      <div className="flex relative justify-center">
        <PlaylistCover url={i} />
        <PlaylistButtonPlay />
      </div>
      <PlaylistTitle title={name} />
      <PlaylistDescription description={description} />
      {menu.isOpen && (
        <PlaylistContextMenu
          ref={menu.ref}
          menuItems={menu.items}
          classes="fixed divide-y divide-[#3e3e3e]"
        />
      )}
      {recommendationsModal.isOpen && (
        <TheModalRecommendations onClose={recommendationsModal.close} />
      )}
      {embedPlaylistModal.isOpen && (
        <TheModalEmbedPlaylist onClose={embedPlaylistModal.close} />
      )}
    </a>
  );
}

export default Playlist;
