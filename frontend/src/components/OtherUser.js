import React, { useState, useEffect } from "react";
import { useUser } from "../hooks";
import { useParams } from "react-router";
import { Typography, Box, Grid } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

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

      {userData && <><Grid container>
        <Grid item>
          <Box
            alignContent={"center"}
            bgcolor="white"
            py={2}
            px={4}
            borderRadius={16}
          >
            <Typography variant="h4">
              <AccountCircleIcon color="primary" fontSize={"large"} />
              {userData.username}
            </Typography>
            <Box>

              <Typography gutterBottom component="span">
                {userData.bio}
              </Typography>
            </Box>
            <Typography variant="body2">email: {userData.email}</Typography>
            <Typography variant="body2">
              {" "}
              joined {new Date(userData.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="body2">
              {" "}
              admin: {userData.isAdmin ? "Yes" : "No"}
            </Typography>
            <Typography variant="body2">
              {" "}
              verified: {userData.verified.is ? "Yes" : "No"}
            </Typography>
          </Box>
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
   </>}

    </div>
  );
}
