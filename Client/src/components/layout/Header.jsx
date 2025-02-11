import React, { lazy, Suspense, useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { mainColor } from "../constants/color";
const SearchDialog = lazy(() => import("../specific/Search"));
const NotificationDialog = lazy(() => import("../specific/Notfications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setISearch] = useState(false);
  const [isNewGroup, setNewGroup] = useState(false);
  const [isNotfication, setIsNotfication] = useState(false);

  const navigate = useNavigate();
  const handleMobileMenuOpen = () => {
    setIsMobile((prev) => !prev);
    console.log("Mobile Menu is Clicked", isMobile);
  };
  const openSearchDialog = () => {
    setISearch((prev) => !prev);
    console.log("Search Icon is Clicked");
  };
  const openNewGroup = () => {
    setNewGroup((prev) => !prev);
    console.log("Add Icon is Clicked");
  };
  const navigateToGrp = () => {
    navigate("/groups");
    console.log("Manage Groups Icon is Clicked");
  };
  const openNotification = () => {
    setIsNotfication((prev) => !prev);
    console.log("Notifications Icon is Clicked");
  };
  const logoutHandler = () => {
    console.log("Logout Icon is Clicked");
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: "1",
        }}
        height={"4rem"}
      >
        <AppBar position="static" sx={{ bgcolor: mainColor }}>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ display: { xs: "none", md: "block" }, cursor: "pointer" }}
            >
              Chat App
            </Typography>

            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton
                sx={{ cursor: "pointer", color: "inherit" }}
                onClick={handleMobileMenuOpen}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: "1" }} />

            <Box>
              <IconBtn
                title={"Search"}
                onClick={openSearchDialog}
                icon={<SearchIcon />}
              />
              <IconBtn
                title={"New Group"}
                onClick={openNewGroup}
                icon={<AddIcon />}
              />
              <IconBtn
                title={"Manage Group"}
                onClick={navigateToGrp}
                icon={<GroupIcon />}
              />
              <IconBtn
                title={"Notifications"}
                onClick={openNotification}
                icon={<NotificationsIcon />}
              />
              <IconBtn
                title={"Logout"}
                onClick={logoutHandler}
                icon={<LogoutIcon />}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<div>...Loading</div>}>
          <SearchDialog />
        </Suspense>
      )}
      {isNotfication && (
        <Suspense fallback={<div>...Loading</div>}>
          <NotificationDialog />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<div>...Loading</div>}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ icon, title, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton
        sx={{ cursor: "pointer", color: "inherit" }}
        size="large"
        onClick={onClick}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};
export default Header;
