let socket;
const currentUrl = window.location.href;
const url = new URL(currentUrl);

const username = url.searchParams.get("username");
const room = url.searchParams.get("room");

if (!username || !room) {
    window.location.href = "index.html";
} else {
    socket = io();
}

socket.emit("join-room", { username, room });

socket.on("broadcast", ({ user, msg, time }) => {
    displayMsg(user, msg, time);
});

// chat
const form = document.getElementById("chat-form");
const sendBtn = document.getElementById("send");
const msgContainer = document.getElementsByClassName("chat-messages")[0];
const msgInput = document.getElementById("msg");

function displayMsg(user, msgBody, time) {
    const mainDiv = document.createElement("div");
    mainDiv.className = "message";

    let divString = `<p class="meta">${user} <span>${time}</span></p>
    <p class="text">
      ${msgBody}
    </p>`;

    mainDiv.innerHTML = divString;
    msgContainer.appendChild(mainDiv);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const time = moment().format("LT");

    const msg = msgInput.value;
    displayMsg(username, msg, time);
    msgInput.value = "";

    socket.emit("send-msg", {
        user: username,
        msg: msg,
        room: room,
        time: time,
    });
});
