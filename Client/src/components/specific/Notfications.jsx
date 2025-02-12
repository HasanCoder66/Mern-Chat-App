import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Stack,
  Typography
} from "@mui/material";
import React, { memo } from "react";
import { sampleNotifications } from "../constants/sampleData";

const Notfications = () => {
  const friendRequestHandler = ({ _id, accept }) => {
    console.log(_id);
  };
  return (
    <Dialog open>
      <Stack maxWidth={"25rem"} p={{ xs: "1rem", sm: "2rem" }}>
        <DialogTitle> Notifciations</DialogTitle>

        {sampleNotifications.length > 0 ? (
          sampleNotifications.map((n, index) => (
            <NotficationItem
              key={n._id}
              sender={n.sender}
              _id={n._id}
              handler={friendRequestHandler}
            />
          ))
        ) : (
          <Typography textAlign={"center"}> 0 Notifications </Typography>
        )}
      </Stack>
    </Dialog>
  );
};

const NotficationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;

  return (
    <ListItem>
      <Stack
        direction={"row"}
        width={"100%"}
        alignItems={"center"}
        spacing={"1rem"}
      >
        <Avatar src={avatar}/>

        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            // width:"100%"
          }}
        >
          {`${name} sent you a friend request.`}
        </Typography>

        <Stack direction={{
          xs:"column",
          // sm:"row"
        }}>
          <Button onClick={() => handler({_id, accept : true}) }>Accept</Button>
          <Button color="error" onClick={() => handler({_id, accept : false}) }>Reject</Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notfications;
