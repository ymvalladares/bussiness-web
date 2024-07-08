import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { Chip, Stack } from "@mui/material";

const CardChart = ({
  title,
  indicador,
  balance,
  company,
  tendencia,
  earnings,
}) => {
  let chipContent = (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      {indicador == "Up" ? (
        <TrendingUpIcon sx={{ color: "blue" }} />
      ) : (
        <TrendingDownIcon sx={{ color: "red" }} />
      )}
      <Typography
        fontWeight="bold"
        variant="caption"
        color={indicador == "Up" ? "blue" : "red"}
      >
        {tendencia + "%"}
      </Typography>
    </Stack>
  );

  return (
    <React.Fragment>
      <CardContent
        sx={{
          width: "100%",
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "15px",
          "--Grid-borderWidth": "1px",
          borderTop: "var(--Grid-borderWidth) solid",
          borderLeft: "var(--Grid-borderWidth) solid",
          borderRight: "var(--Grid-borderWidth) solid",
          borderBottom: "var(--Grid-borderWidth) solid",
          borderColor: "divider",
        }}
      >
        <Typography sx={{ fontSize: 14 }} color="grey" gutterBottom>
          {title}
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ marginTop: "5px", marginBottom: "15px" }}
        >
          <Typography
            sx={{ mb: 1.5, flexGrow: 1 }}
            fontWeight="bold"
            variant="h6"
            color="black"
          >
            {company == "" ? `$ ${balance} ` : `${company} `}
          </Typography>
          <Box
            sx={{
              border: indicador == "Up" ? "1px solid blue" : "1px solid red",
              padding: "0px 5px 0px 5px",
              borderRadius: "5px",
              backgroundColor: indicador == "Up" ? "#E6F4FF" : "#F79495",
            }}
          >
            {chipContent}
          </Box>
        </Stack>

        <Typography sx={{ marginLeft: "-10px" }} color="grey" variant="caption">
          You made an extra
          <Typography
            color={indicador == "Up" ? "blue" : "red"}
            variant="caption"
            fontWeight="bold"
          >
            {"$" + earnings}
          </Typography>
          this year
        </Typography>
      </CardContent>
    </React.Fragment>
  );
};

export default CardChart;
