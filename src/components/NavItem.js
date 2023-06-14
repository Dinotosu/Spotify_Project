import { useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function NavItem({ classes, icon, onClick, href, children: label }) {
  const labelRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  //console.log("href", href);

  return (
    <div className={classes} onClick={() => navigate(href)}>
      {icon}
      <span ref={labelRef} className="ml-4 text-sm font-semibold">
        {label}
      </span>
    </div>
  );
}

export default NavItem;
