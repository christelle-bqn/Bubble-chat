import React, { useContext, useEffect, useRef, useState } from "react";
import { format } from "date-fns";
//import { SocketContext } from "./context/socket";

export const Messages = () => {
  //const socket = useContext(SocketContext);

  const [messages, setMessages] = useState({});

  const lastMessageRef = useRef(null);

  /*  useEffect(() => {
    socket.on("messages", (mess) => {
      setMessages(mess);
    });

    socket.on("message", (message) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        newMessages[message.id] = message;
        return newMessages;
      });
    });

    socket.emit("getMessages");

    return () => {
      socket.off("message");
    };
  }, [messages]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); */

  return (
    <div>
      {Object.values(messages)
        .sort((a, b) => a.time - b.time)
        .map((message, index) => {
          return (
            <div key={index}>
              <p>ID : {message.id}</p>
              <p>DATE: {format(new Date(message.time), "d/M/y - H:mm:ss")}</p>
              <p>VALUE : {message.value}</p>
              <p>USER :</p>
              <ul>
                <li>ID : {message.user.id}</li>
                <li>NAME : {message.user.name}</li>
              </ul>
            </div>
          );
        })}
      <div ref={lastMessageRef} />

      <p>MESSAGES</p>
    </div>
  );
};
