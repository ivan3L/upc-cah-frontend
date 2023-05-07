import React from "react";
import { Card, Typography } from "@mui/material";

export const BlackCard = ({ blackCard }) => {
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
            height: 100,
            width: 900,
            backgroundColor: "rgba(193, 193, 193, 0)",
            border: "none",
            boxShadow: "none",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              padding: 2,
              wordBreak: "break-word",
              fontFamily: "Axiforma Heavy, sans-serif",
              fontSize: "1.7rem",
              textTransform: "uppercase", // Make the text uppercase
              color: "white",
              textShadow: "1px 1px 1px black",
              WebkitTextStroke: "1.5px black",
              WebkitTextFillColor: "white",
            }}
          >
            {blackCard.question}
          </Typography>
        </Card>
      ) : null}
    </div>
  );
};
