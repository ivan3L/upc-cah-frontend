import React from "react";
import { Card, Typography } from "@mui/material";

export const BlackCard = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginBlock: 20,
      }}
    >
      <Card
        sx={{
          backgroundColor: "black",
          color: "white",
          height: 225,
          width: 175,
          borderRadius: 5,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Typography sx={{ padding: 2, wordBreak: "break-word" }}>
          tu texto aqui
        </Typography>
      </Card>
    </div>
  );
};
