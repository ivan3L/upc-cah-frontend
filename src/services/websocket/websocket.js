

let socket = null;

export const createWebSocketServer = () => {
  const server = new WebSocket('ws://localhost:8080');
  server.onopen = (ws) => {
    console.log("WS", ws)
    socket = ws
    console.log('WebSocket is open now2.');
  };
 
};

export const getWebSocket = () => socket;
