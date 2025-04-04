import React from "react";
import { Card, CardContent, Typography, CardActionArea, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function Board({ board }) {

  const navigate = useNavigate();

  const handleClick = () => {
      navigate(`/boards/${board.id}`)
  }
  return (
    <Card sx={{ width: 250, height: 200, mt: 2, mb: 2, backgroundColor: board.prefs.backgroundColor,
                backgroundImage: `url(${board.prefs.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",}} onClick = {handleClick}>
      <CardActionArea sx={{ height: "100%" }}>
        <CardContent sx={{ height: "100%" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              fontWeight="bold"
            >
              {board.name}
            </Typography>
           {board.starred &&  <Typography>⭐</Typography>}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
