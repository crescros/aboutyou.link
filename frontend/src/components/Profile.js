import React, { useState, useEffect } from "react";
import { useUser } from "../hooks";
import {
  Button,
  CircularProgress,
  Toolbar,
  AppBar,
  Typography,
  Grid,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Link from "./Link";
import UserCard from "./UserCard";
import AddLinkForm from "./AddLinkForm";

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
  const { users, logout } = useUser();
  const [userData, setUserData] = useState();

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
            <Button onClick={logout} color="inherit">
              logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <Box pt={1} px={2}>
        {userData ? (
          <div>
            <Grid container>
              <Grid item>
                <UserCard userData={userData} editable={true} getLinks={getLinks} />
              </Grid>
            </Grid>

            <Grid container justifyContent="center">
              <Grid item>
                <Box alignContent={"center"} bgcolor="white" borderRadius={16} p={1}>
                  <Typography variant="caption">links</Typography>
                  <Box py={1} px={3}>
                    {userData.links.map((link) => (
                      <div key={link._id}>
                        <Link link={link} editable={true} />
                      </div>
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <br />

            <AddLinkForm getLinks={getLinks} />
          </div>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </div>
  );
}
