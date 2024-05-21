const WebSocket = require('ws');
const deploy = require('./deploy');

async function main() {
  const contractData = await deploy();
  const wss = new WebSocket.Server({ port: process.env.WS_PORT || 3001 });

  wss.on('connection', function connection(ws) {
    console.log('WebSocket Server connection');
    ws.send(JSON.stringify(contractData));
    console.log('Sent contract data over WebSocket');

    ws.on('close', function close() {
      console.log('WebSocket connection closed');
    });

    ws.on('error', function error(err) {
      console.error('WebSocket error:', err);
    });
  });

  console.log('WebSocket server running and waiting for connections...');
}

main()
  .then(() => {
    console.log("Mocked Node running ...");
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
