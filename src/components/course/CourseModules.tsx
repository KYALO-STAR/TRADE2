'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PlayCircle, CheckCircle, Lock, Clock, BookOpen, Video, FileText } from 'lucide-react'

interface Lesson {
  id: string
  title: string
  duration: number
  type: 'video' | 'reading' | 'quiz'
  completed: boolean
  locked: boolean
}

interface Module {
  id: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: number
  completed: boolean
  lessons: Lesson[]
  color: string
}

export function CourseModules() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [completedLessons, setCompletedLessons] = useState<string[]>(['1-1', '1-2', '2-1'])

  const modules: Module[] = [
    {
      id: '1',
      title: 'Trading Fundamentals',
      description: 'Learn the basic concepts of trading, market types, and essential terminology.',
      difficulty: 'Beginner',
      duration: 120,
      completed: true,
      color: 'bg-green-500',
      lessons: [
        { id: '1-1', title: 'What is Trading?', duration: 15, type: 'video', completed: true, locked: false },
        { id: '1-2', title: 'Types of Markets', duration: 20, type: 'video', completed: true, locked: false },
        { id: '1-3', title: 'Basic Trading Terms', duration: 25, type: 'reading', completed: false, locked: false },
        { id: '1-4', title: 'Market Hours & Sessions', duration: 18, type: 'video', completed: false, locked: false },
        { id: '1-5', title: 'Module 1 Quiz', duration: 10, type: 'quiz', completed: false, locked: false }
      ]
    },
    {
      id: '2',
      title: 'Risk Management',
      description: 'Master the art of protecting your capital and managing trading risks effectively.',
      difficulty: 'Beginner',
      duration: 95,
      completed: false,
      color: 'bg-blue-500',
      lessons: [
        { id: '2-1', title: 'Understanding Risk', duration: 22, type: 'video', completed: true, locked: false },
        { id: '2-2', title: 'Position Sizing', duration: 28, type: 'video', completed: false, locked: false },
        { id: '2-3', title: 'Stop Loss Strategies', duration: 25, type: 'reading', completed: false, locked: false },
        { id: '2-4', title: 'Risk-Reward Ratios', duration: 20, type: 'video', completed: false, locked: true }
      ]
    },
    {
      id: '3',
      title: 'Technical Analysis',
      description: 'Learn to read charts, identify patterns, and use technical indicators for better trading decisions.',
      difficulty: 'Intermediate',
      duration: 180,
      completed: false,
      color: 'bg-purple-500',
      lessons: [
        { id: '3-1', title: 'Chart Types & Timeframes', duration: 30, type: 'video', completed: false, locked: false },
        { id: '3-2', title: 'Support & Resistance', duration: 35, type: 'video', completed: false, locked: false },
        { id: '3-3', title: 'Trend Lines & Channels', duration: 28, type: 'reading', completed: false, locked: true },
        { id: '3-4', title: 'Candlestick Patterns', duration: 40, type: 'video', completed: false, locked: true },
        { id: '3-5', title: 'Technical Indicators', duration: 45, type: 'video', completed: false, locked: true }
      ]
    },
    {
      id: '4',
      title: 'Psychology & Discipline',
      description: 'Develop the right mindset and emotional control needed for successful trading.',
      difficulty: 'Intermediate',
      duration: 110,
      completed: false,
      color: 'bg-orange-500',
      lessons: [
        { id: '4-1', title: 'Trading Psychology Basics', duration: 25, type: 'video', completed: false, locked: true },
        { id: '4-2', title: 'Emotional Control', duration: 30, type: 'reading', completed: false, locked: true },
        { id: '4-3', title: 'Developing Discipline', duration: 28, type: 'video', completed: false, locked: true },
        { id: '4-4', title: 'Common Trading Mistakes', duration: 27, type: 'video', completed: false, locked: true }
      ]
    }
  ]

  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessons(prev => 
      prev.includes(lessonId) 
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId]
    )
  }

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return Video
      case 'reading': return FileText
      case 'quiz': return CheckCircle
      default: return BookOpen
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-500/20'
      case 'Intermediate': return 'text-yellow-400 bg-yellow-500/20'
      case 'Advanced': return 'text-red-400 bg-red-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  return (
    <div className="space-y-6">
      {/* Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {modules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition-all duration-200 ${
              selectedModule === module.id ? 'ring-2 ring-green-500' : ''
            }`}
          >
            {/* Module Header */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${module.color} rounded-lg flex items-center justify-center`}>
                    <BookOpen size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{module.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getDifficultyColor(module.difficulty)}`}>
                      {module.difficulty}
                    </span>
                  </div>
                </div>

                {module.completed && (
                  <CheckCircle size={24} className="text-green-400" />
                )}
              </div>

              <p className="text-gray-300 mb-4 leading-relaxed">{module.description}</p>

              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{module.duration} minutes</span>
                </div>
                <div>
                  {module.lessons.length} lessons
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Progress</span>
                  <span>{Math.round((completedLessons.filter(id => id.startsWith(module.id)).length / module.lessons.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${module.color}`}
                    style={{ 
                      width: `${(completedLessons.filter(id => id.startsWith(module.id)).length / module.lessons.length) * 100}%` 
                    }}
                  />
                </div>
              </div>

              <button
                onClick={() => setSelectedModule(selectedModule === module.id ? null : module.id)}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors"
              >
                {selectedModule === module.id ? 'Hide Lessons' : 'View Lessons'}
              </button>
            </div>

            {/* Lessons List */}
            {selectedModule === module.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-gray-700"
              >
                {module.lessons.map((lesson, lessonIndex) => {
                  const Icon = getLessonIcon(lesson.type)
                  const isCompleted = completedLessons.includes(lesson.id)
                  
                  return (
                    <motion.div
                      key={lesson.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: lessonIndex * 0.1 }}
                      className={`p-4 border-b border-gray-700 last:border-b-0 hover:bg-gray-700/30 transition-colors ${
                        lesson.locked ? 'opacity-60' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`p-2 rounded-lg ${
                            lesson.locked ? 'bg-gray-600' :
                            isCompleted ? 'bg-green-500/20' :
                            lesson.type === 'video' ? 'bg-blue-500/20' :
                            lesson.type === 'reading' ? 'bg-purple-500/20' :
                            'bg-orange-500/20'
                          }`}>
                            {lesson.locked ? (
                              <Lock size={16} className="text-gray-400" />
                            ) : (
                              <Icon size={16} className={
                                isCompleted ? 'text-green-400' :
                                lesson.type === 'video' ? 'text-blue-400' :
                                lesson.type === 'reading' ? 'text-purple-400' :
                                'text-orange-400'
                              } />
                            )}
                          </div>

                          <div className="flex-1">
                            <h4 className={`font-medium ${lesson.locked ? 'text-gray-500' : 'text-white'}`}>
                              {lesson.title}
                            </h4>
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                              <span>{lesson.duration} min</span>
                              <span className="capitalize">{lesson.type}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {isCompleted && (
                            <CheckCircle size={20} className="text-green-400" />
                          )}
                          
                          {!lesson.locked && (
                            <>
                              <button
                                onClick={() => toggleLessonComplete(lesson.id)}
                                className={`p-2 rounded-lg transition-colors ${
                                  isCompleted
                                    ? 'bg-green-500 text-white hover:bg-green-600'
                                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white'
                                }`}
                              >
                                <PlayCircle size={16} />
                              </button>
                              
                              <button
                                className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                                title="Upload content for this lesson"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Course Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 border border-gray-700 rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Course Information</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-green-400 mb-3">What You'll Learn</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Fundamental trading concepts and terminology</li>
              <li>• Risk management and capital preservation</li>
              <li>• Technical analysis and chart reading</li>
              <li>• Trading psychology and emotional control</li>
              <li>• Strategy development and backtesting</li>
              <li>• Portfolio management techniques</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-blue-400 mb-3">Course Features</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Self-paced learning with lifetime access</li>
              <li>• Interactive quizzes and assessments</li>
              <li>• Downloadable resources and templates</li>
              <li>• Real market examples and case studies</li>
              <li>• Certificate of completion</li>
              <li>• Community forum access</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}