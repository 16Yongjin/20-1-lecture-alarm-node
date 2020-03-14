import { Server } from "http";
import socketIO from "socket.io";
import { logStream } from "./../services/admin/AdminController";

export const handleSocketIO = (server: Server) => {
  const io = socketIO.listen(server);
  logStream(io);
};
