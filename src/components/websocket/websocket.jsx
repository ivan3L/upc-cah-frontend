import  { useEffect } from 'react';
import { createWebSocketServer } from '../../services/websocket/websocket';

const WebSocketServer = () => {
  useEffect(() => {
    createWebSocketServer();
  }, []);

  return null;
};

export default WebSocketServer;
