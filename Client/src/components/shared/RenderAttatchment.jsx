import { FileOpen as FileOpenIcon } from "@mui/icons-material";
import React from "react";
import { transformImage } from "../../lib/features";

const RenderAttatchment = (file, url) => {
  switch (file) {
    case "video":
      return <video src={url} preload="none" width={"200px"} controls />;

    case "image":
      return (
        <img
          src={transformImage(url, 200)}
          alt="Attactment"
          width={"200"}
          height={"150"}
          style={{
            objectFit: "contain",
          }}
        />
      );

    case "audio":
      return <audio src={url} preload="none" controls />;

    default:
      return <FileOpenIcon />;
  }
};

export default RenderAttatchment;
