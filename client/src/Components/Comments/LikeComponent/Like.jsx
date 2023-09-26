import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import "./Like.css";

const Like = ({ onChange, active }) => {
  const [clicked, setClicked] = useState(active);

  return (
    <button
      type="button"
      onClick={() => {
        setClicked(!clicked);
        onChange(clicked);
      }}
      className="like-component"
    >
      {clicked ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
    </button>
  );
};

export default Like;
