const WebSocket = require('ws');
const socket = new WebSocket.Server({ port: 3030 });

socket.on('connection', ws => {
  ws.on('message', data => {
    socket.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data)
      }
    })
  })
})