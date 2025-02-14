import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sampleChats, sampleGroups } from "../components/constants/sampleData";
import { Link } from "../components/styles/StyledComponents";
import AvatarCard from "../components/shared/AvatarCard";
const Groups = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
    // console.log("IsMobileMenuOpenClicked ======>", isMobileMenuOpen);
  };

  const handleCloseMenu = () => setIsMobileMenuOpen(false);

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
          bgcolor: "black",
        }}
      >
        {" "}
        {/* No Groups */}
        <GroupList myGroups={sampleChats} />
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
          bgcolor: "gray",
        }}
      >
        {IconBtns}
      </Grid>

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
        <GroupList myGroups={sampleChats}/>
      </Drawer>
    </Grid>
  );
};

const GroupList = ({w="100%", myGroups = [], chatId}) => {
  return (
    <Stack>
      {myGroups.length > 0 ? (
        myGroups.map((group, index) => (
          <GroupChatList 
          key={index}
          // key={group_id} 
          group={group} chatId={chatId} />
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

const GroupChatList = memo(({ groups, chatId }) => {
  const { 
    // avatar,
    //  _id, 
    name } = groups;
  return (
    <Link>
      <Stack>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});
export default Groups;
