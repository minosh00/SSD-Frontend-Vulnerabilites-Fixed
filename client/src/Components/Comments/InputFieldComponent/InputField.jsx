import * as React from "react";
import TextField from "@mui/material/TextField";

export default function InputField({
  variant = "outlined",
  type = "text",
  label = "label",
  value,
  id,
  error = false,
  disabled = false,
  helperText = "",
  size = "small",
  onChange
}) {
  return (
    <div className="w-full">
      <TextField
        onChange={(e) => onChange(e.target.value)}
        error={error}
        disabled={disabled}
        type={type}
        helperText={helperText}
        id={id ? id : variant}
        label={label}
        value={value&& value}
        variant={variant}
        size={size}
        sx={{ width: "100%" }}
      />
    </div>
  );
}
