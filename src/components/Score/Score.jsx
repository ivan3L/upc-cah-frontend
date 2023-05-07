import React from 'react'
import { Card, CardContent, Grid, Typography } from '@mui/material';


export const Score = ({player, index}) => {
  return (
    <Card key={player.id} style={{ marginBottom: '10px', width: '95%', margin: 20 }}>
          <CardContent>
          <Grid container sx={{justifyContent: 'space-between'}}>
              <Grid item>
                <Typography variant="h5" component="h2">
                  {`${index + 1}. ${player.name}`}
                </Typography>
              </Grid>
              <Grid item>
                <Typography color="textSecondary">
                  Score: {player.score}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
  )
}
