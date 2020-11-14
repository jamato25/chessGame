import io from "socket.io-client";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("Connected!");
});

socket.emit("room", { roomCode: "room1" });

export default socket;
