import React from 'react';
import { 
  Box,
  Button,
  Typography,
  IconButton,
  Collapse,
  Container
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

const ErrorDisplay = ({ 
  error, 
  onClose, 
  severity = 'error', 
  title = 'Error',
  sx = {},
  actionText = 'Try Again',
  fullHeight = false
}) => {
  const errorMessage = error?.message || error?.toString() || 'An unknown error occurred';
  const severityConfig = {
    error: {
      color: 'error.main',
      icon: <ErrorOutlineRoundedIcon fontSize="large" />,
      bgColor: 'error.lighter'
    },
    warning: {
      color: 'warning.main',
      icon: <ErrorOutlineRoundedIcon fontSize="large" />,
      bgColor: 'warning.lighter'
    },
    info: {
      color: 'info.main',
      icon: <ErrorOutlineRoundedIcon fontSize="large" />,
      bgColor: 'info.lighter'
    },
    success: {
      color: 'success.main',
      icon: <ErrorOutlineRoundedIcon fontSize="large" />,
      bgColor: 'success.lighter'
    }
  };

  return (
    <Collapse 
      in={!!error} 
      sx={{ 
        width: '100%',
        flex: fullHeight ? 1 : 'none',
        overflow: 'hidden', 
        ...sx 
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: fullHeight ? '100vh' : 'auto',
          p: 4,
          textAlign: 'center',
          backgroundColor: severityConfig[severity]?.bgColor || 'error.lighter',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          boxSizing: 'border-box', 
          overflow: 'hidden', 
        }}
      >
        {onClose && (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: severityConfig[severity]?.color || 'error.main'
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
        
        <Container 
          maxWidth="sm" 
          sx={{
            width: '100%',
            overflow: 'hidden',
            px: 2, 
          }}
        >
          <Box sx={{ 
            color: severityConfig[severity]?.color || 'error.main', 
            mb: 2,
            mx: 'auto', 
            width: 'fit-content' 
          }}>
            {severityConfig[severity]?.icon}
          </Box>
          
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              color: severityConfig[severity]?.color || 'error.main',
              wordBreak: 'break-word' 
            }}
          >
            {title}
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 3, 
              color: 'text.secondary',
              wordBreak: 'break-word' 
            }}
          >
            {errorMessage}
          </Typography>
          
          {onClose && (
            <Button
              variant="contained"
              onClick={onClose}
              sx={{
                bgcolor: severityConfig[severity]?.color || 'error.main',
                '&:hover': {
                  bgcolor: severityConfig[severity]?.color || 'error.dark'
                },
                mx: 'auto', 
                display: 'block' 
              }}
            >
              {actionText}
            </Button>
          )}
        </Container>
      </Box>
    </Collapse>
  );
};

export default ErrorDisplay;