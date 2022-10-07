import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { SearchBar } from "./components/SearchBar";
import { ArrowLeft } from "./components/svg/ArrowLeftSvg";
import { User } from "./components/User";
import { UsernameInput } from "./components/UsernameInput";
import { UserProfile } from "./components/UserProfile";
import { SocketContext } from "./context/socket";
import "./css/Users.css";
import { RoomsSection } from "./RoomsSection";

export const UsersSection = ({ users, currentUser, setCurrentUser }) => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const [openProfile, setOpenProfile] = useState(false);

  const userDisconnection = () => {
    socket.disconnect();
    navigate("/");
  };

  return (
    <div className="users-container">
      {openProfile === false ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            borderBottomColor: "#EBE9F1",
            borderBottomWidth: 1,
            borderBottomStyle: "solid",
            height: "65px",
            alignItems: "center",
            padding: "0px 20px",
          }}
        >
          <div style={{ marginRight: 15 }}>
            <UserProfile setOpenProfile={setOpenProfile} />
          </div>
          <div style={{ flexGrow: 1 }}>
            <SearchBar />
          </div>
        </div>
      ) : (
        <div
          style={{
            height: 334,
            padding: "30px 20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div onClick={() => setOpenProfile(false)}>
            <ArrowLeft />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignSelf: "center",
              alignItems: "center",
            }}
          >
            <UsernameInput
              setCurrentUser={setCurrentUser}
              setOpenProfile={setOpenProfile}
              currentUser={currentUser}
            />

            <div
              className="font-montserrat gradient-blue"
              style={{
                padding: "8px",
                borderRadius: 5,
                color: "#fff",
                fontWeight: 500,
                display: "inline-block",
                marginTop: 10,
                fontSize: 12,
              }}
              onClick={userDisconnection}
            >
              <p style={{ margin: 0 }}>Logout</p>
            </div>
          </div>
        </div>
      )}

      {openProfile === false ? (
        <div className="users-list">
          {users
            ? users.map((user, index) => {
                return (
                  <div key={index}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <User user={user} />
                    </div>
                    <div
                      style={{
                        borderBottomColor: "#EBE9F1",
                        borderBottomWidth: 1,
                        borderBottomStyle: "solid",
                      }}
                    />
                  </div>
                );
              })
            : null}
        </div>
      ) : null}
      <div
        style={{
          borderBottom: "5px solid #EBE9F1",
        }}
      />
      <RoomsSection />
    </div>
  );
};
