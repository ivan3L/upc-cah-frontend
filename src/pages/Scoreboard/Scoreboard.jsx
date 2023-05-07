import { Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useState,useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { Score } from '../../components/Score/Score';


export const Scoreboard = () => {
    const location = useLocation();
const [players, setplayers] = useState([])
useEffect(() => {
    console.log(location.state.data.playersInRoom)
  setplayers(location.state.data.playersInRoom)
}, [])

console.log("players,",players)
  return (
    <div style={{display: 'flex', justifyContent:'center', alignItems: 'center', margin: 50, height: '70vh',}}>
    <Card sx={{width: '60%',height: 'auto'}}>
      {players.map((player, index) => (
        <Score key={player.id} player={player} index={index}/>
      ))}
    </Card>
    </div>
  );
}
