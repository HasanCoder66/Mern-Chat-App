import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => {
    setIsLogin((prev => !prev));
  };

  return (
    <Container
      component={"main"}
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        // p: 4,
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
        {isLogin ? (
          <>
            <Typography variant="h5">Login</Typography>

            <form>
              <TextField
                required
                label="Username"
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                required
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
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

              <Typography sx={{ textAlign: "center", marginTop: 2 }}>
                OR
              </Typography>
              <Button fullWidth variant="text" onClick={toggleLogin}>
                Sign Up Instead
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h5">Sign Up</Typography>

            <form>
              <TextField
                required
                label="Name"
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                required
                label="Bio"
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                required
                label="Username"
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                required
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
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
                Sign Up
              </Button>

              <Typography sx={{ textAlign: "center", marginTop: 2 }}>
                OR
              </Typography>
              <Button fullWidth variant="text" onClick={toggleLogin}>
                Login Instead
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
