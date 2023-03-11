const socket = io('http://localhost:8000');

const form = document.getElementById("sendcontainer");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container")


const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add('message')
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
}



const name = prompt("enter your name");
socket.emit('new-user-joined', name);


socket.on('chat-history', messages => {
  messages.forEach(data => {
    const position = data.name === name ? 'right' : 'left';
    append(`${data.name}: ${data.message}`, position);
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  if (message.trim() !== '') {
    append(`${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
  }
});








socket.on('user-joined', name => {
  append(`you joined`, 'right');
  append(`${name} joined the chat`, 'right');
});

socket.on('recieve', data => {
  const position = data.name === name ? 'right' : 'left';
  append(`${data.name}: ${data.message}`, position);
});

socket.on('user-left', name => {
  append(`${name} left the chat`, 'right');
});
