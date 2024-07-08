import React from "react";
import Box from "@mui/material/Box";
//card_premiun
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Progrees from "./Progress";
import Stack from "@mui/material/Stack";
//icon_premiun
import prem from "../Images/premiun_icon.png";
import Avatar from "@mui/material/Avatar";

const card = (
  <React.Fragment>
    <CardContent style={{ textAlign: "center" }}>
      <Typography sx={{ fontSize: 16 }} color="white" gutterBottom>
        2 / 5 Free Generations
      </Typography>

      <Stack sx={{ mt: "10px" }}>
        <Progrees />
        <Button
          sx={{
            mt: "15px",
            borderRadius: "6px",
            background: "#4E3DBC",
            fontWeight: "bold",
          }}
          variant="contained"
          size="large"
        >
          Upgrade
        </Button>
      </Stack>
    </CardContent>
  </React.Fragment>
);

const CardPremiun = (props) => {
  return props.sidebar ? (
    <Box
      sx={{
        width: "210px",
      }}
    >
      <Card
        sx={{ borderRadius: "10px", background: "rgb(209, 207, 207)" }}
        variant="outlined"
      >
        {card}
      </Card>
    </Box>
  ) : (
    <Avatar style={{ cursor: "pointer" }} alt="Travis Howard" src={prem} />
  );
};

export default CardPremiun;
