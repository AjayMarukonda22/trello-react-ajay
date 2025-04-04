import React, { useState, useRef } from "react";
import { Card, TextField, Button, IconButton, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

export default function AddItem({ name, addNewItem }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const cardRef = useRef(null);

  const handleSubmit = () => {
    if (inputValue.trim()) {
      addNewItem(inputValue);
      setInputValue("");
    }
    setIsEditing(false);
  };

  return (
    <Card
      ref={cardRef}
      sx={{
        width: 250,
        padding: isEditing ? 1 : 0,
        backgroundColor: isEditing ? "black" : "#f0f0f0",
        borderRadius: "12px",
        color: isEditing ? "white" : "black",
        height: isEditing ? "auto" : "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 1,
      }}
    >
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          style={{ width: "100%" }}
        >
          <TextField
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            fullWidth
            autoFocus
            variant="outlined"
            placeholder= {`Enter ${name} title...`}
            onBlur={(e) => {
              if (!cardRef.current?.contains(e.relatedTarget)) {
                setIsEditing(false);
              }
            }}
            sx={{ backgroundColor: "white", borderRadius: "4px", mb: 1 }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button type="submit" variant="contained" color="primary">
              Add {name}
            </Button>
            <IconButton onClick={() => setIsEditing(false)} color="inherit">
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
            padding: "8px 16px",
            minHeight: "40px",
            textTransform: "none",
          }}
        >
          Add a {name}
        </Button>
      )}
    </Card>
  );
}
