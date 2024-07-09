import { Box } from "@mui/material";
import React from "react";
import ImgList from "./ImgList";

const Dashboard = () => {
  return (
    <Box
      sx={{
        width: "100%",
        padding: "10px",
        margin: "10px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <ImgList />
      <ImgList />
    </Box>
  );
};

export default Dashboard;
