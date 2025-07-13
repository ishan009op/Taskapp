import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')

  const fetchTasks = async () => {
    const token = localStorage.getItem('tasktoken')
    if (!token) return navigate("/register")

    const params = new URLSearchParams()
    if (status) params.append("status", status)
    if (priority) params.append("priority", priority)

    try {
      const res = await axios.get(`http://localhost:8080/task?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setTasks(res.data)
    } catch (err) {
      console.error("Error fetching tasks:", err.response?.data?.message || err.message)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div className="min-h-screen bg-[#9929EA] py-10">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-[#FAEB92]">Your Tasks</h1>

        {/* Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-4 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button
            onClick={fetchTasks}
            className="bg-[#CC66DA] text-white px-4 py-2 rounded-md hover:bg-[#B94BCF] transition"
          >
            Filter
          </button>

          {(status || priority) && (
            <button
              onClick={() => {
                setStatus('')
                setPriority('')
                fetchTasks()
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
            >
              Reset
            </button>
          )}
        </div>

        {/* Task List */}
        {tasks.length === 0 ? (
          <p className="text-center text-white mt-20">No tasks found. Create one to get started!</p>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="flex justify-between items-center bg-[#FAEB92] shadow-lg rounded-xl px-6 py-4"
              >
                <div>
                  <h2 className="text-lg font-bold text-black">{task.title}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      task.status === "completed"
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}>
                      {task.status.toUpperCase()}
                    </span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      task.priority === "high"
                        ? "bg-red-200 text-red-800"
                        : task.priority === "medium"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-green-200 text-green-800"
                    }`}>
                      {task.priority.toUpperCase()}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/task/${task._id}`}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
