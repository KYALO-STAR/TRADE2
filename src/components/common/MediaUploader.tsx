'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { 
  Upload, 
  File, 
  Video, 
  Image, 
  FileText, 
  Music, 
  Archive,
  CheckCircle, 
  AlertCircle, 
  X,
  Play,
  Download,
  Eye
} from 'lucide-react'

interface MediaFile {
  id: string
  name: string
  size: number
  type: 'video' | 'pdf' | 'audio' | 'image' | 'document' | 'archive' | 'other'
  status: 'uploading' | 'processing' | 'ready' | 'error'
  progress: number
  url?: string
  thumbnail?: string
  duration?: string
  error?: string
  uploadedAt: Date
}

interface MediaUploaderProps {
  title?: string
  description?: string
  acceptedTypes?: string[]
  maxFileSize?: number
  onFileUploaded?: (file: MediaFile) => void
  showPreview?: boolean
  allowMultiple?: boolean
  compactMode?: boolean
}

export function MediaUploader({
  title = "Upload Media Files",
  description = "Drag and drop your files here or click to browse",
  acceptedTypes = ['video/*', 'image/*', 'application/pdf', 'audio/*', 'text/*', 'application/zip'],
  maxFileSize = 500 * 1024 * 1024, // 500MB default
  onFileUploaded,
  showPreview = true,
  allowMultiple = true,
  compactMode = false
}: MediaUploaderProps) {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [dragActive, setDragActive] = useState(false)

  const getFileType = (file: File): MediaFile['type'] => {
    if (file.type.startsWith('video/')) return 'video'
    if (file.type.startsWith('image/')) return 'image'
    if (file.type.startsWith('audio/')) return 'audio'
    if (file.type === 'application/pdf') return 'pdf'
    if (file.type.includes('zip') || file.type.includes('rar')) return 'archive'
    if (file.type.startsWith('text/') || file.name.endsWith('.txt') || file.name.endsWith('.doc') || file.name.endsWith('.docx')) return 'document'
    return 'other'
  }

  const getFileIcon = (type: MediaFile['type']) => {
    switch (type) {
      case 'video': return Video
      case 'image': return Image
      case 'audio': return Music
      case 'pdf': return FileText
      case 'document': return FileText
      case 'archive': return Archive
      default: return File
    }
  }

  const getFileColor = (type: MediaFile['type']) => {
    switch (type) {
      case 'video': return 'text-red-400 bg-red-400/20'
      case 'image': return 'text-blue-400 bg-blue-400/20'
      case 'audio': return 'text-purple-400 bg-purple-400/20'
      case 'pdf': return 'text-orange-400 bg-orange-400/20'
      case 'document': return 'text-green-400 bg-green-400/20'
      case 'archive': return 'text-yellow-400 bg-yellow-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  const simulateUpload = (fileId: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      
      if (progress >= 100) {
        clearInterval(interval)
        
        // Simulate processing
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, status: 'processing', progress: 100 } : f
        ))
        
        setTimeout(() => {
          const isSuccess = Math.random() > 0.1 // 90% success rate
          
          setFiles(prev => prev.map(f => {
            if (f.id === fileId) {
              const updatedFile = {
                ...f,
                status: isSuccess ? 'ready' as const : 'error' as const,
                error: isSuccess ? undefined : 'Failed to process file',
                url: isSuccess ? `#${f.name}` : undefined,
                thumbnail: isSuccess && f.type === 'image' ? `#thumb_${f.name}` : undefined
              }
              
              if (isSuccess && onFileUploaded) {
                onFileUploaded(updatedFile)
              }
              
              return updatedFile
            }
            return f
          }))
        }, 1500)
      } else {
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, progress } : f
        ))
      }
    }, 200)
  }

  const handleFileSelect = useCallback((selectedFiles: FileList | null) => {
    if (!selectedFiles) return

    const newFiles: MediaFile[] = Array.from(selectedFiles).map(file => ({
      id: `${Date.now()}-${Math.random()}`,
      name: file.name,
      size: file.size,
      type: getFileType(file),
      status: 'uploading',
      progress: 0,
      uploadedAt: new Date()
    }))

    setFiles(prev => allowMultiple ? [...prev, ...newFiles] : newFiles)
    
    newFiles.forEach(file => {
      simulateUpload(file.id)
    })
  }, [allowMultiple, onFileUploaded])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    handleFileSelect(e.dataTransfer.files)
  }, [handleFileSelect])

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`border-2 border-dashed rounded-lg text-center transition-all duration-200 ${
          dragActive
            ? 'border-green-500 bg-green-500/10'
            : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
        } ${compactMode ? 'p-4' : 'p-8'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className={`space-y-${compactMode ? '2' : '4'}`}>
          <div className={`mx-auto rounded-full flex items-center justify-center ${
            compactMode ? 'w-12 h-12' : 'w-16 h-16'
          } ${dragActive ? 'bg-green-500' : 'bg-gray-700'}`}>
            <Upload size={compactMode ? 24 : 32} className={dragActive ? 'text-white' : 'text-gray-400'} />
          </div>

          <div>
            <h3 className={`font-semibold text-white mb-2 ${compactMode ? 'text-lg' : 'text-xl'}`}>
              {dragActive ? 'Drop your files here' : title}
            </h3>
            <p className={`text-gray-400 mb-4 ${compactMode ? 'text-sm' : 'text-base'}`}>
              {description}
            </p>
            
            <label className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer inline-block">
              Select Files
              <input
                type="file"
                multiple={allowMultiple}
                accept={acceptedTypes.join(',')}
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
              />
            </label>
          </div>

          <div className={`text-gray-500 ${compactMode ? 'text-xs' : 'text-sm'}`}>
            Max file size: {formatFileSize(maxFileSize)} • Supported: Videos, PDFs, Images, Audio, Documents
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
            <h3 className="text-lg font-semibold text-white">
              {compactMode ? 'Files' : 'Uploaded Files'} ({files.length})
            </h3>
          </div>

          <div className="divide-y divide-gray-700 max-h-96 overflow-y-auto">
            {files.map((file, index) => {
              const Icon = getFileIcon(file.type)
              const colorClass = getFileColor(file.type)
              
              return (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${colorClass}`}>
                      {file.status === 'ready' ? (
                        <CheckCircle size={20} className="text-green-400" />
                      ) : file.status === 'error' ? (
                        <AlertCircle size={20} className="text-red-400" />
                      ) : (
                        <Icon size={20} />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-white truncate">{file.name}</h4>
                        <div className="flex items-center gap-2 ml-4">
                          <span className="text-sm text-gray-400 whitespace-nowrap">
                            {formatFileSize(file.size)}
                          </span>
                          {file.status === 'ready' && showPreview && (
                            <div className="flex gap-1">
                              <button className="p-1 rounded text-blue-400 hover:bg-gray-700">
                                <Eye size={16} />
                              </button>
                              {file.type === 'video' && (
                                <button className="p-1 rounded text-green-400 hover:bg-gray-700">
                                  <Play size={16} />
                                </button>
                              )}
                              <button className="p-1 rounded text-gray-400 hover:bg-gray-700">
                                <Download size={16} />
                              </button>
                            </div>
                          )}
                          <button
                            onClick={() => removeFile(file.id)}
                            className="p-1 rounded text-red-400 hover:bg-gray-700"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <span className="capitalize">{file.type}</span>
                        <span>•</span>
                        <span>{formatDate(file.uploadedAt)}</span>
                        {file.status === 'ready' && (
                          <>
                            <span>•</span>
                            <span className="text-green-400">Ready</span>
                          </>
                        )}
                        {file.status === 'processing' && (
                          <>
                            <span>•</span>
                            <span className="text-blue-400">Processing...</span>
                          </>
                        )}
                        {file.error && (
                          <>
                            <span>•</span>
                            <span className="text-red-400">{file.error}</span>
                          </>
                        )}
                      </div>

                      {(file.status === 'uploading' || file.status === 'processing') && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-600 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                file.status === 'processing' ? 'bg-blue-400' : 'bg-green-400'
                              }`}
                              style={{ width: `${file.progress}%` }}
                            />
                          </div>
                          <div className="flex justify-between mt-1 text-xs text-gray-400">
                            <span>
                              {file.status === 'processing' ? 'Processing...' : 'Uploading...'}
                            </span>
                            <span>{Math.round(file.progress)}%</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Quick Actions */}
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
            Upload More
          </button>
          <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors">
            Clear All
          </button>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors">
            Process All
          </button>
        </div>
      )}
    </div>
  )
}