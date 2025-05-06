import React, { useState } from "react";
import { AppBar, Toolbar, Button, Box, useTheme, useMediaQuery, Drawer, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";
import CloseIcon from "@mui/icons-material/Close";

function Header() {
  const { toggleTheme, mode } = useThemeContext();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm")); // For responsive layout
  const [openDrawer, setOpenDrawer] = useState(false); // To control Drawer (sidebar) visibility

  // Function to toggle drawer
  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <>
      {matches && (
        <AppBar
          position="static"
          sx={{
            backgroundColor: mode === "dark" ? "" : "#ffffff", // Dark mode bg is black, light mode is white
            color: mode === "dark" ? "white" : "black", // Dark mode text is white, light mode text is black
            boxShadow: "none",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Left Section */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                color="inherit"
                component={Link}
                to="/"
                sx={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  textTransform: "none",
                  backgroundColor: mode === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
                  borderRadius: "20px",
                  padding: "5px 10px",
                  margin: "0 12px",
                  '&:hover': {
                    backgroundColor: mode === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                Home
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/exchange-rates"
                sx={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  textTransform: "none",
                  backgroundColor: mode === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
                  borderRadius: "20px",
                  padding: "5px 10px",
                  margin: "0 12px",
                  '&:hover': {
                    backgroundColor: mode === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                Exchange Rates
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/about"
                sx={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  textTransform: "none",
                  backgroundColor: mode === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
                  padding: "5px 10px",
                  borderRadius: "20px",
                  margin: "0 12px",
                  '&:hover': {
                    backgroundColor: mode === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                About
              </Button>
            </Box>

            {/* Right Section: Theme Toggle */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                onClick={toggleTheme}
                sx={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  textTransform: "none",
                  backgroundColor: mode === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)", // Same background color for the toggle button
                  color: "inherit",
                  '&:hover': {
                    backgroundColor: mode === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.2)",
                  },
                  padding: "5px 10px",
                  borderRadius: "20px",
                }}
              >
                {mode === "light" ? "Dark Mode" : "Light Mode"}
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      )}

      {/* Drawer (Sidebar) for Mobile */}
      {!matches && (
        <Drawer
          anchor="right"
          open={openDrawer}
          onClose={handleDrawerToggle}
          sx={{
            "& .MuiDrawer-paper": {
              backgroundColor: mode === "dark" ? "#121212" : "#ffffff", // Dark mode and light mode styles
              color: mode === "dark" ? "white" : "black",
              padding: 2,
            },
          }}
        >
          <Box>
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
            <Box sx={{ padding: "20px 0" }}>
              <Button
                color="inherit"
                component={Link}
                to="/"
                sx={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  textTransform: "none",
                  marginBottom: "12px",
                  width: "100%",
                }}
              >
                Home
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/exchange-rates"
                sx={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  textTransform: "none",
                  marginBottom: "12px",
                  width: "100%",
                }}
              >
                Exchange Rates
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/about"
                sx={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  textTransform: "none",
                  width: "100%",
                }}
              >
                About
              </Button>
            </Box>
          </Box>
        </Drawer>
      )}
    </>
  );
}

export default Header;
