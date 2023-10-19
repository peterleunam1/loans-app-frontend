import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from 'app'

// Routing imports

// Theme imports
import { createTheme, ThemeProvider } from '@mui/material/styles'

// Global styles
import 'normalize.css'

// Routing configuration

// Theme configuration
const theme = createTheme({
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
    }
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
