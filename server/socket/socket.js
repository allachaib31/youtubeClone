// socket.js
const EventEmitter = require("events");
const session = require("../middleware/session");
class SocketController extends EventEmitter {
  constructor(io) {
    super();
    this.io = io;
    this.io.use((socket, next) => {
      session(socket.request, {}, next);
    });
    this.setup();

  }

  setup() {
    this.io.on("connection", (socket) => {
      console.log("A user connected");
      // Handle 'chat message' event
      socket.on("joinRoom",()=>{
        console.log(socket.request.session.user.id)
        socket.join(socket.request.session.user.id);
      })
      socket.on("chat message", (msg) => {
        console.log("message: " + msg);
        this.emit("chat message", msg);
      });

      // Handle 'disconnect' event
      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  }

  emitRequestEvent(eventName, data,id) {
    this.io.to(id).emit(eventName, data);
  }
}


module.exports = SocketController;
