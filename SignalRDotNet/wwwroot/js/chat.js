"use strict";

let connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    const decodedMessage = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const fullMessage = user + " says " + decodedMessage;
    const listItem = document.createElement("li");
    listItem.textContent = fullMessage;
    document.getElementById("messagesList").appendChild(listItem);
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (error) {
    console.error(error.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    const user = document.getElementById("userInput").value;
    const message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (error) {
        console.error(error.toString());
    });
    event.preventDefault();
});