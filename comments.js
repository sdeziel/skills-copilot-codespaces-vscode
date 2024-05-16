// Create web server
const express = require("express");
const app = express();
// Create a web server
const server = require("http").createServer(app);
// Create a socket server
const io = require("socket.io")(server);
// Create a path to the comments
// Create a path to the comments
const comments = [
    {
        name: "John",
        comment: "Hello!"
    }
];

// When a user connects to the server, send them the comments
io.on("connection", socket => {
    // Send the comments to the client
    socket.emit("comments", comments);

    // When a user posts a comment
    socket.on("comment", comment => {
        // Add the comment to the comments array
        comments.push(comment);
        // Send the new comments to all clients
        io.emit("comments", comments);
    });
});

// Listen on port 3000
server.listen(3000, () => {
    console.log("Server running on port 3000");
});

// Path: public/index.html
<!DOCTYPE html>
<html>
<head>
    <title>Comments</title>
</head>
<body>
    <ul id="comments"></ul>
    <form id="comment-form">
        <input type="text" id="name" placeholder="Name">
        <input type="text" id="comment" placeholder="Comment">
        <button type="submit">Submit</button>
    </form>
    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
        const comments = document.getElementById("comments");
        const form = document.getElementById("comment-form");
        const name = document.getElementById("name");
        const comment = document.getElementById("comment");

        socket.on("comments", newComments => {
            comments.innerHTML = "";
            newComments.forEach(comment => {
                const li = document.createElement("li");
                li.textContent = `${comment.name}: ${comment.comment}`;
                comments.appendChild(li);
            });
        });

        form.addEventListener("submit", event => {
            event.preventDefault();
            socket.emit("comment", {
                name: name.value,
                comment: comment.value
            });
            name.value = "";
            comment.value = "";
        });
    </script>
</body>
</html>