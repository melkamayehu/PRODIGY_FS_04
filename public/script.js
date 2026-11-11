
const socket = io();

// Select HTML elements
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("sendBtn");
const messagesContainer = document.getElementById("messages");
const onlineCount = document.getElementById("onlineCount");
const typing = document.getElementById("typing");

let typingTimer;

// Function to send messages
function sendMessage() {

    const username = usernameInput.value.trim();
    const message = messageInput.value.trim();

    if (username === "" || message === "") {
        alert("Please enter your username and message.");
        return;
    }

    const chatData = {
        username: username,
        message: message
    };

    socket.emit("chatMessage", chatData);

    messageInput.value = "";

    clearTimeout(typingTimer);

    socket.emit("stopTyping");

}

// Send message using button
sendButton.addEventListener("click", sendMessage);

// Send message using Enter key
messageInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});

// Receive messages
socket.on("chatMessage", function(data) {

    const messageElement = document.createElement("div");

    const usernameElement = document.createElement("strong");
    usernameElement.textContent = data.username;

    const textElement = document.createElement("p");
    textElement.textContent = data.message;

    const timeElement = document.createElement("small");
    timeElement.textContent = data.time;

    messageElement.appendChild(usernameElement);
    messageElement.appendChild(textElement);
    messageElement.appendChild(timeElement);

    if (data.username === usernameInput.value.trim()) {
        messageElement.classList.add("my-message");
    } else {
        messageElement.classList.add("other-message");
    }

    messagesContainer.appendChild(messageElement);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;

});

// Receive connection notifications
socket.on("userStatus", function(message) {

    const statusElement = document.createElement("p");

    const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    statusElement.textContent = `${message} · ${currentTime}`;

    statusElement.classList.add("status-message");

    messagesContainer.appendChild(statusElement);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;

});

// Receive online user count
socket.on("userCount", function(count) {

    onlineCount.textContent = `Online users: ${count}`;

});

// Detect when someone types
messageInput.addEventListener("input", function() {

    if (messageInput.value.trim() === "") {
        clearTimeout(typingTimer);
        socket.emit("stopTyping");
        return;
    }

    socket.emit("typing");

    clearTimeout(typingTimer);

    typingTimer = setTimeout(function() {

        socket.emit("stopTyping");

    }, 1000);

});

// Display typing notification
socket.on("typing", function() {

    typing.textContent = "Someone is typing...";

});

// Remove typing notification
socket.on("stopTyping", function() {

    typing.textContent = "";

});

