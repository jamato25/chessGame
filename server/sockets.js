const { default: socket } = require("../client/sockets");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(
      `A socket connection to the server has been made: ${socket.id}`
    );

    socket.on("room", (data) => {
      console.log(data);
    });

    socket.on("disconnect", () => {
      console.log(`Connection ${socket.id} has left the building`);
    });

    socket.on("move", (data) => {
      console.log('hello')
    })
  });


  io.on("move", (data) =>{
    console.log('hello')
    socket.emit("move", data)
  })
};
