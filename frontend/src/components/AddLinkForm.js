import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useUser } from "../hooks";
import { Box, TextField, Typography } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import Link from "./Link";

export default function FormDialog({ getLinks }) {
  const [open, setOpen] = React.useState(false);
  const { createLink } = useUser();

  const [tempName, setTempName] = useState("");
  const [tempLink, setTempLink] = useState("");
  const [tempDescription, setTempDescription] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    createLink({
      name: tempName,
      link: tempLink,
      description: tempDescription,
    }).then(() => {
      getLinks();
      handleClose();
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <span>
      <Button onClick={handleClickOpen}>
        <AddIcon /> Add New Link
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a New Link</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              label="Name"
              name="name"
              value={tempName}
              onChange={(e) => {
                setTempName(e.target.value);
              }}
            ></TextField>
            <DialogContentText></DialogContentText>
            <TextField
              label="Link"
              name="link"
              value={tempLink}
              onChange={(e) => {
                setTempLink(e.target.value);
              }}
            ></TextField>
          </DialogContentText>
          <DialogContentText>
            <TextField
              label="Description"
              name="description"
              value={tempDescription}
              onChange={(e) => {
                setTempDescription(e.target.value);
              }}
            ></TextField>
          </DialogContentText>
          <DialogContentText>
            {tempName && (
              <Box>
                <Typography variant="caption">Preview</Typography>
                <Link
                  link={{
                    name: tempName,
                    link: tempLink,
                    description: tempDescription,
                  }}
                />
              </Box>
            )}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Submit
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
