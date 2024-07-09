import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import imgadeTest from "../Images/ilustration.png";
import TableComp from "./TableComp";

const Welcome = () => {
  const large_devices = useMediaQuery("(min-width:600px)");

  return (
    <Box
      sx={{
        height: "300px",
        background: "rgb(235,243,243)",
        background:
          "linear-gradient(273deg, rgba(235,243,243,1) 11%, rgba(95,1,247,1) 100%)",
        borderRadius: "20px",
        padding: "50px",
        //margin: "50px 25px 50px 25px",
      }}
    >
      <Grid container spacing={20}>
        <Grid item xs={12} md={7}>
          <Typography
            mb={3}
            fontWeight="bold"
            color="white"
            variant={large_devices ? "h4" : "h6"}
            gutterBottom
          >
            Welcome to Sweet Dreams
          </Typography>
          <Typography mb={3} color="white" variant="body1" gutterBottom>
            The purpose of a product update is to add new features, fix bugs or
            improve the performance of the product.
          </Typography>
          <Button
            variant="outlined"
            size="medium"
            sx={{
              backgroundColor: "transparent",
              color: "white",
              border: "1px solid white !important",
              width: large_devices ? "40%" : "100%",
            }}
          >
            View full Stadistics
          </Button>
        </Grid>
        <Grid sx={{ display: { xs: "none", sm: "block" } }} item xs={4} md={4}>
          <img
            style={{ marginTop: "-35px" }}
            width="250px"
            height="250px"
            src={imgadeTest}
          />
        </Grid>

        <Grid item xs={12} sx={{ marginTop: "-90px", marginBottom: "10px" }}>
          <TableComp />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Welcome;
