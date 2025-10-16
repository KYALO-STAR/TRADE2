'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, User, Mail, Key, Building } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authService } from '@/lib/auth'

export default function SignUp() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    derivToken: '',
    accountType: 'individual', // individual or sacco
    saccoName: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.derivToken.trim()) {
      newErrors.derivToken = 'Deriv API token is required'
    } else if (!authService.validateDerivToken(formData.derivToken)) {
      newErrors.derivToken = 'Invalid Deriv API token format. Token should be 15-20 alphanumeric characters'
    }

    if (formData.accountType === 'sacco' && !formData.saccoName.trim()) {
      newErrors.saccoName = 'SACCO name is required'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)

    try {
      // Use proper auth service for signup
      const user = await authService.signUp({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        derivToken: formData.derivToken,
        accountType: formData.accountType as 'individual' | 'sacco',
        saccoName: formData.saccoName || undefined
      })

      // Set auth cookie for middleware compatibility
      if (typeof document !== 'undefined') {
        document.cookie = `auth_token=${btoa(JSON.stringify(user))}; path=/; max-age=${7 * 24 * 60 * 60}` // 7 days
      }
      
      console.log('User registered successfully:', user)
      
      // Redirect to dashboard
      router.push('/dashboard')
      
    } catch (error) {
      console.error('Registration failed:', error)
      setErrors({ general: 'Registration failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-300">Join thousands of successful traders</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-gray-800 rounded-2xl border border-gray-700 p-6 space-y-6"
        >
          {errors.general && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-400 text-sm">{errors.general}</p>
            </div>
          )}

          {/* Account Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Account Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, accountType: 'individual' }))}
                className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                  formData.accountType === 'individual'
                    ? 'border-green-500 bg-green-500/10 text-white'
                    : 'border-gray-600 hover:border-gray-500 text-gray-300'
                }`}
              >
                <User className="w-5 h-5 mb-2" />
                <div className="text-sm font-medium">Individual</div>
                <div className="text-xs text-gray-400">Personal trading</div>
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, accountType: 'sacco' }))}
                className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                  formData.accountType === 'sacco'
                    ? 'border-green-500 bg-green-500/10 text-white'
                    : 'border-gray-600 hover:border-gray-500 text-gray-300'
                }`}
              >
                <Building className="w-5 h-5 mb-2" />
                <div className="text-sm font-medium">SACCO</div>
                <div className="text-xs text-gray-400">Group trading</div>
              </button>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                className={`w-full pl-10 pr-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.fullName ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Enter your full name"
              />
            </div>
            {errors.fullName && <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>}
          </div>

          {/* SACCO Name (conditional) */}
          {formData.accountType === 'sacco' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                SACCO Name
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.saccoName}
                  onChange={(e) => setFormData(prev => ({ ...prev, saccoName: e.target.value }))}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.saccoName ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Enter your SACCO name"
                />
              </div>
              {errors.saccoName && <p className="mt-1 text-sm text-red-400">{errors.saccoName}</p>}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`w-full pl-10 pr-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
          </div>

          {/* Deriv API Token */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Deriv API Token
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.derivToken}
                onChange={(e) => setFormData(prev => ({ ...prev, derivToken: e.target.value }))}
                className={`w-full pl-10 pr-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.derivToken ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Enter your Deriv API token"
              />
            </div>
            {errors.derivToken && <p className="mt-1 text-sm text-red-400">{errors.derivToken}</p>}
            <p className="mt-1 text-xs text-gray-400">
              Get your token from{' '}
              <a href="https://app.deriv.com/account/api-token" target="_blank" rel="noopener noreferrer" 
                 className="text-green-400 hover:text-green-300">
                Deriv App → Settings → API Token
              </a>
            </p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className={`w-full pl-10 pr-12 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.password ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className={`w-full pl-10 pr-12 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Creating Account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-green-400 hover:text-green-300 font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </motion.form>
      </div>
    </div>
  )
}