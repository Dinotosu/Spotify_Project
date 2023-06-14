import React from "react";
import { Link } from "react-router-dom";
import trackProps from "../helpers/trackProps";

export default function Track({ name, album, artists, uri, handleTrackClick }) {
  const handleClick = () => {
    console.log(handleTrackClick(), uri);
    //trackProps(uri);
    handleTrackClick(uri);
  };

  return (
    <div
      onClick={handleClick}
      className="flex rounded-xl h-20 flex-row justify-start text-neutral-600 bg-neutral-900 m-2"
    >
      <div className="flex w-3/12 ">
        <img src={album.images[0].url} className="w-15 h-15" alt="" />
      </div>
      <div className="flex h-10 m-0.5 w-4/12 pt-4  pb-4 flex-col align-middle gap-1">
        <h4 className="flex w-3/2">{name}</h4>
        <div className="flex flex-row h-6 text-xs gap-1 items-between">
          {artists.map((artist, index) => (
            <p key={index} className="">
              {index !== artists.length - 1 ? artist.name + ", " : artist.name}
            </p>
          ))}
        </div>
      </div>
      <p className="flex h-6 w-3/12 pt-7  pb-7">{album.name}</p>
    </div>
  );
}
