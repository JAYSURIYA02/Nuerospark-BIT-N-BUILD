function sendMessage() {
    const messageInput = document.getElementById('user-input');
    const message = messageInput.value.trim();

    if (message === '') {
        return;
    }

    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += <div class="user-message">You: ${message}</div>;
    messageInput.value = '';

    fetch('http://127.0.0.1:5000/chat', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        chatBox.innerHTML += <div class="bot-response">Bot: ${data.answer}</div>;
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => {
        chatBox.innerHTML += <div class="bot-response">Bot: Sorry, something went wrong.</div>;
    });
}