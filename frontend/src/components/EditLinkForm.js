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
  const { deleteLink, updateLink } = useUser();

  const [tempName, setTempName] = useState(link.name);
  const [tempLink, setTempLink] = useState(link.link);
  const [tempDescription, setTempDescription] = useState(link.description);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleEdit = () => {
    if (editing) {
      updateLink(link._id, {
        name: tempName,
        link: tempLink,
        description: tempDescription,
      });
    }

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
          {editing ? (
            <TextField
              label="Name"
              name="name"
              value={tempName}
              onChange={(e) => {
                setTempName(e.target.value);
              }}
            ></TextField>
          ) : (
            link.name
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editing ? (
              <TextField
                label="Link"
                name="link"
                value={tempLink}
                onChange={(e) => {
                  setTempLink(e.target.value);
                }}
              ></TextField>
            ) : (
              <a href={link.link}>{link.link}</a>
            )}
          </DialogContentText>
          <DialogContentText>
            {editing ? (
              <TextField
                label="Description"
                name="description"
                value={tempDescription}
                onChange={(e) => {
                  setTempDescription(e.target.value);
                }}
              ></TextField>
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
