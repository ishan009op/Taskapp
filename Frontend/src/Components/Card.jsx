import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Card = () => {
  const [task, setTask] = useState({})
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const { id } = useParams()
  const token = localStorage.getItem('tasktoken')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchtask = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/task/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setTask(res.data)
      } catch (err) {
        console.error('Fetch failed', err)
        navigate('/') // redirect if not found or error
      }
    }

    if (!token) navigate('/login')
    else fetchtask()
  }, [id, token, navigate])

  const completed = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:8080/task/${id}`,
        { status: 'completed' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setTask(res.data)
      setIsButtonDisabled(true)
    } catch (err) {
      console.error('Status update failed', err)
    }
  }

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this task?')
    if (!confirmed) return

    try {
      const res = await axios.delete(`http://localhost:8080/task/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(res.data)
      navigate('/')
    } catch (err) {
      console.error('Delete failed', err)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4 py-10">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-xl">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">{task.title}</h2>

        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Priority:</span>{' '}
            <span className="capitalize text-blue-600">{task.priority}</span>
          </p>

          <p>
            <span className="font-semibold">Deadline:</span>{' '}
            {task.deadline ? (
              new Date(task.deadline).toLocaleDateString()
            ) : (
              <span className="text-gray-400 italic">No deadline</span>
            )}
          </p>

          <p>
            <span className="font-semibold">Status:</span>{' '}
            <span
              className={`font-bold ${
                task.status === 'completed'
                  ? 'text-green-600'
                  : task.status === 'in process'
                  ? 'text-yellow-600'
                  : 'text-red-600'
              }`}
            >
              {task.status}
            </span>
          </p>
        </div>

        <div className="mt-6 flex gap-4">
          {task.status !== 'completed' && (
            <button
              onClick={completed}
              disabled={isButtonDisabled}
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
            >
              Mark as Completed ✅
            </button>
          )}

          <button
            onClick={handleDelete}
            className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
          >
            Delete 🗑️
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
