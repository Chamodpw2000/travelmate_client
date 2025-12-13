import React, { useState, useRef, useEffect } from 'react'
import logo from '../../assets/Logo.png'
import logo2 from '../../assets/TravalMateLogo2.png'
import { IoSendSharp } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import axios from 'axios';

// Function to format message text with markdown-like syntax
const formatMessage = (text) => {
  if (!text) return null;
  
  // Split by lines
  const lines = text.split('\n');
  
  return lines.map((line, lineIndex) => {
    if (!line.trim()) return <br key={lineIndex} />;
    
    // Process bold text
    const parts = [];
    let lastIndex = 0;
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match;
    
    while ((match = boldRegex.exec(line)) !== null) {
      // Add text before the bold part
      if (match.index > lastIndex) {
        parts.push(line.substring(lastIndex, match.index));
      }
      // Add bold text
      parts.push(<strong key={`${lineIndex}-${match.index}`} className='font-bold'>{match[1]}</strong>);
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex));
    }
    
    // Check if line starts with number (numbered list)
    const numberedListMatch = line.match(/^(\d+\.\s)/);
    if (numberedListMatch) {
      return (
        <div key={lineIndex} className='mb-2 pl-2'>
          {parts.length > 0 ? parts : line}
        </div>
      );
    }
    
    // Check if line starts with dash or asterisk (bullet list)
    const bulletMatch = line.match(/^[-*]\s/);
    if (bulletMatch) {
      return (
        <div key={lineIndex} className='mb-1 pl-4'>
          {parts.length > 0 ? parts : line}
        </div>
      );
    }
    
    // Regular line
    return (
      <div key={lineIndex} className='mb-1'>
        {parts.length > 0 ? parts : line}
      </div>
    );
  });
};

