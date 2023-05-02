import React, { useEffect } from "react";
import { Card, Typography } from "@mui/material";

export const BlackCard = ({ blackCard }) => {
  console.log("blackCard", blackCard);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginBlock: 20,
      }}
    >
      {blackCard && blackCard.question ? (
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
            {blackCard.question}
          </Typography>
        </Card>
      ) : null}
    </div>
  );
};
