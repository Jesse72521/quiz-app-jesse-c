import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [topic, setTopic] = useState('')
  const navigate = useNavigate()

  const handleStartQuiz = () => {
    const quizTopic = topic.trim() || 'general knowledge'
    navigate(`/quiz?topic=${encodeURIComponent(quizTopic)}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-96 h-96 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>
      
      {/* Subtle animated particles */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-300/30 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-8 sm:p-12 max-w-lg w-full shadow-xl hover:shadow-blue-200/50 transition-all duration-500">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl mb-6 shadow-lg hover:shadow-blue-400/50 transition-all duration-300 transform hover:scale-110 animate-float">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-800 bg-clip-text text-transparent mb-4 drop-shadow-lg">
            Quiz Master
          </h1>
          <p className="text-slate-600 text-xl font-medium">
            Challenge yourself with AI-powered questions
          </p>
        </div>
        
        {/* Topic Input */}
        <div className="space-y-6">
          <div className="space-y-3">
            <label htmlFor="topic" className="block text-sm font-semibold text-slate-700">
              Choose Your Topic
            </label>
            <div className="relative">
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., JavaScript, History, Science..."
                className="w-full px-6 py-4 bg-white/70 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-100/50 to-indigo-100/50 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            <p className="text-xs text-slate-500">
              Leave empty for general knowledge questions
            </p>
          </div>
          
          {/* Start Button */}
          <button
            onClick={handleStartQuiz}
            className="group relative w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center space-x-3 text-lg">
              <span>Start Quiz</span>
              <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </button>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-2 gap-4 text-center">
          <div className="bg-white/60 rounded-xl p-4 border border-slate-200">
            <div className="text-2xl mb-2">🧠</div>
            <div className="text-sm text-slate-600">AI Generated</div>
          </div>
          <div className="bg-white/60 rounded-xl p-4 border border-slate-200">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-sm text-slate-600">Instant Results</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home