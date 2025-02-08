import { FaClock, FaClipboardCheck, FaLaptop, FaMoneyBillWave, FaHeadset } from "react-icons/fa";
import { FaShieldAlt, FaLock, FaChartLine, FaIndustry, FaCreditCard, FaDatabase, FaUserShield, FaClipboardList } from "react-icons/fa";

const About = () => {
  return (
    <>
      <div className="relative bg-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-900  opacity-90" />
          <div className="absolute inset-y-0 right-0 w-1/2">
            <svg
              className="h-full w-screen text-white opacity-10"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <polygon points="0,0 100,0 50,100 0,100" />
            </svg>
          </div>
        </div>
        {/* // Atlas About Page Hero Section */}
        {/* Content */}
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <div className="md:w-3/4 lg:w-full">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl text-center space-y-4">
              <span className="block text-7xl mb-4">Transforming</span>
              <span className="block text-emerald-500 text-7xl">
                Corporate Lending
              </span>
            </h1>
            <div className="mt-6 text-xl text-gray-100 max-w-3xl mx-auto text-center">
              Atlas stands as a pioneering digital lending infrastructure that's
              revolutionizing corporate finance through advanced technology and
              data-driven solutions. We empower businesses across the spectrum
              with customized lending solutions designed to meet their unique
              financial requirements.
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-3">
              {/* Stats */}
              <div className="border-4 border-blue-500 rounded-lg p-6">
                <p className="text-4xl font-bold text-white">$5B+</p>
                <p className="text-sm text-teal-200 mt-2">Loans Disbursed</p>
              </div>
              <div className="border-2 border-teal-200 rounded-lg p-6">
                <p className="text-4xl font-bold text-white">10K+</p>
                <p className="text-sm text-teal-200 mt-2">Businesses Served</p>
              </div>
              <div className="border-2 border-teal-200 rounded-lg p-6">
                <p className="text-4xl font-bold text-white">15</p>
                <p className="text-sm text-teal-200 mt-2">Countries</p>
              </div>
            </div>

            <div className="mt-10 flex gap-4">
              <button className="bg-white text-teal-900 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors">
                Get Started
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* // Atlas About page Features Section */}
      <div className="flex items-center justify-center h-auto w-screen px-4 mt-4">
      <div className="w-full shadow-xl rounded-3xl p-2 md:p-12 text-center ">
        <h1 className="text-6xl font-bold text-teal-900 text-center">
          Empowering Small Businesses with Smarter Banking
        </h1>
        <p className="mt-6 text-lg text-gray-700  ">
          Traditional banks have underserved small businesses. We’re here to change that.
        </p>
        <p className="mt-6 text-lg text-gray-700 text-center">
          <span className="text-center ">
            For too long, small business owners have struggled to access the financial tools and 
            support they need to grow. At <span className="text-teal-800 font-semibold">Atlas</span>, we believe 
            banking should be simple, accessible, and designed for businesses of all sizes.
          </span>
        </p>
      </div>
    </div>

    {/* Our Solution  */}
 
    <div className="flex items-center justify-center  w-screen px-6 py-12">
      <div className=" p-8 md:p-12 w-screen">
        <h2 className="text-5xl font-bold text-teal-900 text-center">Our Financial Solutions</h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Enterprise Financing */}
          <div className="p-6 bg-gray-50 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold text-teal-800">Enterprise Financing</h3>
            <ul className="mt-4 space-y-3 text-lg text-gray-700">
              <li>✔ Working capital loans up to <span className="font-semibold">$50M</span></li>
              <li>✔ Project financing</li>
              <li>✔ Asset-based lending</li>
              <li>✔ International trade finance</li>
            </ul>
          </div>

          {/* Startup Growth Capital */}
          <div className="p-6 bg-gray-50 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold text-teal-800">Startup Growth Capital</h3>
            <ul className="mt-4 space-y-3 text-lg text-gray-700">
              <li>✔ Seed funding support</li>
              <li>✔ Series funding bridge loans</li>
              <li>✔ Equipment financing</li>
              <li>✔ Growth capital solutions</li>
            </ul>
          </div>

          {/* Self-Employed Professionals */}
          <div className="p-6 bg-gray-50 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold text-teal-800">Self-Employed Professionals</h3>
            <ul className="mt-4 space-y-3 text-lg text-gray-700">
              <li>✔ Business expansion loans</li>
              <li>✔ Professional practice loans</li>
              <li>✔ Equipment financing</li>
              <li>✔ Working capital solutions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  

 {/* why choose atlas  */}

    <div className="flex items-center justify-center w-screen px-6 py-10 bg-gray-100">
      <div className="  p-6 md:p-12 text-center">
        <h2 className="text-5xl font-bold text-teal-900">Why Choose Atlas</h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Swift Processing */}
          <div className="p-6 bg-gray-50 rounded-xl shadow-md flex flex-col items-center text-center">
            <FaClock className="text-teal-700 text-5xl mb-4" />
            <h3 className="text-2xl font-bold text-teal-800">Swift Processing</h3>
            <p className="mt-2 text-lg text-gray-700">72-hour approval process</p>
          </div>

          {/* Flexible Terms */}
          <div className="p-6 bg-gray-50 rounded-xl shadow-md flex flex-col items-center text-center">
            <FaClipboardCheck className="text-teal-700 text-5xl mb-4" />
            <h3 className="text-2xl font-bold text-teal-800">Flexible Terms</h3>
            <p className="mt-2 text-lg text-gray-700">Customized repayment schedules</p>
          </div>

          {/* Digital-First */}
          <div className="p-6 bg-gray-50 rounded-xl shadow-md flex flex-col items-center text-center">
            <FaLaptop className="text-teal-700 text-5xl mb-4" />
            <h3 className="text-2xl font-bold text-teal-800">Digital-First</h3>
            <p className="mt-2 text-lg text-gray-700">Paperless application and verification</p>
          </div>

          {/* Transparent Pricing */}
          <div className="p-6 bg-gray-50 rounded-xl shadow-md flex flex-col items-center text-center">
            <FaMoneyBillWave className="text-teal-700 text-5xl mb-4" />
            <h3 className="text-2xl font-bold text-teal-800">Transparent Pricing</h3>
            <p className="mt-2 text-lg text-gray-700">No hidden fees</p>
          </div>

          {/* Dedicated Support */}
          <div className="p-6 bg-gray-50 rounded-xl shadow-md flex flex-col items-center text-center">
            <FaHeadset className="text-teal-700 text-5xl mb-4" />
            <h3 className="text-2xl font-bold text-teal-800">Dedicated Support</h3>
            <p className="mt-2 text-lg text-gray-700">Personal relationship managers</p>
          </div>
        </div>
      </div>
    </div>



    <div className="flex items-center justify-center  w-screen px-6 py-8 bg-gray-100">
      <div className="  p-6 md:p-12 text-center">
        {/* Risk Management Section */}
        <h2 className="text-5xl font-bold text-teal-900">Risk Management</h2>
        <p className="text-lg text-gray-700 mt-4">Our AI-powered risk assessment system evaluates:</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-50 rounded-xl shadow-md flex items-center">
            <FaChartLine className="text-teal-700 text-4xl mr-4" />
            <span className="text-lg font-semibold text-gray-800">Business performance metrics</span>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow-md flex items-center">
            <FaClipboardList className="text-teal-700 text-4xl mr-4" />
            <span className="text-lg font-semibold text-gray-800">Market conditions</span>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow-md flex items-center">
            <FaIndustry className="text-teal-700 text-4xl mr-4" />
            <span className="text-lg font-semibold text-gray-800">Industry trends</span>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow-md flex items-center">
            <FaCreditCard className="text-teal-700 text-4xl mr-4" />
            <span className="text-lg font-semibold text-gray-800">Credit history</span>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow-md flex items-center">
            <FaShieldAlt className="text-teal-700 text-4xl mr-4" />
            <span className="text-lg font-semibold text-gray-800">Future growth potential</span>
          </div>
        </div>

        {/* Security Promise Section */}
        <h2 className="text-5xl font-bold text-teal-900 mt-12 py-10">Security Promise</h2>
        <p className="text-lg text-gray-700 mt-4">We ensure top-tier security for all transactions:</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-50 rounded-xl shadow-md flex items-center">
            <FaLock className="text-teal-700 text-4xl mr-4" />
            <span className="text-lg font-semibold text-gray-800">Bank-grade encryption</span>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow-md flex items-center">
            <FaUserShield className="text-teal-700 text-4xl mr-4" />
            <span className="text-lg font-semibold text-gray-800">Multi-factor authentication</span>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow-md flex items-center">
            <FaClipboardList className="text-teal-700 text-4xl mr-4" />
            <span className="text-lg font-semibold text-gray-800">Regular security audits</span>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow-md flex items-center">
            <FaDatabase className="text-teal-700 text-4xl mr-4" />
            <span className="text-lg font-semibold text-gray-800">Regulatory compliance</span>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow-md flex items-center">
            <FaShieldAlt className="text-teal-700 text-4xl mr-4" />
            <span className="text-lg font-semibold text-gray-800">Data protection standards</span>
          </div>
        </div>
      </div>
    </div>

    </>
  );
};

export default About;
