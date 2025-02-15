import { Stack } from "@mui/material";
import React from "react";
import ChatItem from "../shared/ChatItem";
import { bgGradient } from "../constants/color";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <Stack width={w} overflow={"auto"} height={"calc(100vh - 4rem)"}  sx={{
      backgroundImage:bgGradient
    }} >
      {chats?.map((data, index) => {
        const { avatar, name, _id, groupChat, members } = data;
        // console.log(avatar)
        const newMessageAlert = newMessagesAlert.find(
          ({ chatId }) => chatId === _id
        );

        const isOnline = members?.some((member) => onlineUsers.includes(_id));

        return (
          <ChatItem
          index={index}
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            groupChat={groupChat}
            _id={_id}
            key={_id}
            sameSender={chatId === _id}
            handleDeleteChat={handleDeleteChat}
          />
        );
      })}
    </Stack>
  );
};

export default ChatList;
