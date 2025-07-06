import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('tasktoken')

  const handleLogout = () => {
    localStorage.removeItem('tasktoken')
    localStorage.removeItem('taskuser')
    navigate('/login')
  }

  return (
    <header className="bg-white shadow-md py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          TaskMaster ✅
        </Link>

        <nav className="flex items-center gap-4">
          {token ? (
            // 👑 Logged-in user links
            <>
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Home
              </Link>

              <Link
                to="/add"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Create Task
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            // 🧭 Guest user links
            <>
              <Link
                to="/register"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Register
              </Link>

              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
