let socket;
let userList = ["user1"];
const currentUrl = window.location.href;
const url = new URL(currentUrl);

const username = url.searchParams.get("username");
const room = url.searchParams.get("room");

if (!username || !room) {
    window.location.href = "index.html";
} else {
    socket = io();
}
showUserList();

socket.emit("join-room", { username, room });

// socket.on("push-join-response", (allUser) => {
//     userList = [...allUser];
//     showUserList();
// });

function showUserList() {
    const ulElem = document.getElementById("users");

    for (let user of userList) {
        const liElem = createUserLi(user);
        ulElem.appendChild(liElem);
    }
    console.log(ulElem);
}

function createUserLi(user) {
    const div = document.createElement("li");
    div.textContent = user;
    return div;
}
