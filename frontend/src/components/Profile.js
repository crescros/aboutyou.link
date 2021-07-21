import React, { useState, useEffect } from "react";
import { useUser } from "../hooks";
import {
  Button,
  CircularProgress,
  TextField,
  Toolbar,
  AppBar,
  Typography,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Profile() {
  const classes = useStyles();
  const { users, logout, createLink } = useUser();
  const [userData, setUserData] = useState();
  const [newLinkData, setNewLinkData] = useState({});

  function handleChangeFormField(e) {
    const tempUserData = newLinkData;
    newLinkData[e.target.name] = e.target.value;
    setNewLinkData(tempUserData);
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    createLink(newLinkData).then(() => {
      getLinks();
    });
  }

  function getLinks() {
    users().then((res) => {
      setUserData(res.data.user);
    });
  }

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <div />
            <Typography variant="h6" className={classes.title}>
              AboutYou
            </Typography>
            <Button onClick={logout}>logout</Button>
          </Toolbar>
        </AppBar>
      </div>

      {userData ? (
        <div>
          <Grid container>
            <Grid item xs={12} lg={8}>
              <Typography variant="h4">{userData.username}</Typography>
              <Typography gutterBottom>{userData.bio}</Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography variant="body2">email: {userData.email}</Typography>
              <Typography variant="body2">
                {" "}
                joined {new Date(userData.createdAt).toLocaleDateString()}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <div>links:</div>
              {userData.links.map((link) => (
                <div key={link._id}>
                  <a href={link.link}>{link.name}</a> - {link.description}
                </div>
              ))}
            </Grid>
          </Grid>

          <br />

          <div>Add New Link</div>

          <div>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Link Name"
              name="name"
              onChange={handleChangeFormField}
            />
          </div>

          <div>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="description"
              label="Link Description"
              name="description"
              onChange={handleChangeFormField}
            />
          </div>

          <div>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="link"
              label="Link Url"
              name="link"
              onChange={handleChangeFormField}
            />
          </div>
          <div>
            <Button onClick={handleSubmitForm}>submit</Button>
          </div>
          <br />
          <br />
          <br />
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}
