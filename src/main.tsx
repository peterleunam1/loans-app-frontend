import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from 'app'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Routes from './app/consts/routers'
import 'normalize.css'

const router = createBrowserRouter([
  {
    path: Routes.Home,
    element: <App />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
