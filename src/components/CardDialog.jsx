import React, { useEffect, useReducer } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import AddItem from "./AddItem";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckItems from "./Checklist";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import ErrorDisplay from "./ErrorDisplay";
import { initialState, reducer, actions } from "../utils/checkListReducer";

const CardDialog = ({ card, open, onClose }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { checkLists, loading, error } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(actions.fetchStart());
        const response = await axios.get(
          `https://api.trello.com/1/cards/${card.id}/checklists`,
          {
            params: {
              key: import.meta.env.VITE_API_KEY,
              token: import.meta.env.VITE_API_TOKEN,
            },
            headers: {
              Accept: "application/json",
            },
          }
        );
        dispatch(actions.fetchSuccess(response.data));
      } catch (err) {
        dispatch(actions.fetchFailure({
          message: "Failed to load checklists",
          details: err,
        }));
        console.error("Error while fetching checklists", err);
      }
    };

    if (card?.id) {
      fetchData();
    }
  }, [card?.id]);

  const addNewCheckList = async (name) => {
    try {
      const response = await axios.post(
        "https://api.trello.com/1/checklists",
        null,
        {
          params: {
            name,
            idCard: card.id,
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_API_TOKEN,
          },
        }
      );
      dispatch(actions.addChecklist(response.data));
      toast.success("Added new checklist successfully");
    } catch (err) {
      dispatch(actions.fetchFailure({
        message: "Failed to create checklist",
        details: err,
      }));
      console.error("Error while creating a Checklist", err);
      toast.error("Failed to create checklist");
    }
  };

  const handleDeleteChecklist = async (checklistId) => {
    try {
      await axios.delete(
        `https://api.trello.com/1/checklists/${checklistId}`,
        {
          params: {
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_API_TOKEN,
          },
        }
      );
      dispatch(actions.deleteChecklist(checklistId));
      toast.success("Checklist deleted successfully");
    } catch (err) {
      dispatch(actions.fetchFailure({
        message: "Failed to delete checklist",
        details: err,
      }));
      console.error("Error while deleting checklist", err);
      toast.error("Failed to delete checklist");
    }
  };

  const addNewCheckItem = async (checkListId, name) => {
    try {
      const response = await axios.post(
        `https://api.trello.com/1/checklists/${checkListId}/checkItems`,
        null,
        {
          params: {
            name,
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_API_TOKEN,
          },
        }
      );
      dispatch(actions.addCheckItem(checkListId, response.data));
      toast.success("Check item added successfully");
    } catch (err) {
      dispatch(actions.fetchFailure({
        message: "Failed to add check item",
        details: err,
      }));
      console.error("Error while creating new CheckItem", err);
      toast.error("Failed to add check item");
    }
  };

  const handleDeleteCheckItem = async (checkListId, checkItemId) => {
    try {
      await axios.delete(
        `https://api.trello.com/1/checklists/${checkListId}/checkItems/${checkItemId}`,
        {
          params: {
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_API_TOKEN,
          },
        }
      );
      dispatch(actions.deleteCheckItem(checkListId, checkItemId));
      toast.success("Check item deleted successfully");
    } catch (err) {
      dispatch(actions.fetchFailure({
        message: "Failed to delete check item",
        details: err,
      }));
      console.error("Error while deleting checkItem", err);
      toast.error("Failed to delete check item");
    }
  };

  const handleUpdateCheckItem = async (checkListId, checkItemId, itemState) => {
    try {
      await axios.put(
        `https://api.trello.com/1/cards/${card.id}/checkItem/${checkItemId}`,
        null,
        {
          params: {
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_API_TOKEN,
            state: itemState,
          },
        }
      );
      dispatch(actions.updateCheckItem(checkListId, checkItemId, itemState));
    } catch (err) {
      dispatch(actions.fetchFailure({
        message: "Failed to update check item",
        details: err,
      }));
      console.error("Error while updating checkItem", err);
      toast.error("Failed to update check item");
    }
  };

  if (error) return <ErrorDisplay error={error} />;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiDialog-paper": {
          minHeight: "90vh",
          maxHeight: "90vh",
        },
      }}
    >
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <>
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "lightBlue",
            }}
          >
            <Typography variant="h6" component="span">
              {card?.name}
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: "lavender" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h5">Checklists</Typography>
              <AddItem name={"Check list"} addNewItem={addNewCheckList} />
            </Box>
            {checkLists?.map((checklist) => (
              <Box
                key={checklist.id}
                sx={{
                  mt: 2,
                  backgroundColor: "gray",
                  borderRadius: 1,
                  padding: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle1">{checklist.name}</Typography>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteChecklist(checklist.id)}
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
                <CheckItems
                  checkItems={checklist.checkItems}
                  checkListId={checklist.id}
                  addNewCheckItem={addNewCheckItem}
                  handleUpdateCheckItem={handleUpdateCheckItem}
                  handleDeleteCheckItem={handleDeleteCheckItem}
                />
              </Box>
            ))}
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default CardDialog;