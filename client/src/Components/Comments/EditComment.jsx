import React, { useEffect, useState } from "react";
import RateComponent from "./RateComponent/Rate";
import InputField from "./InputFieldComponent/InputField";
import CommentButton from "./Button/CommentButton";
import TextArea from "./TextArea/TextArea";
import axios from "axios";
import "./styles/AddComment.css"

const EditComment = () => {
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(0);

  const [emailError, setEmailError] = useState({ state: false, message: "" });
  const [commentError, setCommentError] = useState({
    state: false,
    message: "",
  });

  const getReview = (id) => {
    axios
      .get(`http://localhost:5000/api/comments/${id}`)
      .then((res) => {
        console.log(res.data);
        setEmail(res.data.userEmail);
        setStars(res.data.noOfStars);
        setComment(res.data.comment);
      })
      .catch((e) => {
        console.error(e.message);
      });
  }

  useEffect(() => {
    getReview(window.location.pathname.split("/")[3]);
    console.log(stars)
  }, [])

  const handleEditComment = (id) => {
    if (comment === "") {
      setCommentError({ state: true, message: "You must fill this field" });
    }

    if (email === "") {
      setEmailError({ state: true, message: "You must fill this field" });
    } else {
      if (
        !!!email.match(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
      ) {
        setEmailError({ state: true, message: "Please enter a valid email" });
      }
    }

    if (
      comment !== "" &&
      email !== "" &&
      !!email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      setCommentError({ message: "", state: false });
      setEmailError({ message: "", state: false });

      const payload = {
        noOfStars: stars,
        comment: comment,
        userEmail: email,
        userPNumber: "000003",
        userImage: "yuioyoieofsdfdgiteytuio",
      };

      axios
        .put(`http://localhost:5000/api/comments/${id}`, payload)
        .then((_res) => {
          alert("Updated!");
          window.location.href = "/comments-section";
        })
        .catch((e) => console.error(e.message));
    }
  };

  return (
    <div className="ac-background">
      <div>
        <RateComponent initValue={stars} onClick={(value) => setStars(value)} size="large" />
      </div>
      <div className="ac-form">
        <InputField
          error={emailError.state}
          value = {email}
          helperText={emailError.state && emailError.message}
          onChange={(text) => setEmail(text)}
          label="e-mail address"
        />
        <TextArea
          error={commentError.state}
          value={comment}
          helperText={commentError.state && commentError.message}
          onChange={(text) => setComment(text)}
        />
        <CommentButton
          onClick={() => handleEditComment(window.location.pathname.split("/")[3])}
          size="small"
          variant="contained"
          label="Edit Comment"
        />
      </div>
    </div>
  );
};

export default EditComment;
