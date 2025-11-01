'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { signIn, getSession, getProviders } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Shield, 
  Smartphone,
  Key,
  Fingerprint,
  ExternalLink,
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  Globe
} from 'lucide-react'
import Header from '@/components/layout/Header'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface Provider {
  id: string
  name: string
  type: string
  signinUrl: string
  callbackUrl: string
}

export default function EnhancedSignIn() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  
  // Authentication State
  const [activeTab, setActiveTab] = useState<'deriv' | 'email' | 'passkey'>('deriv')
  const [providers, setProviders] = useState<Record<string, Provider>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [show2FA, setShow2FA] = useState(false)
  const [rememberDevice, setRememberDevice] = useState(false)
  const [isPasskeySupported, setIsPasskeySupported] = useState(false)

  // Form Data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    totpCode: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Load NextAuth providers
    getProviders().then(setProviders)
    
    // Check WebAuthn/Passkey support
    if (typeof window !== 'undefined' && window.navigator.credentials) {
      setIsPasskeySupported(true)
    }
  }, [])

  // Handle Deriv OAuth Sign-In
  const handleDerivSignIn = async () => {
    setIsLoading(true)
    try {
      const result = await signIn('deriv', {
        callbackUrl: '/dashboard',
        redirect: false
      })
      
      if (result?.error) {
        setErrors({ general: 'Failed to connect to Deriv. Please try again.' })
      } else if (result?.url) {
        window.location.href = result.url
      }
    } catch (error) {
      console.error('Deriv sign-in error:', error)
      setErrors({ general: 'Authentication failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Email/Password Sign-In with 2FA
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    
    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        totpCode: formData.totpCode,
        rememberDevice: rememberDevice.toString(),
        redirect: false
      })

      if (result?.error) {
        if (result.error === 'TOTP_REQUIRED') {
          setShow2FA(true)
          setErrors({ totp: 'Please enter your 2FA code' })
        } else {
          setErrors({ general: result.error })
        }
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Email sign-in error:', error)
      setErrors({ general: 'Authentication failed' })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Passkey Authentication
  const handlePasskeySignIn = async () => {
    if (!isPasskeySupported) {
      setErrors({ general: 'Passkeys not supported on this device' })
      return
    }

    setIsLoading(true)
    
    try {
      // WebAuthn authentication
      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array(32),
          allowCredentials: [],
          userVerification: 'required'
        }
      }) as PublicKeyCredential

      if (credential) {
        const result = await signIn('passkey', {
          credentialId: credential.id,
          authData: btoa(String.fromCharCode(...new Uint8Array((credential.response as any).authenticatorData))),
          signature: btoa(String.fromCharCode(...new Uint8Array((credential.response as any).signature))),
          redirect: false
        })

        if (result?.error) {
          setErrors({ general: 'Passkey authentication failed' })
        } else {
          router.push('/dashboard')
        }
      }
    } catch (error) {
      console.error('Passkey error:', error)
      setErrors({ general: 'Passkey authentication cancelled or failed' })
    } finally {
      setIsLoading(false)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (show2FA && !formData.totpCode) {
      newErrors.totp = '2FA code is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const authTabs = [
    { id: 'deriv', label: 'Deriv Account', icon: Globe, description: 'Use your existing Deriv trading account' },
    { id: 'email', label: 'Email & Password', icon: Mail, description: 'Sign in with email and 2FA' },
    { id: 'passkey', label: 'Passkey', icon: Fingerprint, description: 'Secure biometric authentication' }
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <div className="flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to access your trading platform</p>
          </div>

          {/* Error Display */}
          {(error || errors.general) && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3"
            >
              <AlertTriangle className="text-red-400" size={20} />
              <span className="text-red-400 text-sm">
                {error === 'CredentialsSignin' ? 'Invalid credentials' : 
                 error === 'OAuthAccountNotLinked' ? 'Account not linked' :
                 error || errors.general}
              </span>
            </motion.div>
          )}

          <div className="bg-gray-800 rounded-xl shadow-xl p-6">
            {/* Authentication Tabs */}
            <div className="flex mb-6 bg-gray-700 rounded-lg p-1">
              {authTabs.map(tab => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-green-500 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* Tab Description */}
            <div className="mb-6 text-center">
              <p className="text-sm text-gray-400">
                {authTabs.find(tab => tab.id === activeTab)?.description}
              </p>
            </div>

            {/* Deriv OAuth Tab */}
            {activeTab === 'deriv' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <Button
                  onClick={handleDerivSignIn}
                  disabled={isLoading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-base font-medium"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Globe className="mr-2" size={20} />
                      Continue with Deriv
                      <ExternalLink className="ml-2" size={16} />
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-2">Don't have a Deriv account?</p>
                  <Link
                    href="https://oauth.deriv.com/signup"
                    target="_blank"
                    className="text-green-400 hover:text-green-300 text-sm font-medium inline-flex items-center gap-1"
                  >
                    Create Deriv Account
                    <ExternalLink size={14} />
                  </Link>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-400 mt-0.5" size={16} />
                    <div>
                      <h4 className="text-green-400 font-medium text-sm mb-1">Why use Deriv OAuth?</h4>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• Instant access with existing credentials</li>
                        <li>• Secure, no password sharing</li>
                        <li>• Auto-sync with your trading account</li>
                        <li>• Official Deriv integration</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Email/Password Tab */}
            {activeTab === 'email' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <form onSubmit={handleEmailSignIn} className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`bg-gray-700 border-gray-600 text-white ${
                        errors.email ? 'border-red-500' : ''
                      }`}
                      icon={<Mail size={18} />}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className={`bg-gray-700 border-gray-600 text-white pr-12 ${
                          errors.password ? 'border-red-500' : ''
                        }`}
                        icon={<Lock size={18} />}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                    )}
                  </div>

                  {/* 2FA Code Input */}
                  {show2FA && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <Input
                        type="text"
                        placeholder="Enter 6-digit 2FA code"
                        value={formData.totpCode}
                        onChange={(e) => setFormData({ ...formData, totpCode: e.target.value })}
                        className={`bg-gray-700 border-gray-600 text-white ${
                          errors.totp ? 'border-red-500' : ''
                        }`}
                        icon={<Shield size={18} />}
                        maxLength={6}
                      />
                      {errors.totp && (
                        <p className="text-red-400 text-xs mt-1">{errors.totp}</p>
                      )}
                    </motion.div>
                  )}

                  {/* Remember Device */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="rememberDevice"
                      checked={rememberDevice}
                      onChange={(e) => setRememberDevice(e.target.checked)}
                      className="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-green-500"
                    />
                    <label htmlFor="rememberDevice" className="text-sm text-gray-300">
                      Remember this device for 30 days
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="ml-2" size={16} />
                      </>
                    )}
                  </Button>
                </form>

                <div className="text-center">
                  <Link
                    href="/auth/forgot-password"
                    className="text-green-400 hover:text-green-300 text-sm"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Passkey Tab */}
            {activeTab === 'passkey' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 text-center"
              >
                {isPasskeySupported ? (
                  <>
                    <div className="py-8">
                      <Fingerprint className="mx-auto mb-4 text-green-400" size={48} />
                      <p className="text-gray-300 mb-6">
                        Use your device's biometric authentication
                      </p>
                    </div>

                    <Button
                      onClick={handlePasskeySignIn}
                      disabled={isLoading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <Key className="mr-2" size={20} />
                          Authenticate with Passkey
                        </>
                      )}
                    </Button>

                    <div className="text-xs text-gray-500">
                      <p>Secure authentication using Face ID, Touch ID, or Windows Hello</p>
                    </div>
                  </>
                ) : (
                  <div className="py-8">
                    <Shield className="mx-auto mb-4 text-gray-500" size={48} />
                    <h3 className="text-lg font-medium text-white mb-2">Passkeys Not Available</h3>
                    <p className="text-gray-400 text-sm">
                      Your device or browser doesn't support passkey authentication.
                      Try using Chrome, Safari, or Edge on a supported device.
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Sign Up Link */}
            <div className="mt-6 text-center border-t border-gray-700 pt-6">
              <p className="text-gray-400 text-sm">
                Don't have an account?{' '}
                <Link
                  href="/auth/signup"
                  className="text-green-400 hover:text-green-300 font-medium"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>

          {/* Security Badge */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 text-xs text-gray-500">
              <Shield size={14} />
              <span>Protected by 256-bit encryption</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}