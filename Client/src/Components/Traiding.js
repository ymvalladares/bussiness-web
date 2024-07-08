import { Box, Grid } from "@mui/material";
import React from "react";
import CardChart from "./CardChart";

const charts_content = [
  {
    title: "Total Balance",
    company: "",
    indicador: "Up",
    balance: "400",
    tendencia: "15",
    earnings: "53",
  },
  {
    title: "Profit Earning capacity",
    company: "",
    indicador: "Up",
    balance: "122",
    tendencia: "18",
    earnings: "122",
  },
  {
    title: "Less Profitable Operation",
    company: "Nike",
    indicador: "Down",
    balance: "400",
    tendencia: "25",
    earnings: "-53",
  },
  {
    title: "More Profitable Operation",
    company: "SOFI",
    indicador: "Up",
    balance: "400",
    tendencia: "40",
    earnings: "73",
  },
];

const Traiding = () => {
  return (
    <Box sx={{ padding: "10px", margin: "10px" }}>
      <Grid container spacing={2}>
        {charts_content.map((item, index) => (
          <Grid key={index} item xs={12} md={4} xl={3}>
            <CardChart
              title={item.title}
              company={item.company}
              indicador={item.indicador}
              balance={item.balance}
              tendencia={item.tendencia}
              earnings={item.earnings}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Traiding;
