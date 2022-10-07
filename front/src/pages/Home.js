import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { BubbleLogoSvg } from "../components/svg/BubbleLogoSvg";
import { SocketContext } from "../context/socket";
import "../css/Home.css";

export const Home = () => {
  const location = useLocation();
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmitUsername = (e) => {
    e.preventDefault();
    socket.emit("setUsername", username);
    navigate("/chat", {
      state: { username: username, prevPath: location.pathname },
    });
    setUsername("");
  };

  return (
    <div className="home-container">
      <div className="home-container-input">
        <div className="home-input gradient-blue">
          <form
            onSubmit={handleSubmitUsername}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <input
              type="text"
              value={username}
              placeholder="Username"
              onChange={handleChangeUsername}
              className="font-montserrat"
              maxLength={12}
              style={{
                height: "25px",
                padding: "5px",
                marginBottom: "15px",
                borderRadius: 5,
              }}
            />

            <input
              type="submit"
              value="CHAT"
              className="font-montserrat"
              style={{
                padding: "5px",
                borderRadius: 5,
                color: "#807E8B",
                fontWeight: 700,
                backgroundColor: "#fff",
              }}
            />
          </form>
        </div>
        <div
          style={{
            height: 198,
            width: 304,
          }}
        >
          <BubbleLogoSvg />
        </div>
      </div>

      {/*  <div className="font-montserrat">
        <div className="homepage-title ">
          <p>CHAT &</p>
          <p>MESSAGE</p>
        </div>

        <div className="homepage-description">
          <p>
            Sed quis tempor elit, ut fermentum dui. Maecenas nec dignissim
            mauris. Suspendisse bibendum risus sem, sed finibus erat consectetur
            nec. Pellentesque lobortis ex vitae fringilla posuere. Phasellus a
            nisi quis eros lobortis elementum eu eget ligula. Suspendisse sed
            dapibus turpis. Phasellus tellus ante, iaculis suscipit nisi vitae,
            tristique condimentum dui.
          </p>
        </div>
      </div> */}
    </div>
  );
};
