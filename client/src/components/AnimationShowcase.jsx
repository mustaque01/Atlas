import { useState } from 'react';
import { 
  Play, 
  Pause, 
  RotateCw, 
  Zap, 
  Heart,
  Star,
  Sparkles,
  ArrowUp,
  ArrowRight
} from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

const AnimationShowcase = () => {
  const [activeDemo, setActiveDemo] = useState('basic');
  const [isPlaying, setIsPlaying] = useState(true);

  const demos = {
    basic: 'Basic Animations',
    hover: 'Hover Effects',
    loading: 'Loading States',
    transitions: 'Page Transitions',
    micro: 'Micro Interactions'
  };

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
    const body = document.body;
    if (isPlaying) {
      body.style.animationPlayState = 'paused';
    } else {
      body.style.animationPlayState = 'running';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-5xl font-black text-white mb-4 animate-gradient bg-gradient-to-r from-rose-500 via-purple-500 to-emerald-500 bg-clip-text text-transparent">
            Animation Showcase
          </h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Explore modern animations, transitions, and micro-interactions that bring your UI to life
          </p>
          
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={toggleAnimation}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all hover:scale-105"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isPlaying ? 'Pause Animations' : 'Play Animations'}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(demos).map(([key, label], index) => (
            <button
              key={key}
              onClick={() => setActiveDemo(key)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 animate-slide-up ${
                activeDemo === key
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg'
                  : 'bg-zinc-800/50 text-gray-300 hover:bg-zinc-700/50 hover:text-white'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Demo Content */}
        <div className="space-y-12">
          
          {/* Basic Animations */}
          {activeDemo === 'basic' && (
            <div className="space-y-8 animate-fade-scale">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Basic Animations</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-700/50 text-center hover-lift">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 animate-bounce"></div>
                  <h3 className="text-white font-semibold mb-2">Bounce</h3>
                  <p className="text-gray-400 text-sm">Classic bounce animation</p>
                </div>
                
                <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-700/50 text-center hover-lift">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mx-auto mb-4 animate-spin"></div>
                  <h3 className="text-white font-semibold mb-2">Spin</h3>
                  <p className="text-gray-400 text-sm">Continuous rotation</p>
                </div>
                
                <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-700/50 text-center hover-lift">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 animate-pulse"></div>
                  <h3 className="text-white font-semibold mb-2">Pulse</h3>
                  <p className="text-gray-400 text-sm">Gentle pulsing effect</p>
                </div>
                
                <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-700/50 text-center hover-lift">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto mb-4 animate-float"></div>
                  <h3 className="text-white font-semibold mb-2">Float</h3>
                  <p className="text-gray-400 text-sm">Smooth floating motion</p>
                </div>
              </div>
            </div>
          )}

          {/* Hover Effects */}
          {activeDemo === 'hover' && (
            <div className="space-y-8 animate-fade-scale">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Hover Effects</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-700/50 text-center hover-lift cursor-pointer">
                  <Zap className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Lift Effect</h3>
                  <p className="text-gray-400 text-sm">Hover to see elevation</p>
                </div>
                
                <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-700/50 text-center hover-grow cursor-pointer">
                  <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Grow Effect</h3>
                  <p className="text-gray-400 text-sm">Hover to see scaling</p>
                </div>
                
                <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-700/50 text-center hover-glow cursor-pointer">
                  <Star className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Glow Effect</h3>
                  <p className="text-gray-400 text-sm">Hover to see glow</p>
                </div>
              </div>
            </div>
          )}

          {/* Loading States */}
          {activeDemo === 'loading' && (
            <div className="space-y-8 animate-fade-scale">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Loading States</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-700/50 text-center">
                  <LoadingSpinner variant="default" size="lg" text="Default Spinner" />
                </div>
                
                <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-700/50 text-center">
                  <LoadingSpinner variant="dots" size="lg" text="Bouncing Dots" />
                </div>
                
                <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-700/50 text-center">
                  <LoadingSpinner variant="bars" size="lg" text="Loading Bars" />
                </div>
                
                <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-700/50 text-center">
                  <LoadingSpinner variant="ripple" size="lg" text="Ripple Effect" />
                </div>
                
                <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-700/50 text-center">
                  <LoadingSpinner variant="heart" size="lg" text="Pulsing Heart" />
                </div>
                
                <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-700/50 text-center">
                  <LoadingSpinner variant="pulse" size="lg" text="Simple Pulse" />
                </div>
              </div>
            </div>
          )}

          {/* Page Transitions */}
          {activeDemo === 'transitions' && (
            <div className="space-y-8 animate-fade-scale">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Page Transitions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-700/50">
                  <h3 className="text-white font-semibold mb-4">Slide Up Animation</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-zinc-800/50 rounded-lg animate-slide-up">Item 1</div>
                    <div className="p-4 bg-zinc-800/50 rounded-lg animate-slide-up" style={{ animationDelay: '0.1s' }}>Item 2</div>
                    <div className="p-4 bg-zinc-800/50 rounded-lg animate-slide-up" style={{ animationDelay: '0.2s' }}>Item 3</div>
                  </div>
                </div>
                
                <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-700/50">
                  <h3 className="text-white font-semibold mb-4">Staggered Items</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-lg stagger-item">Staggered 1</div>
                    <div className="p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg stagger-item">Staggered 2</div>
                    <div className="p-4 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-lg stagger-item">Staggered 3</div>
                    <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg stagger-item">Staggered 4</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Micro Interactions */}
          {activeDemo === 'micro' && (
            <div className="space-y-8 animate-fade-scale">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Micro Interactions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <button className="group bg-zinc-900/50 p-6 rounded-2xl border border-zinc-700/50 hover:border-rose-500/50 transition-all hover:scale-105 active:scale-95">
                  <ArrowUp className="w-8 h-8 text-rose-500 mx-auto mb-2 group-hover:-translate-y-1 transition-transform" />
                  <p className="text-white font-semibold">Button Hover</p>
                </button>
                
                <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-700/50 animate-shimmer">
                  <Sparkles className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-white font-semibold">Shimmer Effect</p>
                </div>
                
                <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-700/50 animate-glow-border">
                  <Star className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-white font-semibold">Glowing Border</p>
                </div>
                
                <button 
                  className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-700/50 hover:animate-shake transition-all"
                  onClick={() => document.querySelector('.hover\\:animate-shake').classList.add('animate-shake')}
                >
                  <RotateCw className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-white font-semibold">Shake on Click</p>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-20 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 rounded-2xl border border-zinc-700/50 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-rose-500" />
            <span className="text-gray-400">Animations powered by CSS3 and modern web standards</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationShowcase;