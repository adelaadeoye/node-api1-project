import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

function App() {
  const classes = useStyles();
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/users")
      .then(res => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch(error => console.log(error));
  }, []);
const handleDelete=(id)=>{

axios
      .delete(`http://localhost:4000/api/users/${id}`)
      .then(res => {
        axios
      .get("http://localhost:4000/api/users")
      .then(res => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
}
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div className={classes.root}>
          <Grid container spacing={3}>
            {user.map(item => (
              <Grid key={item.id} item xs={6}>
                <Paper className={classes.paper}>
                  <Typography variant="h5" component="h2">
                    Name: {item.name}
                  </Typography>
                  <Typography variant="h6" component="h2">
                    Bio: {item.bio}
                  </Typography>
                  <Button variant="contained" color="secondary" onClick={()=>handleDelete(item.id)}>
                    Delete
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>
      </header>
    </div>
  );
}

export default App;
