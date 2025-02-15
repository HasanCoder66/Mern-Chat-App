import React, { useState } from "react";
import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import { sampleUsers } from "../constants/sampleData";
import UserItem from "../shared/UserItem";
const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {



  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    // setMembers((prev) =>
    //   prev.map((user) =>
    //     user._id === id ? { ...user, isAdded: !user.isAdded } : user
    //   )
    // );

    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((curreElement) => curreElement !== id)
        : [...prev, id]
    );
  };

  // console.log(selectedMembers);
  const closeHandler = () => {
    console.log("close handler");
    setMembers([])
    setSelectedMembers([])

  };
  const addMemberSubmitHandler = () => {
    console.log("add member handler");
  };
  return (
    <Dialog
      open
      // ={open}
      onClose={closeHandler}
    >
      <Stack padding={"2rem"} spacing={"2rem"} width={"20rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>

        {members.length > 0 ? (
          members.map((user, index) => (
            <Stack spacing={"1rem"}>
              <UserItem
              isAdded={selectedMembers.includes(user._id)}
              key={index} user={user} handler={selectMemberHandler} />
            </Stack>
          ))
        ) : (
          <Typography variant="body1" textAlign={"center"} padding={"1rem"}>
            No Friends
          </Typography>
        )}
      </Stack>

      <Stack
        direction={"row"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        padding={"1rem"}
      >
        <Button onClick={closeHandler} variant="outlined" color="error">
          Cancel
        </Button>
        <Button onClick={addMemberSubmitHandler} variant="contained">
          Submit Changes
        </Button>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
