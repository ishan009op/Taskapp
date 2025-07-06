import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import Home from './Components/Home.jsx'
import Card from './Components/Card.jsx'
import AddTask from './Components/AddTask.jsx'
import Register from './Components/Register.jsx'
import Login from './Components/Login.jsx'
const router=createBrowserRouter([{
  path:"/",
  element:<App/>,
  children:[
    {
path:"/",
element:<Home/>
    },
    {
      path:"/task/:id",
      element:<Card/>
    },
    {
      path:"/add",
      element:<AddTask/>
    },
    {
      path:"/register",
      element:<Register/>
    },
    {
      path:"/login",
      element:<Login/>
    }
  ]
  
}])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
