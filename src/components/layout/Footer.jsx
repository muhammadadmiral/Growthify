// src/components/layout/Footer.jsx
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-content-light border-t border-primary-100 w-full">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <div 
              className="font-heading font-bold text-2xl mb-4 gradient-text"
              style={{
                backgroundImage: 'linear-gradient(90deg, #319795, #3182CE)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              Growthify
            </div>
            <p className="text-text mb-4 text-sm">
              Your personal development companion. Transform your mindset, habits, and body with expert guidance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-text-muted hover:text-primary-500 transition-colors" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a href="#" className="text-text-muted hover:text-primary-500 transition-colors" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                </svg>
              </a>
              <a href="#" className="text-text-muted hover:text-primary-500 transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-text-dark font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/features" className="text-text hover:text-primary-500 transition-colors text-sm">Features</Link></li>
              <li><Link to="/pricing" className="text-text hover:text-primary-500 transition-colors text-sm">Pricing</Link></li>
              <li><Link to="/testimonials" className="text-text hover:text-primary-500 transition-colors text-sm">Testimonials</Link></li>
              <li><Link to="/blog" className="text-text hover:text-primary-500 transition-colors text-sm">Blog</Link></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-text-dark font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/help" className="text-text hover:text-primary-500 transition-colors text-sm">Help Center</Link></li>
              <li><Link to="/guides" className="text-text hover:text-primary-500 transition-colors text-sm">Guides</Link></li>
              <li><Link to="/community" className="text-text hover:text-primary-500 transition-colors text-sm">Community</Link></li>
              <li><Link to="/events" className="text-text hover:text-primary-500 transition-colors text-sm">Events</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-text-dark font-semibold mb-4">Stay Updated</h3>
            <p className="text-text text-sm mb-4">Subscribe to our newsletter for growth tips and updates.</p>
            <form className="space-y-2">
              <div className="flex rounded-lg overflow-hidden shadow-sm border border-primary-200">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2 text-sm focus:outline-none bg-content border-0"
                  aria-label="Email for newsletter"
                />
                <button
                  type="submit"
                  className="text-white px-4 text-sm font-medium hover:bg-primary-600 transition-colors bg-primary-500"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-text-muted">We respect your privacy. Unsubscribe at any time.</p>
            </form>
          </div>
        </div>
      </div>
      
      {/* Bottom footer */}
      <div className="bg-background border-t border-primary-100">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-text-muted text-sm mb-4 md:mb-0">
              © {currentYear} Growthify. All rights reserved.
            </div>
            
            {/* Transformation categories */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/mindset" className="text-text hover:text-primary-500 transition-colors text-xs">Mindset Transformation</Link>
              <Link to="/body" className="text-text hover:text-primary-500 transition-colors text-xs">Body Transformation</Link>
              <Link to="/habits" className="text-text hover:text-primary-500 transition-colors text-xs">Habit Building</Link>
              <Link to="/nutrition" className="text-text hover:text-primary-500 transition-colors text-xs">Nutrition & Diet</Link>
              <Link to="/fitness" className="text-text hover:text-primary-500 transition-colors text-xs">Fitness Plans</Link>
            </div>
          </div>
          
          {/* Policies */}
          <div className="border-t border-primary-100 mt-6 pt-6 flex flex-col md:flex-row justify-center md:justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <Link to="/terms" className="text-text-muted hover:text-primary-500 transition-colors text-xs">Terms of Service</Link>
              <Link to="/privacy" className="text-text-muted hover:text-primary-500 transition-colors text-xs">Privacy Policy</Link>
              <Link to="/cookies" className="text-text-muted hover:text-primary-500 transition-colors text-xs">Cookie Policy</Link>
            </div>
            
            <div className="flex items-center">
              <span className="text-xs text-text-muted mr-2">Mode:</span>
              <button 
                className="h-6 w-12 rounded-full bg-secondary-200 flex items-center transition duration-300 focus:outline-none shadow-sm"
                aria-label="Toggle dark mode"
                aria-pressed="false"
              >
                <div className="h-5 w-5 rounded-full bg-content shadow-sm transform translate-x-1"></div>
              </button>
            </div>
          </div>
          
          {/* Trust badges */}
          <div className="mt-8 flex justify-center space-x-6 flex-wrap">
            <div className="bg-content rounded-md px-3 py-2 shadow-sm border border-primary-100 mb-2 sm:mb-0">
              <span className="text-xs font-medium text-text flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Secure Payments
              </span>
            </div>
            <div className="bg-content rounded-md px-3 py-2 shadow-sm border border-primary-100 mb-2 sm:mb-0">
              <span className="text-xs font-medium text-text flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                24/7 Support
              </span>
            </div>
            <div className="bg-content rounded-md px-3 py-2 shadow-sm border border-primary-100 mb-2 sm:mb-0">
              <span className="text-xs font-medium text-text flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-secondary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Premium Content
              </span>
            </div>
          </div>
          
          {/* Inspirational quote */}
          <div className="mt-8 text-center">
            <p className="italic text-sm text-text max-w-md mx-auto">
              "The only person you should try to be better than is the person you were yesterday."
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}