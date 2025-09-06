const net = require('net');
const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const TCP_PORT = 3000; // the port mairlist u put in mairlist
const HTTP_PORT = 8080; // the port to listen to

let currentTitle = 'No title';


const tcpServer = net.createServer(socket => {
  console.log('Client TCP connecté');

  socket.on('data', data => {
    const message = data.toString().trim();
    console.log('Reçu de mAirList:', message);

    currentTitle = message;

 
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ title: currentTitle }));
      }
    });
  });

  socket.on('end', () => {
    console.log('Client TCP déconnecté');
  });

  socket.on('error', err => {
    console.error('Erreur socket TCP:', err);
  });
});

tcpServer.listen(TCP_PORT, () => {
  console.log(`Serveur TCP en écoute sur le port ${TCP_PORT}`);
});

// Serveur HTTP
const httpServer = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Erreur serveur');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (req.url === '/titrage') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(currentTitle);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

httpServer.listen(HTTP_PORT, () => {
  console.log(`Serveur HTTP en écoute sur le port ${HTTP_PORT}`);
});

const wss = new WebSocket.Server({ server: httpServer });

wss.on('connection', ws => {
  console.log('Client WebSocket connecté');

  ws.send(JSON.stringify({ title: currentTitle }));

  ws.on('close', () => {
    console.log('Client WebSocket déconnecté');
  });

  ws.on('error', err => {
    console.error('Erreur WebSocket:', err);
  });
});
