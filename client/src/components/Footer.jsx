import atlas2 from '../assets/atlas2.png'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
     <footer className="py-12 bg-gray-900 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="text-2xl font-bold text-emerald-400">ATLAS</div>
              <p className="text-gray-400">
                Next-generation loan origination platform powered by artificial intelligence.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-emerald-500">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href='/'>Home</a></li>
                <li>Pricing</li>
                <li>Documentation</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-emerald-500">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href='/about'>About</a></li>
                <li>Blog</li>
                <li><a href='/contact'>Contact</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-emerald-500">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Security</li>
                <li>Compliance</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-800 text-center text-gray-400">
            <p>&copy; 2025 ATLAS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer