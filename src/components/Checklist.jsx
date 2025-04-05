import React from "react";
import {
  Box,
  Grid,
  Checkbox,
  Typography,
  IconButton,
  LinearProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddItem from "./AddItem";

const CheckItems = ({
  checkItems,
  checkListId,
  addNewCheckItem,
  handleDeleteCheckItem,
  handleUpdateCheckItem,
}) => {
  const completedCount = checkItems.filter(
    (item) => item.state === "complete"
  ).length;
  const progress =
    checkItems.length > 0 ? (completedCount / checkItems.length) * 100 : 0;

  const handleAddItem = (name) => {
    addNewCheckItem(checkListId, name);
  };

  const handleItemCheck = (e, checkItemId) => {
    const newState = e.target.checked ? "complete" : "incomplete";
    handleUpdateCheckItem(checkListId, checkItemId, newState);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography>{Math.floor(progress)}%</Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ mb: 3, height: 8, borderRadius: 2 }}
      />

      <Grid container direction="column" spacing={2}>
        {checkItems.map((checkItem) => (
          <Grid key={checkItem.id}>
            <Box
              sx={{
                p: 1,
                border: "1px solid #ccc",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box display="flex" alignItems="center" gap={0.5}>
                <Checkbox
                  checked={checkItem.state === "complete"}
                  onChange={(e) => handleItemCheck(e, checkItem.id)}
                />
                <Typography
                  variant="body1"
                  sx={{
                    textDecoration:
                      checkItem.state === "complete" ? "line-through" : "none",
                  }}
                >
                  {checkItem.name}
                </Typography>
              </Box>

              <IconButton
                onClick={() => handleDeleteCheckItem(checkListId, checkItem.id)}
                edge="end"
                aria-label="delete"
              >
                <DeleteIcon
                  sx={{
                    "&:hover": {
                      backgroundColor: "red",
                      borderRadius: 1,
                    },
                  }}
                />
              </IconButton>
            </Box>
          </Grid>
        ))}
        <AddItem name={"Check item"} addNewItem={handleAddItem} />
      </Grid>
    </Box>
  );
};

export default CheckItems;
