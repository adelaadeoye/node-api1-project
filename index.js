// implement your API here
console.log("Server Test");

const express= require("express");
const db =require('./data/db.js');



const server= express();

server.use(express.json());


//get all users from database

server.get("/api/users",(req,res)=>{

    db.find()
    .then(users=>{
        res.status(200).json(users)
    })
    .catch(error => {
    console.log("error on GET /users", error);
    res
      .status(500)
      .json({ errorMessage: "error getting lsit of users from database" });
  });
})









// Create port for listening 
const port = 4000;
server.listen(port, () => console.log(`\n ** API on port${port}**\n`));
