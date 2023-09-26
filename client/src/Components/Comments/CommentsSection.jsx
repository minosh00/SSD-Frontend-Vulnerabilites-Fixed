import axios from "axios";
import React, { useEffect, useState } from "react";
import CommentButton from "./Button/CommentButton";
import Comment from "./Comment/Comment";
import Like from "./LikeComponent/Like";
import Search from "./Search/Search";
import "./styles/CommentsSection.css";

const CommentsSection = () => {
  const [comments, setComments] = useState([]);
  const [searchText, setSearchText] = useState("");

  const getComments = (comment = '') => {
    console.log()
    axios
      .get(`http://localhost:5000/api/comments?roomID=${window.location.pathname.split("/")[2]}&comment=${comment}`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  useEffect(() => {
    getComments(searchText);
  }, [searchText])

  const deleteComment = (id) => {
    axios
    .delete(`http://localhost:5000/api/comments/${id}`)
    .then((_res) => {
      alert('Done!');
      getComments();
    })
    .catch((e) => {
      alert('Cannot Delete!')
      console.error(e.message);
    });
  }

  const addLike = (id) => {
    axios
    .post(`http://localhost:5000/api/comments/${id}/addLike`)
    .then((_res) => {
      getComments();
    })
    .catch((e) => {
      alert('Cannot Add Like!')
      console.error(e.message);
    });
  }

  const removeLike = (id) => {
    axios
    .post(`http://localhost:5000/api/comments/${id}/removeLike`)
    .then((_res) => {
      getComments();
    })
    .catch((e) => {
      alert('Cannot Remove Like!')
      console.error(e.message);
    });
  }

  useEffect(() => {
    getComments();
  }, []);

  const handleRedirect = () => {
    window.location.href = `/comments-section/create/${window.location.pathname.split("/")[2]}`;
  };

  return (
    <div className="cs-background">
      <div className="search-section">
      <Search setSearchText={setSearchText} />
      </div>
      <div className="cs-add-button">
        <CommentButton
          label="Add Review"
          onClick={() => handleRedirect()}
          size="small"
          variant="contained"
        />
      </div>
      <div hidden = {comments.length !== 0} className="no-comments">No Comments</div>
      {comments.map((comment) => (
        <div key={comment._id} className="cs-comment">
          <Comment
            commentText={comment.comment}
            image={comment.userImage}
            stars={comment.noOfStars}
            username={comment.userEmail}
            key={comment._id}
            onDelete={() => deleteComment(comment._id)}
            onEdit={() => window.location.href = `/comments-section/edit/${comment._id}`}
          />
          <div className="like-section"><Like onChange={(clicked) => {!clicked? addLike(comment._id): removeLike(comment._id)}} /><span>{comment.likes}</span></div>
        </div>
      ))}
    </div>
  );
};

export default CommentsSection;