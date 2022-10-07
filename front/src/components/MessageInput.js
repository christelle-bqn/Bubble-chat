import { useContext, useState } from "react";
import { SocketContext } from "../context/socket";

export const MessageInput = () => {
  const socket = useContext(SocketContext);

  const [message, setMessage] = useState("");

  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmitMessage}
      style={{ width: "100%", display: "flex", flexDirection: "row " }}
    >
      <input
        type="text"
        value={message}
        onChange={handleChangeMessage}
        placeholder="Type your message"
        className="font-montserrat"
        height={38}
        maxLength={80}
        style={{
          border: "1px solid #EBE9F1",
          borderRadius: "5px",
          fontSize: "12px",
          color: "#14213D",
          flexGrow: 1,
          marginRight: 10,
          paddingInline: 10,
        }}
      />
      <input
        className="font-montserrat gradient-blue"
        type="submit"
        value="Send"
        height={38}
        style={{
          border: "1px solid #EBE9F1",
          borderRadius: "5px",
          color: "#FFF",
          fontSize: 14,
          fontWeight: 500,
          padding: "10px 20px",
        }}
      />
    </form>
  );
};
