import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const navigate = useNavigate()

  const register = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8080/register', {
        name: Name,
        email: Email,
        password: Password,
      })
      console.log(res.data)
      alert('Registration successful!')
      navigate('/login')
      setName('')
      setEmail('')
      setPassword('')
    } catch (err) {
      console.error('Error registering:', err.response?.data || err.message)
      alert('Registration failed.')
    }
  }

  return (
    <div className="min-h-screen bg-[#9929EA] flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-[#CC66DA] mb-6">Create Account</h2>

        <form onSubmit={register} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#CC66DA] outline-none"
            />
          </div>

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
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
