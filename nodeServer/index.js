const users = {};

const messages = [];


const io = require('socket.io')(8000, {
  cors: {
    origin: "http://127.0.0.1:5501",
    methods: ["GET", "POST"]
  }
});

io.on('connection', socket => {
  socket.on('new-user-joined', name => {
    console.log("New user", name);
    users[socket.id] = name;
    socket.emit('chat-history', messages);
    // send chat history to the new user
    socket.broadcast.emit('user-joined', name);
  });

  socket.on('send', message => {
    const data = { message: message, name: users[socket.id] };

    messages.push(data); // add the message to the array

    socket.broadcast.emit('recieve', data);

  });

  socket.on('disconnect', message => {
    socket.broadcast.emit('user-left', users[socket.id]);
    socket.broadcast.emit('user-left-2', users[socket.id]);
    delete users[socket.id];
  });
});
