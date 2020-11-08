const { Socket } = require("socket.io");
module.exports = (io) => {
  io.on("connection", (Socket) => {
    console.log("socket initiated!");
    Socket.on("hello", () => {
      console.log("a user connect");
    });
  });
};
