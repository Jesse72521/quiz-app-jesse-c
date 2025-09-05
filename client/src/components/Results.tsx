import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface Question {
  question: string
  options: string[]
  answer: string
  explanation: string
}

const Results = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const { score, total, questions, userAnswers } = location.state || {}

  if (!location.state) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        </div>
        <div className="relative z-10 bg-white/15 backdrop-blur-xl border border-white/30 rounded-3xl p-8 text-center max-w-md w-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-500">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">No Results Found</h2>
          <p className="text-gray-300 mb-8">Please complete a quiz first to see your results.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105"
          >
            Go to Home
          </button>
        </div>
      </div>
    )
  }

  const percentage = Math.round((score / total) * 100)
  const getScoreGradient = (percentage: number) => {
    if (percentage >= 80) return 'from-green-500 to-emerald-500'
    if (percentage >= 60) return 'from-yellow-500 to-orange-500'
    return 'from-red-500 to-pink-500'
  }

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 80) return 'Outstanding! 🎉'
    if (percentage >= 60) return 'Great job! 👏'
    return 'Keep practicing! 💪'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 relative overflow-hidden">
      {/* Subtle Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-96 h-96 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"></div>
      </div>
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Results Header */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-8 mb-8 shadow-xl text-center hover:shadow-blue-200/50 transition-all duration-500">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-800 bg-clip-text text-transparent mb-8">
            Quiz Results
          </h1>
          
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto relative">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="rgba(148, 163, 184, 0.2)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - percentage / 100)}`}
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-slate-800">{percentage}%</span>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <p className="text-xl text-slate-600 mb-2">
              You scored <span className="text-slate-800 font-bold">{score}</span> out of <span className="text-slate-800 font-bold">{total}</span> questions
            </p>
            <p className="text-2xl font-bold text-slate-800">
              {getScoreMessage(percentage)}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate('/quiz')}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105"
            >
              Take Another Quiz
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-white/70 hover:bg-white/90 text-slate-700 font-semibold py-3 px-8 rounded-2xl transition-all duration-300 border border-slate-200 hover:border-slate-300"
            >
              Back to Home
            </button>
          </div>
        </div>

        {/* Question Review */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-blue-200/50 transition-all duration-500">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-800 bg-clip-text text-transparent mb-8 text-center">
            Question Review
          </h2>
          
          <div className="space-y-6">
            {questions.map((question: Question, index: number) => {
              const userAnswer = userAnswers[index]
              const isCorrect = userAnswer === question.answer
              
              return (
                <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white flex-1">
                      Question {index + 1}
                    </h3>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      isCorrect 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                        : 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                    }`}>
                      {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  </div>
                  
                  <p className="text-slate-800 mb-6 text-lg leading-relaxed">{question.question}</p>
                  
                  <div className="space-y-3 mb-6">
                    {question.options.map((option, optionIndex) => {
                      let optionClass = 'p-4 rounded-xl border-2 transition-all duration-300 '
                      
                      if (option === question.answer) {
                        optionClass += 'border-green-400 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800'
                      } else if (option === userAnswer && !isCorrect) {
                        optionClass += 'border-red-400 bg-gradient-to-r from-red-100 to-pink-100 text-red-800'
                      } else {
                        optionClass += 'border-slate-200 bg-slate-50 text-slate-700'
                      }
                      
                      return (
                        <div key={optionIndex} className={optionClass}>
                          <div className="flex items-center">
                            {option === question.answer && (
                              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            )}
                            {option === userAnswer && !isCorrect && (
                              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </div>
                            )}
                            <span className="font-medium text-slate-800">{option}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <p className="text-slate-700">
                      <span className="font-semibold text-slate-800">Explanation:</span> {question.explanation}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Results