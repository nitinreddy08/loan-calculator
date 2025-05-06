import React, { useState } from "react";
import { AppBar, Toolbar, Button, Box, useTheme, useMediaQuery, Drawer, IconButton, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

function Header() {
  const { toggleTheme, mode } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openDrawer, setOpenDrawer] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  const navItems = [
    { name: "Home", path: "/", icon: <HomeIcon /> },
    { name: "Exchange Rates", path: "/exchange-rates", icon: <CurrencyExchangeIcon /> },
    { name: "About", path: "/about", icon: <InfoIcon /> }
  ];

  const getCurrentNavValue = () => {
    const currentPath = location.pathname;
    const foundItem = navItems.find(item => item.path === currentPath);
    return foundItem ? navItems.indexOf(foundItem) : 0;
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={1}
      sx={{
        backgroundColor: mode === "dark" ? "#121212" : "#ffffff",
        color: mode === "dark" ? "white" : "black",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", padding: { xs: "8px 16px", md: "8px 24px" } }}>
        {/* Logo/Brand */}
        <Box 
          component={Link} 
          to="/"
          sx={{ 
            fontWeight: 700, 
            fontSize: "1.5rem", 
            textDecoration: "none", 
            color: "inherit",
            display: "flex",
            alignItems: "center"
          }}
        >
          Loan EMI Calculator App
        </Box>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                color="inherit"
                component={Link}
                to={item.path}
                sx={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  textTransform: "none",
                  borderRadius: "8px",
                  padding: "6px 16px",
                  transition: "all 0.2s ease",
                  '&:hover': {
                    backgroundColor: mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                    transform: "translateY(-2px)"
                  },
                }}
              >
                {item.name}
              </Button>
            ))}

            {/* Theme Toggle Button */}
            <Button
              onClick={toggleTheme}
              variant="outlined"
              sx={{
                fontSize: "0.9rem",
                fontWeight: 500,
                textTransform: "none",
                borderRadius: "8px",
                marginLeft: 2,
                borderColor: mode === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.2)",
                color: "inherit",
                '&:hover': {
                  borderColor: mode === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.3)",
                  backgroundColor: mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)",
                },
              }}
            >
              {mode === "light" ? "Dark Mode" : "Light Mode"}
            </Button>
          </Box>
        )}

        {/* Mobile Menu Icon */}
        {isMobile && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton 
              edge="end" 
              color="inherit" 
              aria-label="menu" 
              onClick={handleDrawerToggle}
              sx={{
                backgroundColor: mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                '&:hover': {
                  backgroundColor: mode === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        )}
      </Toolbar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            width: "70%",
            maxWidth: "300px",
            backgroundColor: mode === "dark" ? "#1E1E1E" : "#ffffff",
            color: mode === "dark" ? "white" : "black",
          }
        }}
      >
        <Box sx={{ padding: "20px" }}>
          {/* Drawer Header */}
          <Box sx={{ display: "flex", alignItems: "left", mb: 3 }}>
            
            <IconButton onClick={handleDrawerToggle} color="inherit">
              <CloseIcon />
            </IconButton>
          </Box>
          
          {/* Drawer Menu Items */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                color="inherit"
                component={Link}
                to={item.path}
                onClick={handleDrawerToggle}
                sx={{
                  fontSize: "1rem",
                  fontWeight: 500,
                  textTransform: "none",
                  justifyContent: "flex-start",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  '&:hover': {
                    backgroundColor: mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                  },
                }}
              >
                {item.name}
              </Button>
            ))}

            {/* Theme Toggle in Drawer */}
            <Button
              onClick={() => {
                toggleTheme();
                handleDrawerToggle();
              }}
              variant="outlined"
              sx={{
                fontSize: "1rem",
                fontWeight: 500,
                textTransform: "none",
                justifyContent: "flex-start",
                padding: "12px 16px",
                marginTop: 2,
                borderRadius: "8px",
                borderColor: mode === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.2)",
                '&:hover': {
                  borderColor: mode === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.3)",
                  backgroundColor: mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)",
                },
              }}
            >
              {mode === "light" ? "Dark Mode" : "Light Mode"}
            </Button>
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default Header;