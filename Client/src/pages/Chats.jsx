import React, { useRef } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Stack } from "@mui/material";
import {
  grayColor,
  mainColor,
  mainDarkColor,
} from "../components/constants/color";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/dialog/FileMenu";
import { sampleMessages } from "../components/constants/sampleData";
import MessageCmp from "../components/shared/MessageCmp";


const user = {
  _id :"214512fadafgagsdf",
  name :"Hasan"
}
const Chats = () => {
  const containerRef = useRef(null);
  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        height={"80vh"}
        bgcolor={grayColor}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {sampleMessages?.map((message,index) => (
          <MessageCmp key={index} message={message} user={user}/>
        ))}
      </Stack>

      <form
        style={{
          height: "10vh",
        }}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          position={"relative"}
          alignItems={"center"}
        >
          <IconButton
            sx={{
              position: "absolute",
              rotate: "-30deg",
              left: "1.5rem",
            }}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox placeholder="Type Message Here" />

          <IconButton
            type="submit"
            sx={{
              backgroundColor: mainColor,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                backgroundColor: `${mainDarkColor}`,
                color: "white",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>

      </form>
        <FileMenu />
    </>
  );
};

export default AppLayout()(Chats);
