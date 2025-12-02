"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface ChatMessage {
  id: string
  sender: 'user' | 'bot'
  message: string
  timestamp: string
}

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
  const [notificationText, setNotificationText] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Show chat button after page loads
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    // Initialize with welcome message
    const welcomeMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'bot',
      message: "Hello! 👋 Welcome to our architecture studio. How can we help you today?",
      timestamp: new Date().toISOString()
    }
    setMessages([welcomeMessage])

    return () => {
      clearTimeout(timer)
    }
  }, [isOpen])

  // Show contextual notification when portfolio section is visible
  useEffect(() => {
    if (typeof window === "undefined") return

    const target = document.getElementById("portfolio-section")
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isOpen) {
          setNotificationText("Are you impressed by our work 😏")
          setHasNewMessage(true)
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(target)

    return () => observer.disconnect()
  }, [isOpen])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const saveConversationToStorage = (updatedMessages: ChatMessage[]) => {
    try {
      const existingConversations = localStorage.getItem('chatConversations')
      const conversations = existingConversations ? JSON.parse(existingConversations) : []
      
      // Find existing conversation or create new one
      const conversationIndex = conversations.findIndex((conv: any) => conv.sessionId === sessionId)
      
      const conversationData = {
        id: conversationIndex >= 0 ? conversations[conversationIndex].id : `conv_${Date.now()}`,
        sessionId,
        messages: updatedMessages,
        startedAt: conversationIndex >= 0 ? conversations[conversationIndex].startedAt : new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        userInfo: {
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        }
      }

      if (conversationIndex >= 0) {
        conversations[conversationIndex] = conversationData
      } else {
        conversations.push(conversationData)
      }

      localStorage.setItem('chatConversations', JSON.stringify(conversations))
    } catch (error) {
      console.error('Error saving chat conversation:', error)
    }
  }

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('budget')) {
      return "Our project costs vary depending on scope and complexity. I'd be happy to schedule a consultation to discuss your specific needs and provide a detailed quote. Would you like me to connect you with one of our architects?"
    }
    
    if (lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('projects')) {
      return "You can view our portfolio on this website! We've completed over 150 projects including residential homes, commercial spaces, and renovation projects. Each project showcases our commitment to innovative design and quality craftsmanship."
    }
    
    if (lowerMessage.includes('time') || lowerMessage.includes('timeline') || lowerMessage.includes('how long')) {
      return "Project timelines vary based on complexity. Typically: Residential design (3-6 months), Commercial projects (6-12 months), Renovations (2-4 months). We'll provide a detailed timeline during our initial consultation."
    }
    
    if (lowerMessage.includes('consultation') || lowerMessage.includes('meeting') || lowerMessage.includes('appointment')) {
      return "I'd be happy to schedule a consultation! You can fill out our contact form on this page, or call us directly at +230 58110646. We typically respond within 24 hours and offer free initial consultations."
    }
    
    if (lowerMessage.includes('sustainable') || lowerMessage.includes('eco') || lowerMessage.includes('green')) {
      return "Absolutely! We specialize in sustainable architecture using eco-friendly materials and energy-efficient designs. We can incorporate solar panels, sustainable building materials, and green building certifications like LEED."
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! Great to meet you! I'm here to help with any questions about our architectural services. Are you planning a new project or looking to renovate an existing space?"
    }

    // Default response
    return "Thank you for your question! Our team specializes in innovative architectural design and would love to help with your project. For detailed information, I recommend filling out our contact form or scheduling a consultation. Is there something specific about our services you'd like to know more about?"
  }

  const handleChatToggle = () => {
    setIsOpen(!isOpen)
    setHasNewMessage(false)
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      message: inputMessage.trim(),
      timestamp: new Date().toISOString()
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInputMessage('')
    setIsTyping(true)

    // Save user message
    saveConversationToStorage(updatedMessages)

    // Simulate bot typing and response
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage)
      const botMessage: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        sender: 'bot',
        message: botResponse,
        timestamp: new Date().toISOString()
      }

      const finalMessages = [...updatedMessages, botMessage]
      setMessages(finalMessages)
      setIsTyping(false)

      // Save complete conversation
      saveConversationToStorage(finalMessages)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  const handleQuickAction = (action: string) => {
    let message = ''
    switch (action) {
      case 'Get Quote':
        message = 'I would like to get a quote for my project'
        break
      case 'View Portfolio':
        message = 'Can you show me your portfolio?'
        break
      case 'Schedule Call':
        message = 'I would like to schedule a consultation call'
        break
      case 'Ask Question':
        message = 'I have some questions about your services'
        break
      default:
        message = action
    }
    
    setInputMessage(message)
    setTimeout(() => handleSendMessage(), 100)
  }

  return (
    <>
      {/* Chat Button */}
      <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 transition-all duration-500 ease-out ${
        isVisible ? 'transform translate-y-0 opacity-100' : 'transform translate-y-16 opacity-0'
      }`}>
        
        {/* Chat Widget (when expanded) */}
        {isOpen && (
          <div className="mb-4 bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 max-w-[calc(100vw-2rem)] transform transition-all duration-300 ease-out animate-in slide-in-from-bottom-4">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-stone-800 to-stone-900 text-white p-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center p-1">
                    <Image
                      src="/logo/LOGO.png"
                      alt="ENOU/HR Logo"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">Architecture Chat</h3>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs text-stone-300">Online now</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleChatToggle}
                  className="text-stone-300 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'items-start'} space-x-2`}>
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 p-1">
                      <Image
                        src="/logo/LOGO.png"
                        alt="Logo"
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div className={`rounded-lg p-3 max-w-xs ${
                    message.sender === 'user' 
                      ? 'bg-stone-800 text-white' 
                      : 'bg-stone-100 text-stone-900'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                    <span className={`text-xs mt-1 block ${
                      message.sender === 'user' ? 'text-stone-300' : 'text-stone-500'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 p-1">
                    <Image
                      src="/logo/LOGO.png"
                      alt="Logo"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  <div className="bg-stone-100 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-t border-gray-100">
              <p className="text-xs text-stone-600 mb-3">Quick actions:</p>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => handleQuickAction('Get Quote')}
                  className="text-xs bg-stone-800 text-white py-2 px-3 rounded-lg hover:bg-stone-900 transition-colors"
                >
                  💰 Get Quote
                </button>
                <button 
                  onClick={() => handleQuickAction('View Portfolio')}
                  className="text-xs bg-stone-100 text-stone-800 py-2 px-3 rounded-lg hover:bg-stone-200 transition-colors"
                >
                  🏗️ Portfolio
                </button>
                <button 
                  onClick={() => handleQuickAction('Schedule Call')}
                  className="text-xs bg-stone-100 text-stone-800 py-2 px-3 rounded-lg hover:bg-stone-200 transition-colors"
                >
                  📞 Schedule Call
                </button>
                <button 
                  onClick={() => handleQuickAction('Ask Question')}
                  className="text-xs bg-stone-100 text-stone-800 py-2 px-3 rounded-lg hover:bg-stone-200 transition-colors"
                >
                  ❓ Ask Question
                </button>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-800 focus:border-transparent"
                  disabled={isTyping}
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-stone-800 text-white p-2 rounded-lg hover:bg-stone-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Chat Button */}
        <button
          onClick={handleChatToggle}
          className={`relative bg-gradient-to-r from-stone-800 to-stone-900 text-white rounded-full p-4 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 group ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          {/* Notification Badge */}
          {hasNewMessage && !isOpen && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-xs text-white font-bold">1</span>
            </div>
          )}

          {/* Pulse Animation Ring */}
          <div className="absolute inset-0 rounded-full bg-stone-800 animate-ping opacity-20"></div>
          
          {/* Chat Icon */}
          <svg 
            className={`w-6 h-6 transform transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            )}
          </svg>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-stone-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {isOpen ? 'Close chat' : 'Chat with us'}
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-stone-900"></div>
          </div>
        </button>

        {/* Contextual Message Bubble */}
        {!isOpen && hasNewMessage && notificationText && (
          <div className="absolute bottom-full right-0 mb-4 bg-white rounded-lg shadow-lg p-3 max-w-xs animate-fade-in-up">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center p-1">
                <Image
                  src="/logo/LOGO.png"
                  alt="Logo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-sm text-stone-900">{notificationText}</p>
              </div>
            </div>
            <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
          </div>
        )}
      </div>

      {/* Backdrop overlay when chat is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={handleChatToggle}
        />
      )}
    </>
  )
}
