const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const socket = new WebSocket(`${protocol}//${window.location.host}`);

const messagesEl = document.getElementById('messages');
const formEl = document.getElementById('messageForm');
const nameInput = document.getElementById('nameInput');
const textInput = document.getElementById('textInput');

socket.addEventListener('message', (event) => {
  const { name, text } = JSON.parse(event.data);

  const p = document.createElement('p');
  const strong = document.createElement('strong');
  strong.textContent = name + ': ';

  p.appendChild(strong);
  p.appendChild(document.createTextNode(text));
  messagesEl.appendChild(p);
  messagesEl.scrollTop = messagesEl.scrollHeight;
});

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = { name: nameInput.value, text: textInput.value };
  socket.send(JSON.stringify(message));
  textInput.value = '';
});