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
      const botMessage = { role: 'assistant', content: response.data.reply }
      setMessages((prevMessages) => [...prevMessages, botMessage])
    } catch (error) {
      console.error('发送失败:', error)
      const errorMessage = { role: 'assistant', content: '请求失败，请稍后重试。' }
      setMessages((prevMessages) => [...prevMessages, errorMessage])
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ChatBot 聊天机器人</h1>
      <div className="bg-white p-4 rounded shadow h-96 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-3 py-2 rounded ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-200'}`}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="请输入消息"
          className="flex-1 border rounded p-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          发送
        </button>
      </form>
    </div>
  )
}

export default ChatBot