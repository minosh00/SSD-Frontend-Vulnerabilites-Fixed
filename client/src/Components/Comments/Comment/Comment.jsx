import React, { useEffect, useState } from "react";
import Rate from "../RateComponent/Rate";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { AuthCustomer } from "../../../Services/AuthServices";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./comment.css";

const Comment = ({ commentText, username, image, stars, onDelete, onEdit }) => {
  const [user, setUser] = useState({});
  const [popup, setPopup] = useState(false);

  const findUser = async () => {
    let data = await AuthCustomer(localStorage.getItem("token"));
    setUser(data.data);
  };

  useEffect(() => {
    findUser();
  }, []);
  return (
    <div className="comment-container">
      <div className="comment-rating">
        <Rate initValue={stars} readOnly />
      </div>
      <div className="comment-card">
        <span className="comment-username">{username.split("@")[0]}</span>
        <span className="comment-image">
          {username.charAt(0).toUpperCase()}
        </span>
        <span className="comment-image">{username.charAt(0).toUpperCase()}</span>
        <span className="comment-text">{commentText}</span>
        {user && user.email === username && (
          <section className="button-section">
            <button onClick={() => setPopup(true)} className="cs-icon delete">
              <DeleteIcon />
            </button>
            <button onClick={() => onEdit()} className="cs-icon edit">
              <EditIcon />
            </button>
          </section>
        )}
      </div>
      <Dialog
        open={popup}
        onClose={() => setPopup(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will permanently delete your comment
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPopup(false)}>Cancel</Button>
          <Button onClick={() => onDelete()} autoFocus>
            <span className="delete">Delete</span>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Comment;
