import {
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  ExitToApp as ExitToAppIcon,
  Group as GroupIcon,
  ManageAccounts as ManageAccountsIcon,
  Menu as MenuIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
// import { Link } from "../styles/StyledComponents";
import { Link as LinkCmp, Navigate, useLocation } from "react-router-dom";

const Link = styled(LinkCmp)(
  // `
  // text-decoration:none;
  // border-radius:1rem;
  // padding:1rem 2rem;
  // color:black;
  // &:hover {
  //     color:"rgba(0,0,0,0.54)";
  //   }`
  {
    textDecoration: "none",
    color: "black",
    borderRadius: "2rem",
    padding: "1rem  2rem",
    "&hover": {
      color: "rgba(0,0,0,0.54)",
    },
  }
);
const adminTabs = [
  {
    name: "Dashboard",
    icon: <DashboardIcon />,
    path: "/admin/dashboard",
  },
  {
    name: "Users",
    icon: <ManageAccountsIcon />,
    path: "/admin/users",
  },
  {
    name: "Chats",
    icon: <GroupIcon />,
    path: "/admin/chats",
  },
  {
    name: "Messages",
    icon: <MessageIcon />,
    path: "/admin/messages",
  },
];
const Sidebar = ({ w = "100%" }) => {
  const logoutHandler = () => {
    console.log("Logut Handler is Working ===>");
  };
  return (
    <Stack direction={"column"} padding={"3rem"} spacing={"3rem"} width={w}>
      <Typography variant="h5" textTransform={"uppercase"}>
        App Admin
      </Typography>

      <Stack spacing={"1rem"}>
        {adminTabs.map((tab, index) => (
          <Link
            to={tab.path}
            key={index}
            sx={
              location.pathname === tab.path && {
                bgcolor: "black",
                color: "white",
                ":hover": { color: "white" },
              }
            }
          >
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              {tab?.icon}
              <Typography fontSize={"1rem"}>{tab?.name}</Typography>
            </Stack>
          </Link>
        ))}
        <Link onClick={logoutHandler}>
          <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
            <ExitToAppIcon />
            <Typography fontSize={"1rem"}>Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};

const isAdmin = true;
const AdminLayout = ({ children }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  const handleMobile = () => {
    setIsMobile((prev) => !prev);
    // console.log(isMobile)
  };

  const handleClose = () => {
    setIsMobile(false);
    console.log("handle close is working");
  };

  if(!isAdmin) return <Navigate to={"/admin"} />
  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
          position: "fixed",
          top: "1rem",
          right: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        <Sidebar />
      </Grid>
      <Grid
        item
        xs={12}
        md={8}
        lg={9}
        sx={{
          bgcolor: "#f5f5f5",
        }}
      >
        {children}
      </Grid>

      <Drawer open={isMobile} onClose={handleClose}>
        <Sidebar w={"50vw"} />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
