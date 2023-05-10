import React from 'react';
import { Card, CardContent, Grid, Typography, Avatar } from '@mui/material';
import '../../fonts.css'; // Import the font CSS file

export const Score = ({ player, index }) => {
  return (
    <Card key={player.id} style={{ marginBottom: '0px', width: '95%', height: '68px', margin: 5, backgroundColor: '#EFEFFF' }}>
      <CardContent>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h5" component="h2" style={{ fontFamily: 'Axiforma Heavy', color: 'yellow', WebkitTextStroke: '2px black', textStroke: '1px black' }}>
              {`${index + 1}`}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              alt="Player Avatar"
              src={player ? player.user.picture : ""}
              sx={{ marginLeft: "1rem", marginRight: "1rem" }}
            />
          </Grid>
          <Grid item>
            <Typography variant="h5" component="h2" style={{ fontFamily: 'Axiforma Heavy' }}>
              {player.name}
            </Typography>
          </Grid>
          <Grid item sx={{ marginLeft: 'auto' }}>
            <Typography variant="h5" component="h2" style={{ fontFamily: 'Axiforma Heavy' }}>
              {player.score}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
