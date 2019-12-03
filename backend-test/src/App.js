import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paperModal: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const initial={
  name:"",
  bio:""
}
function App() {
  const classes = useStyles();
  const [user, setUser] = useState([]);
  const [data, setData]= useState(initial)

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/users")
      .then(res => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch(error => console.log(error));
  }, []);
  const handleDelete = id => {
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
  };
  const inputChange=e=>{
    e.preventDefault();
    return(
    setData({...data,[e.target.name]:e.target.value}))
  }
  const submitHandler=e=>{
    e.preventDefault();
    console.log(data)
    axios
          .post("http://localhost:4000/api/users",data)
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
    setData(initial)
    setOpen(false);

  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <Button variant="contained" onClick={handleOpen} color="primary">
            Add User
          </Button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500
            }}
          >
            <Fade in={open}>
              <div className={classes.paperModal}>
                <form  className={classes.root} noValidate autoComplete="off">
                  <TextField name="name" value={data.name} onChange={inputChange} id="standard-basic" label="Name" />
                  <br></br>
                  <TextField name="bio" value={data.bio} onChange={inputChange} id="standard-basic" label="Bio" />
                  <br></br>
                  <Button variant="contained"  color="primary" onClick={submitHandler}>
            Add
          </Button>
                </form>
              </div>
            </Fade>
          </Modal>
        </div>
        <div className={classes.root}>
          <Grid container spacing={3}>
            {user.map(item => (
              <Grid key={item.id} item xs={6} xl={6} sm={6}>
                <Paper className={classes.paper}>
                  <Typography variant="h5" component="h2">
                    Name: {item.name}
                  </Typography>
                  <Typography variant="h6" component="h2">
                    Bio: {item.bio}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(item.id)}
                  >
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
