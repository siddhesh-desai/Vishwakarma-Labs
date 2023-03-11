const socket = io('http://localhost:8000');

const form = document.getElementById("sendcontainer");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container")


const append = (message2, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message2;
  messageElement.classList.add('message')
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
}



const name = prompt("enter your name");
socket.emit('new-user-joined', name);


socket.on('chat-history', messages => {
    messages.sort((a, b) => a.timestamp - b.timestamp); // sort messages by timestamp in ascending order
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










socket.on('recieve', data => {
  const position = data.name === name ? 'right' : 'left';
  append(`${data.name}: ${data.message}`, position);
});

socket.on('user-left-2', name => {
    messages.splice(0, messages.length);
    
  });