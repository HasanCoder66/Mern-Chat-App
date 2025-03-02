import React, { memo } from "react";
import { Link } from "../styles/StyledComponents";
import { Box, Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    // console.log(avatar)
    <Link
    sx={{padding: "0"}}
      to={`/chat/${_id}`}
      //   key={_id}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <div
        style={{
          gap: "1rem",
          position: "relative",
          display: "flex",
          alignItems: "center",
          padding: "1rem",
          backgroundColor: sameSender ? "black" : "unset",
          color: sameSender ? "white" : "unset",
        }}
      >
        {/* Avatar Card  */}
        {/* <AvatarCard avatar={avatar} name={name} /> */}
        <Stack>
          <Typography color="white">{name}</Typography>
          {newMessageAlert && (
            <Typography>{newMessageAlert.count} New Message</Typography>
          )}
        </Stack>

        {isOnline && (
            <Box
                sx={{
                width: "10px",
                height: "10px",
                backgroundColor: "green",
                borderRadius: "50%",
                position: "absolute",
                right: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                }}
            />
        )}
      </div>
    </Link>
  );
};
export default memo(ChatItem);
