import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useUser } from "../hooks";

export default function FormDialog({ link }) {
  const [open, setOpen] = React.useState(false);
  const { deleteLink } = useUser();

  const handleClickOpen = () => {
    setOpen(true);
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
      <IconButton
        variant="outlined"
        color="primary"
        size="small"
        onClick={handleClickOpen}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{link.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <a href={link.link}>{link.link}</a>
          </DialogContentText>
          <DialogContentText>{link.description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
