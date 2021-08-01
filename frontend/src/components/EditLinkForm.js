import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { useUser } from "../hooks";
import { TextField } from "@material-ui/core";

export default function FormDialog({ link }) {
  const [editing, setEditing] = useState(false);
  const [open, setOpen] = React.useState(false);
  const { deleteLink } = useUser();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleEdit = () => {
    setEditing(!editing);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteLink(link._id).then(() => {
      location.reload();
    });
  };
  return (
    <span>
      <IconButton size="small" onClick={handleClickOpen}>
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          {editing ? <TextField label="Name" value={link.name}></TextField> : link.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editing ? (
              <TextField label="Link" value={link.link}></TextField>
            ) : (
              <a href={link.link}>{link.link}</a>
            )}
          </DialogContentText>
          <DialogContentText>
            {editing ? (
              <TextField label="Description" value={link.description}></TextField>
            ) : (
              link.description
            )}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleEdit} color="primary" variant="contained">
            {editing ? "Done" : "Edit"}
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
