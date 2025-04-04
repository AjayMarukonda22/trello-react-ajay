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
import DeleteIcon from "@mui/icons-material/Delete";
import CardDialog from "./CardDialog";
import AddItem from "./AddItem";

const List = ({
  name,
  id,
  cards,
  handleArchiveList,
  handleCardSubmit,
  handleDeleteCard,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleArchiveClick = () => {
    handleMenuClose();
    handleArchiveList(id);
  };

  const addNewCard = (cardTitle) => {
    handleCardSubmit(id, cardTitle);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCloseDialog = () => {
    setSelectedCard(null);
  };

  const handleDeleteClick = (cardId) => {
    handleDeleteCard(id, cardId);
  };

  return (
    <>
      <Card
        sx={{
          width: 300,
          mt: 2,
          mb: 2,
          backgroundColor: "#424242",
          borderRadius: 4,
        }}
      >
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
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
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
                <MenuItem
                  onClick={handleArchiveClick}
                  sx={{
                    "&:hover": {
                      backgroundColor: "lightBlue",
                      cursor: "pointer",
                    },
                  }}
                >
                  Archive list
                </MenuItem>
              </Menu>
            </>
          }
        />
        {cards && (
          <CardContent sx={{ padding: 0, color: "#ffffff", mx: 1 }}>
            {cards.map((card) => (
              <Box
                key={card.id}
                sx={{
                  padding: 1,
                  "&:hover": {
                    backgroundColor: "lightBlue",
                    cursor: "pointer",
                    borderRadius: 2,
                  },
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "lightPink",
                  borderRadius: 2,
                  marginY: 2,
                }}
                onClick={() => handleCardClick(card)}
              >
                <Typography variant="body1">{card.name}</Typography>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(card.id);
                  }}
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
            ))}
          </CardContent>
        )}
        <AddItem name={"Card"} addNewItem={addNewCard} />
      </Card>

      {selectedCard && (
        <CardDialog
          open={selectedCard ? true : false}
          onClose={handleCloseDialog}
          card={selectedCard}
        />
      )}
    </>
  );
};

export default List;
