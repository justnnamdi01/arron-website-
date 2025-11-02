"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string
  projectType: string
  budget: string
  timeline: string
  description: string
  submittedAt: string
}

interface ChatConversation {
  id: string
  sessionId: string
  messages: {
    id: string
    sender: 'user' | 'bot'
    message: string
    timestamp: string
  }[]
  startedAt: string
  lastActivity: string
  userInfo?: {
    ip?: string
    userAgent?: string
  }
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'contacts' | 'chats'>('contacts')
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([])
  const [chatConversations, setChatConversations] = useState<ChatConversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')

  // Simple password protection
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    // You should change this to a more secure authentication method
    if (password === 'admin123') {
      setIsAuthenticated(true)
      localStorage.setItem('adminAuth', 'true')
    } else {
      alert('Invalid password')
    }
  }

  useEffect(() => {
    // Check if already authenticated
    const isAuth = localStorage.getItem('adminAuth')
    if (isAuth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      loadContactSubmissions()
      loadChatConversations()
    }
  }, [isAuthenticated])

  const loadContactSubmissions = () => {
    // Load from localStorage or API
    const stored = localStorage.getItem('contactSubmissions')
    if (stored) {
      setContactSubmissions(JSON.parse(stored))
    }
  }

  const loadChatConversations = () => {
    // Load from localStorage or API
    const stored = localStorage.getItem('chatConversations')
    if (stored) {
      setChatConversations(JSON.parse(stored))
    }
  }

  const addSampleData = () => {
    // Add sample contact submissions
    const sampleContacts: ContactSubmission[] = [
      {
        id: "sample_1",
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "+1 (555) 123-4567",
        projectType: "residential",
        budget: "250k-500k",
        timeline: "6-12months",
        description: "Looking to build a modern family home with sustainable features and open floor plan.",
        submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "sample_2",
        name: "Sarah Johnson",
        email: "sarah.j@company.com",
        phone: "+1 (555) 987-6543",
        projectType: "commercial",
        budget: "500k-1m",
        timeline: "1year+",
        description: "Office renovation for tech startup - need flexible workspace design with collaboration areas.",
        submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]

    // Add sample chat conversations
    const sampleChats: ChatConversation[] = [
      {
        id: "chat_1",
        sessionId: "session_12345",
        messages: [
          {
            id: "msg_1",
            sender: "bot",
            message: "Hello! 👋 Welcome to our architecture studio. How can we help you today?",
            timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
          },
          {
            id: "msg_2",
            sender: "user",
            message: "Hi! I'm interested in building a new home. What's your process?",
            timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000 + 2 * 60 * 1000).toISOString()
          },
          {
            id: "msg_3",
            sender: "bot",
            message: "Great! Our process typically starts with an initial consultation to understand your vision and requirements. We then create detailed architectural plans and 3D visualizations. Would you like to schedule a consultation?",
            timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000 + 4 * 60 * 1000).toISOString()
          },
          {
            id: "msg_4",
            sender: "user",
            message: "Yes, that sounds perfect. How much does a consultation cost?",
            timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000 + 6 * 60 * 1000).toISOString()
          },
          {
            id: "msg_5",
            sender: "bot",
            message: "Our initial consultations are completely free! We believe in getting to know our clients and their vision before discussing any costs. You can fill out our contact form or call us directly to schedule.",
            timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000 + 8 * 60 * 1000).toISOString()
          }
        ],
        startedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000 + 8 * 60 * 1000).toISOString()
      }
    ]

    localStorage.setItem('contactSubmissions', JSON.stringify(sampleContacts))
    localStorage.setItem('chatConversations', JSON.stringify(sampleChats))
    
    setContactSubmissions(sampleContacts)
    setChatConversations(sampleChats)
  }

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.removeItem('contactSubmissions')
      localStorage.removeItem('chatConversations')
      setContactSubmissions([])
      setChatConversations([])
    }
  }

  const exportData = () => {
    const data = {
      contactSubmissions,
      chatConversations,
      exportedAt: new Date().toISOString()
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `admin-data-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const logout = () => {
    localStorage.removeItem('adminAuth')
    setIsAuthenticated(false)
    setPassword('')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-black flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl max-w-md w-full mx-4">
          <h1 className="text-3xl font-light text-white mb-8 text-center">Admin Access</h1>
          <form onSubmit={handleAuth} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-stone-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter admin password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black py-3 rounded-lg font-medium hover:bg-yellow-300 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-black">
      <Header />
      
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-light text-white">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={addSampleData}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                Add Sample Data
              </button>
              <button
                onClick={exportData}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Export Data
              </button>
              <button
                onClick={clearAllData}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Clear All Data
              </button>
              <button
                onClick={logout}
                className="bg-stone-600 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('contacts')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'contacts'
                  ? 'bg-yellow-400 text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Contact Submissions ({contactSubmissions.length})
            </button>
            <button
              onClick={() => setActiveTab('chats')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'chats'
                  ? 'bg-yellow-400 text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Chat Conversations ({chatConversations.length})
            </button>
          </div>

          {/* Contact Submissions Tab */}
          {activeTab === 'contacts' && (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <h2 className="text-2xl font-light text-white mb-6">Contact Form Submissions</h2>
              
              {contactSubmissions.length === 0 ? (
                <p className="text-stone-300 text-center py-8">No contact submissions yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left text-stone-300 py-3 px-4">Date</th>
                        <th className="text-left text-stone-300 py-3 px-4">Name</th>
                        <th className="text-left text-stone-300 py-3 px-4">Email</th>
                        <th className="text-left text-stone-300 py-3 px-4">Phone</th>
                        <th className="text-left text-stone-300 py-3 px-4">Project Type</th>
                        <th className="text-left text-stone-300 py-3 px-4">Budget</th>
                        <th className="text-left text-stone-300 py-3 px-4">Timeline</th>
                        <th className="text-left text-stone-300 py-3 px-4">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contactSubmissions.map((submission) => (
                        <tr key={submission.id} className="border-b border-white/10 hover:bg-white/5">
                          <td className="text-stone-300 py-3 px-4 text-sm">
                            {new Date(submission.submittedAt).toLocaleDateString()}
                          </td>
                          <td className="text-white py-3 px-4">{submission.name}</td>
                          <td className="text-stone-300 py-3 px-4">{submission.email}</td>
                          <td className="text-stone-300 py-3 px-4">{submission.phone}</td>
                          <td className="text-stone-300 py-3 px-4">{submission.projectType}</td>
                          <td className="text-stone-300 py-3 px-4">{submission.budget}</td>
                          <td className="text-stone-300 py-3 px-4">{submission.timeline}</td>
                          <td className="text-stone-300 py-3 px-4 max-w-xs truncate">
                            {submission.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Chat Conversations Tab */}
          {activeTab === 'chats' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Conversations List */}
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                  <h2 className="text-xl font-light text-white mb-4">Conversations</h2>
                  
                  {chatConversations.length === 0 ? (
                    <p className="text-stone-300 text-center py-4">No chat conversations yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {chatConversations.map((conversation) => (
                        <div
                          key={conversation.id}
                          onClick={() => setSelectedConversation(conversation.id)}
                          className={`p-4 rounded-lg cursor-pointer transition-colors ${
                            selectedConversation === conversation.id
                              ? 'bg-yellow-400/20 border border-yellow-400/50'
                              : 'bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <div className="text-white font-medium">
                            Session {conversation.sessionId.slice(-8)}
                          </div>
                          <div className="text-stone-300 text-sm">
                            {conversation.messages.length} messages
                          </div>
                          <div className="text-stone-400 text-xs">
                            {new Date(conversation.lastActivity).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Conversation Detail */}
              <div className="lg:col-span-2">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                  {selectedConversation ? (
                    <div>
                      {(() => {
                        const conversation = chatConversations.find(c => c.id === selectedConversation)
                        if (!conversation) return null

                        return (
                          <div>
                            <h2 className="text-xl font-light text-white mb-4">
                              Conversation Details
                            </h2>
                            
                            <div className="mb-4 p-4 bg-white/5 rounded-lg">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-stone-400">Session ID:</span>
                                  <span className="text-white ml-2">{conversation.sessionId}</span>
                                </div>
                                <div>
                                  <span className="text-stone-400">Started:</span>
                                  <span className="text-white ml-2">
                                    {new Date(conversation.startedAt).toLocaleString()}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-stone-400">Last Activity:</span>
                                  <span className="text-white ml-2">
                                    {new Date(conversation.lastActivity).toLocaleString()}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-stone-400">Messages:</span>
                                  <span className="text-white ml-2">{conversation.messages.length}</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3 max-h-96 overflow-y-auto">
                              {conversation.messages.map((message) => (
                                <div
                                  key={message.id}
                                  className={`p-3 rounded-lg ${
                                    message.sender === 'user'
                                      ? 'bg-blue-600/20 ml-8'
                                      : 'bg-green-600/20 mr-8'
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <span className={`text-sm font-medium ${
                                      message.sender === 'user' ? 'text-blue-300' : 'text-green-300'
                                    }`}>
                                      {message.sender === 'user' ? 'User' : 'Bot'}
                                    </span>
                                    <span className="text-stone-400 text-xs">
                                      {new Date(message.timestamp).toLocaleTimeString()}
                                    </span>
                                  </div>
                                  <div className="text-white">{message.message}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      })()}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-stone-300">Select a conversation to view details</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
