import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
import React from "react";

const AvatarCard = ({ avatar = [], max = 4 }) => {
  // console.log(avatar)
  return <Stack direction="row" spacing={0.5}> 
  <AvatarGroup max={max}>
    <Box>
        {avatar.map((i, index) => (
            // console.log(avatar)
            <Avatar
            key={i}
            src={i}
            alt={`Avatar ${index}`}
            sx={{
                width: "3rem",
                height: "3rem",
                // borderRadius: "50%",
                // border: "2px solid white",
                position:"absolute",
                left: {
                    xs: `${0.5 + index}rem`,
                    sm : `${index}rem`
                }
            }}
            />
        ))}
    </Box>
  </AvatarGroup>
</Stack>
};

export default AvatarCard;