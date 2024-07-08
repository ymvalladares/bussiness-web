import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
//icons
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import UserImage from "../Images/user.png";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, Typography } from "@mui/material";
import { Pots_Request } from "../Services/AxiosRequest";
import { useNavigate } from "react-router-dom";
import { StopChatConnection } from "../Services/ChatService";
import { Context } from "../Context/context";

const Menu_Avatar = ({ Username }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const Navigate = useNavigate();
  const ctx = useContext(Context);

  // console.log(ctx);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    //console.log(state.email);
    setAnchorEl(null);
  };

  const logout = (username) => {
    // StopChatConnection();
    // Pots_Request(window.BaseUrlGeneral + `Account/Logout`, username)
    //   .then((response) => {
    //     if (response.status == "200") {
    //       localStorage.removeItem("TOKEN_KEY");
    //       return Navigate("/login");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // ctx.connection.stop(() => {
    //   console.log("Connection Closed");
    // });
    localStorage.removeItem("TOKEN_KEY");
    return Navigate("/login");
  };

  return (
    <React.Fragment>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar sx={{ width: 35, height: 35, background: "purple" }}>Y</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        sx={{ borderRadius: "25px !important" }}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 35,
              height: 35,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar alt="Travis Howard" src={UserImage} />
          <span
            style={{
              fontSize: "13px",
              fontWeight: "bold",
              marginRight: "10px",
            }}
          >
            {Username}
          </span>
        </MenuItem>
        <Divider />
        <MenuItem
          style={{ fontSize: "13px", fontWeight: "bold" }}
          onClick={handleClose}
        >
          <PersonIcon style={{ color: "red", marginRight: "10px" }} />
          <span>My Account</span>
        </MenuItem>
        <Divider />
        <MenuItem
          style={{ fontSize: "13px", fontWeight: "bold" }}
          onClick={handleClose}
        >
          <MailIcon style={{ color: "red", marginRight: "10px" }} />
          <span>Messages</span>
          <Badge
            sx={{ marginLeft: "137px" }}
            badgeContent={17}
            color="error"
          ></Badge>
        </MenuItem>
        <Divider />
        <MenuItem
          style={{ fontSize: "13px", fontWeight: "bold", marginLeft: "3px" }}
          onClick={handleClose}
        >
          <NotificationsIcon
            style={{ color: "blue", marginLeft: "-2px", marginRight: "10px" }}
          />
          <span>Notifications</span>
          <Badge
            sx={{ marginLeft: "120px", marginRight: "8px" }}
            badgeContent={17}
            color="error"
          ></Badge>
        </MenuItem>
        <MenuItem
          style={{ fontSize: "13px", fontWeight: "bold" }}
          onClick={handleClose}
        >
          <SettingsIcon style={{ color: "blue", marginRight: "10px" }} />
          <span>Settings</span>
        </MenuItem>
        <Divider />
        <MenuItem
          style={{ fontSize: "13px", fontWeight: "bold", marginLeft: "3px" }}
          onClick={() => logout(Username)}
        >
          <LogoutIcon style={{ color: "blue", marginRight: "10px" }} />
          <span>Logout</span>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default Menu_Avatar;
