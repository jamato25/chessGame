import io from "socket.io-client";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("Connected!");
});

socket.emit("newRoom", { roomCode: newRoomGenerator() });


function newRoomGenerator(){
  return Math.random()*100000000000000;
}
export default socket;
