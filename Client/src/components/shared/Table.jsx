import react from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Paper, Typography } from "@mui/material";
const Table = ({ rows, columns, heading, rowHeight = 52 }) => {
  return (
    <Container
      sx={{
        height: "100vh",
      }}
    >
      <Paper
    //    elevation={3} 
      sx={{
        width:"100%",
        height:"100%",
        margin:"auto",
        overflow:"hidden",
        padding:"1rem 4rem",
        borderRadius:"1rem",
        boxShadow:"none"
      }}>
        <Typography
          variant="h4"
          textAlign={"center"}
          sx={{
            margin: "2rem",
            textTransform: "uppercase",
          }}
        >
          {heading}
        </Typography>

        <DataGrid rows={rows} columns={columns} rowHeight={rowHeight} style={{
            height:"80%"
        }} 
        sx={{
            border:"none",
            ".table-header":{
                color:"white",
                backgroundColor:"black"
            }
        }}
        />
      </Paper>
    </Container>
  );
};

export default Table;
