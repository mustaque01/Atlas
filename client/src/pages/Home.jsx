// import  { useState } from 'react';
import {
  ArrowRight, Shield, Zap, Lock,
  Users, LineChart as ChartIcon,
  CheckCircle, TrendingUp, Brain
} from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area} from 'recharts';
import backgroundImage from '../assets/artificial-intelligence Background.jpg';

const trendData = [
  { month: 'Jan', value: 30, users: 1200 },
  { month: 'Feb', value: 40, users: 1800 },
  { month: 'Mar', value: 35, users: 2200 },
  { month: 'Apr', value: 50, users: 2800 },
  { month: 'May', value: 45, users: 3200 },
  { month: 'Jun', value: 60, users: 4000 }
];

// const pieData = [
//   { name: 'AI Decisions', value: 65 },
//   { name: 'Manual Review', value: 35 }
// ];

// const COLORS = ['#10b981', '#374151'];

const HomePage = () => {
  // const [activeTab, setActiveTab] = useState('features');

  return (
    <div className="z-0 min-h-screen text-white bg-black">
      {/* Navbar */}


      {/* Hero Section with Background Image */}
      <div 
        className="relative px-6 pt-32 pb-20 sm:px-12 lg:px-24"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Background overlay for better text readability */}
        <div className="absolute inset-0 z-0 bg-black/70"></div>
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10">
            <div className="inline-block px-4 py-2 mb-6 rounded-full bg-emerald-500/10 text-emerald-500">
              Advanced Technology Loan Assessment System
            </div>
            <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
              Transform Your <br />
              <span className="text-rose-500">Lending Operations</span><br />
              With AI Intelligence
            </h1>
            <p className="max-w-2xl mb-8 text-xl text-gray-400">
              Revolutionary loan origination platform combining artificial intelligence,
              blockchain security, and advanced analytics to streamline your lending
              process and reduce risks.
            </p>
            <div className="flex items-center gap-4">
              <a className="flex items-center gap-2 px-8 py-4 text-white transition-colors rounded-lg bg-rose-500 hover:bg-emerald-600"
                href="/signup">
                Get Started <ArrowRight className="w-5 h-5" />
              </a>
              <button className="flex items-center gap-2 px-8 py-4 transition-colors border rounded-lg border-zinc-700 hover:bg-zinc-900">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="relative z-10 grid grid-cols-1 gap-6 mt-20 md:grid-cols-4">
            <div className="p-6 bg-gradient-to-br from-zinc-900 to-zinc-800/50 rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-purple-500/20">
                  <Zap className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold">Processing</h3>
              </div>
              <p className="mb-2 text-4xl font-bold">4x</p>
              <p className="text-gray-400">Faster approval</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-zinc-900 to-zinc-800/50 rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-emerald-500/20">
                  <Shield className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-xl font-semibold">Accuracy</h3>
              </div>
              <p className="mb-2 text-4xl font-bold">99.9%</p>
              <p className="text-gray-400">Decision accuracy</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-zinc-900 to-zinc-800/50 rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-blue-500/20">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold">Clients</h3>
              </div>
              <p className="mb-2 text-4xl font-bold">50K+</p>
              <p className="text-gray-400">Active users</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-zinc-900 to-zinc-800/50 rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-rose-500/20">
                  <TrendingUp className="w-6 h-6 text-rose-500" />
                </div>
                <h3 className="text-xl font-semibold">Growth</h3>
              </div>
              <p className="mb-2 text-4xl font-bold">450%</p>
              <p className="text-gray-400">Year over year</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Features */}
      <div className="py-20 bg-emerald-500/10">
        <div className="px-6 mx-auto max-w-7xl sm:px-12 lg:px-24">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">Powered by Advanced Technology</h2>
            <p className="max-w-2xl mx-auto text-gray-400">
              Our platform combines cutting-edge AI, blockchain, and analytics to provide
              a comprehensive lending solution.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: <Brain className="w-8 h-8 text-purple-500" />,
                title: "AI-Driven Decision Making",
                description: "Advanced machine learning algorithms analyze multiple data points for accurate risk assessment and fraud detection."
              },
              {
                icon: <Lock className="w-8 h-8 text-emerald-500" />,
                title: "Blockchain Security",
                description: "Immutable record-keeping and document verification ensure the highest level of security and transparency."
              },
              {
                icon: <ChartIcon className="w-8 h-8 text-blue-500" />,
                title: "Advanced Analytics",
                description: "Real-time insights and predictive analytics help make informed lending decisions."
              }
            ].map((feature, index) => (
              <div key={index} className="p-8 transition-colors border bg-black/50 rounded-xl border-zinc-800 hover:border-zinc-700">
                <div className="inline-block p-4 mb-6 rounded-lg bg-zinc-800/50">
                  {feature.icon}
                </div>
                <h3 className="mb-4 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Dashboard Preview */}
      <div className="py-20">
        <div className="px-6 mx-auto max-w-7xl sm:px-12 lg:px-24">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-4xl font-bold">Real-Time Analytics Dashboard</h2>
              <p className="mb-8 text-gray-400">
                Get comprehensive insights into your loan portfolio with our advanced
                analytics dashboard. Monitor key metrics, track performance, and make
                data-driven decisions.
              </p>
              <div className="space-y-4">
                {[
                  "AI-powered risk assessment",
                  "Real-time fraud detection",
                  "Portfolio performance tracking",
                  "Custom reporting tools"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-rose-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 bg-zinc-900 rounded-xl">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F33A6A" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#F33A6A" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip contentStyle={{ background: '#F33A6A', border: 'none' }} />
                    <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Flow */}
      <div className="py-20 bg-zinc/50">
        <div className="px-6 mx-auto max-w-7xl sm:px-12 lg:px-24">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">Streamlined Loan Process</h2>
            <p className="max-w-2xl mx-auto text-gray-400">
              Our automated workflow reduces loan processing time from days to minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {[
              {
                icon: <Users className="w-6 h-6" />,
                title: "Application",
                description: "Digital application with automated data collection"
              },
              {
                icon: <Brain className="w-6 h-6" />,
                title: "AI Analysis",
                description: "Instant risk assessment and verification"
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Verification",
                description: "Blockchain-based document verification"
              },
              {
                icon: <CheckCircle className="w-6 h-6" />,
                title: "Approval",
                description: "Automated approval and disbursement"
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="p-4 border bg-black/50 rounded-xl border-zinc-800">
                  <div className="inline-block p-4 mb-6 rounded-lg bg-emerald-500/20">
                    {step.icon}
                  </div>
                  <h3 className="mb-4 text-xl font-semibold">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-10 w-12 h-[2px] bg-emerald-500 " />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Previous code remains the same until Metrics Section */}

{/* After Metrics Section, add the following: */}

      {/* Success Stories */}
      <div className="py-20 bg-zinc-900/50">
        <div className="px-6 mx-auto max-w-7xl sm:px-12 lg:px-24">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">Success Stories</h2>
            <p className="max-w-2xl mx-auto text-gray-400">
              See how leading financial institutions have transformed their lending operations with our AI-powered platform.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="p-8 border bg-black/50 rounded-xl border-zinc-800">
              <img 
                src="https://plus.unsplash.com/premium_photo-1661349622758-072987fa888f?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Bank office interior" 
                className="object-cover w-full h-48 mb-6 rounded-lg"
              />
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Global Bank Corp</h3>
                <p className="text-gray-400">Reduced loan processing time by 75% while improving accuracy by 35% using our AI-driven analysis.</p>
                <div className="flex items-center gap-2 text-emerald-400">
                  <span>Read case study</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="p-8 border bg-black/50 rounded-xl border-zinc-800">
              <img 
                src="https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Modern office space" 
                className="object-cover w-full h-48 mb-6 rounded-lg"
              />
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">FinTech Solutions</h3>
                <p className="text-gray-400">Achieved 99.9% accuracy in fraud detection with our blockchain verification system.</p>
                <div className="flex items-center gap-2 text-emerald-400">
                  <span>Read case study</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="p-8 border bg-black/50 rounded-xl border-zinc-800">
              <img 
                src="https://plus.unsplash.com/premium_photo-1664478157873-50d4963c1d11?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Data visualization" 
                className="object-cover w-full h-48 mb-6 rounded-lg"
              />
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Credit Union Plus</h3>
                <p className="text-gray-400">Expanded lending portfolio by 200% while maintaining risk levels using AI-powered assessments.</p>
                <div className="flex items-center gap-2 text-emerald-400">
                  <span>Read case study</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Technology Showcase */}
      <div className="py-20">
        <div className="px-6 mx-auto max-w-7xl sm:px-12 lg:px-24">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <div className="inline-block px-4 py-2 mb-6 rounded-full bg-rose-500/10 text-rose-500">
                Advanced AI Technology
              </div>
              <h2 className="mb-6 text-4xl font-bold">Experience Next-Gen Loan Processing</h2>
              <p className="mb-8 text-gray-400">
                Our advanced AI system analyzes thousands of data points in real-time to make accurate lending decisions while ensuring compliance and reducing risk.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-zinc-900/50 rounded-xl">
                  <div className="mb-2 text-4xl font-bold text-emerald-400">94%</div>
                  <p className="text-gray-400">Reduction in manual review time</p>
                </div>
                <div className="p-6 bg-zinc-900/50 rounded-xl">
                  <div className="mb-2 text-4xl font-bold text-emerald-400">99.9%</div>
                  <p className="text-gray-400">Fraud detection accuracy</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="AI visualization" 
                className="rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-purple-500/20 rounded-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20">
        <div className="px-6 mx-auto max-w-7xl sm:px-12 lg:px-24">
          <div className="p-12 text-center bg-gradient-to-br from-emerald-500/20 to-purple-500/20 rounded-2xl">
            <h2 className="mb-6 text-4xl font-bold">Ready to Transform Your Lending?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-gray-400">
              Join leading financial institutions in revolutionizing their loan origination process with AI-powered technology.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button className="flex items-center gap-2 px-8 py-4 text-white transition-colors rounded-lg bg-rose-500 hover:bg-emerald-600">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </button>
              <button className="flex items-center gap-2 px-8 py-4 transition-colors rounded-lg bg-white/10 hover:bg-white/20">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;