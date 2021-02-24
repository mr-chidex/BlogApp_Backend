let io;

module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST", "DELETE", "PUT"],
      },
    });
    return io;
  },

  getIO: () => {
    if (!io) {
      throw new Error("soket.io not initialized");
    }

    return io;
  },
};
