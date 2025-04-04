import React from "react";
import { Card, CardContent, Typography, CardActionArea, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ActionAreaCard({ name, id, isStarred }) {

  const navigate = useNavigate();

  const handleClick = () => {
      navigate(`/boards/${id}`)
  }
  return (
    <Card sx={{ width: 250, height: 200, mt: 2, mb: 2 }} onClick = {handleClick}>
      <CardActionArea sx={{ height: "100%" }}>
        <CardContent sx={{ height: "100%" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              fontWeight="bold"
            >
              {name}
            </Typography>
           {isStarred &&  <Typography>⭐</Typography>}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
