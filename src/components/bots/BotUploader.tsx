'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Upload, File, CheckCircle, AlertCircle, X, Code } from 'lucide-react'

interface UploadedFile {
  id: string
  name: string
  size: number
  status: 'uploading' | 'success' | 'error'
  progress: number
  error?: string
}

export function BotUploader() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const uploadedFile: UploadedFile = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        size: file.size,
        status: 'uploading',
        progress: 0
      }

      setFiles(prev => [...prev, uploadedFile])

      // Simulate file upload process
      simulateUpload(uploadedFile.id, file)
    })
  }, [])

  const simulateUpload = (fileId: string, file: File) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15

      if (progress >= 100) {
        clearInterval(interval)
        
        // Simulate validation
        setTimeout(() => {
          const isValid = Math.random() > 0.2 // 80% success rate
          
          setFiles(prev => prev.map(f => 
            f.id === fileId 
              ? {
                  ...f,
                  status: isValid ? 'success' : 'error',
                  progress: 100,
                  error: isValid ? undefined : 'Invalid XML format or missing required elements'
                }
              : f
          ))
        }, 500)
      } else {
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, progress } : f
        ))
      }
    }, 200)
  }

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/xml': ['.xml'],
      'application/xml': ['.xml'],
      'application/json': ['.json'],
      'text/plain': ['.txt'],
      'application/zip': ['.zip'],
      'video/*': ['.mp4', '.avi', '.mov'],
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    multiple: true,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
    onDropAccepted: () => setDragActive(false),
    onDropRejected: () => setDragActive(false)
  })

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          dragActive
            ? 'border-green-500 bg-green-500/10'
            : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
        }`}
        {...getRootProps({refKey: 'ref'})}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-4">
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
            dragActive ? 'bg-green-500' : 'bg-gray-700'
          }`}>
            <Upload size={32} className={dragActive ? 'text-white' : 'text-gray-400'} />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {isDragActive ? 'Drop your files here' : 'Upload Bot Strategy & Educational Content'}
            </h3>
            <p className="text-gray-400 mb-4">
              Drag and drop your strategy files, videos, PDFs, or other content here
            </p>
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Select Files
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500 mt-4">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-blue-400" />
              <span>XML, JSON, TXT</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>MP4, AVI, MOV</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>PDF Documents</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2.0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Images & More</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* File List */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden"
        >
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Uploaded Files</h3>
          </div>

          <div className="divide-y divide-gray-700">
            {files.map((file, index) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    file.status === 'success' ? 'bg-green-500/20' :
                    file.status === 'error' ? 'bg-red-500/20' :
                    'bg-blue-500/20'
                  }`}>
                    {file.status === 'success' ? (
                      <CheckCircle size={20} className="text-green-400" />
                    ) : file.status === 'error' ? (
                      <AlertCircle size={20} className="text-red-400" />
                    ) : (
                      <File size={20} className="text-blue-400" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white">{file.name}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">{formatFileSize(file.size)}</span>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>

                    {file.status === 'error' && (
                      <p className="text-sm text-red-400 mb-2">{file.error}</p>
                    )}

                    {file.status === 'uploading' && (
                      <div>
                        <div className="flex justify-between text-sm text-gray-400 mb-1">
                          <span>Uploading...</span>
                          <span>{Math.round(file.progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {file.status === 'success' && (
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-green-400">Upload successful</span>
                        <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                          Configure Bot
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Bot Creation Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 border border-gray-700 rounded-lg p-6"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <Code size={24} className="text-blue-400" />
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-3">How to Create Trading Bots</h3>
            
            <div className="space-y-3 text-gray-300">
              <p>
                Create powerful trading bots using our XML format or use the Binary.com bot builder:
              </p>

              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Visit <a href="https://bot.deriv.com" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">bot.deriv.com</a></li>
                <li>Design your strategy using the visual block builder</li>
                <li>Test your bot with virtual money</li>
                <li>Export as XML file when ready</li>
                <li>Upload the XML file here to run it</li>
              </ol>

              <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-yellow-400 text-sm">
                  <strong>Pro Tip:</strong> Always test your bots thoroughly with demo accounts before using real money. 
                  Consider risk management and set appropriate stop-loss limits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Requirements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 border border-gray-700 rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">XML File Requirements</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-green-400 mb-2">Required Elements</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Strategy logic blocks</li>
              <li>• Risk management settings</li>
              <li>• Asset selection parameters</li>
              <li>• Trade execution conditions</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-red-400 mb-2">Validation Checks</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Valid XML syntax</li>
              <li>• Required bot structure</li>
              <li>• Safe parameter ranges</li>
              <li>• Logic flow validation</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}