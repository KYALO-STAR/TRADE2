'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, RotateCcw, Trophy, Target, Clock } from 'lucide-react'

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: string
}

interface QuizResult {
  score: number
  totalQuestions: number
  timeSpent: number
  answers: Record<string, number>
}

export function QuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [startTime] = useState(Date.now())
  const [selectedCategory, setSelectedCategory] = useState('all')

  const questions: Question[] = [
    {
      id: '1',
      question: 'What is the primary goal of risk management in trading?',
      options: [
        'To maximize profits on every trade',
        'To protect capital and minimize losses',
        'To predict market movements accurately',
        'To trade with the highest leverage possible'
      ],
      correctAnswer: 1,
      explanation: 'Risk management focuses on capital preservation and controlling potential losses, which is crucial for long-term trading success.',
      category: 'risk-management'
    },
    {
      id: '2',
      question: 'Which of the following is considered a lagging indicator?',
      options: [
        'Moving Average',
        'RSI (Relative Strength Index)',
        'Support and Resistance levels',
        'Volume'
      ],
      correctAnswer: 0,
      explanation: 'Moving averages are lagging indicators because they are based on past price data and tend to follow price movements rather than predict them.',
      category: 'technical-analysis'
    },
    {
      id: '3',
      question: 'What does a "bull market" refer to?',
      options: [
        'A market with high volatility',
        'A market with declining prices',
        'A market with rising prices and optimism',
        'A market with low trading volume'
      ],
      correctAnswer: 2,
      explanation: 'A bull market is characterized by rising prices, investor confidence, and overall market optimism.',
      category: 'fundamentals'
    },
    {
      id: '4',
      question: 'What is the recommended risk per trade for most traders?',
      options: [
        '10-15% of account balance',
        '5-10% of account balance',
        '1-3% of account balance',
        '20-25% of account balance'
      ],
      correctAnswer: 2,
      explanation: 'Most professional traders recommend risking no more than 1-3% of your account balance per trade to ensure long-term survival and growth.',
      category: 'risk-management'
    },
    {
      id: '5',
      question: 'Which emotion is most detrimental to trading success?',
      options: [
        'Confidence',
        'Patience',
        'Fear and Greed',
        'Curiosity'
      ],
      correctAnswer: 2,
      explanation: 'Fear and greed are the most destructive emotions in trading, leading to poor decision-making, overtrading, and significant losses.',
      category: 'psychology'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Questions', count: questions.length },
    { id: 'fundamentals', name: 'Trading Fundamentals', count: questions.filter(q => q.category === 'fundamentals').length },
    { id: 'risk-management', name: 'Risk Management', count: questions.filter(q => q.category === 'risk-management').length },
    { id: 'technical-analysis', name: 'Technical Analysis', count: questions.filter(q => q.category === 'technical-analysis').length },
    { id: 'psychology', name: 'Psychology', count: questions.filter(q => q.category === 'psychology').length }
  ]

  const filteredQuestions = selectedCategory === 'all' 
    ? questions 
    : questions.filter(q => q.category === selectedCategory)

  const currentQ = filteredQuestions[currentQuestion]

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = { ...answers, [currentQ.id]: selectedAnswer }
      setAnswers(newAnswers)

      if (currentQuestion < filteredQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        // Quiz completed
        setQuizCompleted(true)
        setShowResult(true)
      }
    }
  }

  const handleShowResult = () => {
    setShowResult(true)
  }

  const calculateScore = (): QuizResult => {
    let correct = 0
    filteredQuestions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correct++
      }
    })

    return {
      score: correct,
      totalQuestions: filteredQuestions.length,
      timeSpent: Math.round((Date.now() - startTime) / 1000),
      answers
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setQuizCompleted(false)
    setAnswers({})
  }

  const result = calculateScore()
  const scorePercentage = Math.round((result.score / result.totalQuestions) * 100)

  return (
    <div className="space-y-6">
      {/* Category Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 border border-gray-700 rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Select Quiz Category</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id)
                resetQuiz()
              }}
              className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'border-green-500 bg-green-500/10 text-green-400'
                  : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500'
              }`}
            >
              <h4 className="font-medium mb-1">{category.name}</h4>
              <p className="text-sm opacity-75">{category.count} questions</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Quiz Interface */}
      {!quizCompleted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden"
        >
          {/* Progress Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Target size={24} className="text-green-400" />
                <div>
                  <h2 className="text-xl font-bold text-white">Practice Quiz</h2>
                  <p className="text-gray-400">Test your trading knowledge</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-white font-semibold">
                  Question {currentQuestion + 1} of {filteredQuestions.length}
                </p>
                <p className="text-gray-400 text-sm">
                  {Math.round(((currentQuestion) / filteredQuestions.length) * 100)}% Complete
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion) / filteredQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-6 leading-relaxed">
                {currentQ.question}
              </h3>

              <div className="space-y-3 mb-6">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedAnswer === index
                        ? showResult
                          ? index === currentQ.correctAnswer
                            ? 'border-green-500 bg-green-500/10 text-green-400'
                            : 'border-red-500 bg-red-500/10 text-red-400'
                          : 'border-blue-500 bg-blue-500/10 text-blue-400'
                        : showResult && index === currentQ.correctAnswer
                        ? 'border-green-500 bg-green-500/10 text-green-400'
                        : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === index
                          ? showResult
                            ? index === currentQ.correctAnswer
                              ? 'border-green-500 bg-green-500'
                              : 'border-red-500 bg-red-500'
                            : 'border-blue-500 bg-blue-500'
                          : showResult && index === currentQ.correctAnswer
                          ? 'border-green-500 bg-green-500'
                          : 'border-gray-500'
                      }`}>
                        {showResult && (
                          <>
                            {index === currentQ.correctAnswer ? (
                              <CheckCircle size={16} className="text-white" />
                            ) : selectedAnswer === index ? (
                              <XCircle size={16} className="text-white" />
                            ) : null}
                          </>
                        )}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Explanation */}
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 mb-6"
                >
                  <h4 className="font-semibold text-white mb-2">Explanation:</h4>
                  <p className="text-gray-300 leading-relaxed">{currentQ.explanation}</p>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="px-6 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                >
                  Previous
                </button>

                <div className="flex gap-3">
                  {selectedAnswer !== null && !showResult && (
                    <button
                      onClick={handleShowResult}
                      className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    >
                      Show Answer
                    </button>
                  )}

                  {showResult && (
                    <button
                      onClick={handleNext}
                      className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                    >
                      {currentQuestion < filteredQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Quiz Results */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center"
        >
          <div className="mb-6">
            <Trophy size={48} className="mx-auto text-yellow-400 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h2>
            <p className="text-gray-400">Here are your results</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-700/50 rounded-lg p-6">
              <div className="text-3xl font-bold text-green-400 mb-2">{scorePercentage}%</div>
              <p className="text-gray-400">Score</p>
            </div>

            <div className="bg-gray-700/50 rounded-lg p-6">
              <div className="text-3xl font-bold text-white mb-2">{result.score}/{result.totalQuestions}</div>
              <p className="text-gray-400">Correct Answers</p>
            </div>

            <div className="bg-gray-700/50 rounded-lg p-6">
              <div className="flex items-center justify-center gap-1 mb-2">
                <Clock size={20} className="text-blue-400" />
                <span className="text-3xl font-bold text-blue-400">{Math.floor(result.timeSpent / 60)}:{(result.timeSpent % 60).toString().padStart(2, '0')}</span>
              </div>
              <p className="text-gray-400">Time Spent</p>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={resetQuiz}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
            >
              <RotateCcw size={18} />
              Retake Quiz
            </button>

            <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">
              View Detailed Results
            </button>
          </div>

          {/* Performance Feedback */}
          <div className="mt-8 p-4 bg-gray-700/30 rounded-lg">
            <h3 className="font-semibold text-white mb-2">
              {scorePercentage >= 80 ? '🎉 Excellent!' :
               scorePercentage >= 70 ? '👍 Good Job!' :
               scorePercentage >= 60 ? '📚 Keep Learning!' :
               '💪 Practice Makes Perfect!'}
            </h3>
            <p className="text-gray-300 text-sm">
              {scorePercentage >= 80 ? 'You have a strong understanding of trading concepts!' :
               scorePercentage >= 70 ? 'You\'re on the right track. Review the areas you missed.' :
               scorePercentage >= 60 ? 'Consider revisiting the course materials for better understanding.' :
               'Don\'t worry! Go through the course modules again and practice more.'}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}