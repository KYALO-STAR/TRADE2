'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CourseModules } from '@/components/course/CourseModules'
import { QuizSection } from '@/components/course/QuizSection'
import { ProgressTracker } from '@/components/course/ProgressTracker'
import { GraduationCap, BookOpen, Award, Target } from 'lucide-react'

export default function CoursePage() {
  const [activeTab, setActiveTab] = useState('modules')

  const tabs = [
    { id: 'modules', label: 'Course Modules', icon: BookOpen },
    { id: 'quiz', label: 'Practice Quiz', icon: Target },
    { id: 'progress', label: 'My Progress', icon: Award }
  ]

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap size={32} className="text-green-400" />
            <div>
              <h1 className="text-3xl font-bold text-white">Financial Literacy Course</h1>
              <p className="text-gray-400">Master trading fundamentals and build wealth with confidence</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {[
              { label: 'Modules', value: '12', icon: BookOpen },
              { label: 'Lessons', value: '48', icon: Target },
              { label: 'Students', value: '15,247', icon: GraduationCap },
              { label: 'Completion Rate', value: '89%', icon: Award }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 border border-gray-700 rounded-lg p-4"
              >
                <div className="flex items-center gap-3">
                  <stat.icon size={20} className="text-green-400" />
                  <div>
                    <p className="text-lg font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              )
            })}
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'upload'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Upload Content
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'modules' && <CourseModules />}
          {activeTab === 'quiz' && <QuizSection />}
          {activeTab === 'progress' && <ProgressTracker value={75} max={100} />}
          {activeTab === 'upload' && (
            <div className="bg-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Upload Course Content</h2>
              
              {/* Upload Areas */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Video Upload */}
                <div className="bg-gray-700 rounded-lg p-6 border-2 border-dashed border-gray-600 hover:border-green-400 transition-colors">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-white mb-2">Upload Videos</h3>
                    <p className="text-gray-400 mb-4">Drop video files here or click to browse</p>
                    <p className="text-sm text-gray-500">Supports: MP4, AVI, MOV, WMV (Max: 500MB)</p>
                    <button className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                      Choose Video Files
                    </button>
                  </div>
                </div>

                {/* PDF Upload */}
                <div className="bg-gray-700 rounded-lg p-6 border-2 border-dashed border-gray-600 hover:border-blue-400 transition-colors">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-white mb-2">Upload PDFs</h3>
                    <p className="text-gray-400 mb-4">Drop PDF documents here or click to browse</p>
                    <p className="text-sm text-gray-500">Supports: PDF (Max: 100MB)</p>
                    <button className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                      Choose PDF Files
                    </button>
                  </div>
                </div>

                {/* Audio Upload */}
                <div className="bg-gray-700 rounded-lg p-6 border-2 border-dashed border-gray-600 hover:border-purple-400 transition-colors">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-white mb-2">Upload Audio</h3>
                    <p className="text-gray-400 mb-4">Drop audio files here or click to browse</p>
                    <p className="text-sm text-gray-500">Supports: MP3, WAV, AAC (Max: 200MB)</p>
                    <button className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                      Choose Audio Files
                    </button>
                  </div>
                </div>

                {/* Image Upload */}
                <div className="bg-gray-700 rounded-lg p-6 border-2 border-dashed border-gray-600 hover:border-yellow-400 transition-colors">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-white mb-2">Upload Images</h3>
                    <p className="text-gray-400 mb-4">Drop image files here or click to browse</p>
                    <p className="text-sm text-gray-500">Supports: JPG, PNG, GIF, WebP (Max: 50MB)</p>
                    <button className="mt-4 px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors">
                      Choose Image Files
                    </button>
                  </div>
                </div>
              </div>

              {/* Upload Progress */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Uploads</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-white font-medium">trading_basics.mp4</p>
                        <p className="text-sm text-gray-400">Uploaded successfully • 45.2 MB</p>
                      </div>
                    </div>
                    <span className="text-green-400 text-sm">Complete</span>
                  </div>
                  
                  <div className="flex items-center justify-between bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium">risk_management.pdf</p>
                        <p className="text-sm text-gray-400">Uploading... • 12.8 MB</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-blue-400 text-sm">75%</span>
                      <div className="w-20 bg-gray-600 rounded-full h-2 mt-1">
                        <div className="bg-blue-400 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bulk Upload Options */}
              <div className="mt-8 bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Bulk Upload Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="flex items-center gap-3 p-4 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors">
                    <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m0 0V10" />
                    </svg>
                    <div className="text-left">
                      <p className="text-white font-medium">Zip Upload</p>
                      <p className="text-sm text-gray-400">Upload multiple files at once</p>
                    </div>
                  </button>
                  
                  <button className="flex items-center gap-3 p-4 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors">
                    <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    </svg>
                    <div className="text-left">
                      <p className="text-white font-medium">Google Drive</p>
                      <p className="text-sm text-gray-400">Import from cloud storage</p>
                    </div>
                  </button>
                  
                  <button className="flex items-center gap-3 p-4 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors">
                    <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <div className="text-left">
                      <p className="text-white font-medium">URL Import</p>
                      <p className="text-sm text-gray-400">Import from external links</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}