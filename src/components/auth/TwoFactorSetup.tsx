'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import { 
  Shield, 
  Smartphone, 
  Key, 
  Copy, 
  CheckCircle, 
  AlertTriangle,
  Download,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface TwoFactorSetupProps {
  onComplete?: (backupCodes: string[]) => void
  onCancel?: () => void
}

export function TwoFactorSetup({ onComplete, onCancel }: TwoFactorSetupProps) {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [secretKey, setSecretKey] = useState('')
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [backupCodes, setBackupCodes] = useState<string[]>([])
  const [copied, setCopied] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    generateTOTPSecret()
  }, [])

  const generateTOTPSecret = async () => {
    // Generate TOTP secret and QR code
    const secret = generateRandomSecret()
    const appName = 'Trading Platform'
    const userEmail = 'user@example.com' // Get from session
    
    setSecretKey(secret)
    setQrCodeUrl(`otpauth://totp/${appName}:${userEmail}?secret=${secret}&issuer=${appName}`)
  }

  const generateRandomSecret = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
    let secret = ''
    for (let i = 0; i < 32; i++) {
      secret += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return secret
  }

  const generateBackupCodes = (): string[] => {
    const codes: string[] = []
    for (let i = 0; i < 10; i++) {
      const code = Math.random().toString(36).substring(2, 8).toUpperCase()
      codes.push(code)
    }
    return codes
  }

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const verifyTOTP = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setErrors({ verification: 'Please enter a valid 6-digit code' })
      return
    }

    setIsLoading(true)
    
    try {
      // Simulate TOTP verification
      const isValid = await simulateTOTPVerification(secretKey, verificationCode)
      
      if (isValid) {
        const codes = generateBackupCodes()
        setBackupCodes(codes)
        setStep(3)
        setErrors({})
      } else {
        setErrors({ verification: 'Invalid verification code. Please try again.' })
      }
    } catch (error) {
      setErrors({ verification: 'Verification failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const simulateTOTPVerification = async (secret: string, code: string): Promise<boolean> => {
    // In a real app, this would verify the TOTP code against the secret
    return code === '123456' || Math.random() > 0.3
  }

  const completeTwoFactorSetup = async () => {
    setIsLoading(true)
    
    try {
      // Save 2FA configuration to backend
      await saveTwoFactorConfig({
        secretKey,
        backupCodes,
        enabled: true
      })
      
      onComplete?.(backupCodes)
    } catch (error) {
      setErrors({ general: 'Failed to enable 2FA. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const saveTwoFactorConfig = async (config: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  const downloadBackupCodes = () => {
    const codesText = backupCodes.map((code, index) => `${index + 1}. ${code}`).join('\\n')
    const blob = new Blob([codesText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'trading-platform-backup-codes.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-md mx-auto bg-gray-800 rounded-xl p-6">
      <div className="text-center mb-6">
        <Shield className="mx-auto mb-4 text-green-400" size={48} />
        <h2 className="text-2xl font-bold text-white mb-2">Enable Two-Factor Authentication</h2>
        <p className="text-gray-400 text-sm">
          Add an extra layer of security to your account
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex justify-between mb-8">
        {[1, 2, 3].map((stepNumber) => (
          <div
            key={stepNumber}
            className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
              step >= stepNumber
                ? 'bg-green-500 text-white'
                : 'bg-gray-600 text-gray-400'
            }`}
          >
            {step > stepNumber ? <CheckCircle size={16} /> : stepNumber}
          </div>
        ))}
      </div>

      {/* Step 1: Install Authenticator App */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Install Authenticator App</h3>
            <p className="text-gray-300 text-sm mb-4">
              First, install an authenticator app on your phone:
            </p>
            
            <div className="space-y-3">
              <div className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="text-blue-400" size={20} />
                  <div>
                    <p className="text-white font-medium">Google Authenticator</p>
                    <p className="text-gray-400 text-xs">Free • Most popular</p>
                  </div>
                </div>
                <ExternalLink className="text-gray-400" size={16} />
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Key className="text-green-400" size={20} />
                  <div>
                    <p className="text-white font-medium">Authy</p>
                    <p className="text-gray-400 text-xs">Free • Multi-device sync</p>
                  </div>
                </div>
                <ExternalLink className="text-gray-400" size={16} />
              </div>
            </div>
          </div>

          <Button
            onClick={() => setStep(2)}
            className="w-full bg-green-500 hover:bg-green-600"
          >
            I've Installed an App
          </Button>
        </motion.div>
      )}

      {/* Step 2: Scan QR Code */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Scan QR Code</h3>
            <p className="text-gray-300 text-sm mb-4">
              Scan this QR code with your authenticator app:
            </p>
            
            <div className="bg-white p-4 rounded-lg text-center">
              <QRCodeSVG value={qrCodeUrl} size={200} />
            </div>

            <div className="mt-4">
              <p className="text-gray-300 text-xs mb-2">Or enter this key manually:</p>
              <div className="bg-gray-700 rounded-lg p-3 flex items-center justify-between">
                <code className="text-green-400 text-sm font-mono">{secretKey}</code>
                <button
                  onClick={() => copyToClipboard(secretKey, 'secret')}
                  className="text-gray-400 hover:text-white p-1"
                >
                  {copied === 'secret' ? <CheckCircle size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">
              Enter verification code from your app:
            </label>
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="000000"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\\D/g, ''))}
                maxLength={6}
                className={`bg-gray-700 border-gray-600 text-white text-center text-lg font-mono ${
                  errors.verification ? 'border-red-500' : ''
                }`}
              />
              <Button
                onClick={verifyTOTP}
                disabled={isLoading || verificationCode.length !== 6}
                className="bg-green-500 hover:bg-green-600 px-6"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  'Verify'
                )}
              </Button>
            </div>
            {errors.verification && (
              <p className="text-red-400 text-xs mt-1">{errors.verification}</p>
            )}
          </div>
        </motion.div>
      )}

      {/* Step 3: Backup Codes */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Save Backup Codes</h3>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-yellow-400 mt-0.5" size={16} />
                <div>
                  <p className="text-yellow-400 font-medium text-sm mb-1">Important!</p>
                  <p className="text-yellow-300 text-xs">
                    Save these backup codes in a safe place. You can use them to access your account if you lose your phone.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-medium text-sm">Backup Codes</h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(backupCodes.join('\\n'), 'codes')}
                    className="text-gray-400 hover:text-white p-1 flex items-center gap-1 text-xs"
                  >
                    {copied === 'codes' ? <CheckCircle size={14} /> : <Copy size={14} />}
                    Copy
                  </button>
                  <button
                    onClick={downloadBackupCodes}
                    className="text-gray-400 hover:text-white p-1 flex items-center gap-1 text-xs"
                  >
                    <Download size={14} />
                    Download
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm font-mono">
                {backupCodes.map((code, index) => (
                  <div key={index} className="text-green-400 bg-gray-800 p-2 rounded">
                    {index + 1}. {code}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={completeTwoFactorSetup}
              disabled={isLoading}
              className="flex-1 bg-green-500 hover:bg-green-600"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                'Complete Setup'
              )}
            </Button>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        <div className="flex justify-between">
          <Button
            onClick={onCancel}
            variant="ghost"
            className="text-gray-400 hover:text-white"
          >
            Cancel
          </Button>
          
          {step > 1 && step < 3 && (
            <Button
              onClick={() => setStep(step - 1)}
              variant="ghost"
              className="text-gray-400 hover:text-white"
            >
              Back
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}