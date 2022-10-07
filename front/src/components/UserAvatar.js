import default_avatar_blue from "../assets/images/default_avatar_blue.png";
import default_avatar_white from "../assets/images/default_avatar_white.png";
import default_avatar_user from "../assets/images/default_avatar_user.png";

export const UserAvatar = ({ hover, currentUser }) => {
  return (
    <div
      style={{
        height: "40px",
        width: "40px",
        borderRadius: "50%",
      }}
    >
      <img
        src={
          currentUser
            ? default_avatar_user
            : hover
            ? default_avatar_white
            : default_avatar_blue
        }
        height="100%"
        width="100%"
      />
    </div>
  );
};
