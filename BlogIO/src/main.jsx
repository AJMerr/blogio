import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@picocss/pico'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from '../routes/Homepage'
import LogIn from '../routes/LogIn'
import SignUp from '../routes/SignUp'
import config from '../utils/amplifyConfiguration'
import { Amplify } from 'aws-amplify'

Amplify.configure(config)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/login',
    element: <LogIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/generateBlog',
    element: <BlogGen />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
