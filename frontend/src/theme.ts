import { createTheme } from '@mui/material/styles';
import { heIL } from '@mui/material/locale';

const theme = createTheme({
  direction: 'rtl',
  palette: {
    mode: 'light',
    primary: {
      main: '#1565c0', // Blue (modern, professional)
      contrastText: '#fff',
    },
    secondary: {
      main: '#263238', // Blue-gray (deep, neutral)
      contrastText: '#fff',
    },
    background: {
      default: '#f5f7fa', // Very light gray
      paper: '#fff',
    },
    text: {
      primary: '#222',
      secondary: '#555',
    },
    error: {
      main: '#e53935',
    },
    warning: {
      main: '#ffa726',
    },
    info: {
      main: '#1976d2',
    },
    success: {
      main: '#388e3c',
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: 'Heebo, "Segoe UI", Arial, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 600,
          boxShadow: 'none',
          padding: '10px 28px',
          transition: 'background 0.2s',
          '& .MuiButton-startIcon': {
            marginRight: 8,
            marginLeft: 0,
          },
          '& .MuiButton-endIcon': {
            marginLeft: 8,
            marginRight: 0,
          },
        },
        containedPrimary: {
          background: 'linear-gradient(90deg, #42a5f5 0%, #1976d2 100%)',
          color: '#fff',
          '&:hover': {
            background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(90deg, #607d8b 0%, #90a4ae 100%)',
          color: '#fff',
          '&:hover': {
            background: 'linear-gradient(90deg, #90a4ae 0%, #607d8b 100%)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 16px 0 rgba(60, 72, 88, 0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          background: '#fff',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
  },
}, heIL);

export default theme; 