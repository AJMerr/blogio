import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@picocss/pico'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from '../routes/Homepage'
import LogIn from '../routes/LogIn'
import SignUp from '../routes/SignUp'
import BlogGen from '../routes/BlogGen'
import config from '../utils/amplifyConfiguration'
import { Amplify } from 'aws-amplify'
import { useState, useEffect } from 'react'
import { getCurrentUser } from 'aws-amplify/auth'
import ProtectedRoute from '../components/ProtectedRoute'

Amplify.configure(config)

// Add auth context
export const AuthContext = React.createContext(null)

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    try {
      await getCurrentUser()
      setIsAuthenticated(true)
    } catch (err) {
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

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
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <BlogGen />
        </ProtectedRoute>
      ),
    },
  ])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
