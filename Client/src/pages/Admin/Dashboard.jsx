import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  AppBar,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
import moment from "moment";
import {
  CurveBtn,
  SearchField,
} from "../../components/styles/StyledComponents";
import { mainColor } from "../../components/constants/color";
import { DoughnutChart, LineChart } from "../../components/specific/Charts";
const Dashboard = () => {
  const Appbar = (
    <Paper
      elevation={3}
      sx={{
        margin: "1rem",
        padding: "2rem 1rem",
        borderRadius: "1rem",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettingsIcon
          sx={{
            fontSize: "3rem",
          }}
        />

        <SearchField placeholder="Search ..." />

        <CurveBtn>Search</CurveBtn>

        <Box flexGrow={1} />
        <Typography
          sx={{
            display: {
              xs: "none",
              lg: "block",
            },
            color: "rgba(0,0,0,0.7)",
            textAlign: "center",
          }}
        >
          {moment().format("dddd, Do MMMM YYYY")}
        </Typography>

        <NotificationsIcon />
      </Stack>
    </Paper>
  );

  const Widgets = (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing={"2rem"}
      justifyContent={"space-between"}
      alignItems={"center"}
      margin={"2rem 0"}
    >
      <Widget title={"Users"} value={"40"} Icon={<PersonIcon />} />
      <Widget title={"Chats"} value={"55"} Icon={<GroupIcon />} />
      <Widget title={"Messages"} value={"99"} Icon={<MessageIcon />} />
    </Stack>
  );
  return (
    <AdminLayout>
      <Container component="main">
        {Appbar}

        <Stack direction={{
          xs:"column",
          lg:"row"
        }} 
        // spacing={"2rem"} 
        flexWrap={"wrap"} justifyContent={"center"}
        alignItems={{
           xs:"center",
          lg:"stretch"
        }}
        sx={{gap:"2rem"}}
        >
          <Paper
            elevation={"3"}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "41rem",
              // height: "25rem",
            }}
          >
            <Typography margin={"2rem 0"} variant="h4">
              Last Messages
            </Typography>
            <LineChart value={[23,56,65,1,15,75]}/>
          </Paper>

          <Paper
            elevation={"3"}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              width: { xs: "100%", sm: "50%" },
              width: "100%",
              maxWidth: "25rem",
              // height: "25rem",
            }}
          >
            <DoughnutChart 
            value={[29,66]} labels={["Single Chats", "Group Chats"]}
            />

            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              width={"100%"}
              height={"100%"}
            >
              <GroupIcon /> <Typography>Vs</Typography> <PersonIcon />
            </Stack>
          </Paper>
        </Stack>

        {Widgets}
      </Container>
    </AdminLayout>
  );
};

const Widget = ({ Icon, title, value }) => {
  return (
    <Paper
      sx={{
        padding: "2rem",
        margin: "2rem 0",
        borderRadius: "1.5rem",
        width: "20rem",
      }}
    >
      <Stack alignItems={"center"} spacing={"1rem"}>
        <Typography
          sx={{
            width: "5rem",
            height: "5rem",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "rgba(0,0,0,0.9) ",
            border: `5px solid ${mainColor} `,
            // backgroundColor: mainColor
          }}
        >
          {value}
        </Typography>
        <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
          {Icon}

          <Typography>{title}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Dashboard;
