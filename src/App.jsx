// src/App.jsx
import React, { useEffect } from 'react'
import ChatBot from './ChatBot'

function App() {
  useEffect(() => {
    console.log('当前 API 地址:', import.meta.env.VITE_API_URL)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <ChatBot />
    </div>
  )
}

export default App