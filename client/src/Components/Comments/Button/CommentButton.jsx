import * as React from 'react';
import Button from '@mui/material/Button';

export default function CommentButton({label = 'Button', variant = 'filled', disabled = false, size = "medium", onClick}) {
  return (
      <Button onClick = {onClick} size = {size} disabled = {disabled} variant={variant}>{label}</Button>
  );
}
