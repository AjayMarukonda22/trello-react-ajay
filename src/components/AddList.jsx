import React, { useState, useRef } from "react";
import { Card, TextField, Button, IconButton, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

export default function AddList({ handleListSubmit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const cardRef = useRef(null);

  function handleSubmitClick() {
    if (inputValue.trim()) {
    handleListSubmit(inputValue);;
      setInputValue("");
    }
    setIsEditing(false);
  }

  return (
    <Card
      ref={cardRef}
      sx={{
        width: 300,
        padding: isEditing ? 1 : 0,
        backgroundColor: isEditing ? "black" : "#f0f0f0",
        borderRadius: "12px",
        color: isEditing ? "white" : "black",
        height: isEditing ? 'auto' : '50px', // Adjust '40px' to your preferred button height
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginY: 2
      }}
    >
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
             handleSubmitClick();
          }}
          style={{ width: '100%' }}
        >
          <TextField
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            fullWidth
            autoFocus
            variant="outlined"
            placeholder="Enter list name..."
            onBlur={(e) => {
              // Only hide if click is outside the card component
              if (!cardRef.current?.contains(e.relatedTarget)) {
                setIsEditing(false);
              }
            }}
            sx={{ backgroundColor: "white", borderRadius: "4px", mb: 1 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Add list
            </Button>
            <IconButton
              type="button"
              onClick={() => setIsEditing(false)}
              color="inherit"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </form>
      ) : (
        <Button
          startIcon={<AddIcon />}
          fullWidth
          onClick={() => setIsEditing(true)}
          sx={{
            justifyContent: "flex-start",
            color: "black",
            padding: '8px 16px',
            minHeight: '40px', // Ensure the button has a minimal height
          }}
        >
          Add a list
        </Button>
      )}
    </Card>
  );
}
