// implement your API here
console.log("Server Test");

const express= require("express");
const db =require('./data/db.js');



const server= express();

server.use(express.json());









// Create port for listening 
const port = 4000;
server.listen(port, () => console.log(`\n ** API on port${port}**\n`));
