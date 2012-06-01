var net = require('net');
var express = require('express')
var app = express.createServer();
//var socket = net.connect(8777, '127.0.0.1');

/*** Socket server ***/
var clients = [];

net.createServer(function (socket) {

  // Identify this client
  socket.name = socket.remoteAddress + ":" + socket.remotePort 

  // Put this new client in the list
  clients.push(socket);

  // Handle incoming messages from clients.
  socket.on('data', function (data) {
    //TODO: implement registering
  });

  // Remove the client from the list when it leaves
  socket.on('end', function () {
    clients.splice(clients.indexOf(socket), 1);
  });

}).listen(8777);

// Send a message to all clients
function broadcast(message) {
	clients.forEach(function (client) {
	  client.write(message);
	});
	// Log it to the server output too
	process.stdout.write(message)
}

/*** Web service ***/
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

function send(req, res){
	// Send message to connected devices
	broadcast(req.query['msg'] + '\n');
	res.json({sent: true});
}

function home(req, res){
	res.render('home.ejs');
}

app.get('/', home);
app.get('/send', send);

app.listen(3000);