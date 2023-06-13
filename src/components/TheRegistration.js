import BaseButton from "./BaseButton";
import TheRegistrationInfo from "./TheRegistrationInfo";
import { useEffect, useState } from "react";

function TheRegistration() {
  const [login, setLogin] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("access_token").length === 0) {
      setLogin((prev) => (prev = !login));
    }
  }, [login]);

  return (
    <>
      {!login && (
        <a
          href="/"
          className="bg-gradient-to-r from-[#af2896] to-[#509bf5] text-white py-4 px-8 flex justify-between items-center flex-wrap gap-x-6 gap-y-2"
        >
          <TheRegistrationInfo />
          <BaseButton primary>Sign up free</BaseButton>
        </a>
      )}
    </>
  );
}

export default TheRegistration;
