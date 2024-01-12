import React from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
function NavBar() {
  const [show, Setshow] = React.useState(false);

  const history = useNavigate();

  const transitionnavbar = () => {
    if (window.scrollY > 100) {
      Setshow(true);
    } else {
      Setshow(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", transitionnavbar);
    return () => window.removeEventListener("scroll", transitionnavbar);
  }, []);
  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <img
          onClick={() => history("/")}
          className="nav__logo"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt=""
        />

        <img
          onClick={() => history("/profile")}
          className="nav__avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default NavBar;
