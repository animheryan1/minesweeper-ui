import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React from "react";
import { Link } from "react-router-dom";

function Modal(props) {
  const { open, title, links = [], buttons = [], handleClose } = props;
  return (
    <>
      <Dialog open={open} aria-labelledby="dialog-title" onClose={handleClose}>
        <DialogTitle id="dialog-title">{title}</DialogTitle>
        <DialogActions>
          {buttons.map((button, index) => {
            return (
              <Button key={index} onClick={button.onClick} color="primary">
                {button.name}
              </Button>
            );
          })}
          {links.map((link, index) => {
            return (
              <Button
                key={index}
                component={Link}
                to={link.linkTo}
                color="primary"
              >
                {link.name}
              </Button>
            );
          })}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Modal;
