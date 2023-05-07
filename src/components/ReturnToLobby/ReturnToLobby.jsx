import React from "react";
import { Button, Menu, MenuItem, Grid, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../../fonts.css"; // Adjust the path based on your actual file structure

export const ReturnToLobby = () => {
  const navigate = useNavigate();

  const goToLobby = () => {
    // Perform logout logic if needed
    navigate("/lobby");
  };

  return (
    <div style={{ position: "absolute", top: 0, left: 0 }}>
      <Button
        onClick={goToLobby}
        style={{
          background: "black",
          color: "white",
          fontWeight: "bold",
          borderTopRightRadius: "0",
          borderBottomRightRadius: "8px",
          borderTopLeftRadius: "0",
          borderBottomLeftRadius: "0", // Only the bottom-left corner is curved
          fontSize: "1rem", // Relative font size
          minWidth: "120px", // Minimum width to maintain the button size
          paddingRight: "1rem", // Adjust the right padding to accommodate the larger icon
          fontFamily: "Axiforma Heavy, sans-serif", // Set the font family to Axiforma Heavy
          height: "52px", // Increased height
        }}
      >
        <ArrowBackIcon style={{ marginRight: "0.5rem" }} />
        RETURN
      </Button>
    </div>
  );
};
