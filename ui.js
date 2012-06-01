var net = require('net');
var express = require('express')
var app = express.createServer();
var socket = net.connect(8777, '127.0.0.1');

app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

function send(req, res){
	console.log(req.query['msg'])
	socket.write(req.query['msg'] + '\n');
	res.json({sent: true});
}

function home(req, res){
	res.render('home.ejs');
}

app.get('/', home);
app.get('/send', send);

app.listen(3000);