import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import BaseButton from "./BaseButton";
import { useNavigate } from "react-router-dom";
import { User } from "react-spotify-api";

function TheHeader() {
  const navigate = useNavigate();

  return (
    <header className="bg-[#070707] flex-1 flex justify-between items-center py-[10px] px-[13px] sm:px-[32px] sticky top-0 z-10">
      <div className="flex">
        <a
          href="#sidebar"
          className="mr-[8px] text-[#969696] p-1 -ml-1.5 inline-block lg:hidden"
        >
          <Bars3Icon className="h-6 w-6" />
        </a>
        <a href="/" className="mr-[8px] text-[#969696] p-1 cursor-not-allowed">
          <ChevronLeftIcon className="h-6 w-6" />
        </a>
        <a href="/" className="ml-[8px] text-[#969696] p-1 cursor-not-allowed">
          <ChevronRightIcon className="h-6 w-6" />
        </a>
      </div>
      <div>
        {/*         <BaseButton classes="text-gray-400 hover:text-white">
          Sign up
        </BaseButton> */}

        {/*         {localStorage.getItem("access_token").length > 0 ? (
          <User>
            {(user, loading, error) =>
              user ? (
                <ul>
                  <li className="text-slate-300">Name - {user.display_name}</li>
                  <li className="text-slate-300">ID - {user.id}</li>
                </ul>
              ) : null
            }
          </User>
        ) : (
          <BaseButton
            onClick={() => {
              navigate("/login");
            }}
            primary
          >
            Log in
          </BaseButton>
        )} */}
      </div>
    </header>
  );
}

export default TheHeader;
