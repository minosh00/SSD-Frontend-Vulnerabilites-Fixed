import * as React from "react";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function RateComponent({
  readOnly,
  caption,
  disabled = false,
  captionDisabled,
  initValue,
  onClick,
  size = "small",
}) {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    setValue(initValue);
  }, []);

  return (
    <div className="w-fit">
      {!captionDisabled && (
        <Typography component="legend">{caption && caption}</Typography>
      )}
      <Rating
        size={`${size}`}
        readOnly={readOnly}
        name={caption ? caption : ""}
        value={initValue}
        disabled={disabled}
        onClick={onClick && onClick(value)}
        onChange={(_event, newValue) => {
          setValue(newValue);
        }}
      />
    </div>
  );
}
