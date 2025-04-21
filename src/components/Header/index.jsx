import Nav from "../nav/nav";

import bg from "../../images/bg_top.jpg";
import miolo from "../../images/miolo_top.png";
import youtube from "../../images/youtube.png";
import instagram from "../../images/instagram.png";

export default function Header() {
  return (
    <>
      <div className="banner">
        <img className="bg" src={bg} alt="" />
        <div className="backdrop"></div>
        <div className="content">
          <div className="title">
            <img src={miolo} alt="" />
          </div>

          <div className="right">
            <div className="social-media">
              <a
                href="https://www.instagram.com/anppea_monitoraea/"
                target="_blank"
              >
                <img src={instagram} alt="" />
              </a>
            </div>
            <button
              onClick={() => (window.location.href = "/colabora")}
              className="login"
            >
              Acessar
            </button>
          </div>
        </div>
      </div>
      <Nav />
    </>
  );
}
