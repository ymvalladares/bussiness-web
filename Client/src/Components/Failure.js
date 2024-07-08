import { Box, Button, Container, Typography } from "@mui/material";
import notFound from "../Images/illustration_404.svg";
import React from "react";

const Failure = () => {
  return (
    <>
      <Container>
        <Box
          sx={{
            maxWidth: 480,
            mx: "auto",
            display: "flex",
            minHeight: "100vh",
            textAlign: "center",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3" sx={{ mb: 3 }}>
            Sorry, page not found!
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
            mistyped the URL? Be sure to check your spelling.
          </Typography>

          <Box
            component="img"
            src={notFound}
            sx={{
              mx: "auto",
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />

          <Button href="/" size="large" variant="contained">
            Go to Home
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Failure;
