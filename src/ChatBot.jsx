// src/ChatBot.jsx
import React, { useState } from 'react'
import axios from 'axios'

function ChatBot() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages([...messages, userMessage])
    setInput('')

    try {
      const apiUrl = import.meta.env.VITE_API_URL
      const response = await axios.post(`${apiUrl}/chat`, { message: input })
      const botMessage = { role: 'assistant', content: response.data.response }
      setMessages((prevMessages) => [...prevMessages, botMessage])
    } catch (error) {
      console.error('送信失敗:', error)
      const errorMessage = { role: 'assistant', content: 'エラーが発生しました。もう一度お試しください。' }
      setMessages((prevMessages) => [...prevMessages, errorMessage])
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-700">チャットボット</h1>
        
        <div className="h-96 overflow-y-auto mb-6 space-y-4 p-4 bg-gray-100 rounded-lg shadow-inner">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-3 rounded-lg shadow text-sm ${
                  msg.role === 'user'
                    ? 'bg-blue-200 text-blue-900'
                    : 'bg-gray-300 text-gray-800'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="メッセージを入力してください..."
            className="flex-1 px-4 py-3 text-base border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
          >
            送信
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatBot