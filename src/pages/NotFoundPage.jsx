import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box,
  Button,
  Container,
  Typography,
  useTheme
} from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

const NotFound = () => {
  const theme = useTheme();

  return (
    <Container 
      maxWidth="sm" 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '96vh',
        textAlign: 'center',
        py: 8
      }}
    >
      <WarningAmberRoundedIcon 
        sx={{ 
          fontSize: 60, 
          color: 'warning.main', 
          mb: 3 
        }} 
      />
      
      <Typography 
        variant="h1" 
        sx={{ 
          fontSize: { xs: '3rem', sm: '3.75rem' },
          fontWeight: 700,
          mb: 2
        }}
      >
        404 Not Found
      </Typography>
      
      <Typography 
        variant="h5" 
        sx={{ 
          mb: 3,
          color: 'text.secondary'
        }}
      >
        This page does not exist
      </Typography>
      
      <Button
        component={Link}
        to="/"
        variant="contained"
        size="large"
        sx={{
          mt: 2,
          bgcolor: 'primary.main',
          '&:hover': {
            bgcolor: 'primary.dark'
          }
        }}
      >
        Go Back
      </Button>
    </Container>
  );
};

export default NotFound;