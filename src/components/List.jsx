import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddCard from "./AddCard";

const List = ({ name, id, cards, handleArchiveList }) => {

    console.log('Im in list',cards);

  const [anchorEle, setAnchorEle] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEle(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEle(null);
  };

  const handleItemClick = () => {
    console.log("item clicked");
  };

  const handleArchiveClick = () => {
       handleMenuClose();
       handleArchiveList(id);
  }

  return (
    <Card sx={{ width: 300, mt: 2, mb: 2, backgroundColor: "#424242" , borderRadius : 4}}>
      <CardHeader
        title={name}
        sx={{ color: "#ffffff" }}
        action={
          <>
            <IconButton
              aria-label="settings"
              onClick={handleMenuOpen}
              sx={{ color: "#ffffff" }}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEle}
              open={Boolean(anchorEle)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={handleArchiveClick}>Archive list</MenuItem>
            </Menu>
          </>
        }
      />
       {cards ?  
      <CardContent sx={{ padding: 0, color: "#ffffff" , marginLeft : 1 , marginRight : 1}}>
        {cards.map((card) => (
          <Box
            key={card.id}
            sx={{
              padding: 1,
              "&:hover": {
                backgroundColor: "gray",
                cursor: "pointer",
                borderRadius : 2,
              },
            }}
            onClick={handleItemClick}
          >
            <Typography variant="body1">{card.name}</Typography>
          </Box>
        ))}
      </CardContent> : ''}
      <AddCard />
      
    </Card>
  );
};

export default List;
