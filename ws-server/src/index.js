import { WebSocketServer } from 'ws';
import { createServer } from 'https';
import { readFileSync } from 'fs';

const server = createServer({
  cert: readFileSync('path/to/cert'),
  key: readFileSync('path/to/key'),
});

const ws = new WebSocketServer({ server });

ws.on('connection', (socket) => {
  socket.on('message', (data) => {
    const message = data.toString();
    console.log(message);
    if (message === 'start') {
      let i = 1;
      const interval = setInterval(() => {
        socket.send(i++);
        if (i > 10) clearInterval(interval);
      }, 1000);
    } else {
      socket.send('hello, client');
    }
  });
});

server.listen(3088);
