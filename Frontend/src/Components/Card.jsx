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
        navigate('/')
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
    <div className="min-h-screen flex justify-center items-center bg-[#9929EA] px-4 py-10">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-xl">
        <h2 className="text-3xl font-bold text-[#CC66DA] mb-6">{task.title}</h2>

        <div className="space-y-4 text-gray-700 text-lg">
          <p>
            <span className="font-semibold">Priority:</span>{' '}
            <span className="capitalize text-[#B94BCF]">{task.priority}</span>
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
                  ? 'text-yellow-500'
                  : 'text-red-600'
              }`}
            >
              {task.status}
            </span>
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          {task.status !== 'completed' && (
            <button
              onClick={completed}
              disabled={isButtonDisabled}
              className="flex-1 bg-[#FAEB92] text-black font-semibold py-2 rounded-lg hover:bg-yellow-300 transition disabled:opacity-50"
            >
              Mark as Completed
            </button>
          )}

          <button
            onClick={handleDelete}
            className="flex-1 bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition"
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