const ChatInterface = ({ setOpenChat }) => {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [context, setContext] = useState('')
  const messagesEndRef = useRef(null)

  const handleClose = () => {
    setOpenChat(false)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Disable body scroll when chat is open
    document.body.style.overflow = 'hidden'
    
    // Re-enable scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    
    if (!inputValue.trim()) return

    // Add user message to state
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      // Send message to backend
      const response = await axios.post('http://localhost:3000/travelmate/chat', {
        message: inputValue,
        context: context
       
      })

      if (!response.data.success) {
        throw new Error('Failed to get response')
      }

      

      // Add AI response to messages
      const aiMessage = {
        id: Date.now() + 1,
        text: response.data.reply,
        sender: 'ai',
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, there was an error. Please try again.',
        sender: 'ai',
        isError: true,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Backdrop Overlay */}
      <div 
        className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40'
        onClick={handleClose}
      />
      
      {/* Chat Popup */}
      <div className='fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-5xl px-4 z-50'>
        <div className='flex flex-col h-[600px] w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200'>
        {/* Header */}
        <div className='bg-linear-to-r from-[#1b4f78]  to-[#2a90d0] p-3 shadow-lg'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
        
              <div className='flex items-center gap-x-3 justify-center '>
                <img src={logo} alt="AI Avatar" className='w-10 h-10 rounded-full bg-white shadow-md' />
                <h1 className='!text-2xl font-bold text-white translate-y-1'>Ask From TravelMate AI!</h1>
              </div>
            </div>
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              className='w-10 h-10  rounded-full flex items-center justify-center transition-all duration-200  group'
              aria-label='Close chat'
            >
              <svg className='w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-200' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div className='flex-1 overflow-y-auto p-6 bg-linear-to-b from-gray-50/50 to-white'>
        {messages.length === 0 ? (
          <div className='flex items-center justify-center h-full text-center'>
            <div className='max-w-md flex flex-col items-center justify-center'>
              <img src={logo2} alt='logo' className='w-20 h-20 mb-6'/>
           
              <h2 className='text-3xl font-bold text-gray-800 mb-3'>
                Welcome to AI Travel Assistant
              </h2>
              <p className='text-gray-600 text-lg'>Start a conversation to get personalized travel recommendations and tips</p>
            </div>
          </div>
        ) : (
          <div className='space-y-6'>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-3 max-w-lg lg:max-w-3xl ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                    message.sender === 'user' 
                      ? 'bg-[#1b4f78]' 
                      : ''
                  }`}>
                    {message.sender === 'user' ? (
                      <svg className='w-6 h-full text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                      </svg>
                    ) : (
                     <img src={logo2} alt="logo" className='w-5 h-5'/>
                    )}
                  </div>
                  
                  {/* Message Bubble */}
                  <div
                    className={`px-4 py-3 rounded-2xl shadow-md transform transition-all  ${
                      message.sender === 'user'
                        ? 'bg-[#1b4f78] text-white rounded-tr-none'
                        : message.isError
                        ? 'bg-red-50 text-red-800 border border-red-200 rounded-tl-none'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                    }`}
                  >
                    <div className='text-sm leading-relaxed whitespace-pre-wrap'>
                      {formatMessage(message.text)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Animation */}
            {isLoading && (
              <div className='flex justify-start'>
                <div className='flex items-start gap-3 max-w-xs lg:max-w-md'>
                  <div className='shrink-0 w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md'>
                    <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' />
                    </svg>
                  </div>
                  <div className='bg-white border border-gray-200 px-5 py-4 rounded-2xl rounded-tl-none shadow-md'>
                    <div className='flex space-x-2'>
                      <div className='w-2.5 h-2.5 bg-[#1b4f78] rounded-full animate-bounce'></div>
                      <div className='w-2.5 h-2.5 bg-[#1b4f78] rounded-full animate-bounce' style={{ animationDelay: '0.1s' }}></div>
                      <div className='w-2.5 h-2.5 bg-[#1b4f78] rounded-full animate-bounce' style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className='border-t border-gray-200  bg-white/90 backdrop-blur-sm p-3 md:p-5'>
        <form onSubmit={handleSendMessage} className='flex flex-col sm:flex-row gap-2 sm:gap-3'>
          {/* Context Dropdown */}
          <div className='relative w-full sm:w-auto flex gap-x-5'>
            <select
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className='appearance-none w-full sm:w-auto px-3 sm:px-4 py-2  sm:py-3 pr-10 border-2 min-w-[150px] border-[#2a90d0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1b4f78] focus:border-[1b4f78] bg-linear-to-r from-purple-50 to-blue-50 text-gray-800 text-sm sm:text-base font-semibold cursor-pointer transition-all hover:border-[#1b4f78] hover:shadow-md'
            >
              <option value=''>🌐 All</option>
              <option value='Guides'>🗺️ Guides</option>
              <option value='Hotels'>🏨 Hotels</option>
              <option value='Restaurants'>🍴 Restaurants</option>
              <option value='Destinations'>✈️ Destinations</option>
              <option value='Transportation'>🚕 Transport</option>
            </select>
            {/* Custom dropdown arrow */}
            <div >
             <RiArrowDropDownLine className='pointer-events-none absolute right-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500' />
            </div>
          </div>

          <div className='flex gap-2 sm:gap-3 flex-1'>
            <input
              type='text'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder='Ask me anything...'
              disabled={isLoading}
              className='flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1b4f78] focus:border-transparent disabled:bg-gray-100 transition-all placeholder-gray-400 text-gray-700 text-sm sm:text-base'
            />
            
            {/* Icon-only Send Button */}
            <button
              type='submit'
              disabled={isLoading || !inputValue.trim()}
              className='w-10 h-10 sm:w-12 sm:h-12 text-[#1b4f78] bg-transparent rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center transform hover:scale-105 active:scale-95 shrink-0'
              aria-label='Send message'
            >
            {isLoading ? (
              <svg className='h-4 w-4 sm:h-5 sm:w-5' fill='none' viewBox='0 0 24 24'>
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
              </svg>
            ) : (
              <IoSendSharp className='w-5 h-5 sm:w-6 sm:h-6' />
            )}
          </button>
          </div>
        </form>
      </div>
        </div>
      </div>
    </>
  )
}

export default ChatInterface