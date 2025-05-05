import React from "react";
import { AppBar, Toolbar, Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeContext } from "../context/ThemeContext";

function Header() {
  const { toggleTheme, mode } = useThemeContext();

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/exchange-rates">Exchange Rates</Button>
        <Button color="inherit" component={Link} to="/about">About</Button>
        <IconButton
          edge="end"
          color="inherit"
          onClick={toggleTheme}
          style={{ marginLeft: "auto" }}
        >
          {mode === "light" ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
