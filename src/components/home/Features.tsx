'use client'

import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Bot, 
  BookOpen, 
  Shield, 
  Users, 
  Award,
  Smartphone,
  BarChart3,
  Brain
} from 'lucide-react'

export function Features() {
  const features = [
    {
      icon: TrendingUp,
      title: 'Real-Time Trading',
      description: 'Execute trades instantly with live market data from Deriv API. Advanced charting and analysis tools.',
      color: 'text-primary-500',
      bgColor: 'bg-primary-500/10'
    },
    {
      icon: Bot,
      title: 'Automated Strategies',
      description: 'Upload and run custom bot strategies. Pre-built algorithms for different risk profiles and markets.',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: BookOpen,
      title: 'Financial Education',
      description: 'Comprehensive learning modules from basic concepts to advanced strategies. Progress tracking included.',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Built-in risk controls, position sizing calculators, and educational content on responsible trading.',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      icon: Users,
      title: 'SACCO-Friendly',
      description: 'Special interface designed for cooperative societies with group management and simplified navigation.',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      icon: Award,
      title: 'Referral System',
      description: 'Earn commissions by referring new traders. Multi-tier affiliate program with transparent tracking.',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Fully responsive design works perfectly on all devices. Trade anywhere, anytime.',
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Detailed performance metrics, win/loss ratios, and comprehensive trading history analysis.',
      color: 'text-red-500',
      bgColor: 'bg-red-500/10'
    },
    {
      icon: Brain,
      title: 'AI Assistant',
      description: 'Smart notifications, trading tips, and personalized guidance powered by artificial intelligence.',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10'
    }
  ]

  return (
    <section className="py-24 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Everything You Need to</span>
            <br />
            <span className="gradient-text">Succeed in Trading</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Professional-grade tools and educational resources designed to empower 
            traders at every level, from complete beginners to seasoned professionals.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-hover group"
              >
                <div className={`${feature.bgColor} ${feature.color} p-3 rounded-lg inline-flex mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary-400 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect Arrow */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-primary-400 text-sm font-medium">
                    Learn more →
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Transform Your Trading Journey?
            </h3>
            <p className="text-gray-400 mb-6">
              Join thousands of successful traders who have already discovered 
              the power of professional trading tools and education.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="btn-primary text-lg px-8 py-4">
                Start Your Free Trial
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                View Pricing Plans
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}