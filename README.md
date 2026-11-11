
# Real-Time Chat Application

A real-time chat application built using Node.js, Express.js, and Socket.IO.

## Features

- Real-time messaging between users.
- Usernames displayed with messages.
- Message timestamps.
- Online user count.
- User connection and disconnection notifications.
- Typing indicators.
- Send messages using the Enter key.
- Automatic scrolling to new messages.

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- Socket.IO

## Project Structure

realtime_chat_application/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── node_modules/
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md

## Installation and Setup

1. Clone the repository:

   git clone YOUR_GITHUB_REPOSITORY_URL

2. Navigate into the project folder:

   cd realtime_chat_application

3. Install dependencies:

   npm install

4. Start the server:

   node server.js

5. Open your browser and visit:

   http://localhost:5000

## How It Works

The application uses Express.js to create the server and Socket.IO to enable real-time communication between connected users.

When a user sends a message, Socket.IO sends it to the server, which broadcasts it to all connected users.

## Future Improvements

- User authentication.
- Database integration for storing chat history.
- Private messaging.
- Online deployment.
