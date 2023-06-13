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
      </Routes>
    </Router>
  );
}

export default App;
