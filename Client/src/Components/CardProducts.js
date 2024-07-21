import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  CardActionArea,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  Rating,
  Stack,
} from "@mui/material";
import img from "../Images/bg2.webp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

const CardProducts = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <Divider />
        <CardMedia
          component="img"
          height="140"
          image={img}
          alt="green iguana"
        />
        <Divider />
        <CardActions>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton sx={{ marginRight: "35px" }} aria-label="share">
            <ShareIcon />
          </IconButton>
          <Rating
            sx={{
              fontSize: "15px",
              "& .MuiRating-icon": {
                width: "0.1px",
                marginRight: "-22px",
              },
            }}
            name="read-only"
            value={4.5}
            readOnly
          />
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default CardProducts;
