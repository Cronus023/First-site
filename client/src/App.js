import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import 'materialize-css'
import { useRoutes } from './rotes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/auth.context'
import { Navbar } from './components/Navbar'

function App() {
  const { token, login, logout,del, userId, ALLusers, userIsDeleted,userIsBlocked, deletedUsers } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  return (
    <AuthContext.Provider value ={{
      token, login, logout, userId, isAuthenticated, ALLusers,userIsDeleted,userIsBlocked,del,deletedUsers
    }}>
      <Router>
        {isAuthenticated && <Navbar />}
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}
export default App
