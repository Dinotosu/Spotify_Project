import BaseButton from "../components/BaseButton";
import { generateSpotifyURL, getAuthToken, refreshToken } from "../api/api";
import { useNavigate } from "react-router-dom";

const AuthorizeLayout = () => {
  let navigate = useNavigate();

  const login = () => {
    const url = generateSpotifyURL(); // https://accounts.spotify.com/authorize?client_id=64d86bdaf570466ba6c8f4d3c71910a9&redirect_uri=http://localhost:3001&scope=user-read-email user-read-private &response_type=token&show_dialog=true
    navigate("/");
    window.location.href = url;
    getAuthToken();
    refreshToken();
  };

  return (
    <section className="flex justify-center items-center h-full flex-wrap flex-col">
      <div className="flex justify-center w-60 h-12">
        <img src="spotify.jpeg" alt="spotify logo" />
      </div>

      <BaseButton primary onClick={login}>
        Start
      </BaseButton>
    </section>
  );
};

/* const LayoutWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: black;
  img {
    width: 60%;
  }
`; */
export default AuthorizeLayout;
