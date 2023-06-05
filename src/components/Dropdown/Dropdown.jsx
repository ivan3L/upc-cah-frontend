import React from "react";
import { Button, Menu, MenuItem, Grid, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import useLocalStorage from "../../hooks/useLocalStorage";
import "../../fonts.css"; // Adjust the path based on your actual file structure

export const Dropdown = () => {
  const [user] = useLocalStorage("user");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    // Perform logout logic if needed
    navigate("/login");
  };

  return (
    <div style={{ position: "absolute", top: 0, right: 0 }}>
      <Button
        onClick={handleOpenMenu}
        style={{
          background: "black",
          color: "white",
          fontWeight: "bold",
          borderTopRightRadius: "0",
          borderBottomRightRadius: "0",
          borderTopLeftRadius: "0",
          borderBottomLeftRadius: "8px", // Only the bottom-left corner is curved
          fontSize: "1rem", // Relative font size
          minWidth: "120px", // Minimum width to maintain the button size
          paddingRight: "1rem", // Adjust the right padding to accommodate the larger icon
          fontFamily: "Axiforma Heavy, sans-serif", // Set the font family to Axiforma Heavy
        }}
        endIcon={
          menuOpen ? (
            <ArrowDropUpIcon style={{ fontSize: 35 }} />
          ) : (
            <ArrowDropDownIcon style={{ fontSize: 35 }} />
          )
        }
      >
        <Grid
          className="avatar"
          item
          xs={12}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Avatar
            alt="Remy Sharp"
            src={user ? user.picture : ""}
            sx={{ marginRight: "0.5rem" }}
          />
          <span>{user ? user.name : ""}</span>
        </Grid>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        getContentAnchorEl={null} // Prevents the menu from being misaligned
      >
        <MenuItem
          onClick={handleLogout}
          style={{
            fontWeight: "bold",
            width: "120px",
            fontFamily: "Axiforma Heavy",
            color: "black",
          }}
        >
          Log out
        </MenuItem>
      </Menu>
    </div>
  );
};
