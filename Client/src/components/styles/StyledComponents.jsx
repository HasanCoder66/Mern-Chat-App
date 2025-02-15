import { styled } from "@mui/material";
import { Link as LinkCmp } from "react-router-dom";
import { grayColor } from "../constants/color";
export const VisuallyHiddenInput = styled("input")({
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

export const Link = styled(LinkCmp)({
  textDecoration: "none",
  color: "black",
  padding: "1rem",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
});

export const InputBox = styled("input")({
  width: "100%",
  height: "100%",
  padding: "0 3rem",
  backgroundColor: `${grayColor}`,
  border: "none",
  outline: "none",
  borderRadius: "1.5rem",
});

export const SearchField = styled("input")({
  padding: "1rem 2rem",
  width: "20vmax",
  border: "none",
  outline: "none",
  borderRadius: "1.5rem",
  fontSize: "1.1rem",
  backgroundColor: `${grayColor}`,
});


export const CurveBtn = styled("button")({
    borderRadius: "1.5rem",
  padding: "1rem 2rem",
  border: "none",
  outline: "none",
  cursor:"pointer",
  backgroundColor:"black",
  color:"white",
  fontSize: "1.1rem",
  "&hover":{
    backgroundColor: `${grayColor}`,}
});
