import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from 'app'

// Routing imports
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Routes from './app/consts/routers'

// Theme imports
import { createTheme, ThemeProvider } from '@mui/material/styles'

// Global styles
import 'normalize.css'

// Routing configuration
const router = createBrowserRouter([
  {
    path: Routes.Home,
    element: <App />
  }
])

// Theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: '#C4C4C4'
    },
    secondary: {
      main: '#8b25ff'
    }
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
