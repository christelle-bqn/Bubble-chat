import React, { useContext, useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { SocketContext } from "./context/socket";

import "./css/Messages.css";
import { MessageInput } from "./components/MessageInput";

export const PrivateMessagesSection = ({
  currentUser,
  currentUserUsernames,
  privateMessageUser,
}) => {
  const socket = useContext(SocketContext);

  const [messages, setMessages] = useState({});

  const lastMessageRef = useRef(null);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messages-container">
      <div className="header">
        <p style={{ paddingLeft: 20, margin: 0, color: "#5E5873" }}>
          Room default
        </p>
      </div>
      <div style={{ width: "100%", paddingBottom: 20 }}>
        <div className="messages">
          {Object.values(messages)
            .sort((a, b) => a.time - b.time)
            .map((message, index) => {
              if (message.value.trim(0).length === 0) return null;
              return message.user.name === currentUser ||
                currentUserUsernames.includes(message.user.name) ? (
                <div key={index} className="message messageCurrentUser ">
                  <div className="container">
                    <div>
                      <p className="username">-{message.user.name}</p>
                    </div>
                    <div>
                      <p className="time">
                        {format(new Date(message.time), "d/M/y - H:mm:ss")}
                      </p>
                    </div>

                    <div className="content gradient-blue">
                      <p>{message.value}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={index} className="message messageUser">
                  <div className="username">
                    <p>-{message.user.name}</p>
                  </div>
                  <div>
                    <p className="time">
                      {format(new Date(message.time), "d/M/y - H:mm:ss")}
                    </p>
                  </div>

                  <div className="content">
                    <p>{message.value}</p>
                  </div>
                </div>
              );
            })}
          <div ref={lastMessageRef} />
        </div>

        <div className="messageInput">
          <MessageInput />
        </div>
      </div>
    </div>
  );
};
