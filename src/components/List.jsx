import React,{useState} from "react";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
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
  const [selectedCard, setSelectedCard] = React.useState(null);


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
            <IconButton
              aria-label="archive"
              onClick={() => handleArchiveList(id)}
              sx={{ color: "#ffffff" }}
            >
              <ArchiveIcon />
            </IconButton>
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
          open={Boolean(selectedCard)}
          onClose={handleCloseDialog}
          card={selectedCard}
        />
      )}
    </>
  );
};

export default List;