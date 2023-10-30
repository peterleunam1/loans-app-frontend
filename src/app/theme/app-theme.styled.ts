import { createTheme } from '@mui/material/styles'
import 'normalize.css'

// Theme configuration
export const theme = createTheme({
  typography: {
    fontFamily: 'Epilogue'
  },
  palette: {
    primary: {
      main: '#D9D9D9',
      light: '#f5f3f3'
    },
    secondary: {
      main: '#8b25ff'
    },
    warning: {
      main: '#ffcc00'
    },
    success: {
      main: '#339900'
    },
    error: {
      main: '#cc3300'
    }
  }
})
