'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'How do I connect my Deriv account?',
      answer: 'Simply create a Deriv API token from your Deriv account settings and enter it during registration. Our platform will securely connect to your account for trading operations.'
    },
    {
      question: 'Is my money safe on this platform?',
      answer: 'We never hold your funds. All trading is done directly through your Deriv account using secure API connections. We only facilitate the trading interface and strategies.'
    },
    {
      question: 'Can SACCOs use this platform for group trading?',
      answer: 'Absolutely! Our platform is designed with SACCOs in mind. You can manage multiple accounts, track group performance, and use SACCO-friendly interfaces with larger fonts and simplified navigation.'
    },
    {
      question: 'What trading strategies are included?',
      answer: 'We provide over 20 pre-built bot strategies for different market conditions, plus the ability to upload your own XML bot files. All strategies include backtesting data and risk assessments.'
    },
    {
      question: 'How much can I earn with the referral program?',
      answer: 'Our referral program offers up to 40% commission on referred user profits, with tiered bonuses. Top affiliates earn $1000+ monthly from referrals alone.'
    },
    {
      question: 'Do you offer customer support?',
      answer: 'Yes! We provide email support for all users, with 24/7 priority support for Professional and Enterprise plans. We also have an active community forum.'
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. Your account will remain active until the end of your billing period, and you can always restart later.'
    },
    {
      question: 'What markets can I trade?',
      answer: 'Through Deriv API, you can trade forex, commodities, stock indices, cryptocurrencies, and synthetic indices. All major currency pairs and popular assets are available.'
    }
  ]

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300">
            Everything you need to know about our trading platform
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-750 transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}