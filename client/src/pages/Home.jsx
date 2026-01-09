// import  { useState } from 'react';
import {
  ArrowRight, Shield, Zap, Lock,
  Users, LineChart as ChartIcon,
  CheckCircle, TrendingUp, Brain
} from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area} from 'recharts';
import backgroundImage from '../assets/artificial-intelligence Background.jpg';
import loanVideo from '../assets/laon video.mp4';

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
        className="relative px-6 pt-32 pb-20 sm:px-12 lg:px-24 overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Animated background overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80"></div>
        
        {/* Floating elements for visual interest */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-rose-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-6 py-3 mb-8 rounded-full bg-gradient-to-r from-emerald-500/10 to-rose-500/10 border border-emerald-500/20 backdrop-blur-sm">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-emerald-400 font-medium">Advanced Technology Loan Assessment System</span>
            </div>
            
            <h1 className="mb-8 text-5xl font-black leading-tight md:text-7xl lg:text-8xl">
              Transform Your <br />
              <span className="text-transparent bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 bg-clip-text animate-gradient">
                Lending Operations
              </span><br />
              <span className="relative">
                With AI Intelligence
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-rose-500 rounded-full"></div>
              </span>
            </h1>
            
            <p className="max-w-3xl mb-10 text-xl leading-relaxed text-gray-300">
              Revolutionary loan origination platform combining artificial intelligence,
              blockchain security, and advanced analytics to streamline your lending
              process and reduce risks by <span className="text-emerald-400 font-semibold">up to 90%</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <a className="group flex items-center gap-3 px-10 py-5 text-white font-semibold transition-all duration-300 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-2xl hover:shadow-rose-500/25 transform hover:scale-105"
                href="/signup">
                Get Started Free
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <button className="group flex items-center gap-3 px-10 py-5 font-semibold transition-all duration-300 border-2 rounded-xl border-zinc-600 hover:border-emerald-500 bg-black/30 backdrop-blur-sm hover:bg-black/50 hover:scale-105">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                  <div className="w-0 h-0 border-l-4 border-l-white border-t-2 border-b-2 border-t-transparent border-b-transparent ml-1"></div>
                </div>
                Watch Demo
              </button>
            </div>
          </div>

          {/* Enhanced Stats Overview */}
          <div className="relative z-10 grid grid-cols-1 gap-6 mt-20 md:grid-cols-2 lg:grid-cols-4">
            <div className="group p-8 bg-gradient-to-br from-zinc-900/90 to-zinc-800/50 rounded-2xl border border-zinc-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-purple-600/20 group-hover:from-purple-500/30 group-hover:to-purple-600/30 transition-all">
                  <Zap className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold">Processing Speed</h3>
              </div>
              <div className="mb-3 text-5xl font-black bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">4x</div>
              <p className="text-gray-400 font-medium">Faster approval times</p>
              <div className="mt-4 w-full bg-zinc-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full w-4/5 animate-pulse"></div>
              </div>
            </div>

            <div className="group p-8 bg-gradient-to-br from-zinc-900/90 to-zinc-800/50 rounded-2xl border border-zinc-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 group-hover:from-emerald-500/30 group-hover:to-emerald-600/30 transition-all">
                  <Shield className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold">Accuracy Rate</h3>
              </div>
              <div className="mb-3 text-5xl font-black bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">99.9%</div>
              <p className="text-gray-400 font-medium">Decision accuracy</p>
              <div className="mt-4 w-full bg-zinc-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full w-full animate-pulse delay-200"></div>
              </div>
            </div>

            <div className="group p-8 bg-gradient-to-br from-zinc-900/90 to-zinc-800/50 rounded-2xl border border-zinc-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-blue-600/20 group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-all">
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold">Active Users</h3>
              </div>
              <div className="mb-3 text-5xl font-black bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">50K+</div>
              <p className="text-gray-400 font-medium">Trusted clients</p>
              <div className="mt-4 w-full bg-zinc-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full w-3/4 animate-pulse delay-300"></div>
              </div>
            </div>

            <div className="group p-8 bg-gradient-to-br from-zinc-900/90 to-zinc-800/50 rounded-2xl border border-zinc-700/50 hover:border-rose-500/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-xl bg-gradient-to-r from-rose-500/20 to-rose-600/20 group-hover:from-rose-500/30 group-hover:to-rose-600/30 transition-all">
                  <TrendingUp className="w-8 h-8 text-rose-500" />
                </div>
                <h3 className="text-xl font-bold">Growth Rate</h3>
              </div>
              <div className="mb-3 text-5xl font-black bg-gradient-to-r from-rose-400 to-rose-600 bg-clip-text text-transparent">450%</div>
              <p className="text-gray-400 font-medium">Year over year</p>
              <div className="mt-4 w-full bg-zinc-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-rose-500 to-rose-600 h-2 rounded-full w-5/6 animate-pulse delay-400"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product film */}
      <div className="relative py-16 px-6 sm:px-12 lg:px-24 bg-gradient-to-br from-black via-zinc-950 to-black overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-10 top-10 w-64 h-64 bg-emerald-500/10 blur-3xl" />
          <div className="absolute right-0 bottom-0 w-80 h-80 bg-rose-500/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live product walkthrough
            </span>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              See the loan journey in motion
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Watch a 60-second glimpse of our AI-first loan experience—from identity
              verification to approval—rendered with the same UI your customers will touch.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-200">
              {[
                'Instant KYC and phone verification',
                'Smart document checks with AI cues',
                'Clear status updates for borrowers',
                'Advisor-style guidance baked into UI'
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-rose-500/10 to-blue-500/20 blur-2xl opacity-70 group-hover:opacity-90 transition-opacity" />
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm">
              <video
                className="w-full h-full object-cover"
                src={loanVideo}
                autoPlay
                loop
                muted
                controls
                playsInline
              />
              <div className="absolute left-4 bottom-4 px-4 py-3 rounded-full bg-black/60 backdrop-blur text-sm flex items-center gap-2 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Loan flow preview
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Main Features */}
      <div className="py-20 bg-gradient-to-br from-emerald-500/10 via-transparent to-purple-500/10 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="px-6 mx-auto max-w-7xl sm:px-12 lg:px-24 relative z-10">
          <div className="mb-20 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 mb-6 rounded-full bg-gradient-to-r from-emerald-500/10 to-purple-500/10 border border-emerald-500/20 backdrop-blur-sm">
              <Brain className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Powered by Advanced AI</span>
            </div>
            <h2 className="mb-6 text-5xl font-black bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Revolutionary Technology Suite
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-400 leading-relaxed">
              Our platform combines cutting-edge AI, blockchain, and analytics to provide
              a comprehensive lending solution that adapts to your business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:gap-12 md:grid-cols-3">
            {[
              {
                icon: <Brain className="w-10 h-10 text-purple-500" />,
                title: "AI-Driven Decision Making",
                description: "Advanced machine learning algorithms analyze multiple data points for accurate risk assessment and fraud detection with 99.9% precision.",
                gradient: "from-purple-500/20 to-purple-600/20",
                hoverGradient: "group-hover:from-purple-500/30 group-hover:to-purple-600/30",
                borderColor: "hover:border-purple-500/50",
                delay: "delay-100"
              },
              {
                icon: <Lock className="w-10 h-10 text-emerald-500" />,
                title: "Blockchain Security",
                description: "Immutable record-keeping and document verification ensure the highest level of security and transparency for all transactions.",
                gradient: "from-emerald-500/20 to-emerald-600/20",
                hoverGradient: "group-hover:from-emerald-500/30 group-hover:to-emerald-600/30",
                borderColor: "hover:border-emerald-500/50",
                delay: "delay-200"
              },
              {
                icon: <ChartIcon className="w-10 h-10 text-blue-500" />,
                title: "Advanced Analytics",
                description: "Real-time insights and predictive analytics help make informed lending decisions with comprehensive reporting tools.",
                gradient: "from-blue-500/20 to-blue-600/20",
                hoverGradient: "group-hover:from-blue-500/30 group-hover:to-blue-600/30",
                borderColor: "hover:border-blue-500/50",
                delay: "delay-300"
              }
            ].map((feature, index) => (
              <div key={index} className={`group p-10 transition-all duration-500 border bg-black/30 rounded-2xl border-zinc-800 ${feature.borderColor} hover:scale-105 backdrop-blur-sm ${feature.delay} animate-float`}>
                <div className={`inline-flex p-6 mb-8 rounded-2xl bg-gradient-to-r ${feature.gradient} ${feature.hoverGradient} transition-all duration-300 group-hover:scale-110`}>
                  {feature.icon}
                </div>
                <h3 className="mb-6 text-2xl font-bold group-hover:text-white transition-colors">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{feature.description}</p>
                
                {/* Progress indicator */}
                <div className="mt-8 w-full bg-zinc-800 rounded-full h-1">
                  <div className={`bg-gradient-to-r ${feature.gradient.replace('/20', '').replace('/20', '')} h-1 rounded-full w-0 group-hover:w-full transition-all duration-1000`}></div>
                </div>
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

      {/* Enhanced Call to Action */}
      <div className="py-20 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-rose-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="px-6 mx-auto max-w-7xl sm:px-12 lg:px-24 relative z-10">
          <div className="relative p-16 text-center bg-gradient-to-br from-zinc-900/50 via-black/50 to-zinc-900/50 rounded-3xl backdrop-blur-lg border border-zinc-700/50 shadow-2xl">
            {/* Glowing border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 via-purple-500/20 to-emerald-500/20 rounded-3xl blur-xl -z-10"></div>
            
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 px-8 py-4 mb-6 rounded-full bg-gradient-to-r from-rose-500/10 to-emerald-500/10 border border-rose-500/20">
                <div className="w-3 h-3 bg-rose-500 rounded-full animate-pulse"></div>
                <span className="text-rose-400 font-semibold">Join 50,000+ Financial Leaders</span>
              </div>
              
              <h2 className="mb-6 text-5xl lg:text-6xl font-black">
                Ready to{' '}
                <span className="text-transparent bg-gradient-to-r from-rose-500 via-purple-500 to-emerald-500 bg-clip-text animate-gradient">
                  Transform
                </span>{' '}
                Your Lending?
              </h2>
              
              <p className="max-w-3xl mx-auto mb-10 text-xl leading-relaxed text-gray-300">
                Join leading financial institutions in revolutionizing their loan origination process with 
                <span className="text-emerald-400 font-semibold"> AI-powered technology</span> that delivers results from day one.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              <button className="group relative flex items-center gap-3 px-12 py-6 text-lg font-bold text-white transition-all duration-300 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-2xl hover:shadow-rose-500/30 transform hover:scale-105">
                <span>Start Free Trial</span>
                <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity -z-10"></div>
              </button>
              
              <button className="group flex items-center gap-3 px-12 py-6 text-lg font-bold transition-all duration-300 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/30 hover:border-emerald-500/50 backdrop-blur-sm hover:bg-gradient-to-r hover:from-emerald-500/20 hover:to-blue-500/20 transform hover:scale-105">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                  <div className="w-0 h-0 border-l-4 border-l-white border-t-2 border-b-2 border-t-transparent border-b-transparent ml-1"></div>
                </div>
                Schedule Demo
              </button>
            </div>
            
            {/* Trust indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-zinc-700/50">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">30-Day</div>
                <div className="text-gray-400">Free Trial</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-rose-400 mb-2">24/7</div>
                <div className="text-gray-400">Expert Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
                <div className="text-gray-400">Uptime SLA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;