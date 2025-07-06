import React, { useEffect, useState } from 'react'
import axios from 'axios'
import{useNavigate,Link} from 'react-router-dom'
const Home = () => {

    const navigate=useNavigate()
const [task,setTask]=useState([])
    useEffect(()=>{
        const fetchdata=async()=>{
            const token=localStorage.getItem('tasktoken')
            const res=await axios.get('http://localhost:8080/task',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setTask(res.data)
        }
        fetchdata()
    },[])
console.log(task)
  return (
<>
  <div className="min-h-screen bg-gray-100 py-8">
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Your Tasks</h1>

      {task.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">No tasks found. Create one to get started!</p>
      ) : (
        <div className="space-y-4">
          {task.map((Task) => (
            <div
              key={Task._id}
              className="flex justify-between items-center bg-white shadow-md rounded-xl px-6 py-4"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{Task.title}</h2>
                <p
                  className={`text-sm font-medium ${
                    Task.status === "completed" ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {Task.status.toUpperCase()}
                </p>
              </div>

              <Link
                to={`/task/${Task._id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                View
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
</>

  )
}

export default Home