
import atlas2 from '../assets/atlas2.png'
const Header = () => {
  return (
    <>
      <nav className="border-b border-zinc-800 bg-black/50 backdrop-blur-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-12">
              <div className=''>
                {/* <span className='text-4xl'> Atlas</span> */}
                <img src={atlas2} alt="" className='w-[200px] h-[70px] ml-10' />
              </div>              <div className="hidden md:flex items-center gap-8">
                <a href="/home" className="text-gray-300 hover:text-white transition-colors">Home</a>
                <a href="/about" className="text-gray-300 hover:text-white transition-colors">About</a>
                <a href="/faq" className="text-gray-300 hover:text-white transition-colors">FAQs</a>
                <a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</a>
                <a href="/risk" className="text-gray-300 hover:text-white transition-colors">RiskAssessment</a>
                <a href="/approval" className="text-gray-300 hover:text-white transition-colors">approval</a>
                <a href="/loan" className="text-gray-300 hover:text-white transition-colors">loan</a>
                <a href="/chatbot" className="text-gray-300 hover:text-white transition-colors">chatbot</a>
                <a href="/documentverification" className="text-gray-300 hover:text-white transition-colors">documentverification</a>

              </div>
            </div>
            <a href="/signup" className="px-4 py-2 text-gray-300 hover:text-white transition-colors">Login</a>
            <a href="/get-started" className="bg-emerald-500 px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors">
              Get Started
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header