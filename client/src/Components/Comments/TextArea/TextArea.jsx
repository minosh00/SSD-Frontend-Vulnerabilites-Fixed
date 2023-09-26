import * as React from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";

export default function TextArea({ onChange, error, value, helperText }) {
  return (
    <TextareaAutosize
      aria-label="empty textarea"
      placeholder="Type your comment here"
      onChange={(e) => onChange(e.target.value)}
      value={value&& value}
      style={{
        width: "100%",
        border: "1px",
        borderRadius: "12px",
        borderStyle: "solid",
        borderColor: error? "red": "gray",
        padding: "12px",
        outline: "none",
      }}
    />
  );
}
