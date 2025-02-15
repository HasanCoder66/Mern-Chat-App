import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Backdrop,
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { useNavigate, useSearchParams } from "react-router-dom";
import { sampleChats, sampleGroups, sampleUsers } from "../components/constants/sampleData";
import { Link } from "../components/styles/StyledComponents";
import AvatarCard from "../components/shared/AvatarCard";
import { bgGradient, mainColor } from "../components/constants/color";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import UserItem from "../components/shared/UserItem";

const ConfirmDeleteDialog = lazy(() => import("../components/dialog/ConfirmDeleteDialog"))
const AddMemberDialog = lazy(() => import("../components/dialog/AddMemberDialog"))



const Groups = () => {
  const confirmAddMember = false;
  const chatId = useSearchParams()[0].get("group");
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false)

  const navigate = useNavigate();

  const navigateBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
    // console.log("IsMobileMenuOpenClicked ======>", isMobileMenuOpen);
  };

  const updateGroupNameHandler = () => {
    setIsEdit(false);
    console.log("Edited", groupNameUpdatedValue);
  };

  const handleCloseMenu = () => setIsMobileMenuOpen(false);

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true)
    console.log(" delete group" )
  }
  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false)
    // console.log("confirm delete")
  }
  const openAddMemberHandler = () => {
    console.log("open Add member")
  }

  const deleteHandler = () => {
    console.log("delete Handler")
    closeConfirmDeleteHandler()
  }
  
  const removeMemberHandler = (id) => {
    console.log("remove member ===> Id", id)
  }
  useEffect(() => {
    if(chatId) {
      setGroupName(`Group Name ${chatId}`);
    setGroupNameUpdatedValue(`Group Name ${chatId}`);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    };
  }, [chatId]);

  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
          position: "fixed",
          top: "1rem",
          right: "2rem",
        }}
        onClick={handleMobile}
      >
        <IconButton>
          <MenuIcon />
        </IconButton>
      </Box>

      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            backgroundColor: "black",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba( 0,0,0,0.7)",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupName = (
    <>
      <Stack
        direction={"row"}
        textAlign={"center"}
        spacing={"1rem"}
        padding={"3rem"}
        alignItems={"center"}
      >
        {isEdit ? (
          <>
            <TextField
              value={groupNameUpdatedValue}
              onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
            />
            <IconButton onClick={updateGroupNameHandler}>
              <DoneIcon />
            </IconButton>
          </>
        ) : (
          <>
            <Typography variant="h4"> {groupName} </Typography>
            <IconButton onClick={() => setIsEdit(true)}>
              <EditIcon />
            </IconButton>
          </>
        )}
      </Stack>
    </>
  );

  const BtnGroup = (
    <Stack
      direction={{
        xs: "column-reverse",
        sm: "row",
      }}
      spacing={"1rem"}
      padding={{
        xs: "0",
        sm: "1rem",
        md: "1rem 4rem",
      }}
    >
      <Button
        size="large"
        color="error"
        variant="contained"
        startIcon={<DeleteIcon />}
        onClick={openConfirmDeleteHandler}
        >
        Delete Group
      </Button>

      <Button
        size="large"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={openAddMemberHandler}
      >
        {" "}
        Add Member
      </Button>
    </Stack>
  );

  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sm={4}
        sx={{
          display: {
            xs: "none",
            sm: "block",
            
          },
          // bgcolor: "black",
        }}
      >
        {" "}
        {/* No Groups */}
        <GroupList myGroups={sampleChats} chatId={chatId} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
          // bgcolor: "gray",
        }}
      >
        {IconBtns}

        {groupName && (
          <>
            {GroupName}

            <Typography
              marginRight={"2rem"}
              alignSelf={"flex-start"}
              variant="body1  "
            >
              Members
            </Typography>
            <Stack
              sx={{
                width: "100%",
                maxWidth: "45rem",
                boxSizing: "border-box",
                padding: {
                  xs: "0",
                  sm: "1rem",
                  md: "1rem 4 rem",
                },
                spacing: "2rem",
                height: "50vh",
                // backgroundColor: "#eaeaea",
                overflow: "auto",
              }}
            >
              {/* {Member} */}
              {
                sampleUsers.map((user,index) => (
                  <UserItem key={index} handler={removeMemberHandler} user={user} isAdded styling={
                    {boxShadow:"0 0 0.5rem rgba(0,0,0,0.2)",
                      padding:"1rem 2rem",
                      borderRadius:"1rem",
                    }
                  } />
                ))
              }
            </Stack>

            {BtnGroup}
          </>
        )}
      </Grid>


{ confirmAddMember && (
  <Suspense fallback={<Backdrop open />} >
    <AddMemberDialog 
    // open={confirmDeleteDialog} handleClose={closeConfirmDeleteHandler} 
    // deleteHandler={deleteHandler}
    />
  </Suspense>
)}

{confirmDeleteDialog && (
  <Suspense fallback={<Backdrop open />} >
    <ConfirmDeleteDialog open={confirmDeleteDialog} handleClose={closeConfirmDeleteHandler} 
    deleteHandler={deleteHandler}
    />
  </Suspense>
)}
      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        open={isMobileMenuOpen}
        onClose={handleCloseMenu}
      >
        {" "}
        {/* No Groups */}
        <GroupList myGroups={sampleChats} w={"50vw"} chatId={chatId} />
      </Drawer>
    </Grid>
  );
};

const GroupList = ({ w = "100%", myGroups = [], chatId }) => {
  // console.log(myGroups)
  return (
    <Stack width={w} sx={{
      backgroundImage: bgGradient,
      height:"100vh",
      overflow:"auto"
    }}>
      {myGroups.length > 0 ? (
        myGroups.map((group, index) => (
          <GroupChatList
            key={index}
            // key={group_id}
            group={group}
            chatId={chatId}
          />
        ))
      ) : (
        <Typography textAlign={"center"} padding={"1rem"}>
          {" "}
          No Groups
        </Typography>
      )}
    </Stack>
  );
};

const GroupChatList = memo(({ group, chatId }) => {
  const { avatar, _id, name } = group;
  return (
    <Link to={`?group=${_id}`}>
      <Stack
        spacing={"1rem"}
        alignItems={"center"}
        direction={"row"}
        // overflow={"auto"}
        onClick={(e) => {
          if (chatId === _id) e.preventDefault();
        }}
      >
        {/* <AvatarCard avatar={avatar} /> */}
        <Typography color="white">{name}</Typography>
      </Stack>
    </Link>
  );
});
export default Groups;
