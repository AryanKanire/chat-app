const {Server} = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);  //it is used to wrap main server to the socketio server
const io = new Server(server,{
    cors:{
        origin:["http://localhost:3000"],
        methods:["GET","POST"]
    }
});    

const getReciversocket = (receiverId)=>{
    return userSocketmap[receiverId];
}

const userSocketmap = {};   //{userId: socketId}

io.on('connection',(socket)=>{
    console.log("a user is connected",socket.id);

    const userId = socket.handshake.query.userId;

    if(userId!="undefined") userSocketmap[userId]=socket.id;

    //io.emit() is used to send events to all connected client
    io.emit("getOnlineusers",Object.keys(userSocketmap));

    //socket.on is used to listen the events. can be used both on client and server side
    socket.on("disconnect",()=>{
        console.log("user dissconnected",socket.id);
        delete userSocketmap[userId];
        io.emit("getOnlineusers",Object.keys(userSocketmap));
    })
})

module.exports = {app,io,server,getReciversocket};