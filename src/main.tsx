import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom'
import Login from './pages/Login.tsx'
import App from './App.tsx'
import Home from './Pages/Home.tsx'
import SignUp from './Pages/SignUp.tsx'

const routes = createBrowserRouter([
  {
    path: "/",  
    element: localStorage.getItem("token") ? <Navigate to="/home" /> : <Login />, 
  },
  {
    path: "/signup",  
    element: localStorage.getItem("token") ? <Navigate to="/" /> : <SignUp />, 
  },
  {
    path: "/home",
    element: <App />,  
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>,
)
