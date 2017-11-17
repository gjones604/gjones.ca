/*
var app    = require('express')();
var server = require('http').Server(app);
var io     = require('socket.io')(server);
var port   = 3002;

// Listen on port 3002
server.listen(port);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});



var playerPositions = {};
var total = 0;

io.sockets.on('connection', function (socket) {
  // assign a unique id
  socket.number = ++total;
  
  // send the player positions to the server
  socket.emit(playerPositions);
  
  // send the mouse movements to everyone else
  socket.on('mouse movement', function (mouse) {
    playerPositions[socket.number] = mouse.pos;
    socket.broadcast.emit('mouse update', { id: socket.number, pos: mouse.pos });
  });
  
  // send disconnect notice to all clients
  socket.on('disconnect', function () {
    delete playerPositions[socket.number];
    socket.broadcast.emit('mouse disconnect', { id: socket.number });
  });
});
*/