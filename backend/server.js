const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const authroute = require("./routes/authroute");
const messageroute = require("./routes/messagerote")
const userroute = require("./routes/userroute");

const connecttomongodb = require("./db/connectToDB");
const {app,server} = require("./socket/socket");

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth",authroute);
app.use("/api/messages",messageroute);
app.use("/api/users",userroute);

server.listen(PORT, ()=>{
    connecttomongodb();
    console.log(`server is running on ${PORT}`)
})