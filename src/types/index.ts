/**
 * Central type definitions for the trading application
 * Contains all shared interfaces and types used across components
 */

// User and Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'premium';
  createdAt: string;
  lastLogin?: string;
  preferences: UserPreferences;
  subscription?: Subscription;
}

export interface UserPreferences {
  saccoMode: boolean;
  notifications: boolean;
  theme: 'dark' | 'light';
  language: string;
  timezone: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

// Trading Types
export interface TradePosition {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  amount: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  status: 'open' | 'closed';
  openTime: string;
  closeTime?: string;
}

export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  high24h: number;
  low24h: number;
  volume: number;
  timestamp: string;
}

// Bot and Strategy Types
export interface BotStrategy {
  id: string;
  name: string;
  description: string;
  category: string;
  xmlContent: string;
  performance: BotPerformance;
  isActive: boolean;
  createdBy: string;
  downloads: number;
  rating: number;
}

export interface BotPerformance {
  totalTrades: number;
  winRate: number;
  roi: number;
  maxDrawdown: number;
  profitFactor: number;
  sharpeRatio: number;
}

// Referral and Affiliate Types
export interface ReferralData {
  id: string;
  userId: string;
  referralCode: string;
  totalReferrals: number;
  totalEarnings: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  commissionRate: number;
  pendingPayouts: number;
  paidPayouts: number;
}

export interface ReferralClick {
  id: string;
  referralId: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  converted: boolean;
}

// Course and Education Types
export interface Course {
  id: string;
  title: string;
  description: string;
  modules: CourseModule[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number;
  enrolledUsers: number;
  rating: number;
}

export interface CourseModule {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  quiz?: Quiz;
  completed: boolean;
  order: number;
}

export interface Quiz {
  id: string;
  questions: Question[];
  passingScore: number;
  timeLimit?: number;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// News and Tips Types
export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  summary: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  imageUrl?: string;
  views: number;
  likes: number;
}

export interface TradingTip {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  likes: number;
  saves: number;
  createdAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  referralCode?: string;
}

// Subscription Types
export interface Subscription {
  id: string;
  plan: 'free' | 'premium' | 'pro';
  status: 'active' | 'cancelled' | 'expired';
  startDate: string;
  endDate: string;
  autoRenew: boolean;
}

// WebSocket and Real-time Types
export interface WebSocketMessage {
  type: string;
  data: any;
  timestamp: string;
}

export interface PriceUpdate {
  symbol: string;
  price: number;
  timestamp: string;
}

// Component Props Types
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ModalProps extends ComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

// Utility Types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// Chart Types
export interface ChartDataPoint {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}