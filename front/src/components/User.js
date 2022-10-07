import { useState } from "react";
import { UserAvatar } from "./UserAvatar";

export const User = ({ user }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={hover ? "gradient-blue" : null}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: hover ? "90px" : "70px",
        width: "100%",
        borderTopLeftRadius: hover ? 10 : 0,
        borderBottomLeftRadius: hover ? 10 : 0,
        paddingInline: 20,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={{ marginRight: 15, position: "relative" }}>
        <UserAvatar hover={hover} />

        <div
          style={{
            position: "absolute",
            height: 10,
            width: 10,
            borderRadius: "50%",
            backgroundColor: "#28C76F",
            border: "2px solid #fff",
            bottom: 0,
            left: 28,
          }}
        />
      </div>

      <p
        className="font-montserrat"
        style={{
          color: hover ? "#FFF" : "#14213D",
          fontSize: 15,
          fontWeight: 500,
          margin: 0,
        }}
      >
        {user.name}
      </p>
    </div>
  );
};
