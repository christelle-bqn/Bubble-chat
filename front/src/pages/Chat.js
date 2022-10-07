import React, { useContext, useEffect, useState } from "react";

import { UsersSection } from "../UsersSection";
import { MessagesSection } from "../MessagesSection";
import "../css/Chat.css";
import { SocketContext } from "../context/socket";
import { useLocation } from "react-router";
import { PrivateMessagesSection } from "../PrivateMessagesSection";

export const Chat = () => {
  const location = useLocation();

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [currentUserUsernames, setCurrentUserUsernames] = useState([]);
  const [currentUserId, setCurrentUserId] = useState();
  const [privateMessageUser, setPrivateMessageUser] = useState();

  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!currentUser) {
      setCurrentUser(location.state.username);
    }

    socket.on("userConnection", () => {
      setUsers((prevUsers) => {
        return [...prevUsers];
      });
    });

    socket.on("users", (users) => {
      setUsers(users);
    });

    socket.emit("getUsers");

    if (!currentUserId) {
      const userInfos = users.find((user) => user.name === currentUser);
      if (userInfos === undefined) return;
      setCurrentUserId(userInfos.id);
    }

    return () => {
      socket.off("users");
      socket.off("userConnection");
    };
  }, [users]);

  const beforeUnloadListener = (event) => {
    event.preventDefault();
    return (event.returnValue = "Are you sure you want to exit ?");
  };

  useEffect(() => {
    if (currentUser) {
      currentUserUsernames.push(currentUser);
    }

    setUsers((prevUsers) => {
      return [...prevUsers];
    });

    window.addEventListener("beforeunload", beforeUnloadListener);

    return () => {
      window.removeEventListener("beforeunload", beforeUnloadListener);
    };
  }, [currentUser]);

  return (
    <div className="chat-container">
      <UsersSection
        users={users}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        currentUserId={currentUserId}
        setPrivateMessageUser={setPrivateMessageUser}
      />

      <MessagesSection
        currentUser={currentUser}
        currentUserUsernames={currentUserUsernames}
      />

      {/*  <PrivateMessagesSection
        privateMessageUser={privateMessageUser}
        currentUser={currentUser}
        currentUserUsernames={currentUserUsernames}
      /> */}
    </div>
  );
};
