import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

// Interface for quiz question structure
interface Question {
  question: string
  options: string[]
  answer: string
  explanation: string
}

const Quiz = () => {
  // State management for quiz functionality
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  
  // Navigation and URL parameters
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const topic = searchParams.get('topic') || 'general knowledge'

  // Fetch quiz questions on component mount
  useEffect(() => {
    fetchQuiz()
  }, [])

  // Function to fetch quiz questions from API
  const fetchQuiz = async () => {
    try {
      setLoading(true)
      setError('')
      
      const response = await fetch('http://localhost:5000/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: topic,
          difficulty: 'medium'
        })
      })
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (!data.questions || data.questions.length === 0) {
        throw new Error('No questions received from server')
      }
      
      setQuestions(data.questions)
      setUserAnswers(new Array(data.questions.length).fill(''))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load quiz questions'
      setError(errorMessage)
      console.error('Error fetching quiz:', err)
    } finally {
      setLoading(false)
    }
  }

  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
  }

  // Handle moving to next question or finishing quiz
  const handleNext = () => {
    // Update user answers array
    const newUserAnswers = [...userAnswers]
    newUserAnswers[currentQuestion] = selectedAnswer
    setUserAnswers(newUserAnswers)
    
    // Check if answer is correct and update score
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore(score + 1)
    }
    
    // Move to next question or finish quiz
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer('')
      setShowResult(false)
    } else {
      // Quiz completed - navigate to results
      navigate('/results', { 
        state: { 
          score: selectedAnswer === questions[currentQuestion].answer ? score + 1 : score, 
          total: questions.length,
          questions,
          userAnswers: newUserAnswers
        } 
      })
    }
  }

  // Handle answer submission
  const handleSubmit = () => {
    setShowResult(true)
  }

  // Loading state with modern animated spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Subtle Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"></div>
        </div>
        <div className="relative z-10 bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-12 text-center max-w-md w-full shadow-xl hover:shadow-blue-200/50 transition-all duration-500">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-slate-200 border-t-blue-500 mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-transparent border-r-indigo-500 animate-spin mx-auto" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-800 bg-clip-text text-transparent mb-3">Generating Quiz</h2>
          <p className="text-slate-600">Creating amazing questions about <span className="text-blue-600 font-semibold">{topic}</span>...</p>
          <div className="mt-6 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    )
  }

  // Error state with modern styling
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-100 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Subtle Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-red-200 to-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-orange-200 to-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"></div>
        </div>
        <div className="relative z-10 bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-8 text-center max-w-md w-full shadow-xl hover:shadow-red-200/50 transition-all duration-500">
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-red-700 to-orange-800 bg-clip-text text-transparent mb-3">Oops! Something went wrong</h2>
          <p className="text-red-600 mb-8">{error}</p>
          <div className="space-y-4">
            <button
              onClick={fetchQuiz}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-white/70 hover:bg-white/90 text-slate-700 font-semibold py-3 px-6 rounded-2xl transition-all duration-300 border border-slate-200 hover:border-slate-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  // No questions available state
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md w-full">
          <p className="text-gray-600">No questions available for this topic.</p>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  // Main quiz interface with modern styling
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-4 sm:py-8 relative overflow-hidden">
      {/* Subtle Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-96 h-96 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"></div>
      </div>
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Quiz Header Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-6 mb-6 shadow-xl hover:shadow-blue-200/50 transition-all duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-lg font-semibold text-blue-600 mb-2">
                Topic: {topic}
              </h2>
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-800 bg-clip-text text-transparent">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <div className="text-right">
              <span className="text-sm text-slate-500 block">Current Score</span>
              <span className="text-2xl font-bold text-slate-800">
                {score}/{currentQuestion}
              </span>
            </div>
          </div>
          
          {/* Modern Progress Bar */}
          <div className="relative">
            <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-4 rounded-full transition-all duration-700 ease-out relative"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            </div>
            <div className="text-center mt-2">
              <span className="text-sm text-slate-600">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
              </span>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-blue-200/50 transition-all duration-500">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-8 leading-relaxed">
            {question.question}
          </h3>

          {/* Answer Options */}
          <div className="space-y-4 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`group w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden ${
                  selectedAnswer === option
                    ? 'border-blue-500 bg-gradient-to-r from-blue-100 to-indigo-100 shadow-lg shadow-blue-500/30'
                    : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-indigo-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative z-10 text-lg font-medium text-slate-800 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center mr-4 text-sm font-bold text-slate-700">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </span>
              </button>
            ))}
          </div>

          {/* Result Display */}
          {showResult && (
            <div className={`mb-8 p-6 rounded-2xl border-2 backdrop-blur-sm ${
              selectedAnswer === question.answer 
                ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/50' 
                : 'bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-400/50'
            }`}>
              <div className="flex items-center mb-4">
                {selectedAnswer === question.answer ? (
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                )}
                <p className={`text-xl font-bold ${
                  selectedAnswer === question.answer ? 'text-green-300' : 'text-red-300'
                }`}>
                  {selectedAnswer === question.answer ? 'Correct!' : 'Incorrect!'}
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p className="text-slate-700">
                  <span className="font-semibold text-slate-800">Explanation:</span> {question.explanation}
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <button
              onClick={() => navigate('/')}
              className="bg-white/70 hover:bg-white/90 text-slate-700 font-semibold py-3 px-6 rounded-2xl transition-all duration-300 border border-slate-200 hover:border-slate-300"
            >
              Back to Home
            </button>
            
            {!showResult ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quiz