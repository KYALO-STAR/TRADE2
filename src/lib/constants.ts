/**
 * Application constants and configuration values
 * Centralized location for all static values used across the app
 */

// API Configuration
export const API_CONFIG = {
  DERIV_APP_ID: process.env.DERIV_APP_ID || '1089',
  DERIV_API_URL: process.env.DERIV_API_URL || 'wss://ws.binaryws.com/websockets/v3',
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  TIMEOUT: 30000, // 30 seconds
} as const;

// Trading Configuration
export const TRADING_CONFIG = {
  MIN_STAKE: 0.35,
  MAX_STAKE: 50000,
  DEFAULT_STAKE: 1,
  MIN_DURATION: 5, // seconds
  MAX_DURATION: 365, // days
  CURRENCY: 'USD',
  PROFIT_COMMISSION: 0.1, // 10% commission on profits
} as const;

// Synthetic Indices
export const SYNTHETIC_INDICES = [
  { symbol: 'R_10', name: 'Volatility 10 Index', volatility: 10 },
  { symbol: 'R_25', name: 'Volatility 25 Index', volatility: 25 },
  { symbol: 'R_50', name: 'Volatility 50 Index', volatility: 50 },
  { symbol: 'R_75', name: 'Volatility 75 Index', volatility: 75 },
  { symbol: 'R_100', name: 'Volatility 100 Index', volatility: 100 },
  { symbol: 'BOOM_1000', name: 'Boom 1000 Index', type: 'boom' },
  { symbol: 'BOOM_500', name: 'Boom 500 Index', type: 'boom' },
  { symbol: 'CRASH_1000', name: 'Crash 1000 Index', type: 'crash' },
  { symbol: 'CRASH_500', name: 'Crash 500 Index', type: 'crash' },
] as const;

// Multiplier Levels
export const MULTIPLIER_LEVELS = [
  50, 100, 150, 200, 250, 300, 400, 500, 750, 1000
] as const;

// Referral Tiers
export const REFERRAL_TIERS = {
  BRONZE: { name: 'Bronze', minReferrals: 0, commission: 0.05, color: '#CD7F32' },
  SILVER: { name: 'Silver', minReferrals: 10, commission: 0.075, color: '#C0C0C0' },
  GOLD: { name: 'Gold', minReferrals: 25, commission: 0.1, color: '#FFD700' },
  PLATINUM: { name: 'Platinum', minReferrals: 50, commission: 0.15, color: '#E5E4E2' },
} as const;

// Bot Categories
export const BOT_CATEGORIES = [
  'Martingale',
  'Anti-Martingale',
  'Fibonacci',
  'Trend Following',
  'Mean Reversion',
  'Scalping',
  'Grid Trading',
  'Custom Strategy',
] as const;

// Course Categories
export const COURSE_CATEGORIES = [
  'Basics',
  'Technical Analysis',
  'Fundamental Analysis',
  'Risk Management',
  'Psychology',
  'Advanced Strategies',
] as const;

// News Categories
export const NEWS_CATEGORIES = [
  'Market Analysis',
  'Economic News',
  'Company Updates',
  'Trading Tips',
  'Technology',
  'Regulations',
] as const;

// Time Periods
export const TIME_PERIODS = [
  { label: '1 Hour', value: '1H' },
  { label: '4 Hours', value: '4H' },
  { label: '1 Day', value: '1D' },
  { label: '1 Week', value: '1W' },
  { label: '1 Month', value: '1M' },
] as const;

// Chart Intervals
export const CHART_INTERVALS = [
  { label: '1m', value: 60 },
  { label: '5m', value: 300 },
  { label: '15m', value: 900 },
  { label: '30m', value: 1800 },
  { label: '1h', value: 3600 },
  { label: '4h', value: 14400 },
  { label: '1d', value: 86400 },
] as const;

// UI Constants
export const UI_CONFIG = {
  MOBILE_BREAKPOINT: 768,
  TABLET_BREAKPOINT: 1024,
  DESKTOP_BREAKPOINT: 1280,
  SIDEBAR_WIDTH: 256,
  HEADER_HEIGHT: 64,
} as const;

// Animation Durations
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied. Please contact support if you believe this is an error.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  GENERIC_ERROR: 'An unexpected error occurred. Please try again later.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Welcome back! You have been successfully logged in.',
  SIGNUP_SUCCESS: 'Account created successfully! Please verify your email.',
  PROFILE_UPDATED: 'Your profile has been updated successfully.',
  SETTINGS_SAVED: 'Settings saved successfully.',
  BOT_UPLOADED: 'Bot strategy uploaded successfully.',
  TIP_SUBMITTED: 'Your trading tip has been submitted for review.',
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_DARK_MODE: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_BETA_FEATURES: false,
  ENABLE_ANALYTICS: true,
  ENABLE_OFFLINE_MODE: false,
} as const;

// Social Links
export const SOCIAL_LINKS = {
  TELEGRAM: 'https://t.me/tradingwebapp',
  TWITTER: 'https://twitter.com/tradingwebapp',
  DISCORD: 'https://discord.gg/tradingwebapp',
  YOUTUBE: 'https://youtube.com/@tradingwebapp',
} as const;

// External Links
export const EXTERNAL_LINKS = {
  DERIV_WEBSITE: 'https://deriv.com',
  SUPPORT_EMAIL: 'support@tradingwebapp.com',
  DOCUMENTATION: 'https://docs.tradingwebapp.com',
  TERMS_OF_SERVICE: '/terms-of-service',
  PRIVACY_POLICY: '/privacy-policy',
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
  LANGUAGE: 'language',
  SACCO_MODE: 'sacco_mode',
  ONBOARDING_COMPLETED: 'onboarding_completed',
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  STAKE_DECIMAL_PLACES: 2,
} as const;