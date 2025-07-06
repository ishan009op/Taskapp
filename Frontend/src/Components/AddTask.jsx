import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
  const [Title, setTitle] = useState('');
  const [Priority, setPriority] = useState('');
  const [date, setDate] = useState('');
  const token = localStorage.getItem('tasktoken');
 const navigate=useNavigate()

  const addtask = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'http://localhost:8080/task',
        { title: Title, priority: Priority, deadline: date },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Task added successfully');
      setTitle('');
      setPriority('');
      setDate('');
    } catch (error) {
      console.error('Error adding task:', error.response?.data || error.message);
    }
  };
useEffect(() => {
    const token = localStorage.getItem('tasktoken')
    if (!token) {
      navigate('/login') // 🚫 redirect non-users
    }
  }, [navigate])
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create New Task 📝
        </h2>

        <form onSubmit={addtask} className="space-y-5">

          {/* Task Title */}
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium mb-1">Task Title</label>
            <input
              type="text"
              id="title"
              value={Title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter your task title"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Priority Selection */}
          <div>
            <span className="block text-gray-700 font-medium mb-1">Priority</span>
            <div className="flex gap-6">
              {['low', 'medium', 'high'].map((level) => (
                <label key={level} className="flex items-center gap-1 capitalize text-gray-600">
                  <input
                    type="radio"
                    name="priority"
                    value={level}
                    checked={Priority === level}
                    onChange={(e) => setPriority(e.target.value)}
                    className="accent-blue-600"
                  />
                  {level}
                </label>
              ))}
            </div>
          </div>

          {/* Deadline Picker */}
          <div>
            <label htmlFor="deadline" className="block text-gray-700 font-medium mb-1">Deadline</label>
            <input
              type="date"
              id="deadline"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
