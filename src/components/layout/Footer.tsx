import Link from 'next/link'
import { TrendingUp, Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react'

export function Footer() {
  const footerLinks = {
    product: [
      { name: 'Trading Dashboard', href: '/dashboard' },
      { name: 'Bot Strategies', href: '/bots' },
      { name: 'Learning Center', href: '/learn' },
      { name: 'Trading Tips', href: '/tips' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Documentation', href: '/docs' },
      { name: 'API Reference', href: '/api' },
      { name: 'Community', href: '/community' },
    ],
  }

  return (
    <footer className="bg-dark-900 border-t border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-8 w-8 text-primary-500" />
              <span className="text-xl font-bold gradient-text">DerivTrading Pro</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Empowering professionals, SACCOs, and beginners with advanced trading tools, 
              comprehensive education, and proven strategies for financial success.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>support@derivtrading.pro</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>123 Financial District, Trading City</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Newsletter */}
        <div className="py-8 border-t border-dark-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-400">Follow us:</span>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="flex items-center space-x-4">
              <input
                type="email"
                placeholder="Subscribe to weekly tips"
                className="form-input w-64"
              />
              <button className="btn-primary">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="py-6 border-t border-dark-700">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <p>© 2024 DerivTrading Pro. All rights reserved.</p>
            <p className="mt-2 md:mt-0">
              <strong className="text-yellow-400">Risk Disclaimer:</strong> Trading involves significant risk. 
              Never invest more than you can afford to lose.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}