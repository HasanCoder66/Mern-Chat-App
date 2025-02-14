import { Box, Typography } from "@mui/material";
import moment from "moment";
import React, { memo } from "react";
import { fileFormat } from "../../lib/features";
import RenderAttatchment from "./RenderAttatchment";

const MessageCmp = ({ message, user,  }) => {
  const { content, createdAt, sender, attachment = [] } = message;
  // console.log(attachment);
  const sameSender = sender?._id === user?._id;
  const timeAgo = moment(createdAt).fromNow();

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
      {!sameSender && (
        <Typography color="#2694ab" fontWeight={"600"} variant="caption">
          {" "}
          {sender?.name}
        </Typography>
      )}
      {content && <Typography> {content}</Typography>}

      {/* Attatchment  */}
      {attachment.length > 0 &&
        attachment.map((attactment, index) => {
          const url = attactment.url;
          const file = fileFormat(url);

          return (
            <Box key={index}>
              <a
                target="_blank"
                href={url}
                download
                style={{
                  color: "black",
                }}
              >
                {RenderAttatchment(file, url)}
                {/* sasd */}
              </a>
            </Box>
          );
        })}

      <Typography variant="caption" color="text.secondary">
        {timeAgo}
      </Typography>
    </div>
  );
};

export default memo(MessageCmp);
