import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(express.json());

io.on("connection", (socket) => {
  console.log(`✅ New client connected: ${socket.id}`);
  socket.on("/test", (msg)=>{
    console.log(msg);
    
  })

  socket.on("disconnect", () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
