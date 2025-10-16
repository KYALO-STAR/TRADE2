'use client'

import { motion } from 'framer-motion'
import { Users, DollarSign, TrendingUp, Award } from 'lucide-react'

export function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: '50K+',
      label: 'Active Traders',
      description: 'Join our growing community'
    },
    {
      icon: DollarSign,
      value: '$2.5M+',
      label: 'Total Profits Generated',
      description: 'Collective member earnings'
    },
    {
      icon: TrendingUp,
      value: '87%',
      label: 'Success Rate',
      description: 'With our proven strategies'
    },
    {
      icon: Award,
      value: '4.9/5',
      label: 'User Rating',
      description: 'Trusted by professionals'
    }
  ]

  return (
    <section className="py-20 bg-gray-800 border-y border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Professionals Worldwide
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of successful traders and SACCOs who trust our platform for their financial growth
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-green-400 mb-2">{stat.label}</div>
              <div className="text-sm text-gray-400">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}