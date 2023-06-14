import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Playlist from "./pages/PlaylistPage";
import PlaylistPage from "./pages/PlaylistPage";
import Search from "./pages/Search";
import Library from "./pages/Library";

function App() {
  /*   const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token").length === 0) {
      navigate("/login");
    }
  }, [navigate]); */

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/playlists/:id" element={<PlaylistPage />} />
        <Route path="/browse/categories/" element={<PlaylistPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </Router>
  );
}

export default App;
