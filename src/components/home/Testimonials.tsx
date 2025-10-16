'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

export function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      title: 'SACCO Financial Manager',
      company: 'Unity SACCO',
      rating: 5,
      content: 'DerivTrading Pro transformed how our SACCO approaches investment strategies. The educational modules helped our members understand trading fundamentals, and the results speak for themselves.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c7e96552?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
    },
    {
      name: 'Michael Chen',
      title: 'Senior Financial Analyst',
      company: 'TechCorp',
      rating: 5,
      content: 'The bot strategies and real-time analytics have significantly improved my trading performance. The platform is intuitive yet powerful enough for professional use.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
    },
    {
      name: 'Emily Rodriguez',
      title: 'Entrepreneur',
      company: 'StartupHub',
      rating: 5,
      content: 'As a complete beginner, I was intimidated by trading. The step-by-step learning modules and AI assistant made everything clear. Now I trade confidently.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
    },
    {
      name: 'David Ochieng',
      title: 'Investment Group Leader',
      company: 'Nairobi Investment Club',
      rating: 5,
      content: 'The referral system and group management features are perfect for our investment club. We\'ve grown our membership while improving everyone\'s trading skills.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
    },
    {
      name: 'Lisa Thompson',
      title: 'Financial Advisor',
      company: 'Wealth Partners',
      rating: 5,
      content: 'I recommend DerivTrading Pro to all my clients. The risk management tools and educational content ensure they trade responsibly while maximizing potential.',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
    },
    {
      name: 'James Wilson',
      title: 'Retired Professional',
      company: 'Independent Trader',
      rating: 5,
      content: 'The platform\'s simplicity impressed me. Even at my age, I could navigate easily and start trading within hours. The customer support is exceptional.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
        }`}
      />
    ))
  }

  return (
    <section className="py-24 bg-dark-900">
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
            <span className="text-white">Trusted by</span>
            <br />
            <span className="gradient-text">Successful Traders Worldwide</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our community of traders, 
            SACCOs, and financial professionals have to say about their experience.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card-hover relative"
            >
              {/* Quote Icon */}
              <Quote className="h-8 w-8 text-primary-500 mb-4 opacity-50" />
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Content */}
              <blockquote className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-400">
                    {testimonial.title}
                  </div>
                  <div className="text-sm text-primary-400">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 pt-16 border-t border-dark-700"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-500 mb-2">4.9/5</div>
              <div className="text-gray-400">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-500 mb-2">10K+</div>
              <div className="text-gray-400">Happy Traders</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-500 mb-2">500+</div>
              <div className="text-gray-400">SACCOs Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-500 mb-2">89%</div>
              <div className="text-gray-400">Success Rate</div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Join Thousands of Successful Traders
          </h3>
          <p className="text-gray-400 mb-8">
            Start your trading journey today with professional tools and expert guidance.
          </p>
          <button className="btn-primary text-lg px-8 py-4">
            Get Started Now
          </button>
        </motion.div>
      </div>
    </section>
  )
}