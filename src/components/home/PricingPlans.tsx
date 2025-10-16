'use client'

import { motion } from 'framer-motion'
import { Check, Star, Crown, Zap } from 'lucide-react'
import Link from 'next/link'

export function PricingPlans() {
  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      period: 'Forever',
      icon: Star,
      description: 'Perfect for beginners getting started',
      popular: false,
      features: [
        'Access to basic trading course',
        'Demo account trading',
        '3 pre-built bot strategies',
        'Community forum access',
        'Email support',
        'Basic market insights'
      ],
      limitations: [
        'Limited to $100 daily volume',
        'No advanced analytics',
        'Standard support response'
      ]
    },
    {
      name: 'Professional',
      price: '$29',
      period: 'per month',
      icon: Crown,
      description: 'For serious traders and small SACCOs',
      popular: true,
      features: [
        'Complete trading course access',
        'Unlimited bot strategies',
        'Advanced analytics dashboard',
        'Priority support (24/7)',
        'Risk management tools',
        'Custom bot XML upload',
        'Referral program access',
        'Weekly market reports'
      ],
      limitations: []
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'per month',
      icon: Zap,
      description: 'For large SACCOs and institutions',
      popular: false,
      features: [
        'Everything in Professional',
        'Multi-account management',
        'Custom integrations',
        'Dedicated account manager',
        'White-label options',
        'Advanced compliance tools',
        'Custom training sessions',
        'API access for developers'
      ],
      limitations: []
    }
  ]

  return (
    <section className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Start free and upgrade as you grow. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative bg-gray-900 rounded-2xl border ${
                plan.popular 
                  ? 'border-green-500 shadow-2xl shadow-green-500/20' 
                  : 'border-gray-700'
              } p-8 hover:border-gray-600 transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                    : 'bg-gray-800'
                }`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period !== 'Forever' && (
                    <span className="text-gray-400 ml-2">{plan.period}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/auth/signup"
                className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/20'
                    : 'bg-gray-800 text-white border border-gray-600 hover:bg-gray-700'
                }`}
              >
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}