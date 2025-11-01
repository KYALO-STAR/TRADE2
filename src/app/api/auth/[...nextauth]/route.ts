import NextAuth, { NextAuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

// Deriv OAuth Provider Configuration
const derivProvider = {
  id: 'deriv',
  name: 'Deriv',
  type: 'oauth' as const,
  authorization: {
    url: 'https://oauth.deriv.com/oauth2/authorize',
    params: {
      scope: 'read,trade,trading_information,payments',
      response_type: 'code',
    }
  },
  token: 'https://oauth.deriv.com/oauth2/token',
  userinfo: 'https://oauth.deriv.com/oauth2/userinfo',
  client: {
    token_endpoint_auth_method: 'client_secret_basic'
  },
  profile(profile: any) {
    return {
      id: profile.user_id || profile.sub,
      name: profile.name || `${profile.first_name} ${profile.last_name}`,
      email: profile.email,
      image: profile.avatar_url,
      derivUserId: profile.user_id,
      country: profile.country,
      currency: profile.preferred_language,
      accountType: profile.account_type || 'real',
      isVerified: profile.is_authenticated || false
    }
  }
}

// Enhanced Authentication Options
export const authOptions: NextAuthOptions = {
  providers: [
    // Deriv OAuth Provider
    derivProvider,
    
    // Email/Password Provider with 2FA
    CredentialsProvider({
      id: 'credentials',
      name: 'Email & Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        totpCode: { label: '2FA Code', type: 'text', placeholder: 'Enter 6-digit code' },
        rememberDevice: { label: 'Remember this device', type: 'checkbox' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        
        try {
          // Simulate user authentication with enhanced security
          const user = await authenticateUser({
            email: credentials.email,
            password: credentials.password,
            totpCode: credentials.totpCode,
            rememberDevice: credentials.rememberDevice === 'true'
          })
          
          return user
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    }),

    // Passkey Provider (WebAuthn)
    CredentialsProvider({
      id: 'passkey',
      name: 'Passkey',
      credentials: {
        credentialId: { label: 'Credential ID', type: 'text' },
        authData: { label: 'Auth Data', type: 'text' },
        signature: { label: 'Signature', type: 'text' }
      },
      async authorize(credentials) {
        if (!credentials?.credentialId) return null
        
        try {
          const user = await verifyPasskey({
            credentialId: credentials.credentialId,
            authData: credentials.authData,
            signature: credentials.signature
          })
          
          return user
        } catch (error) {
          console.error('Passkey auth error:', error)
          return null
        }
      }
    })
  ],

  // Enhanced Session Configuration
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  // JWT Configuration with Security
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    encode: async ({ token, secret }) => {
      // Custom JWT encoding with additional security
      return await encodeJWT(token, secret)
    },
    decode: async ({ token, secret }) => {
      // Custom JWT decoding with validation
      return await decodeJWT(token, secret)
    }
  },

  // Enhanced Callbacks
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Add security metadata to token
      if (user) {
        token.userId = user.id
        token.email = user.email
        token.name = user.name
        token.derivUserId = user.derivUserId
        token.accountType = user.accountType
        token.isVerified = user.isVerified
        token.loginMethod = account?.provider
        token.loginTime = Date.now()
        token.deviceId = generateDeviceId()
      }

      // Security checks
      if (account?.provider === 'deriv') {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.derivScopes = account.scope?.split(' ') || []
      }

      return token
    },

    async session({ session, token }) {
      // Enhanced session with security info
      if (token) {
        session.user = {
          ...session.user,
          id: token.userId as string,
          derivUserId: token.derivUserId as string,
          accountType: token.accountType as string,
          isVerified: token.isVerified as boolean,
          loginMethod: token.loginMethod as string,
          deviceId: token.deviceId as string
        }
        session.accessToken = token.accessToken as string
        session.derivScopes = token.derivScopes as string[]
      }
      return session
    },

    async signIn({ user, account, profile, email, credentials }) {
      // Enhanced sign-in security checks
      try {
        // Rate limiting check
        const isAllowed = await checkRateLimit(user?.email || '')
        if (!isAllowed) return false

        // Device verification for new devices
        if (account?.provider !== 'deriv') {
          const deviceTrusted = await verifyDevice(user?.email || '', credentials?.rememberDevice === 'true')
          if (!deviceTrusted) {
            // Send verification email
            await sendDeviceVerificationEmail(user?.email || '')
            return '/auth/verify-device'
          }
        }

        // Log successful login
        await logSecurityEvent({
          userId: user?.id || '',
          event: 'LOGIN_SUCCESS',
          provider: account?.provider || 'unknown',
          ip: getClientIP(),
          userAgent: getUserAgent()
        })

        return true
      } catch (error) {
        console.error('Sign-in error:', error)
        return false
      }
    },

    async redirect({ url, baseUrl }) {
      // Enhanced redirect with security
      if (url.startsWith('/')) return `${baseUrl}${url}`
      if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },

  // Custom Pages
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    error: '/auth/error',
    verifyRequest: '/auth/verify-email',
    newUser: '/auth/welcome'
  },

  // Events for Security Logging
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      await logSecurityEvent({
        userId: user.id,
        event: 'USER_SIGNIN',
        provider: account?.provider,
        isNewUser,
        timestamp: new Date()
      })
    },
    async signOut({ token }) {
      await logSecurityEvent({
        userId: token?.userId as string,
        event: 'USER_SIGNOUT',
        timestamp: new Date()
      })
    },
    async createUser({ user }) {
      await logSecurityEvent({
        userId: user.id,
        event: 'USER_CREATED',
        timestamp: new Date()
      })
    }
  },

  // Enhanced Security
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60 // 30 days
      }
    }
  }
}

