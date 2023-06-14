function PlaylistCover({ url }) {
  console.log("url", url);
  return (
    <div className="flex w-full h-full">
      <img
        src={url.url}
        className="object-fill w-60 h-60 rounded shadow-lg"
        alt=""
      />
    </div>
  );
}

export default PlaylistCover;
