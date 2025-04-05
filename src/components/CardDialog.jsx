import React, { useEffect, useState } from "react";
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

const CardDialog = ({ card, open, onClose }) => {
  const [checkLists, setCheckLists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
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

        console.log("ChecklistsData", response.data);
        setCheckLists(response.data);
      } catch (err) {
        console.log(`Error while fetching checklists`, err);
      }
    };

    fetchData();
  }, [card?.id]);

  const addNewCheckList = async (name) => {
        try {
            const response = await axios.post('https://api.trello.com/1/checklists', null,
              {
               params : {
                  name,
                  idCard : card.id,
                  key : import.meta.env.VITE_API_KEY,
                  token : import.meta.env.VITE_API_TOKEN,
               }
        })
           console.log(response.data);
           setCheckLists([...checkLists, response.data]);
        }
        catch(err) {
            console.log('Error while creating a Checklist', err);
        }
  };

  const handleDeleteChecklist = async (checklistId) => {
    try {
      await axios.delete(`https://api.trello.com/1/checklists/${checklistId}`, {
        params: {
          key: import.meta.env.VITE_API_KEY,
          token: import.meta.env.VITE_API_TOKEN,
        },
      });
      // Update the state to remove the deleted checklist
      setCheckLists((prevCheckLists) =>
        prevCheckLists.filter((checklist) => checklist.id !== checklistId)
      );
    } catch (err) {
      console.error(`Error while deleting checklist`, err);
    }
  };

  const addNewCheckItem = async (checkListId, name) => {
      try {
          const response = await axios.post(`https://api.trello.com/1/checklists/${checkListId}/checkItems`, null, 
            {
              params : {
                 name,
                 key : import.meta.env.VITE_API_KEY,
                 token : import.meta.env.VITE_API_TOKEN,
              }
       });

       console.log('new checkItem:',response.data);
       const newItem = response.data;
        setCheckLists(prev => 
            prev.map(cl => 
              cl.id === checkListId ?
              {
                ...cl,
                checkItems : [...(cl.checkItems || []), newItem]
              } : cl
            )
        )
      }
      catch(err) {
        console.log('Error while creating new CheckItem', err);
      }
  }

  const handleDeleteCheckItem = async (checkListId, checkItemId) => {
       try {
          await axios.delete(`https://api.trello.com/1/checklists/${checkListId}/checkItems/${checkItemId}`, 
            {params: {
              key: import.meta.env.VITE_API_KEY,
              token: import.meta.env.VITE_API_TOKEN,
            }}
          );

          setCheckLists(prev => 
            prev.map(cl => 
              cl.id === checkListId ?
              {
                ...cl,
              checkItems : cl.checkItems.filter((item) => item.id !== checkItemId)} 
                : cl
            )
          )
       }
       catch(err) {
        console.log('Error while deleting checkItem', err);
       }
  }

  const handleUpdateCheckItem = async (checkListId, checkItemId, itemState) => {
      try {
         const response = await axios.put(`https://api.trello.com/1/cards/${card.id}/checkItem/${checkItemId}`, null,
          {params: {
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_API_TOKEN,
            state : itemState,
          }}
         );
         console.log(`Updated checkItem:`, response.data);
         setCheckLists(prev => 
          prev.map(cl => 
            cl.id === checkListId ?
            {
             ...cl,
             checkItems : cl.checkItems.map(item => item.id === checkItemId ? {...item, state : itemState} : item)
            } : cl
          )
         )
      }
      catch(err) {
        console.log('Error while updating checkItem', err);
      }
  }
  

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
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor : 'lightBlue'
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
        <Box sx={{display: 'flex' , justifyContent : 'space-between', alignItems : 'center'}}>
        <Typography variant="h5">Checklists</Typography>
        <AddItem name = {'Check list'} addNewItem = {addNewCheckList}/>
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
            <Box sx = {{ display: "flex",
              justifyContent: "space-between",
              alignItems: "center",}}>
            <Typography variant="subtitle1">{checklist.name}</Typography>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleDeleteChecklist(checklist.id)}
            >
              <DeleteIcon  sx={{"&:hover": {
                    backgroundColor: "red",
                    borderRadius : 1,
                  }}}/>
            </IconButton>
            </Box>
            <CheckItems checkItems={checklist.checkItems} checkListId = {checklist.id} addNewCheckItem = {addNewCheckItem} handleUpdateCheckItem = {handleUpdateCheckItem} handleDeleteCheckItem={handleDeleteCheckItem}/>
          </Box>
        ))}

      </DialogContent>
    </Dialog>
  );
};

export default CardDialog;
