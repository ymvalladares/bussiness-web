import React, { useEffect, useState } from "react";
import Navbar from "../General/Navbar";
import { Box, Container, Grid, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { CreateChatConnection } from "../Services/ChatService";

const MainPage = () => {
  const { state } = useLocation();
  const [user, setUser] = useState("");
  const large_devices = useMediaQuery("(min-width:600px)");

  // useEffect(() => {
  //   const token = localStorage.getItem("TOKEN_KEY");
  //   const decoded = jwtDecode(token);
  //   // console.log(decoded);
  //   setUser(decoded);
  // }, []);

  return (
    <Grid>
      <Box sx={{ width: "100%", height: "100%" }}>
        <Navbar />
      </Box>
    </Grid>
  );
};

export default MainPage;
