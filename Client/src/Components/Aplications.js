import React from "react";
import { Box, Container } from "@mui/material";
import bg from "../Images/bg4.jpg";

const Aplications = () => {
  return (
    <Container>
      <Box
        sx={{
          bgcolor: "#cfe8fc",
          height: "300px",
          width: "300px",
          // width: "100%",
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: `right top`,
        }}
      >
        Hello be
      </Box>
    </Container>
  );
};

export default Aplications;
