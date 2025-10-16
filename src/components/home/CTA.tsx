'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'

export function CTA() {
  const benefits = [
    'Start trading with as little as $5',
    'Access to 50+ educational modules',
    'Real-time market data and analysis',
    'Automated bot strategies included',
    'SACCO-friendly group management',
    'Dedicated customer support',
    'Referral program with high commissions',
    '24/7 professional trading tools'
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Your
              <span className="text-green-400 block">Trading Journey?</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of successful traders who have transformed their financial future with our comprehensive platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="/dashboard"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105"
              >
                Start Trading Now
                <ArrowRight size={20} />
              </Link>
              
              <Link 
                href="/course"
                className="bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300"
              >
                Learn First
              </Link>
            </div>
          </motion.div>

          {/* Right Benefits Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-3 bg-gray-800/50 p-4 rounded-lg border border-gray-700"
              >
                <CheckCircle size={20} className="text-green-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
        >
          {[
            { value: '15,000+', label: 'Active Traders' },
            { value: '$2.5M+', label: 'Total Volume' },
            { value: '98%', label: 'Success Rate' },
            { value: '24/7', label: 'Support' }
          ].map((stat) => (
            <div key={stat.label} className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
              <div className="text-3xl font-bold text-green-400 mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}