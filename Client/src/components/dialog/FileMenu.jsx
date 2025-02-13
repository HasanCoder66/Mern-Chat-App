import { Menu } from "@mui/material";
import React from "react";

const FileMenu = ({ anchorEl }) => {
  return (
    <Menu open={false} anchorEl={anchorEl}>
      <div
        style={{
          width: "10rem",
        }}
      > 
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus
        quis, nemo delectus nihil sapiente necessitatibus maxime labore
        quibusdam vero accusamus harum! Similique, itaque.
      </div>
    </Menu>
  );
};

export default FileMenu;
