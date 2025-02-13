import { Typography } from "@mui/material";
import React, { memo } from "react";

const MessageCmp = ({ message, user }) => {
  const { content, createdAt, sender, attactment = [] } = message;

  const sameSender = sender?._id === user?._id;
  return (
    <div
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: "white",
        color: "black",
        borderRadius: "5px",
        padding: "0.5rem",
        width: "fit-content",
      }}
    >
      {/* {content} */}
      {!sameSender && <Typography color="#2694ab" fontWeight={"600"} variant="caption"> {sender?.name}</Typography>}
      {!content && <Typography> {content}</Typography>}
    </div>
  );
};

export default memo(MessageCmp);
