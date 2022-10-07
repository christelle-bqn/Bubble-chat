import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "./components/svg/ArrowLeftSvg";
import { SocketContext } from "./context/socket";
import "./css/Rooms.css";

export const RoomsSection = ({}) => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState([]);

  const [createRoom, setCreateRoom] = useState(false);

  const handleChangeRoom = (e) => {
    setRoom(e.target.value);
  };

  const handleSubmitRoom = (e) => {
    e.preventDefault();
    socket.on("joinRoom", room);
    setRoom("");
  };

  const joinRoom = (room) => {
    console.log(room);
  };

  useEffect(() => {
    socket.on("getRooms", (room) => {
      console.log(room);
    });

    socket.emit("getRooms");

    return () => {
      socket.off("getRooms");
    };
  }, [rooms]);

  return (
    <div className="rooms-container">
      <p className="font-montserrat">ROOMS</p>
      {createRoom ? (
        <div style={{ marginBottom: 10 }}>
          <div onClick={() => setCreateRoom(false)}>
            <ArrowLeft />
          </div>
          <form
            onSubmit={handleSubmitRoom}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <input
              type="text"
              value={room}
              onChange={handleChangeRoom}
              placeholder="Type your room name..."
              className="font-montserrat"
              maxLength={8}
              style={{
                border: "1px solid #EBE9F1",
                borderRadius: "5px",
                fontSize: "12px",
                color: "#14213D",
                height: 38,
                width: "100%",
                marginBottom: 10,
              }}
            />
            <input
              className="font-montserrat gradient-blue"
              type="submit"
              value="Go to room"
              style={{
                border: "1px solid #EBE9F1",
                borderRadius: "5px",
                color: "#FFF",
                fontSize: 14,
                fontWeight: 500,
                height: 38,
                width: "100%",
              }}
            />
          </form>
        </div>
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", marginBottom: 10 }}
        >
          <div
            onClick={() => setCreateRoom(true)}
            className="font-montserrat gradient-blue"
            style={{
              display: "inline-block",
              padding: "5px",
              borderRadius: 5,
              color: "#fff",
              fontWeight: 500,
              alignSelf: "center",
              fontSize: 12,
            }}
          >
            CREATE ROOM
          </div>
        </div>
      )}

      <div className="rooms-list">
        {rooms
          ? rooms.map((room, index) => {
              return (
                <div key={index}>
                  <div className="rooms-list-room" onClick={joinRoom(room)}>
                    <p
                      className="font-montserrat"
                      style={{ fontSize: 12, fontColor: "#14213D", margin: 0 }}
                    >
                      {room}
                    </p>
                    <div
                      style={{
                        paddingInline: 50,
                      }}
                    ></div>
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
    </div>
  );
};
