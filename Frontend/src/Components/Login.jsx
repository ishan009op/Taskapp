import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const navigate = useNavigate()

  const login = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8080/login', {
        email: Email,
        password: Password,
      })

      localStorage.setItem('tasktoken', res.data.token)
      localStorage.setItem('taskuser', JSON.stringify(res.data.user))

      alert('Login successful!')
      navigate('/')
      setEmail('')
      setPassword('')
      console.log(res.data)
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message)
      alert('Invalid credentials.')
    }
  }

  return (
    <div className="min-h-screen bg-[#9929EA] flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-[#CC66DA] mb-6">Welcome Back 👋</h2>

        <form onSubmit={login} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#CC66DA] outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#CC66DA] outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#FAEB92] text-black font-bold py-2 rounded-lg hover:bg-yellow-300 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
