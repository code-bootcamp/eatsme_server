const socket = io('http://localhost');

function sendMessage() {
  const message = document.getElementById('message-input').value;
  socket.emit('message', message);
}

socket.on('message', (message) => {
  const chatWindow = document.getElementById('chat-window');
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  chatWindow.appendChild(messageElement);
});
