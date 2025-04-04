import React from 'react';
import { Box, Grid, Checkbox, Typography, IconButton, LinearProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddItem from './AddItem';

const CheckItems = ({ checkItems, setCheckItems, handleDeleteCheckItem }) => {
  const completedCount = checkItems.filter((item) => item.state === 'complete').length;
  const progress = checkItems.length > 0 ? (completedCount / checkItems.length) * 100 : 0;

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
          <Grid item key={checkItem.id}>
            <Box
              sx={{
                p: 1,
                border: '1px solid #ccc',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box display="flex" alignItems="center" gap={0.5}>
                <Checkbox
                  checked={checkItem.state === 'complete'}
                  onChange={() =>
                    setCheckItems((prev) =>
                      prev.map((item) =>
                        item.id === checkItem.id
                          ? {
                              ...item,
                              state:
                                item.state === 'complete' ? 'incomplete' : 'complete',
                            }
                          : item
                      )
                    )
                  }
                />
                <Typography variant="body1">{checkItem.name}</Typography>
              </Box>

              <IconButton
                onClick={() => handleDeleteCheckItem(checkItem.id)}
                edge="end"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Grid>
        ))}
        <AddItem name = {'Check item'}/>
      </Grid>
    </Box>
  );
};

export default CheckItems;
