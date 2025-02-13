import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";

const NewGroup = () => {
  const groupName = useInputValidation("");

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

  console.log(selectedMembers);

  const submitHandler = () => {};

  const closeHandler = () => {};

  return (
    <Dialog open onClose={closeHandler}>
      <Stack width={"25rem"} p={{ xs: "1rem", sm: "2rem" }} spacing={"2rem"}>
        <DialogTitle variant="h4"> New Group</DialogTitle>

        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
          sx={
            {
              // marginBottom:"1rem"
            }
          }
        />

        <Typography variant="body1">Members</Typography>
        <Stack>
          {members?.map((user, index) => (
            <UserItem
              user={user}
              key={index}
              handler={selectMemberHandler}
              isAdded={selectedMembers.includes(user._id)}
            />
          ))}
        </Stack>

        <Stack
          spacing={"1rem"}
          direction={"row"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button color="error" variant={"text"}>
            Cancel
          </Button>
          <Button variant={"contained"} submitHandler={submitHandler}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
