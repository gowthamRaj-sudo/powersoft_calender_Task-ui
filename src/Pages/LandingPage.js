import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Logo from "../Assets/Logo.png";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const navItems = ["Home", "Features", "Services", "Blog", "Book a demo"];
  const drawerWidth = 240;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleNavigate = (route) => {
    if (route === "Book a demo") {
      navigate("/bookDemo");
    } else {
      navigate("/");
    }
  };
  const handleMove = (item) => {
    if (item === "Home") {
      navigate("/");
    } else if ("Book a demo") {
      navigate("/bookDemo");
    }
  };
  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          component="nav"
          sx={{ background: "#0c293a", boxShadow: "none" }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                color: "grey",
              }}
            >
              <img src={Logo} alt="logo" />
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button
                  onClick={() => handleNavigate(item)}
                  key={item}
                  variant={`${item === "Book a demo" ? "contained" : ""}`}
                  sx={{
                    color: `${item === "Book a demo" ? "" : "grey"}`,
                    background: `${item === "Book a demo" ? "#37be3d" : ""}`,
                    fontWeight: "700",
                    "&:hover": {
                      background: "white",
                      color: "grey",
                    },
                  }}
                >
                  {item}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
              <Typography variant="h6" sx={{ my: 2 }}>
                <img src={Logo} alt="logo" />
              </Typography>
              <Divider />
              <List>
                {navItems.map((item) => (
                  <ListItem key={item} disablePadding>
                    <ListItemButton
                      sx={{ textAlign: "center" }}
                      onClick={() => handleMove(item)}
                    >
                      <ListItemText primary={item} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        </Box>
      </Box>
      <Box component="main" sx={{ p: 2 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default LandingPage;
