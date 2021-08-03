import React, { useState } from "react";
import { Box, Typography, TextField, IconButton } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EditIcon from "@material-ui/icons/Edit";

import { useUser } from "../hooks";

export default function UserCard({ userData, editable, getLinks }) {
  const { updateUser } = useUser();

  const [editingBio, setEditingBio] = useState(false);
  const [tempBio, setTempBio] = useState("");

  function handleEditBio() {
    if (editingBio) {
      updateUser({ bio: tempBio }).then(() => {
        getLinks();
      });
    } else {
      setTempBio(userData.bio);
    }
    setEditingBio(!editingBio);
  }

  function handleChangeBio(e) {
    setTempBio(e.target.value);
  }

  return (
    <Box alignContent={"center"} bgcolor="white" py={2} px={4} borderRadius={16}>
      <Typography variant="h4">
        <AccountCircleIcon color="primary" fontSize={"large"} />
        {userData.username}
      </Typography>
      <Box>
        {editingBio ? (
          <TextField value={tempBio} onChange={handleChangeBio}></TextField>
        ) : (
          <Typography gutterBottom component="span">
            {userData.bio}
          </Typography>
        )}
        {editable && (
          <IconButton size="small" onClick={handleEditBio}>
            <EditIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
      <Typography variant="body2">email: {userData.email}</Typography>
      <Typography variant="body2">
        {" "}
        joined {new Date(userData.createdAt).toLocaleDateString()}
      </Typography>
      <Typography variant="body2"> admin: {userData.isAdmin ? "Yes" : "No"}</Typography>
      <Typography variant="body2">
        {" "}
        verified: {userData.verified.is ? "Yes" : "No"}
      </Typography>
    </Box>
  );
}
