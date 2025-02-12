import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import {
  Face as FaceIcon,
  AlternateEmail as AlternateEmailIcon,
  CalendarMonth as CalenderIcon,
} from "@mui/icons-material";
import moment from "moment";


const Profile = () => {
  return (
    <Stack
      spacing={"1rem"}
      //   direction={"row"}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Avatar
        sx={{
          width: "200px",
          height: "200px",
          marginBottom: "1rem",
          objectFit: "contain",
          border: "5px solid white",
        }}
      />
      <ProfileCard
        text="Bio"
        heading="I'm a Full Stack Web Developer. I've 1 year of Experience in the Industry."
      />
      <ProfileCard
        text="UserName"
        heading="hasanashraf66"
        Icon={<AlternateEmailIcon />}
      />
      <ProfileCard
        text="Name"
        heading="Muhammad Hasan Ashraf"
        Icon={<FaceIcon />}
      />
      <ProfileCard
        text={moment("2024-12-02T00:00:00.000Z").fromNow()}
        heading="Joined"
        Icon={<CalenderIcon />}
      />
    </Stack>
  );
};

const ProfileCard = ({ text, heading, Icon }) => {
  return (
    <Stack
      spacing={"1rem"}
      direction={"row"}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
      }}
    >
      {Icon && Icon}
      <Stack>
        <Typography variant="body1">{text}</Typography>
        <Typography color="gray" variant="caption">
          {heading}
        </Typography>
      </Stack>
    </Stack>
  );
};
export default Profile;
