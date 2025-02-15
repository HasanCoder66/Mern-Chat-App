import { useInputValidation } from "6pp";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";

const isAdmin = false;

const AdminLogin = () => {
  const secretKey = useInputValidation("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit Handler");
  };

  if(isAdmin) return <Navigate to={"/admin/Dashboard"} />
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(120deg, #6851ff 0%, #ececec 100%)",
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            p: 4,
          }}
        >
          <Typography variant="h5">Admin Login</Typography>

          <form
            style={{
              width: "100%",
              marginTop: "1rem",
            }}
            onSubmit={submitHandler}
          >
            <TextField
              required
              label="Secret Key"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
            />

            <Button
              sx={{
                marginTop: "1rem",
              }}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
