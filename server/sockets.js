const connections = [];
module.exports = (io) => {
  io.on("connection", (socket) => {

    connections.push(socket.id);
    console.log(connections)
    if(connections.length>1){
      socket.emit('player2', {boardOrientation: 'black'})
    }
    console.log(
      `A socket connection to the server has been made: ${socket.id}`
    );

    // socket.on("room", (data) => {
    //   io.emit('room', data);
    // });

    socket.on("disconnect", () => {
      console.log(`Connection ${socket.id} has left the building`);
    });

    socket.on("move", (data) => {
      io.emit('move', data)
    })
  });

};
