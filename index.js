import express from "express";
import http from "http";
import { Server } from "socket.io";
import routes from "./route.js"; // Assuming route.js is in the same directory

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
var clients = {};

app.use("/route", routes);
app.use("/uploads", express.static("uploads")); // Serve static files from the uploads directory

io.on("connection", (socket) => {
  console.log(`✅ New client connected: ${socket.id}`);
  socket.on("signin", (id)=>{
    console.log(id);
    clients[id] = socket;
    console.log(clients);
    
  })
  socket.on("message", (msg)=>{
    console.log(msg);
    let targetId = msg.targetId;
    if(clients[targetId]){
      clients[targetId].emit("message",msg);
    }
  })
  socket.on("disconnect", () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
