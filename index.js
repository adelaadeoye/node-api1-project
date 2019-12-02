// implement your API here
console.log("Server Test");

const express= require("express");
const db =require('./data/db.js');



const server= express();

server.use(express.json());


//get all users from database

server.get("/api/users",(req,res)=>{
//call db function to find users
    db.find()
    .then(users=>{
        //send list of users in db as response
        res.status(200).json(users)
    })
    .catch(error => {
    console.log("error on GET /users", error);
    res
      .status(500)
      .json({ errorMessage: "error getting lsit of users from database" });
  });
})


//post new users

server.post('/api/users',(req,res)=>{
const userData= req.body;

db.insert(userData)
.then(users=>{
    res.status(201).json(users)
})
.catch(error => {
    console.log("error on POST /users", error);
    res
      .status(500)
      .json({ errorMessage: "error adding user to database" });
  });

})








// Create port for listening 
const port = 4000;
server.listen(port, () => console.log(`\n ** API on port${port}**\n`));
