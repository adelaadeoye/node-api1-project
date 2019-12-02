// implement your API here
console.log("Server Test");

const express = require("express");
const db = require("./data/db.js");
const cors =require('cors')

const server = express();

server.use(express.json());
server.use(cors());

//get all users from database

server.get("/api/users", (req, res) => {
  //call db function to find users
  db.find()
    .then(users => {
      //send list of users in db as response
      res.status(200).json(users);
    })
    .catch(error => {
      console.log("error on GET /users", error);
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

// find user by id
server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  //call db function to find user by id

  db.findById(id)
    .then(users => {
      //search list to get user
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json({  message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      console.log("error on GET /users", error);
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

//post new users

server.post("/api/users", (req, res) => {
  const userData = req.body;
  if (!userData.name || !userData.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user" });
  } else {
    db.insert(userData)

      .then(users => {
        res
          .status(201)
          .json({ message: " user created successfully with ", users });
      })
      .catch(error => {
        console.log("error on POST /users", error);
        res.status(500).json({
          error: "There was an error while saving the user to the database"
        });
      });
  }
});

// delete user

server.delete("/api/users/:id", (req, res) => {
  // get the id from the user request
  const id = req.params.id;

  //call delete funtion from db
  db.remove(id)
    .then(users => {
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      console.log("error on DELETE /users", error);
      res
        .status(500)
        .json({  error: "The user could not be removed" });
    });
});

//update
server.put("/api/users/:id", (req, res) => {
  // get the id from the user request
  const id = req.params.id;
  const userData = req.body;
  if (!userData.name || !userData.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user" });
  } else {
  //call delete funtion from db
  db.update(id, userData)
    .then(users => {
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      console.log("error on UPDATE /users", error);
      res
        .status(500)
        .json({ error: "The user information could not be modified." });
    });
}
});

// Create port for listening
const port = 4000;
server.listen(port, () => console.log(`\n ** API on port${port}**\n`));
