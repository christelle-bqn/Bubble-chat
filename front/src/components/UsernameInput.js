import { useContext, useState } from "react";
import { SocketContext } from "../context/socket";
import { UserAvatar } from "./UserAvatar";

export const UsernameInput = ({
  setCurrentUser,
  setOpenProfile,
  currentUser,
}) => {
  const socket = useContext(SocketContext);
  const [username, setUsername] = useState("");

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmitUsername = (e) => {
    e.preventDefault();
    socket.emit("setUsername", username);
    setCurrentUser(username);
    setOpenProfile(false);
    setUsername("");
  };

  return (
    <div className="username-container">
      <div style={{ marginBottom: "20px" }}>
        <UserAvatar currentUser />
      </div>
      <p
        className="font-montserrat"
        style={{
          fontSize: 13,
          fontWeight: 400,
          fontColor: "#14213D",
        }}
      >
        {currentUser}
      </p>
      <form
        onSubmit={handleSubmitUsername}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
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
          value="Submit"
          className="font-montserrat gradient-blue"
          style={{
            padding: "5px",
            borderRadius: 5,
            color: "#fff",
            fontWeight: 500,
          }}
        />
      </form>
    </div>
  );
};
