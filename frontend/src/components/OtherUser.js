import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Typography, Box, Grid } from "@material-ui/core";

import { useUser } from "../hooks";
import UserCard from "./UserCard";
import Link from "./Link";

export default function OtherUser() {
  const { getUser } = useUser();
  const { username } = useParams();

  const [errorMessage, setErrorMessage] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    console.log(username);
    getUser(username).then((res) => {
      console.log(username);
      console.log(res);

      if (!res.data.success && res.data.msg) {
        setErrorMessage(res.data.msg);
      }

      if (res.data.success) {
        setUserData(res.data.user);
      }
    });
  }, []);

  return (
    <div>
      {errorMessage && <h1>{errorMessage}</h1>}
      {userData && (
        <>
          <Grid container>
            <Grid item>
              <UserCard userData={userData} />
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item>
              <Box alignContent={"center"} bgcolor="white" borderRadius={16} p={1}>
                <Typography variant="caption">links</Typography>
                <Box py={1} px={3}>
                  {userData.links.map((link) => (
                    <div key={link._id}>
                      <Link link={link} />
                    </div>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
      )
    </div>
  );
}