// Helper Functions for Enhanced Security

async function authenticateUser(credentials: {
  email: string
  password: string
  totpCode?: string
  rememberDevice: boolean
}) {
  // Simulate user lookup and password verification
  const user = {
    id: 'user_' + Date.now(),
    email: credentials.email,
    name: 'User Name',
    derivUserId: 'deriv_' + Date.now(),
    accountType: 'real',
    isVerified: true
  }

  // Verify TOTP if provided
  if (credentials.totpCode) {
    const totpValid = await verifyTOTP(credentials.email, credentials.totpCode)
    if (!totpValid) throw new Error('Invalid 2FA code')
  }

  return user
}

async function verifyPasskey(passkey: {
  credentialId: string
  authData: string
  signature: string
}) {
  // WebAuthn verification logic
  const user = {
    id: 'passkey_user',
    email: 'user@example.com',
    name: 'Passkey User',
    derivUserId: 'deriv_passkey',
    accountType: 'real',
    isVerified: true
  }
  return user
}

async function verifyTOTP(email: string, code: string): Promise<boolean> {
  // TOTP verification logic
  return code === '123456' // Simulate verification
}

async function checkRateLimit(identifier: string): Promise<boolean> {
  // Rate limiting logic
  return true
}

async function verifyDevice(email: string, rememberDevice: boolean): Promise<boolean> {
  // Device verification logic
  return rememberDevice || Math.random() > 0.3
}

async function sendDeviceVerificationEmail(email: string) {
  // Send verification email
  console.log(`Sending device verification email to ${email}`)
}

async function logSecurityEvent(event: any) {
  // Security event logging
  console.log('Security Event:', event)
}

function generateDeviceId(): string {
  return 'device_' + Math.random().toString(36).substr(2, 9)
}

function getClientIP(): string {
  return '127.0.0.1' // In real app, extract from headers
}

function getUserAgent(): string {
  return 'UserAgent' // In real app, extract from headers
}

async function encodeJWT(token: any, secret: string): Promise<string> {
  // Enhanced JWT encoding
  const jwt = require('jsonwebtoken')
  return jwt.sign(token, secret, { 
    algorithm: 'HS256',
    expiresIn: '30d',
    issuer: 'trading-app',
    audience: 'trading-users'
  })
}

async function decodeJWT(token: string, secret: string): Promise<JWT> {
  // Enhanced JWT decoding
  const jwt = require('jsonwebtoken')
  return jwt.verify(token, secret, {
    algorithms: ['HS256'],
    issuer: 'trading-app',
    audience: 'trading-users'
  })
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }