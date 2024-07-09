// import React, { useEffect, useState } from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";

import CoPresentIcon from "@mui/icons-material/CoPresent";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AppSettingsAltIcon from "@mui/icons-material/AppSettingsAlt";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";

// import MailIcon from "@mui/icons-material/Mail";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import {
//   Badge,
//   Divider,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
// } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
// import Menu_Avatar from "./Menu_Avatar";
// import { Link } from "react-router-dom";

// import { jwtDecode } from "jwt-decode";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ForumIcon from "@mui/icons-material/Forum";
import Menu_Avatar from "./Menu_Avatar";
import iconPage from "../Images/iconPage.jpg";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Stack } from "@mui/material";

const menu_sidebar = [
  {
    title: "Welcome",
    to: "/home-page/welcome",
    icon: <CoPresentIcon />,
    color: "#044D81",
  },
  {
    title: "Dashboard",
    to: "/home-page/dashboard",
    icon: <DashboardIcon />,
    color: "#044D81",
  },
  {
    title: "Traiding",
    to: "/home-page/traiding",
    icon: <AccountBalanceIcon />,
    color: "#6F2746",
  },
  {
    title: "Aplications",
    to: "/home-page/apps",
    icon: <AppSettingsAltIcon />,
    color: "#4F3B9E",
  },
  {
    title: "Product Views",
    to: "/home-page/products",
    icon: <ProductionQuantityLimitsIcon />,
    color: "#4F3B9E",
  },
  {
    title: "Settings",
    to: "/software-settings",
    icon: <SettingsIcon />,
    color: "#8A8E9C",
  },
];

const drawerWidth = 310;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    //padding: "20px",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    margin: "70px 15px 5px 0px",
    borderRadius: "20px",
    marginLeft: `-295px`,
    //marginRight: `20px`,
    borderTopRightRadius: "20px",

    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      margin: "70px 15px 15px 15px",
      marginLeft: "1px",
      borderRadius: "0px 20px 20px 0px",
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: "white",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: "100%",
    backgroundColor: "white",
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "center",
}));

const Navbar = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  // const [open, setOpen] = useState(false);
  const large_devices = useMediaQuery("(min-width:600px)");
  let location = useLocation();
  // const [user, setUser] = useState({});

  React.useEffect(() => {
    if (large_devices) setOpen(true);
    // const token = localStorage.getItem("TOKEN_KEY");
    // const decoded = jwtDecode(token);
    // setUser(decoded);
  }, []);

  const handleDrawerWithDrawerButton = () => {
    if (!large_devices) setOpen(false);
  };

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        sx={{
          boxShadow: "none",
          ...(large_devices && { zIndex: (theme) => theme.zIndex.drawer + 1 }),
        }}
        position="fixed"
        open={open}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                sx={{
                  height: 60,
                  marginRight: "8px",
                  ...(!large_devices && { display: "none" }),
                }}
                alt="Your logo."
                src={iconPage}
              />
              <Typography
                sx={{
                  marginRight: "80px",
                  ...(!large_devices && { display: "none" }),
                }}
                variant="h6"
                fontWeight="bold"
                noWrap
                color="primary"
              >
                SweetDreams
              </Typography>
              <IconButton
                aria-label="open drawer"
                onClick={handleDrawer}
                size="small"
                edge="start"
                sx={{
                  ml: 1,
                  borderRadius: "8px",
                  backgroundColor: "#EDE7F6",
                  color: "#8E05C2",
                  transition: "0.3s",
                  "&:hover": {
                    backgroundColor: "#8E05C2",
                    color: "#EDE7F6",
                    borderRadius: "8px",
                    transition: "0.5s",
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>
          <Box>
            <IconButton
              size="small"
              aria-label="notificaions"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="black"
              sx={{
                mr: 2,
                borderRadius: "8px",
                backgroundColor: "#EDE7F6",
                color: "#8E05C2",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "#8E05C2",
                  color: "#EDE7F6",
                  borderRadius: "8px",
                  transition: "0.5s",
                },
              }}
            >
              <NotificationsIcon />
            </IconButton>
            <IconButton
              size="small"
              aria-label="messages"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="black"
              sx={{
                borderRadius: "8px",
                backgroundColor: "#EDE7F6",
                color: "#8E05C2",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "#8E05C2",
                  color: "#EDE7F6",
                  borderRadius: "8px",
                  transition: "0.5s",
                },
              }}
            >
              <ForumIcon />
            </IconButton>
            <Menu_Avatar Username="Ymvalladares" />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Box
            component="img"
            sx={{
              height: 50,
              marginRight: "10px",
            }}
            alt="Your logo."
            src={iconPage}
          />
          <Typography
            sx={{
              ...(large_devices && { display: "none" }),
            }}
            variant="h6"
            fontWeight="bold"
            noWrap
            color="primary"
          >
            SweetDreams
          </Typography>
        </DrawerHeader>
        <List
          sx={{
            // selected and (selected + hover) states
            "&& .Mui-selected": {
              width: "90%",
              marginLeft: "15px",
              bgcolor: "#EDE7F6",
              transition: "all 0.3s",
              borderRadius: "8px",
              fontWeight: "bold",
              "&, & .MuiListItemIcon-root": {
                color: "#8E05C2",
              },
            },
            // hover states
            "& .MuiListItemButton-root:hover": {
              bgcolor: "#EDE7F6",
              transition: "all 0.3s",
              borderRadius: "8px",
              color: "#8E05C2",
              "&, & .MuiListItemIcon-root": {
                color: "#8E05C2",
              },
            },
          }}
        >
          {menu_sidebar.map((item, index) => (
            <ListItem
              sx={{
                paddingLeft: "15px",
                paddingRight: "15px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
              onClick={handleDrawerWithDrawerButton}
              key={index}
              disablePadding
              component={Link}
              to={item.to}
              selected={location.pathname === item.to}
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            padding: "15px",
            margin: "14px",
            width: "90%",
            height: "150px",
            backgroundColor: "#FAFAFB",
            borderRadius: "15px",
          }}
        >
          footer
        </Box>
      </Drawer>
      <Main
        sx={{
          backgroundColor: "#FAFAFB",
          minHeight: "88vh",
        }}
        open={open}
      >
        <Outlet />
      </Main>
    </Box>
  );
};
export default Navbar;
