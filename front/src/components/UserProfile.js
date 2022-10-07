import { UserAvatar } from "./UserAvatar";

export const UserProfile = ({ setOpenProfile }) => {
  const clickUser = () => {
    setOpenProfile(true);
  };

  return (
    <div
      onClick={clickUser}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <div style={{ marginRight: 15, position: "relative" }}>
        <UserAvatar currentUser />

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
    </div>
  );
};
